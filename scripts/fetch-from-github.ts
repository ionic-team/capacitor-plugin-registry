import { graphql } from "@octokit/graphql";
import jsonfile from "jsonfile";

import { GithubQueryType } from "./types/github-data-schema";
import { log, sleep } from "./utils";
import { PluginSchema } from "./types/plugin-schema";
import path from "path";

let missingPackageJson: string[] = [];

export function extractDataFromGithubUrl(url: string) {
  const baseUrl = url
    .replace("https://github.com/", "")
    .replace(".git", "")
    .replace("ssh://git@", "");
  const [owner, repo, ...path] = baseUrl.split("/");
  const isMonorepo = !!(path && path.length);
  const packagePath = isMonorepo ? path.slice(2).join("/") : ".";

  return {
    owner,
    repo,
    isMonorepo,
    packagePath,
  };
}

const GH_RATELIMIT_CHECK = `
  query {
    rateLimit {
      limit
      cost
      remaining
      resetAt
    }
  }
`;

const GH_QUERY = `
  query($owner: String!, $repo: String!, $packagePath: String = ".", $packageJsonPath: String = "HEAD:package.json") {
    repository(owner: $owner, name: $repo) {
      name
      description
      issues(states: OPEN) {
        totalCount
      }
      watchers {
        totalCount
      }
      stargazers {
        totalCount
      }
      forks {
        totalCount
      }
      licenseInfo {
        key
        name
        spdxId
        url
        id
      }
      deployments {
        totalCount
      }
      releases(first: 1, orderBy: {field: CREATED_AT, direction: DESC}) {
        nodes {
          name
          tagName
          createdAt
          publishedAt
          isPrerelease
        }
      }
      defaultBranchRef {
        target {
          ... on Commit {
            id
            history(path: $packagePath, first: 1) {
              nodes {
                committedDate
                message
              }
            }
          }
        }
      }
      packageJson:object(expression: $packageJsonPath) {
        ... on Blob {
          text
        }
      }
    }
  }
`;

const GH_QUERY_NO_PACKAGE_JSON = `
  query($owner: String!, $repo: String!, $packagePath: String = ".") {
    repository(owner: $owner, name: $repo) {
      name
      description
      issues(states: OPEN) {
        totalCount
      }
      watchers {
        totalCount
      }
      stargazers {
        totalCount
      }
      forks {
        totalCount
      }
      licenseInfo {
        key
        name
        spdxId
        url
        id
      }
      deployments {
        totalCount
      }
      releases(first: 1, orderBy: {field: CREATED_AT, direction: DESC}) {
        nodes {
          name
          tagName
          createdAt
          publishedAt
          isPrerelease
        }
      }
      defaultBranchRef {
        target {
          ... on Commit {
            id
            history(path: $packagePath, first: 1) {
              nodes {
                committedDate
                message
              }
            }
          }
        }
      }
    }
  }
`;

export async function fetchPluginDataFromGithubBatched<T extends PluginSchema>({
  input,
  batchSize = 25,
  batchDelay = 5000,
}: {
  input: T[];
  batchSize?: number;
  batchDelay?: number;
}) {
  const initialInputSize = input.length;
  let results: Array<T & { github: GithubQueryType }> = [];

  if (!process.env.DATA_SCRIPTS_IGNORE_CACHE) {
    log("Checking for cached results");
    try {
      results = jsonfile.readFileSync("data/github-results.json");
    } catch (e) {}

    // Loop the found results and remove them from the input
    for (const result of results) {
      const index = input.findIndex(
        (item) => item.githubUrl === result.githubUrl
      );
      if (index > -1) {
        input.splice(index, 1);
      }
    }

    // if we have no input left, return the results
    if (input.length === 0) {
      log("All results loaded from cache");
      return results;
    }

    log(
      `${initialInputSize - input.length} results loaded from cache, ${
        input.length
      } plugins will be fetched from Github`
    );
  } else {
    log("Cache Skipped");
  }

  const { apiLimit, apiLimitRemaining, apiLimitCost } =
    await checkGithubRatelimit();

  // 5000 requests per hour is the authenticated API request rate limit
  if (!apiLimit || apiLimit < 5000) {
    throw new Error(
      "GitHub API token is invalid or query is not properly configured."
    );
  }

  // Error out if not enough remaining
  if (apiLimitRemaining < input.length * apiLimitCost) {
    throw new Error(
      "Not enough requests left on GitHub API rate limiting to proceed."
    );
  }

  log(
    `${apiLimitRemaining} requests of ${apiLimit} remaining on GitHub API rate limit, proceeding with ${input.length} plugins`
  );

  const batches = input.reduce<T[][]>((acc, item, index) => {
    const batchIndex = Math.floor(index / batchSize);
    if (!acc[batchIndex]) {
      acc[batchIndex] = [];
    }
    acc[batchIndex].push(item);
    return acc;
  }, []);

  try {
    for (const batch of batches) {
      if (results.length > 0) {
        log(`Sleeping for ${batchDelay / 1000} seconds`);
        await sleep(batchDelay);
      }
      log(
        `Fetching batch ${Math.floor(results.length / batchSize) + 1} of ${
          batches.length
        } (${
          results.length + batch.length
        }/${initialInputSize} plugins) from Github`
      );
      const batchResult = await fetchBatchDataFromGithub(batch);

      if (batchResult.length !== batch.length) {
        throw new Error(
          `Github data error, expected ${batch.length} results, got ${batchResult.length}`
        );
      }

      results = results.concat(batchResult);
    }
  } catch (e) {
    if (results.length > 0) {
      jsonfile.writeFileSync("data/github-results.json", results);
    }
    throw e;
  }

  if (missingPackageJson.length > 0) {
    jsonfile.writeFileSync(
      path.join("data", "missing-package-json.json"),
      missingPackageJson
    );
  }

  jsonfile.writeFileSync("data/github-results.json", results);

  return results;
}

export async function checkGithubRatelimit() {
  const res = await graphql<{
    rateLimit: {
      limit: number;
      cost: number;
      remaining: number;
      resetAt: string;
    };
  }>(GH_RATELIMIT_CHECK, {
    headers: {
      authorization: `token ${process.env.DATA_SCRIPTS_GITHUB_TOKEN}`,
    },
  });
  return {
    apiLimit: res?.rateLimit?.limit ?? 0,
    apiLimitRemaining: res?.rateLimit?.remaining ?? 0,
    apiLimitCost: res?.rateLimit?.cost ?? 0,
  };
}

async function fetchBatchDataFromGithub<T extends PluginSchema>(batch: T[]) {
  const results = await Promise.all(
    batch.map(async (plugin) => {
      const { owner, repo, packagePath } = extractDataFromGithubUrl(
        plugin.githubUrl
      );
      const data = await makeGithubRequest({
        owner,
        repo,
        packagePath,
        packageJsonPath: `HEAD:${
          packagePath === "." ? "" : `${packagePath}/`
        }package.json`,
      });
      return {
        ...plugin,
        github: data,
      };
    })
  );

  return results;
}

async function makeGithubRequest({
  owner,
  repo,
  packagePath,
  packageJsonPath,
}: {
  owner: string;
  repo: string;
  packagePath: string;
  packageJsonPath?: string;
}) {
  try {
    const data = await graphql<GithubQueryType>({
      query: GH_QUERY,
      owner,
      repo,
      packagePath,
      packageJsonPath,
      headers: {
        authorization: `token ${process.env.DATA_SCRIPTS_GITHUB_TOKEN}`,
      },
    });
    data.repository.packageJson.json = JSON.parse(
      data.repository.packageJson.text
    );
    data.repository.keywords = data.repository.packageJson.json.keywords ?? [];
    data.repository.license = data.repository.packageJson.json.license ?? "";
    data.repository.lastRelease = data.repository.releases?.nodes?.[0];
    return data;
  } catch (e) {
    if ((e as Error).message.includes(`(reading 'text')`)) {
      missingPackageJson.push(`https://github.com/${owner}/${repo}`);
      // return makeGithubRequestWithoutPackageJSON({
      //   owner,
      //   repo,
      //   packagePath,
      // });
      const fakeData: GithubQueryType = {
        githubUrl: `https://github.com/${owner}/${repo}`,
        repository: {
          description: "Missing",
          forks: {
            totalCount: 0,
          },
          issues: {
            totalCount: 0,
          },
          name: "Missing",
          packageJson: {
            text: "",
            json: {},
          },
          releases: {
            nodes: [],
          },
          stargazers: {
            totalCount: 0,
          },
          watchers: {
            totalCount: 0,
          },
          keywords: [],
          license: "",
        },
      };
      return fakeData;
    }
    console.error(owner, repo, packagePath);
    throw e;
  }
}

async function makeGithubRequestWithoutPackageJSON({
  owner,
  repo,
  packagePath,
}: {
  owner: string;
  repo: string;
  packagePath: string;
}) {
  console.log("fallback to no-package.json", owner, repo);
  try {
    const data = await graphql<GithubQueryType>({
      query: GH_QUERY_NO_PACKAGE_JSON,
      owner,
      repo,
      packagePath,
      headers: {
        authorization: `token ${process.env.DATA_SCRIPTS_GITHUB_TOKEN}`,
      },
    });
    data.repository.lastRelease = data.repository.releases?.nodes?.[0];
    return data;
  } catch (e) {
    console.error(e);
    console.log(owner, repo, packagePath);
    throw e;
  }
}

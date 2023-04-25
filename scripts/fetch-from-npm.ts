import fetch from "cross-fetch";
import { NpmQueryType } from "./types/npm-data-schema";
import { log, sleep } from "./utils";
import { PluginSchema } from "./types/plugin-schema";

function getNpmUrlForPackage(packageName: string) {
  return `https://api.npmjs.org/downloads/point/last-month/${packageName}`;
}

export async function fetchPluginDataFromNpmBatched<T extends PluginSchema>({
  input,
  batchSize = 25,
  batchDelay = 5000,
}: {
  input: T[];
  batchSize?: number;
  batchDelay?: number;
}) {
  const batchedPackages: T[] = [];
  const nonBatchedPackages: T[] = [];

  input.forEach((plugin) => {
    if (plugin.npmPackageName.startsWith("@")) {
      nonBatchedPackages.push(plugin);
    } else {
      batchedPackages.push(plugin);
    }
  });

  const batches = batchedPackages.reduce<T[][]>((acc, item, index) => {
    const batchIndex = Math.floor(index / batchSize);
    if (!acc[batchIndex]) {
      acc[batchIndex] = [];
    }
    acc[batchIndex].push(item);
    return acc;
  }, []);

  let results: Array<T & { npm: NpmQueryType | null }> = [];

  for (const batch of batches) {
    if (results.length > 0) {
      log(`Sleeping for ${batchDelay / 1000} seconds`);
      await sleep(batchDelay);
    }
    log(
      `Fetching batch ${Math.floor(results.length / batchSize) + 1} of ${
        batches.length
      } (${results.length + batch.length}/${
        batchedPackages.length
      } plugins) from NPM`
    );
    const batchResult = await fetchBatchNpmPluginData(batch);

    if (batchResult.length !== batch.length) {
      throw new Error(
        `NPM data error, expected ${batch.length} results, got ${batchResult.length}`
      );
    }

    results = results.concat(batchResult);
  }

  let nonBatchedResults: Array<T & { npm: NpmQueryType | null }> = [];
  if (nonBatchedPackages.length) {
    log(`Fetching ${nonBatchedPackages.length} scoped packages from NPM`);

    nonBatchedResults = await Promise.all(
      nonBatchedPackages.map(fetchNpmPluginData)
    );

    results = results.concat(nonBatchedResults);
  }

  return results;
}

async function fetchNpmPluginData<T extends PluginSchema>(
  plugin: T,
  retryCount = 0
): Promise<T & { npm: NpmQueryType | null }> {
  const packageName = plugin.npmPackageName;
  try {
    const url = getNpmUrlForPackage(packageName);
    const response = await fetch(url);
    const data = await response.json();

    if (!data.downloads) {
      console.warn(
        `${packageName} was not found on the npm registery, perhaps you should set 'packageName' in the plugin's JSON entry?`
      );
      return {
        ...plugin,
        npm: null,
      };
    }

    return {
      ...plugin,
      npm: {
        ...data,
        period: "month",
      },
    };
  } catch (e) {
    if (retryCount < 3) {
      await sleep(1000 + retryCount * 2000);
      return fetchNpmPluginData(plugin, retryCount + 1);
    } else {
      console.error(
        `Failed to fetch data for ${packageName} from npm after 3 retries`
      );
      return {
        ...plugin,
        npm: null,
      };
    }
  }
}

async function fetchBatchNpmPluginData<T extends PluginSchema>(
  plugins: T[],
  retryCount = 0
): Promise<Array<T & { npm: NpmQueryType | null }>> {
  const pluginNameArray = plugins.map((plugin) => plugin.npmPackageName);
  const pluginNames = pluginNameArray.join(",");
  try {
    const url = getNpmUrlForPackage(pluginNames);
    const response = await fetch(url);
    const data = await response.json();

    return plugins.map((plugin) => {
      const packageName = plugin.npmPackageName;
      const npmData = data[packageName];
      if (!npmData) {
        console.warn(
          `${packageName} was not found on the npm registery, perhaps you should set 'packageName' in the plugin's JSON entry?`
        );
        return {
          ...plugin,
          npm: null,
        };
      }

      return {
        ...plugin,
        npm: {
          ...npmData,
          period: "month",
        },
      };
    });
  } catch (e) {
    if (retryCount < 3) {
      await sleep(1000 + retryCount * 2000);
      return fetchBatchNpmPluginData(plugins, retryCount + 1);
    } else {
      console.error(
        `Failed to fetch data for ${pluginNameArray.join(
          ", "
        )} from npm after 3 retries`
      );
      return plugins.map((plugin) => ({
        ...plugin,
        npm: null,
      }));
    }
  }
}

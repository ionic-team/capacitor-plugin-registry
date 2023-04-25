type GHRelease = {
  name: string;
  tagName: string;
  createdAt: string;
  publishedAt: string;
  isPrerelease: boolean;
};

export type GithubQueryType = {
  githubUrl: string;
  repository: {
    name: string;
    description: string;
    issues: {
      totalCount: number;
    };
    watchers: {
      totalCount: number;
    };
    stargazers: {
      totalCount: number;
    };
    forks: {
      totalCount: number;
    };
    releases: {
      nodes?: Array<GHRelease>;
    };
    packageJson: {
      text: string;
      json: { [key: string]: any };
    };
    license?: string;
    keywords?: string[];
    lastRelease?: GHRelease;
  };
};

export type PluginResult = {
  name: string;
  npmPackageName: string;
  description: string;
  keywords: string[];
  license: string;
  lastUpdated: string;
  githubUrl: string;
  health: {
    score: number;
    modifiers: string[];
  };
  stats: {
    downloads: number;
    downloadsStart: string | undefined;
    downloadsEnd: string | undefined;
    downloadsPeriod: string | undefined;
    stars: number;
    openIssues: number;
  };
};

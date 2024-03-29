export type PluginResult = {
  name: string;
  npmPackageName: string;
  description: string;
  keywords: string[];
  license: { type: string; url?: string };
  ghLicense: {
    name: string | undefined;
    url: string | undefined;
  };
  lastUpdated: string;
  githubUrl: string | undefined;
  owner: {
    url: string | undefined;
    html_url: string | undefined;
  };
  platforms: PlatformType[];
  author: { name: string; email?: string; url?: string };
  type: PluginType;
  runtime: RuntimeType;
  health: {
    score: number;
    modifiers: string[];
  };
  stats: {
    downloads: number;
    downloadsStart: string | undefined;
    downloadsEnd: string | undefined;
    downloadsPeriod: string | undefined;
    stars?: number;
    watchers: number;
    openIssues: number;
  };
  searchScore: number;
  exactMatch: boolean;
};

export type PlatformType = string | "android" | "ios"; // Plugins may report more than these two
export type PluginType = "official" | "community";
export type RuntimeType = "capacitor" | "cordova" | "unknown";
export type SortByType =
  | "relevance"
  | "name"
  | "downloads"
  | "runtime"
  | "lastUpdated"
  | "source"
  | "stars";
export type SortDirectionType = "asc" | "desc";

export type PluginResult = {
  name: string;
  npmPackageName: string;
  description: string;
  keywords: string[];
  license: { type: string; url?: string };
  ghLicense: {
    key: string | undefined;
    name: string | undefined;
    spdx_id: string | undefined;
    url: string | undefined;
    node_id: string | undefined;
  };
  lastUpdated: string;
  githubUrl: string | undefined;
  owner: {
    login: string | undefined;
    id: number | undefined;
    node_id: string | undefined;
    avatar_url: string | undefined;
    gravatar_id: string | undefined;
    url: string | undefined;
    html_url: string | undefined;
    followers_url: string | undefined;
    following_url: string | undefined;
    gists_url: string | undefined;
    starred_url: string | undefined;
    subscriptions_url: string | undefined;
    organizations_url: string | undefined;
    repos_url: string | undefined;
    events_url: string | undefined;
    received_events_url: string | undefined;
    type: string | undefined;
    site_admin: boolean | undefined;
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

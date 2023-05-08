/**
 * This interface is the output from inspecting all plugins mentioned in plugins.txt
 * It is used by the plugin explorer in the VS Code extension
 * Please make it forward compatible: adding fields but not removing them
 * You can use shared/plugin-result for the plugin registry and modify it to suite needs
 */
export interface PluginInfo {
  name: string; // Name of the npm package
  author: string; // Name of the Author of the latest package
  published: string; // Date Time published to npm
  license: string; // eg MIT
  version: string; // Version number inspected from NPM
  versions: string[]; // List of version numbers available (NPM)
  keywords: string[]; // List of keywords from npm and Github filtered to remove garbage
  repo: string | undefined; // Url to the github repo (if open source)
  success: string[]; // List of string of environments where this plugin will fail (eg cordova-android-11)
  fails: string[]; // List of string of environments where this plugin will fail (eg capacitor-ios-5)
  platforms: string[]; // Platforms supported
  bugs?: string; // Github URL for bugs
  stars?: number; // Github stars
  image?: string; // Github author url
  fork: boolean; // Github - is a fork
  description: string; // Github description
  quality?: number; // Calculation: see fetch-from-github (higher means more usage/better)
  downloads?: number; // NPM Downloads in last month
  downloadStart: string; // NPM Downloads start date
  downloadEnd: string; // NPM Downloads end date
  downloadPeriod: string; // NPM Download period (eg last-month)
  updated?: string; // Github date last updated
  issues: number; // Github Open issue count
  watchers: number; // Github Watcher count
  forks: number; // Github Fork count
}

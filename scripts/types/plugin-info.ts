import { GithubQueryType } from "./github-data-schema";
import { NpmQueryType } from "./npm-data-schema";
import { PluginSchema } from "./plugin-schema";

export type PluginInfo = {
  github: GithubQueryType;
  npm: NpmQueryType | null;
} & PluginSchema;

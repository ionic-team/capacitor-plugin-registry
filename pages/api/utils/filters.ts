import {
  PlatformType,
  PluginResult,
  PluginType,
  RuntimeType,
} from "@/shared/plugin-result";
import { searchKeys } from "@/shared/search-keys";
import index from "@/data/plugin-index.json";
import Fuse from "fuse.js";
const searchIndex = Fuse.parseIndex<PluginResult>(index);

/**
 * These methods are used to filter the data and should all be unary functions
 */

export const filterStringSearch =
  (search?: string) => (input: PluginResult[]) => {
    if (!search) {
      return input;
    }

    const fuse = new Fuse(
      input,
      {
        keys: searchKeys,
        includeScore: true,
        ignoreLocation: true,
        minMatchCharLength: 3,
        threshold: 0.4,
      },
      searchIndex
    );
    return fuse.search(search).map((result) => ({
      ...result.item,
      exactMatch:
        result.item.name === search ||
        result.item.npmPackageName.split("/").at(-1) === search,
      searchScore: parseFloat(result.score?.toFixed(6) ?? "1"),
    }));
  };

export const filterPlatforms =
  (platforms?: PlatformType[]) => (input: PluginResult[]) => {
    if (!platforms || !Array.isArray(platforms) || platforms.length === 0) {
      return input;
    }

    return input.filter((plugin) =>
      plugin.platforms.some((platform) => platforms.includes(platform))
    );
  };

export const filterSource =
  (source?: PluginType[]) => (input: PluginResult[]) => {
    if (!source || !Array.isArray(source) || source.length === 0) {
      return input;
    }

    return input.filter((plugin) => source.includes(plugin.type));
  };

export const filterRuntime =
  (runtime?: RuntimeType[]) => (input: PluginResult[]) => {
    if (!runtime || !Array.isArray(runtime) || runtime.length === 0) {
      return input;
    }

    return input.filter((plugin) => runtime.includes(plugin.runtime));
  };

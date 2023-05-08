import jsonfile from "jsonfile";
import path from "path";
import fs from "fs";
import { PluginResult } from "../shared/plugin-result";
import { searchKeys } from "../shared/search-keys";
import { calculatePluginScore } from "./calculate-score";
import { PluginInfo } from "./types/plugin";
import Fuse from "fuse.js";
import { normalizeStringArray } from "./utils";

export async function writePluginDataToPublicDirectory(
  pluginData: PluginInfo[]
) {
  const PLUGIN_PUBLIC_DATA_PATH = path.join("data", "plugin-data.json");
  const PLUGIN_PUBLIC_RAW_PATH = path.join("data", "plugin-data-raw.json");
  const PLUGIN_INDEX_DATA_PATH = path.join("data", "plugin-index.json");

  const pluginResults = pluginData.map((plugin) => {
    const pluginResult: PluginResult = {
      name: plugin.name,
      npmPackageName: plugin.name,
      description: plugin.description,
      keywords: normalizeStringArray(plugin.keywords),
      license: plugin.license,
      lastUpdated: plugin.published,
      githubUrl: plugin.repo,
      health: calculatePluginScore(plugin),
      stats: {
        downloads: plugin.downloads ?? -1,
        downloadsStart: plugin.downloadStart,
        downloadsEnd: plugin.downloadEnd,
        downloadsPeriod: plugin.downloadPeriod,
        stars: plugin.stars,
        openIssues: plugin.issues,
      },
    };
    return pluginResult;
  });

  await deleteFileIfExists(PLUGIN_PUBLIC_DATA_PATH);
  await deleteFileIfExists(PLUGIN_PUBLIC_RAW_PATH);
  await deleteFileIfExists(PLUGIN_INDEX_DATA_PATH);
  await writeDataFile(pluginResults, PLUGIN_PUBLIC_DATA_PATH);
  await writeDataFile(pluginData, PLUGIN_PUBLIC_RAW_PATH);
  await createSearchIndex(pluginResults, PLUGIN_INDEX_DATA_PATH);
}

function deleteFileIfExists(path: string) {
  return new Promise<void>((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      if (err) {
        // File does not exist
        resolve();
        return;
      }
      fs.unlink(path, (err) => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  });
}

function writeDataFile(
  pluginData: PluginResult[] | PluginInfo[],
  savePath: string
) {
  return new Promise<void>((resolve, reject) => {
    jsonfile.writeFile(savePath, pluginData, {}, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

function createSearchIndex(pluginData: PluginResult[], savePath: string) {
  return new Promise<void>((resolve, reject) => {
    const newIndex = Fuse.createIndex(searchKeys, pluginData);

    jsonfile.writeFile(savePath, newIndex.toJSON(), {}, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

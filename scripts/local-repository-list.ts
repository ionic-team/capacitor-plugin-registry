import jsonfile from "jsonfile";
import path from "path";
import { PluginSchema } from "./types/plugin-schema";

export async function loadPluginData() {
  const data = await loadPluginDataFromDisk();
  /**
   * Potentially validate data here and report any faults
   */
  return data
    .map((plugin) => ({
      ...plugin,
      npmPackageName:
        plugin.npmPackageName || plugin.githubUrl.split("/").pop() || "",
    }))
    .filter((plugin) => plugin.githubUrl && plugin.npmPackageName);
}

async function loadPluginDataFromDisk() {
  const PLUGIN_SOURCE_DATA_PATH = path.join(
    "scripts",
    "source-data",
    process.env.DATA_SCRIPTS_USE_TEST_DATA
      ? "test-plugin-data.json"
      : "plugin-data.json"
  );

  return new Promise<PluginSchema[]>((resolve, reject) => {
    jsonfile.readFile(PLUGIN_SOURCE_DATA_PATH, {}, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

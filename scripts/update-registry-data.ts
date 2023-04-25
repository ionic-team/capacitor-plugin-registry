import { loadPluginData } from "./local-repository-list";
import { log, patchConsole } from "./utils";
import { fetchPluginDataFromGithubBatched } from "./fetch-from-github";
import { writePluginDataToPublicDirectory } from "./format-results";
import { fetchPluginDataFromNpmBatched } from "./fetch-from-npm";

require("dotenv").config();

async function execute() {
  log("Begin updating Capacitor Plugin Registry data");
  /**
   * Patch console logs to respect log level and apply colors
   */
  patchConsole();

  /**
   * Load plugin data from source-data folder
   */
  let pluginData;
  try {
    pluginData = await loadPluginData();
    if (!Array.isArray(pluginData) || pluginData.length === 0) {
      throw new Error("No plugin data found");
    }
    log(`Found ${pluginData.length} plugins`);
  } catch (err) {
    console.error(err);
    return;
  }

  /**
   * Fetch data from Github
   */
  try {
    pluginData = await fetchPluginDataFromGithubBatched({
      input: pluginData,
    });
  } catch (err) {
    console.error(err);
    return;
  }

  /**
   * Fetch data from NPM
   */
  try {
    pluginData = await fetchPluginDataFromNpmBatched({
      input: pluginData,
    });
  } catch (err) {
    console.error(err);
    return;
  }

  /**
   * Write final data to public directory
   */
  try {
    await writePluginDataToPublicDirectory(pluginData);
  } catch (err) {
    console.error(err);
    return;
  }
}

execute();

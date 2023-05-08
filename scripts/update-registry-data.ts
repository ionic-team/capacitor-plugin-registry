import { createDataDirectoryIfNotExists, log, patchConsole } from "./utils";
import { writePluginDataToPublicDirectory } from "./format-results";
import { inspectPlugins, readPluginList } from './summary';
import { checkSecretsAreSet, secretList } from "./secrets";

require("dotenv").config();

async function execute() {
  log("Begin updating Capacitor Plugin Registry data");
  /**
   * Patch console logs to respect log level and apply colors
   */
  patchConsole();

  /**
   * Make sure environment variables are set
   */
  if (!checkSecretsAreSet()) {
    console.error(`Some required variables are not set (${secretList()})`)
    return;
  }

  /**
   * Create Data directory if it doesn't exist
   */
  createDataDirectoryIfNotExists();

  /**
   * Load plugin data from source-data folder
   */
  try {
    const plugins = readPluginList()
    const pluginData = await inspectPlugins(plugins);
    log(`Found ${pluginData.length} plugins`);

  /**
   * Write final data to public directory
   */
    await writePluginDataToPublicDirectory(pluginData);
  } catch (err) {
    console.error(err);
    return;
  }
}

execute();

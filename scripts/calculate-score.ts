import { PluginInfo } from "./types/plugin-info";

/**
 * Based on the React Native Directory Scoring System (for now at least!)
 */

const modifiers = [
  {
    name: "Very popular",
    value: 40,
    condition: (plugin: PluginInfo) => getCombinedPopularity(plugin) > 10000,
  },
  {
    name: "Popular",
    value: 10,
    condition: (plugin: PluginInfo) => getCombinedPopularity(plugin) > 2500,
  },
  {
    name: "Recommended",
    value: 20,
    condition: (plugin: PluginInfo) => false,
  },
  {
    name: "Lots of open issues",
    value: -20,
    condition: (plugin: PluginInfo) =>
      plugin.github.repository.issues.totalCount >= 75,
  },
  {
    name: "No license",
    value: -20,
    condition: (plugin: PluginInfo) => !plugin.github.repository.license,
  },
  {
    name: "GPL license",
    value: -20,
    condition: (plugin: PluginInfo) =>
      plugin.github.repository.license &&
      typeof plugin.github.repository.license === "string" &&
      (plugin.github.repository.license.startsWith("gpl") ||
        plugin.github.repository.license.startsWith("other")),
  },
  {
    name: "Recently updated",
    value: 10,
    condition: (plugin: PluginInfo) => getUpdatedDaysAgo(plugin) <= 30, // Roughly 1 month
  },
  {
    name: "Not updated recently",
    value: -20,
    condition: (plugin: PluginInfo) => getUpdatedDaysAgo(plugin) >= 180, // Roughly 6 months
  },
];

// Calculate the minimum and maximum possible scores based on the modifiers
const minScore = modifiers.reduce((currentMin, modifier) => {
  return modifier.value < 0 ? currentMin + modifier.value : currentMin;
}, 0);
const maxScore = modifiers.reduce((currentMax, modifier) => {
  return modifier.value > 0 ? currentMax + modifier.value : currentMax;
}, 0);

export const calculatePluginScore = (plugin: PluginInfo) => {
  // Filter the modifiers to the ones which conditions pass with the data
  const matchingModifiers = modifiers.filter((modifier) =>
    modifier.condition(plugin)
  );

  // Reduce the matching modifiers to find the raw score for the data
  const rawScore = matchingModifiers.reduce((currentScore, modifier) => {
    return currentScore + modifier.value;
  }, 0);

  // Scale the raw score as a percentage between the minimum and maximum possible score
  // based on the available modifiers
  const score = Math.round(
    ((rawScore - minScore) / (maxScore - minScore)) * 100
  );

  // Map the modifiers to the name so we can include that in the data
  const matchingModifierNames = matchingModifiers.map(
    (modifier) => modifier.name
  );

  return {
    score,
    modifiers: matchingModifierNames,
  };
};

const getCombinedPopularity = (plugin: PluginInfo) => {
  const subscribers = plugin.github.repository.watchers.totalCount;
  const forks = plugin.github.repository.forks.totalCount;
  const stars = plugin.github.repository.stargazers.totalCount;
  const downloads = plugin.npm?.downloads ?? 0;
  return subscribers * 20 + forks * 10 + stars + downloads / 100;
};

const DAY_IN_MS = 864e5;

const getUpdatedDaysAgo = (plugin: PluginInfo) => {
  const updatedAt = plugin.github.repository.lastRelease?.publishedAt;
  const updateDate = updatedAt
    ? new Date(updatedAt).getTime()
    : new Date().getTime();
  const currentDate = new Date().getTime();

  return (currentDate - updateDate) / DAY_IN_MS;
};

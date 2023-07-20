import { PluginResult, SortDirectionType } from "@/shared/plugin-result";

export const sortByRelevance = (
  input: PluginResult[],
  direction: SortDirectionType
) => {
  /**
   * Relevance is primarily based on search score,
   * Exact match if any,
   * then by capacitor > cordova,
   * then by downloads IF we have a searchScore !== 0
   * then by name IF all searchScore values === 0 (no search term)
   */

  const hasSearchScore = input.some((plugin) => plugin.searchScore !== 1);

  return input.sort((a, b) => {
    if (a.searchScore !== b.searchScore) {
      return direction === "desc"
        ? a.searchScore - b.searchScore
        : b.searchScore - a.searchScore;
    }

    if (a.exactMatch !== b.exactMatch) {
      return direction === "desc" ? -1 : 1;
    }

    if (a.runtime !== b.runtime) {
      const capacitor = 1;
      const cordova = 2;
      const aRuntime = a.runtime === "capacitor" ? capacitor : cordova;
      const bRuntime = b.runtime === "capacitor" ? capacitor : cordova;
      return direction === "desc" ? aRuntime - bRuntime : bRuntime - aRuntime;
    }

    if (hasSearchScore && a.stats.downloads !== b.stats.downloads) {
      return direction === "asc"
        ? a.stats.downloads - b.stats.downloads
        : b.stats.downloads - a.stats.downloads;
    }

    const compared = a.name.localeCompare(b.name);
    return direction === "desc" ? compared : -compared;
  });
};

export const sortByName = (
  input: PluginResult[],
  direction: SortDirectionType
) => {
  return input.sort((a, b) => {
    const compared = a.name.localeCompare(b.name);
    return direction === "desc" ? compared : -compared;
  });
};

export const sortByDownloads = (
  input: PluginResult[],
  direction: SortDirectionType
) => {
  return input.sort((a, b) => {
    const compared = a.stats.downloads - b.stats.downloads;
    return direction === "asc" ? compared : -compared;
  });
};

export const sortByRuntime = (
  input: PluginResult[],
  direction: SortDirectionType
) => {
  const capacitor = 1;
  const cordova = 2;
  return input.sort((a, b) => {
    const aRuntime = a.runtime === "capacitor" ? capacitor : cordova;
    const bRuntime = b.runtime === "capacitor" ? capacitor : cordova;
    const compared = aRuntime - bRuntime;
    return direction === "desc" ? compared : -compared;
  });
};

export const sortByLastUpdated = (
  input: PluginResult[],
  direction: SortDirectionType
) => {
  return input.sort((a, b) => {
    const compared = a.lastUpdated.localeCompare(b.lastUpdated);
    return direction === "asc" ? compared : -compared;
  });
};

export const sortBySource = (
  input: PluginResult[],
  direction: SortDirectionType
) => {
  return input.sort((a, b) => {
    const compared = a.type.localeCompare(b.type);
    return direction === "asc" ? compared : -compared;
  });
};

export const sortByStars = (
  input: PluginResult[],
  direction: SortDirectionType
) => {
  return input.sort((a, b) => {
    const aStars = a.stats.stars || 0;
    const bStars = b.stats.stars || 0;
    const compared = aStars - bStars;
    return direction === "asc" ? compared : -compared;
  });
};

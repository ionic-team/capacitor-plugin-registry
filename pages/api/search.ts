// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  PlatformType,
  PluginResult,
  PluginType,
  RuntimeType,
  SortByType,
  SortDirectionType,
} from "@/shared/plugin-result";
import type { NextApiRequest, NextApiResponse } from "next";

import { z } from "zod";
import {
  preprocessStringArray,
  preprocessStringNumber,
} from "./utils/zod-helpers";
import {
  filterPlatforms,
  filterRuntime,
  filterSource,
  filterStringSearch,
} from "./utils/filters";

import data from "@/data/plugin-data.json";
import {
  sortByName,
  sortByDownloads,
  sortByRuntime,
  sortByLastUpdated,
  sortBySource,
  sortByStars,
  sortByRelevance,
} from "./utils/sorts";
const rawData = [...data] as PluginResult[];

const DEFAULT_PAGE = 1;
const DEFAULT_LIMT = 10;

const querySchema = z.object({
  search: z.string().optional(),
  page: z.preprocess(
    preprocessStringNumber(z.string().optional()),
    z.number().positive().gt(0).optional()
  ),
  limit: z.preprocess(
    preprocessStringNumber(z.string().optional()),
    z.number().positive().gt(0).lte(2000).optional()
  ),
  source: z.preprocess(
    preprocessStringArray(z.string().optional()),
    z.array(z.enum(["official", "community"] as const)).optional()
  ),
  platform: z.preprocess(
    preprocessStringArray(z.string().optional()),
    z.array(z.enum(["android", "ios"] as const)).optional()
  ),
  runtime: z.preprocess(
    preprocessStringArray(z.string().optional()),
    z.array(z.enum(["capacitor", "cordova"] as const)).optional()
  ),
  sortBy: z
    .enum([
      "relevance",
      "name",
      "downloads",
      "runtime",
      "lastUpdated",
      "source",
      "stars",
    ] as const)
    .optional()
    .default("relevance"),
  sortDirection: z
    .enum(["asc", "desc"] as const)
    .optional()
    .default("desc"),
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
      search,
      page,
      limit,
      platform,
      source,
      runtime,
      sortBy,
      sortDirection,
    } = querySchema.parse(req.query);

    // Filter
    const filteredData = filterData({
      input: rawData,
      search,
      platform,
      source,
      runtime,
    });

    // Sort
    const sortedData = sortData({
      input: filteredData,
      sortBy,
      sortDirection,
    });

    // Pagination
    const results = paginateData({
      input: sortedData,
      page,
      limit,
    });

    return res.status(200).json(results);
  } catch (e) {
    if (e instanceof z.ZodError) {
      return res
        .status(400)
        .json({ message: "Invalid query params", errors: e.issues });
    }
    return res.status(500).json({ message: "Internal Server Error", error: e });
  }
}

function filterData({
  input,
  search,
  platform,
  source,
  runtime,
}: {
  input: PluginResult[];
  search?: string;
  platform?: PlatformType[];
  source?: PluginType[];
  runtime?: RuntimeType[];
}) {
  const stringFilter = filterStringSearch(search);
  const platformFilter = filterPlatforms(platform);
  const sourceFilter = filterSource(source);
  const runtimeFilter = filterRuntime(runtime);

  return runtimeFilter(sourceFilter(platformFilter(stringFilter(input))));
}

function sortData({
  input,
  sortBy,
  sortDirection,
}: {
  input: PluginResult[];
  sortBy: SortByType;
  sortDirection: SortDirectionType;
}) {
  switch (sortBy) {
    case "name":
      return sortByName(input, sortDirection);
    case "downloads":
      return sortByDownloads(input, sortDirection);
    case "runtime":
      return sortByRuntime(input, sortDirection);
    case "lastUpdated":
      return sortByLastUpdated(input, sortDirection);
    case "source":
      return sortBySource(input, sortDirection);
    case "stars":
      return sortByStars(input, sortDirection);
    case "relevance":
    default:
      return sortByRelevance(input, sortDirection);
  }
}

function paginateData({
  input,
  page = DEFAULT_PAGE,
  limit = DEFAULT_LIMT,
}: {
  input: PluginResult[];
  page?: number;
  limit?: number;
}) {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  return input.slice(startIndex, endIndex);
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  PlatformType,
  PluginResult,
  PluginType,
  RuntimeType,
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
    z.number().positive().gt(0).lte(100).optional()
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
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { search, page, limit, platform, source, runtime } =
      querySchema.parse(req.query);

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

function sortData({ input }: { input: PluginResult[] }) {
  return input;
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

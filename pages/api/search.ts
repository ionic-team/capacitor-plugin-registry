// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PluginResult } from '@root/shared/plugin-result';
import type { NextApiRequest, NextApiResponse } from 'next';
import Fuse from 'fuse.js';

import data from '@root/data/plugin-data.json';
import index from '@root/data/plugin-index.json';
import { searchKeys } from '@root/shared/search-keys';

const rawData = [...data] as PluginResult[];
const searchIndex = Fuse.parseIndex<PluginResult>(index);

const DEFAULT_PAGE = 1;
const DEFAULT_LIMT = 10;

export default function handler(req: NextApiRequest, res: NextApiResponse<PluginResult[]>) {
  const querySearch = req.query.search ? req.query.search.toString().toLowerCase().trim() : undefined;

  // Filter
  const filteredData = filterData({
    input: rawData,
    search: querySearch,
    index: searchIndex,
  });

  // Sort
  const sortedData = filteredData; // TODO: Add Sort Options

  // Pagination
  const page = req.query.page ? parseInt(req.query.page.toString()) : DEFAULT_PAGE;
  const limit = req.query.limit ? parseInt(req.query.limit.toString()) : DEFAULT_LIMT;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const results = sortedData.slice(startIndex, endIndex);

  return res.status(200).json(results);
}

function filterData({
  input,
  search,
  index,
}: {
  input: PluginResult[];
  search?: string;
  index: Fuse.FuseIndex<PluginResult>;
}) {
  if (!search) {
    return input;
  }
  const fuse = new Fuse(
    input,
    {
      keys: searchKeys,
      shouldSort: true,
      includeScore: true,
      ignoreLocation: true,
      minMatchCharLength: 3,
      threshold: 0.4,
    }
    // index
  );
  return fuse.search(search).map((result) => result.item);
}

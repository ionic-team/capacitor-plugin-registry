import Fuse from "fuse.js";
import { PluginResult } from "./plugin-result";

export const searchKeys: Fuse.FuseOptionKeyObject<PluginResult>[] = [
  {
    name: "name",
    weight: 1,
  },
  {
    name: "description",
    weight: 1,
  },
  {
    name: "npmPackageName",
    weight: 2,
  },
  {
    name: "keywords",
    weight: 10,
  },
];

import DirectoryPage from "@/src/pages/directory/index";

import pluginData from "../data/plugin-data.json";
import { GetStaticProps } from "next";
import { ComponentProps } from "react";

const Directory = (props: ComponentProps<"div">) => (
  <DirectoryPage {...props} />
);

export const getStaticProps: GetStaticProps = async () => {
  const allPlatforms = pluginData.reduce<string[]>((acc, cur) => {
    if (!Array.isArray(cur.platforms)) return acc;

    cur.platforms.forEach(
      (platform) => !acc.includes(platform) && acc.push(platform)
    );
    return acc;
  }, []);

  return {
    props: {
      allPlatforms,
    },
  };
};

export default Directory;

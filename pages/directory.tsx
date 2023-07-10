import DirectoryPage from "@/src/pages/directory/index";

import pluginData from "../data/plugin-data.json";
import { InferGetStaticPropsType } from "next";
import { ComponentProps } from "react";

type PagePropsType = ComponentProps<"div"> &
  InferGetStaticPropsType<typeof getStaticProps>;

const Directory = (props: PagePropsType) => <DirectoryPage {...props} />;

export const getStaticProps = async () => {
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

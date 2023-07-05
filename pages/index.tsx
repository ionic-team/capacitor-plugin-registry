import IndexPage from "@pages/index";

import pluginData from "../data/plugin-data.json";
import { GetStaticProps } from "next";
import { ComponentProps } from "react";

const Index = (props: ComponentProps<"div">) => <IndexPage {...props} />;

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

export default Index;

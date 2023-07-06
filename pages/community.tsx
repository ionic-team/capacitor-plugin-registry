import CommunityPage from "@/src/pages/community/index";

import pluginData from "../data/plugin-data.json";
import { GetStaticProps } from "next";
import { ComponentProps } from "react";
import { createClient } from "@ionic-internal/config-prismic";

const Community = (props: ComponentProps<"div">) => (
  <CommunityPage {...props} />
);

export const getStaticProps: GetStaticProps = async () => {
  const prismicClient = createClient();

  const prismicData = (await prismicClient.getSingle("capacitor_community"))
    .data;

  return {
    props: {
      prismicData,
    },
  };
};

export default Community;

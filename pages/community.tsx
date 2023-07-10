import CommunityPage from "@pages/community/index";

import { ComponentProps } from "react";
import { createClient } from "@ionic-internal/config-prismic";
import { InferGetStaticPropsType } from "next";

type PagePropsType = ComponentProps<"div"> &
  InferGetStaticPropsType<typeof getStaticProps>;

const Community = (props: PagePropsType) => <CommunityPage {...props} />;

export const getStaticProps = async () => {
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

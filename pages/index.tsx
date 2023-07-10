import IndexPage from "@/src/pages/index";

import { ComponentProps } from "react";
import { createClient } from "@ionic-internal/config-prismic";
import { InferGetStaticPropsType } from "next";

type PagePropsType = ComponentProps<"div"> &
  InferGetStaticPropsType<typeof getStaticProps>;

const Index = (props: PagePropsType) => <IndexPage {...props} />;

export const getStaticProps = async () => {
  const prismicClient = createClient();

  const homepageData = (await prismicClient.getSingle("capacitor_homepage"))
    .data;
  const whitepaperAdData = (
    await prismicClient.getSingle("capacitor_whitepaper_ad")
  ).data;
  const announcementData = (
    await prismicClient.getSingle("capacitor_homepage_announcement")
  ).data;

  return {
    props: {
      prismicData: {
        ...homepageData,
        whitepaper_ad: whitepaperAdData,
        announcement: announcementData,
      },
    },
  };
};

export default Index;

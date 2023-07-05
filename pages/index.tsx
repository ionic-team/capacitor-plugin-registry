import IndexPage from "@/src/pages/index";

import { GetStaticProps } from "next";
import { ComponentProps } from "react";
import { createClient } from "@ionic-internal/config-prismic";

const Index = (props: ComponentProps<"div">) => <IndexPage {...props} />;

export const getStaticProps: GetStaticProps = async () => {
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

import EnterprisePage from "@/src/pages/enterprise/index";

import pluginData from "../data/plugin-data.json";
import { GetStaticProps } from "next";
import { ComponentProps } from "react";
import { createClient } from "@ionic-internal/config-prismic";

const Enterprise = (props: ComponentProps<"div">) => (
  <EnterprisePage {...props} />
);

export const getStaticProps: GetStaticProps = async () => {
  const prismicClient = createClient();

  const prismicData = (await prismicClient.getSingle("capacitor_enterprise"))
    .data;

  return {
    props: {
      prismicData,
    },
  };
};

export default Enterprise;

import EnterprisePage from "@pages/enterprise/index";

import { InferGetStaticPropsType } from "next";
import { ComponentProps } from "react";
import { createClient } from "@ionic-internal/config-prismic";

type PagePropsType = ComponentProps<"div"> &
  InferGetStaticPropsType<typeof getStaticProps>;

const Enterprise = (props: PagePropsType) => <EnterprisePage {...props} />;

export const getStaticProps = async () => {
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

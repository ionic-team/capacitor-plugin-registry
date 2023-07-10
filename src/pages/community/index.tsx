import Prefooter from "@components/prefooter";
import SiteFooter from "@components/site-footer";
import { createContext, useContext } from "react";

import styles from "./index.module.scss";
import { PrismicRichText } from "@prismicio/react";
import clsx from "clsx";
import { Column, Grid } from "@ionic-internal/components-react";
import LegacyPrismicResponsiveImage from "@components/prismic/legacy/responsive-image";
import NewsletterSignup from "@components/newsletter-signup";
import SiteHeader from "@components/site-header";
import SiteMeta from "@components/site-meta";
import { getStaticProps } from "@root/pages/community";
import { InferGetStaticPropsType } from "next";
import { isWebLink } from "@utils/prismic";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const CommunityPageContext = createContext<{
  prismicData: PageProps["prismicData"];
} | null>(null);

const CommunityPage = ({ prismicData }: PageProps) => {
  return (
    <>
      <SiteMeta title="Capacitor Community" />
      <SiteHeader />
      <CommunityPageContext.Provider value={{ prismicData }}>
        <main className={styles.page}>
          <Top />
          <Websites />
          <NewsletterSignup />
          <Prefooter />
        </main>
      </CommunityPageContext.Provider>
      <SiteFooter />
    </>
  );
};

const Top = () => {
  const { prismicData } = useContext(CommunityPageContext) || {};
  if (!prismicData) return null;
  const { top, top__list } = prismicData;

  return (
    <section className={clsx(styles.top, "ds-container")}>
      <div className="heading-group">
        <PrismicRichText
          field={top}
          components={{
            paragraph: (props) => (
              <p className="content ds-paragraph-2" key={props.key}>
                {props.children}
              </p>
            ),
          }}
        />
      </div>
      <div className="cards">
        {top__list.map((field) => {
          if (!isWebLink(field.link)) return null;

          const {
            image,
            text,
            link: { target, url },
          } = field;

          return (
            <a target={target} href={url} className="card">
              <div className="image-wrapper">
                <LegacyPrismicResponsiveImage image={image} />
              </div>
              <PrismicRichText field={text} />
            </a>
          );
        })}
      </div>
    </section>
  );
};

const Websites = () => {
  const { prismicData } = useContext(CommunityPageContext) || {};
  if (!prismicData) return null;
  const { websites__list } = prismicData;

  const dimensions = ["40x32", "40x34", "34x40", "40x40"];

  return (
    <section className={clsx(styles.websites, "ds-container")}>
      <Grid>
        {websites__list.map(({ icon, text, link }, i) => {
          const [width, height] = dimensions[i].split("x");

          return (
            <Column cols={[12, 6, 6, 3, 3]}>
              <div className="image-wrapper">
                <LegacyPrismicResponsiveImage
                  width={width}
                  height={height}
                  image={icon}
                />
              </div>
              <PrismicRichText field={text} />
              <PrismicRichText field={link} />
            </Column>
          );
        })}
      </Grid>
    </section>
  );
};

export default CommunityPage;

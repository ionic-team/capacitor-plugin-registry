import Prefooter from "@/src/components/prefooter";
import SiteFooter from "@/src/components/site-footer";
import { createContext, useContext } from "react";

import styles from "./index.module.scss";
import { PrismicRichText } from "@prismicio/react";
import clsx from "clsx";
import { Column, Grid } from "@ionic-internal/components-react";
import LegacyPrismicResponsiveImage from "@/src/components/prismic/legacy/responsive-image";
import NewsletterSignup from "@components/newsletter-signup";

const CommunityPageContext = createContext();

const CommunityPage = ({ prismicData }) => {
  return (
    <CommunityPageContext.Provider value={{ prismicData }}>
      <main className={styles.page}>
        <Top />
        <Websites />
        <NewsletterSignup />
        <Prefooter />
      </main>
      <SiteFooter />
    </CommunityPageContext.Provider>
  );
};

const Top = () => {
  const {
    prismicData: { top, top__list },
  } = useContext(CommunityPageContext);

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
        {top__list.map(({ image, text, link: { target, url } }) => (
          <a target={target} href={url} className="card">
            <div className="image-wrapper">
              <LegacyPrismicResponsiveImage image={image} />
            </div>
            <PrismicRichText field={text} />
          </a>
        ))}
      </div>
    </section>
  );
};

const Websites = () => {
  const {
    prismicData: { websites__list },
  } = useContext(CommunityPageContext);

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
              <PrismicRichText className="link" richText={link} />
            </Column>
          );
        })}
      </Grid>
    </section>
  );
};

export default CommunityPage;

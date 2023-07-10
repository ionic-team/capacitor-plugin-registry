import LegacyPrismicResponsiveImage from "@components/prismic/legacy/responsive-image";
import { createContext, useContext, useState } from "react";

import styles from "./index.module.scss";
import Button from "@components/old/Button";
import clsx from "clsx";
import { PrismicRichText } from "@prismicio/react";
import {
  Column,
  Grid,
  HubspotForm,
  Modal,
} from "@ionic-internal/components-react";

import Companies0 from "./assets/companies/0@2x.png";
import Companies1 from "./assets/companies/1@2x.png";
import Companies2 from "./assets/companies/2@2x.png";
import Companies3 from "./assets/companies/3@2x.png";
import Companies4 from "./assets/companies/4@2x.png";
import Companies5 from "./assets/companies/5@2x.png";
import Companies6 from "./assets/companies/6@2x.png";
import Companies7 from "./assets/companies/7@2x.png";

import Editions0 from "./assets/editions/0@2x.png";
import Editions1 from "./assets/editions/1@2x.png";
import Editions2 from "./assets/editions/2@2x.png";
import Editions3 from "./assets/editions/3@2x.png";
import Editions4 from "./assets/editions/4@2x.png";
import Editions5 from "./assets/editions/5@2x.png";
import Editions6 from "./assets/editions/6@2x.png";
import Editions7 from "./assets/editions/7@2x.png";
import Editions8 from "./assets/editions/8@2x.png";

import Native0 from "./assets/native/0@2x.png";
import Native1 from "./assets/native/1@2x.png";
import Native2 from "./assets/native/2@2x.png";
import Image from "next/image";
import SiteFooter from "@components/site-footer";
import Prefooter from "@components/prefooter";
import SiteHeader from "@components/site-header";
import SiteMeta from "@components/site-meta";
import EnterpriseSubnav from "./components/subnav";
import { InferGetStaticPropsType } from "next";
import { getStaticProps } from "@root/pages/enterprise";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const EnterprisePageContext = createContext<{
  ebookModalOpen: boolean;
  setEbookModalOpen: (open: boolean) => void;
  prismicData: PageProps["prismicData"];
} | null>(null);

export default function EnterprisePage({ prismicData }: PageProps) {
  const [ebookModalOpen, setEbookModalOpen] = useState(false);

  return (
    <>
      <SiteMeta title="Capacitor Enterprise" />
      <SiteHeader theme="dark" sticky={false} />
      <EnterpriseSubnav />
      <div className={styles.page}>
        <EnterprisePageContext.Provider
          value={{ ebookModalOpen, setEbookModalOpen, prismicData }}
        >
          <main>
            <Top />
            <Companies />
            <Native />
            <Ebook />
            <MicroFrontends />
            <Plugins />
            <Security />
            <Delivery />
            <SupportGuidance />
            <Features />
            <Editions />
            <Demo />
            <Prefooter />
          </main>
        </EnterprisePageContext.Provider>
        <SiteFooter />
      </div>
    </>
  );
}

const Top = () => {
  const { prismicData } = useContext(EnterprisePageContext) || {};
  if (!prismicData) return null;
  const { top } = prismicData;
  const { title, text, cta_1, background } = top[0] || {};

  return (
    <section className={styles.top} id="top">
      <LegacyPrismicResponsiveImage image={background} className="background" />
      <div className="ds-container">
        <div className="heading-group">
          <h1>{title}</h1>
          <p className="ds-paragraph-2">{text}</p>
          <div className="cta-row">
            <Button anchor href="#demo" kind="round">
              {cta_1} →
            </Button>
            {/* <a href="https://ionic.io/contact/sales" className="link btn-link">
                {cta_2} →
              </a> */}
          </div>
        </div>
      </div>
    </section>
  );
};

const companyImages = [
  Companies0,
  Companies1,
  Companies2,
  Companies3,
  Companies4,
  Companies5,
  Companies6,
  Companies7,
];

const companyList = [
  "nationwide",
  "target",
  "burger-king",
  "home-depot",
  "nbc",
  "microsoft",
  "amtrak",
  "general-electric",
];

const Companies = () => {
  const { prismicData } = useContext(EnterprisePageContext) || {};
  if (!prismicData) return null;
  const { companies } = prismicData;

  return (
    <section className={styles.companies} id="companies">
      <div className="ds-container">
        <h2>{companies}</h2>
        <div className="logos">
          <div className="row1">
            {companyImages.slice(0, 4).map(({ src, height, width }, i) => (
              <Image
                width={width / 2}
                height={height / 2}
                src={src}
                alt={`${companyList[i]} logo`}
              />
            ))}
          </div>
          <div className="row2">
            {companyImages
              .slice(4, companyImages.length)
              .map(({ src, height, width }, i) => {
                const currentIndex = i + companyImages.length / 2;
                return (
                  <Image
                    width={width / 2}
                    height={height / 2}
                    src={src}
                    alt={`${companyList[currentIndex]} logo`}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
};

const nativeImages = [Native0, Native1, Native2];

const nativeAlt = [
  "three blocks with up arrow",
  "fingerprint icon with lock symbol",
  "clock icon with up arrow",
];

const Native = () => {
  const { prismicData } = useContext(EnterprisePageContext) || {};
  if (!prismicData) return null;
  const { native, native__list } = prismicData;
  const { supertext, title, subtext } = native[0] || {};

  return (
    <section className={clsx(styles.native, "ds-container")}>
      <div className="heading-group">
        <div className="ds-overline-1">{supertext}</div>
        <PrismicRichText field={title} />
        <p className="ds-paragraph-2">{subtext}</p>
      </div>
      <ul className="list">
        {native__list.map(({ title, text }, i) => {
          const { width, height, src } = nativeImages[i];

          return (
            <li key={i}>
              <Image
                width={width / 2}
                height={height / 2}
                src={src}
                alt={`${nativeAlt[i]}`}
              />
              <h3 className="ds-heading-4">{title}</h3>
              <p className="ds-paragraph--prose">{text}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

const Ebook = () => {
  const { ebookModalOpen, setEbookModalOpen, prismicData } =
    useContext(EnterprisePageContext) || {};
  const { ebook } = prismicData || {};
  const { text, cta, background, book } = ebook?.[0] || {};

  return (
    <section className={styles.ebook} id="ebook">
      <div className="ds-container">
        <Modal open={ebookModalOpen} onClose={() => setEbookModalOpen?.(false)}>
          <h2>Building Cross-platform Apps with Capacitor</h2>
          <HubspotForm
            createProps={{ formId: "9151dc0b-42d9-479f-b7b8-649e0e7bd1bc" }}
          />
        </Modal>
        <div className="wrapper">
          <LegacyPrismicResponsiveImage
            image={background}
            className="background"
          />
          <div className="content">
            <div className="image-wrapper">
              <LegacyPrismicResponsiveImage image={book} />
            </div>
            <div className="heading-group">
              <PrismicRichText
                field={text}
                components={{
                  paragraph: (props) => (
                    <p className="ds-paragraph-1" key={props.key}>
                      {props.children}
                    </p>
                  ),
                }}
              />
              <Button
                kind="round"
                size="md"
                onClick={() => setEbookModalOpen?.(true)}
              >
                {cta} →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const MicroFrontends = () => {
  const { prismicData } = useContext(EnterprisePageContext) || {};
  if (!prismicData) return null;
  const { micro_frontends } = prismicData;
  const { supertext, title, subtext, image } = micro_frontends[0] || {};

  return (
    <section className={styles.microFrontends} id="micro-frontends">
      <div className="ds-container">
        <div className="wrapper">
          <div className="image-wrapper">
            <LegacyPrismicResponsiveImage image={image} />
          </div>
          <div className="heading-group">
            <div className="ds-overline-1">{supertext}</div>
            <PrismicRichText field={title} />
            <PrismicRichText
              field={subtext}
              components={{
                paragraph: (props) => (
                  <p className="content ds-paragraph-2" key={props.key}>
                    {props.children}
                  </p>
                ),
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const Plugins = () => {
  const { prismicData } = useContext(EnterprisePageContext) || {};
  if (!prismicData) return null;
  const { plugins } = prismicData;
  const { supertext, title, subtext, image } = plugins[0] || {};

  return (
    <section className={styles.plugins} id="plugins">
      <div className="ds-container">
        <div className="wrapper">
          <div className="heading-group">
            <div className="ds-overline-1">{supertext}</div>
            <PrismicRichText field={title} />
            <p className="ds-paragraph-2">{subtext}</p>
          </div>
          <div className="image-wrapper">
            <LegacyPrismicResponsiveImage image={image} />
          </div>
        </div>
      </div>
    </section>
  );
};

const Security = () => {
  const { prismicData } = useContext(EnterprisePageContext) || {};
  if (!prismicData) return null;
  const { security } = prismicData;
  const { supertext, title, subtext, image } = security[0] || {};

  return (
    <section className={styles.security} id="security">
      <div className="ds-container">
        <div className="wrapper">
          <div className="image-wrapper">
            <LegacyPrismicResponsiveImage image={image} />
          </div>
          <div className="heading-group">
            <div className="ds-overline-1">{supertext}</div>
            <PrismicRichText field={title} />
            <PrismicRichText
              field={subtext}
              components={{
                paragraph: (props) => (
                  <p className="content ds-paragraph-2" key={props.key}>
                    {props.children}
                  </p>
                ),
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const Delivery = () => {
  const { prismicData } = useContext(EnterprisePageContext) || {};
  if (!prismicData) return null;
  const { delivery } = prismicData;
  const { supertext, title, subtext, image } = delivery[0] || {};

  return (
    <section className={styles.delivery} id="delivery">
      <div className="ds-container">
        <div className="wrapper">
          <div className="heading-group">
            <div className="ds-overline-1">{supertext}</div>
            <PrismicRichText field={title} />
            <PrismicRichText
              field={subtext}
              components={{
                paragraph: (props) => (
                  <p className="content ds-paragraph-2" key={props.key}>
                    {props.children}
                  </p>
                ),
              }}
            />
          </div>
          <div className="image-wrapper">
            <LegacyPrismicResponsiveImage image={image} />
          </div>
        </div>
      </div>
    </section>
  );
};

const SupportGuidance = () => {
  const { prismicData } = useContext(EnterprisePageContext) || {};
  if (!prismicData) return null;
  const { support_guidance } = prismicData;

  return (
    <section className={styles.supportGuidance} id="support-guidance">
      <div className="ds-container">
        <Grid className="wrapper">
          {support_guidance.map(({ image, title, text }) => (
            <Column cols={[12, 12, 6, 6, 6]} as="article">
              <LegacyPrismicResponsiveImage image={image} />
              <h3>{title}</h3>
              <p className="ds-paragraph-2">{text}</p>
            </Column>
          ))}
        </Grid>
      </div>
    </section>
  );
};

const Features = () => {
  const { prismicData } = useContext(EnterprisePageContext) || {};
  if (!prismicData) return null;
  const { features, features__list } = prismicData;
  const { supertext, title, subtext } = features[0] || {};

  return (
    <section className={styles.features} id="features">
      <div className="ds-container">
        <Grid className="wrapper">
          <Column cols={[12, 12, 6, 6, 6]} className="heading-group">
            <div className="sticky-wrapper">
              <div className="ds-overline-1">{supertext}</div>
              <PrismicRichText field={title} />
              <p className="ds-paragraph-2">{subtext}</p>
            </div>
          </Column>
          <Column cols={[12, 12, 6, 6, 6]} as="ul">
            {features__list.map(({ icon, title, text }) => (
              <li>
                <div className="image-wrapper">
                  <LegacyPrismicResponsiveImage image={icon} />
                </div>
                <div>
                  <h3 className="ds-heading-4">{title}</h3>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </Column>
        </Grid>
      </div>
    </section>
  );
};

const editionImages = [
  Editions0,
  Editions1,
  Editions2,
  Editions3,
  Editions4,
  Editions5,
  Editions6,
  Editions7,
  Editions8,
];

const editionAlts = [
  "burger-king",
  "fidelity",
  "hr-block",
  "communo",
  "usaa",
  "ibm",
  "bcbs",
  "test-kitchen",

  "home-depot",
];

const Editions = () => {
  const { prismicData } = useContext(EnterprisePageContext) || {};
  if (!prismicData) return null;
  const { editions } = prismicData;
  const { supertext, title, paragraph_1, paragraph_2, cta_1 } =
    editions[0] || {};

  return (
    <section className={styles.editions} id="editions">
      <div className="ds-container">
        <div className="wrapper">
          <div className="heading-group">
            <div className="ds-overline-1">{supertext}</div>
            <PrismicRichText field={title} />
            <PrismicRichText
              field={paragraph_1}
              components={{
                paragraph: (props) => (
                  <p className="content ds-paragraph-2" key={props.key}>
                    {props.children}
                  </p>
                ),
              }}
            />
            <PrismicRichText
              field={paragraph_2}
              components={{
                paragraph: (props) => (
                  <p className="content ds-paragraph-2" key={props.key}>
                    {props.children}
                  </p>
                ),
              }}
            />
            <div className="cta-row">
              <Button href="#demo" anchor kind="round">
                {cta_1} →
              </Button>
              {/* <a href="https://ionic.io/contact/sales" className="link btn-link">
                  {cta_2} →
                </a> */}
            </div>
          </div>
          <div className="logos">
            <div className="row0">
              {editionImages.slice(0, 3).map(({ src, height, width }, i) => (
                <div className="image-wrapper">
                  <Image
                    src={src}
                    width={width / 2}
                    height={height / 2}
                    alt={editionAlts[i]}
                  />
                </div>
              ))}
            </div>
            <div className="row1">
              {editionImages.slice(3, 6).map(({ src, width, height }, i) => {
                const indexOffset = i + 3;

                return (
                  <div className="image-wrapper">
                    <Image
                      src={src}
                      width={width / 2}
                      height={height / 2}
                      alt={editionAlts[indexOffset]}
                    />
                  </div>
                );
              })}
            </div>
            <div className="row2">
              {editionImages.slice(6, 9).map(({ src, width, height }, i) => {
                const indexOffset = i + 6;

                return (
                  <div className="image-wrapper">
                    <img
                      src={src}
                      width={width / 2}
                      height={height / 2}
                      alt={editionAlts[indexOffset]}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Demo = () => {
  const { prismicData } = useContext(EnterprisePageContext) || {};
  if (!prismicData) return null;
  const { demo } = prismicData;
  const { supertext, title } = demo[0] || {};

  return (
    <section className={styles.demo} id="demo">
      <div className="ds-container">
        <div className="heading-group">
          <div className="ds-overline-1">{supertext}</div>
          <h2>{title}</h2>
        </div>
        <HubspotForm
          createProps={{ formId: "d0019a78-110e-4d28-b356-56357b4abe4b" }}
        />
      </div>
    </section>
  );
};

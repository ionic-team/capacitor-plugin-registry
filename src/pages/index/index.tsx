import { PrismicImage2x } from "@ionic-internal/components-next";
import {
  Breakpoint,
  Column,
  Grid,
  HighlightedCode,
  HubspotForm,
  Modal,
} from "@ionic-internal/components-react";
import { PrismicRichText } from "@prismicio/react";
import clsx from "clsx";
import {
  useState,
  createContext,
  useContext,
  SetStateAction,
  Dispatch,
} from "react";

import styles from "./index.module.scss";
import Button from "@/src/components/old/Button";
import Link from "next/link";
import SiteFooter from "@components/site-footer";
import Prefooter from "@components/prefooter";
import CodeTabs from "@components/code-tabs";
import SiteHeader from "@components/site-header";
import SiteMeta from "@components/site-meta";
import { InferGetStaticPropsType } from "next";
import { getStaticProps } from "@/pages";

import ImageTop0 from "./assets/top-0.png";
import Image from "next/image";
import LegacyPrismicResponsiveImage from "@/src/components/prismic/legacy/responsive-image";

import nightOwl from "prism-react-renderer/themes/nightOwl";
import { isWebLink } from "@utils/prismic";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const IndexPageContext = createContext<{
  prismicData: PageProps["prismicData"];
  selectedCodeTab: string;
  setSelectedCodeTab: Dispatch<SetStateAction<string>>;
  ebookModalOpen: boolean;
  setEbookModalOpen: Dispatch<SetStateAction<boolean>>;
} | null>(null);

export default function IndexPage({ prismicData }: PageProps) {
  const [selectedCodeTab, setSelectedCodeTab] = useState("notifications");
  const [ebookModalOpen, setEbookModalOpen] = useState(false);

  return (
    <>
      <SiteMeta title="Capacitor Home" />
      <SiteHeader />
      <IndexPageContext.Provider
        value={{
          prismicData,
          selectedCodeTab,
          setSelectedCodeTab,
          ebookModalOpen,
          setEbookModalOpen,
        }}
      >
        <main className={styles.page}>
          <Top />
          <Started />
          <Ebook />
          <Native />
          <Features />
          <Framework />
          <Tweets />
          <Cta />
          <Prefooter />
        </main>
      </IndexPageContext.Provider>
      <SiteFooter />
    </>
  );
}

const Top = () => {
  const { prismicData } = useContext(IndexPageContext) || {};
  if (!prismicData) return null;
  const { top, top__ctas, top__link, top__hero, top__icons } = prismicData;
  const { primary, secondary } = top__ctas[0] || {};

  return (
    <section className={styles.top} id="top">
      <div className="background"></div>
      <div className="ds-container">
        <div className="heading-group">
          <Announcement />
          <PrismicRichText
            field={top}
            components={{
              paragraph: (props) => (
                <p className="ds-paragraph-2" key={props.key}>
                  {props.children}
                </p>
              ),
            }}
          />
          <div className="buttons">
            <Button
              kind="round"
              anchor
              href="/docs/getting-started"
              className="primary"
            >
              {primary} →
            </Button>
            <Button
              kind="round"
              variation="light"
              anchor
              href="/docs/plugins"
              className="secondary"
            >
              {secondary}
            </Button>
          </div>
          <Link className="link | ui-paragraph-4" href="/cordova">
            {top__link} →
          </Link>
          <PrismicImage2x field={top__icons} width={91} height={16} />
        </div>
        <div className="image-wrapper">
          <Image
            src={ImageTop0}
            width={ImageTop0.width / 2}
            height={ImageTop0.height}
            alt="multi layered phone"
          />
        </div>
      </div>
    </section>
  );
};

const Announcement = () => {
  const { prismicData } = useContext(IndexPageContext) || {};
  if (!prismicData) return null;
  const {
    announcement: { tag_text, desktop_text, mobile_text, link },
  } = prismicData;
  if (!isWebLink(link)) return null;
  const { target, url } = link;

  return (
    <a
      id="announcement"
      className={clsx(styles.announcement, "feature__register")}
      href={url}
      target={target}
      rel={target ? "noopener" : undefined}
    >
      <div className="tag">{tag_text}</div>
      <Breakpoint
        visible={[0, 1, 1, 1, 1]}
        display="inline-block"
        className="text"
      >
        <span className="text__content">{desktop_text} →</span>
      </Breakpoint>
      <Breakpoint
        visible={[1, 0, 0, 0, 0]}
        display="inline-block"
        className="text"
      >
        <span className="text__content">{mobile_text} →</span>
      </Breakpoint>
    </a>
  );
};

const Started = () => {
  const { prismicData } = useContext(IndexPageContext) || {};
  if (!prismicData) return null;
  const { started, started__list, started__icons } = prismicData;

  const panels = [
    <HighlightedCode
      theme={nightOwl}
      language="shell-session"
      code={`npm install @capacitor/cli @capacitor/core\nnpx cap init`}
    />,
    <HighlightedCode
      theme={nightOwl}
      language="shell-session"
      code={`npm install @capacitor/ios @capacitor/android\nnpx cap add ios\nnpx cap add android`}
    />,
    <CodeTabs
      theme={nightOwl}
      data={{
        tabs: ["Notifications", "Geolocation", "Camera", "Custom"],
        languages: ["typescript"],
        code: [
          `import { LocalNotifications } from '@capacitor/local-notifications';

LocalNotifications.schedule({
  notifications: [
    {
      title: "On sale",
      body: "Widgets are 10% off. Act fast!",
      id: 1,
      schedule: { at: new Date(Date.now() + 1000 * 5) },
      sound: null,
      attachments: null,
      actionTypeId: "",
      extra: null
    }
  ]
});`, //-----------------------------------
          `import { Geolocation } from '@capacitor/geolocation';

// get the users current position
const position = await Geolocation.getCurrentPosition();

// grab latitude & longitude
const latitude = position.coords.latitude;
const longitude = position.coords.longitude;
`,
          `import { Camera, CameraResultType } from '@capacitor/camera';

// Take a picture or video, or load from the library
const picture = await Camera.getPicture({
  resultType: CameraResultType.Uri
});
`, //-----------------------------------
          `import Foundation
import Capacitor

// Custom platform code, easily exposed to your web app
// through Capacitor plugin APIs. Build APIs that work
// across iOS, Android, and the web!
@objc(MyAwesomePlugin)
public class MyAwesomePlugin: CAPPlugin {

  @objc public func doNative(_ call: CAPPluginCall) {
  let alert = UIAlertController(title: "Title", message: "Please Select an Option", preferredStyle: .actionSheet)

  // ....
  }
}
`,
        ],
      }}
    />,
  ];

  const dimensions = ["22x26", "27x23"];

  return (
    <section className={clsx(styles.started, "ds-container")} id="started">
      <div className="heading-group">
        <PrismicRichText field={started} />
      </div>
      {started__list.map(({ number, title, text }, i) => (
        <div className="step">
          <div className="number">{number}</div>
          <div className="heading-panel-wrapper">
            <div className="heading-wrapper">
              <h3>{title}</h3>
              {i === 1 ? (
                <div className="platforms">
                  {started__icons.map(({ icon }, i) => (
                    <PrismicImage2x
                      field={icon}
                      width={parseInt(dimensions[i].split("x")[0])}
                      height={parseInt(dimensions[i].split("x")[1])}
                    />
                  ))}
                </div>
              ) : null}
              {text ? <p>{text}</p> : null}
            </div>
            <div className="panel">
              <pre>{panels[i]}</pre>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

const Ebook = () => {
  const { ebookModalOpen, setEbookModalOpen, prismicData } =
    useContext(IndexPageContext) || {};
  if (!prismicData) return null;
  const { ebook } = prismicData;
  const { text, cta1: cta, background, book } = ebook[0] || {};

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
                components={{
                  paragraph: (props) => (
                    <p className="ds-paragraph-1" key={props.key}>
                      {props.children}
                    </p>
                  ),
                }}
                field={text}
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

const Native = () => {
  const { prismicData } = useContext(IndexPageContext) || {};
  if (!prismicData) return null;
  const { native, native__list } = prismicData;
  const dimensions = ["48x64", "60x64", "60x64"];

  return (
    <section className={clsx(styles.native, "ds-container")} id="native">
      <div className="heading-group">
        <PrismicRichText field={native} />
      </div>
      <Grid>
        {native__list.map(({ icon, item }, i: number) => (
          <Column cols={[12, 6, 4, 4, 4]}>
            <PrismicImage2x
              field={icon}
              width={parseInt(dimensions[i].split("x")[0])}
              height={parseInt(dimensions[i].split("x")[1])}
            />
            <PrismicRichText field={item} />
          </Column>
        ))}
      </Grid>
    </section>
  );
};

const Features = () => {
  const { prismicData } = useContext(IndexPageContext) || {};
  if (!prismicData) return null;
  const { features, features__list, features__link } = prismicData;
  const dimensions = [
    "40x32",
    "40x32",
    "32x32",
    "33x32",
    "28x32",
    "32x32",
    "32x32",
    "32x30",
  ];

  return (
    <section className={styles.features} id="features">
      <div className="ds-container">
        <div className="heading-group">
          <PrismicRichText field={features} />
          <a href="/docs/apis" className="link | ui-heading-4">
            {features__link} →
          </a>
        </div>
        <Grid>
          {features__list.map(({ icon, item }, i: number) => (
            <Column cols={[12, 6, 4, 3, 3]}>
              <PrismicImage2x
                field={icon}
                width={parseInt(dimensions[i].split("x")[0])}
                height={parseInt(dimensions[i].split("x")[1])}
              />
              <PrismicRichText field={item} />
            </Column>
          ))}
        </Grid>
      </div>
    </section>
  );
};

const Framework = () => {
  const { prismicData } = useContext(IndexPageContext) || {};
  if (!prismicData) return null;
  const { framework, framework__list } = prismicData;

  const logoTile = (logo: any) => (
    <PrismicImage2x field={logo} width="272" height="200" />
  );

  return (
    <section className={clsx(styles.framework, "ds-container")} id="framework">
      <div className="heading-group">
        <PrismicRichText
          field={framework}
          components={{
            paragraph: (props) => (
              <p className="content ds-paragraph-2" key={props.key}>
                {props.children}
              </p>
            ),
          }}
        />
      </div>
      <Grid>
        {framework__list.map(({ logo, link }) => (
          <Column cols={[6, 3, 3, 3, 3]} sm={3}>
            {link ? <Link href={link}>{logoTile(logo)}</Link> : logoTile(logo)}
          </Column>
        ))}
      </Grid>
    </section>
  );
};

const Tweets = () => {
  const { prismicData } = useContext(IndexPageContext) || {};
  if (!prismicData) return null;
  const { tweets, tweets__list, tweets__bottom, tweets__bottom__list } =
    prismicData;
  const { title } = tweets[0] || {};
  const { emoji, text } = tweets__bottom[0] || {};

  return (
    <section className={styles.tweets} id="tweets">
      <div className="ds-container">
        <div className="heading-group">
          <PrismicRichText field={title} />
        </div>
        <div className="tweets">
          {tweets__list.map(({ name, handle, text, image, verified }, i) => (
            <article className="tweet" key={i}>
              <div className="title-row">
                <LegacyPrismicResponsiveImage image={image} />
                <div className="title">
                  <h3 className="ds-heading-5">
                    {name}
                    {verified && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="#1DA1F2"
                          d="M512 268c0 17.9-4.3 34.5-12.9 49.7a92 92 0 01-34.6 35.4c.4 2.7.6 6.9.6 12.6 0 27.1-9.1 50.1-27.1 69.1a86.8 86.8 0 01-65.4 28.6 85.6 85.6 0 01-32.6-6.3 99.2 99.2 0 01-34.6 39.7A86 86 0 01256 512a86.8 86.8 0 01-49.7-14.9 97 97 0 01-34.3-40 85.3 85.3 0 01-32.6 6.3 87.8 87.8 0 01-65.7-28.6 96 96 0 01-26.3-81.7 92.7 92.7 0 01-34.6-35.4A100.3 100.3 0 010 268c0-19 4.8-36.5 14.3-52.3a88.1 88.1 0 0138.3-35.1 98.9 98.9 0 01-6.3-34.3 96 96 0 0127.4-69.1A88.1 88.1 0 01172 54.9a99.2 99.2 0 0134.6-39.7A86.7 86.7 0 01256 0c17.9 0 34.4 5.1 49.4 15.1A100 100 0 01340 54.8a85.3 85.3 0 0132.6-6.3c25.5 0 47.3 9.5 65.4 28.6a96.7 96.7 0 0127.1 69.1c0 12.6-1.9 24-5.7 34.3a88.1 88.1 0 0138.3 35.1A100.4 100.4 0 01512 268zm-266.9 77.1l105.7-158.3c2.7-4.2 3.5-8.8 2.6-13.7-1-4.9-3.5-8.8-7.7-11.4a19.5 19.5 0 00-13.7-2.9c-5 .8-9 3.2-12 7.4l-93.1 140-42.9-42.8a17 17 0 00-13.1-5.4c-5 .2-9.3 2-13.1 5.4a17.5 17.5 0 00-5.1 12.9c0 5.1 1.7 9.4 5.1 12.9l58.9 58.9 2.9 2.3c3.4 2.3 6.9 3.4 10.3 3.4 6.7-.1 11.8-2.9 15.2-8.7z"
                        />
                      </svg>
                    )}
                  </h3>
                  <p className="ds-paragraph-6">{handle}</p>
                </div>
                <svg
                  width="16"
                  height="13"
                  viewBox="0 0 16 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 1.54036C15.41 1.80104 14.7794 1.97708 14.1149 2.05833C14.793 1.65208 15.3151 1.00885 15.5592 0.24375C14.9252 0.619531 14.2234 0.89375 13.474 1.03932C12.8739 0.399479 12.0195 0 11.0769 0C9.26298 0 7.79487 1.46927 7.79487 3.28047C7.79487 3.53776 7.822 3.78828 7.87963 4.02865C5.15024 3.89323 2.72939 2.58646 1.1121 0.599219C0.830685 1.08333 0.667938 1.6487 0.667938 2.24792C0.667938 3.38542 1.25111 4.39089 2.13266 4.97995C1.59017 4.96641 1.08159 4.81745 0.640814 4.57031V4.61094C0.640814 6.20208 1.77326 7.52578 3.27527 7.82708C3.00064 7.90156 2.70905 7.94219 2.41068 7.94219C2.20047 7.94219 1.99364 7.92188 1.7936 7.88125C2.21064 9.18464 3.42445 10.1326 4.86205 10.1596C3.73978 11.0398 2.32253 11.5646 0.783217 11.5646C0.518754 11.5646 0.257682 11.5477 0 11.5172C1.44776 12.4583 3.17355 13 5.02479 13C11.0701 13 14.3725 7.99974 14.3725 3.66302C14.3725 3.52083 14.3691 3.37865 14.3624 3.23984C15.0032 2.77604 15.5592 2.20052 16 1.54036Z"
                    fill="#1DA1F2"
                  />
                </svg>
              </div>

              <PrismicRichText
                field={text}
                components={{
                  paragraph: (props) => (
                    <p className="content ds-paragraph-4" key={props.key}>
                      {props.children}
                    </p>
                  ),
                }}
              />
            </article>
          ))}
        </div>
        <div className="bottom">
          <p className="emoji">{emoji}</p>
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
          <div className="links">
            {tweets__bottom__list.map(({ icon, text, link }) => {
              if (!isWebLink(link)) return null;

              return (
                <a href={link.url} target={link.target}>
                  <article>
                    <PrismicImage2x field={icon} />
                    <h4>{text}</h4>
                  </article>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

const Cta = () => {
  const { prismicData } = useContext(IndexPageContext) || {};
  if (!prismicData) return null;
  const {
    get_started2: get_started,
    get_started__ctas,
    companies__list2,
    cta,
  } = prismicData;
  const { image, title, text, cta1 } = cta[0] || {};

  const { title: get_started_title, text: get_started_text } =
    get_started[0] || {};
  const { primary, secondary } = get_started__ctas[0] || {};

  const dimensions = [
    "33x42",
    "31x42",
    "32x36",
    "34x34",
    "51x30",
    "35x35",
    "58x25",
    "35x35",
  ];

  return (
    <section className={styles.multisection} id="multisection">
      <div className="ds-container">
        <div className={styles.cta} id="cta">
          <PrismicRichText field={title} />
          <div className="wrapper">
            <div className="card">
              <LegacyPrismicResponsiveImage
                image={image}
                className="background"
              />
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
                <Button kind="round" href="/enterprise">
                  {cta1} →
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.companies} id="companies">
          <div className="wrapper">
            <div className="image-group first">
              {companies__list2.slice(0, 4).map(({ logo }, i) => (
                <PrismicImage2x
                  field={logo}
                  width={parseInt(dimensions[i].split("x")[0])}
                  height={parseInt(dimensions[i].split("x")[1])}
                />
              ))}
            </div>
            <div className="image-group second">
              {companies__list2.slice(4, 8).map(({ logo }, i) => (
                <PrismicImage2x
                  field={logo}
                  width={parseInt(dimensions[i + 4].split("x")[0])}
                  height={parseInt(dimensions[i + 4].split("x")[1])}
                />
              ))}
            </div>
          </div>
        </div>
        <div className={styles.getStarted} id="get-started">
          <div className="heading-group">
            <h2>{get_started_title}</h2>
            <p className="ds-paragraph-2">{get_started_text}</p>
          </div>
          <div className="ctas">
            <Button
              href="/docs/getting-started"
              kind="round"
              anchor
              className="secondary"
              color="cyan"
            >
              {primary} →
            </Button>
            <Button
              href="/docs/plugins"
              anchor
              kind="round"
              variation="light"
              className="primary"
              color="cyan"
            >
              {secondary} →
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

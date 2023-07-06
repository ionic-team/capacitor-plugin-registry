import { BASE_URL } from "@utils/index";
import Head from "next/head";
import { useRouter } from "next/router";

const SiteMeta = ({
  title = "Capacitor by Ionic - Cross-platform apps with web technology",
  description = "Build iOS, Android, and Progressive Web Apps with HTML, CSS, and JavaScript",
  metaImage = `${BASE_URL}/og.png`,
  ...props
}) => {
  const router = useRouter();
  const ogUrl = `${BASE_URL}${router.asPath}`;

  const sameSiteImage = metaImage?.substr(0, 1) === "/";

  if (sameSiteImage) {
    metaImage = `${BASE_URL}${metaImage}`;
  }

  return (
    <Head>
      <title key="title">{title}</title>
      <link key="canonical" rel="canonical" href={ogUrl} />
      <meta key="description" name="description" content={description} />
      <meta
        key="twitter-card"
        name="twitter:card"
        content="summary_large_image"
      />
      <meta key="twitter-site" name="twitter:site" content="@capacitorjs" />
      <meta
        key="twitter-creator"
        name="twitter:creator"
        content="capacitorjs"
      />
      <meta key="twitter-title" name="twitter:title" content={title} />
      <meta
        key="twitter-description"
        name="twitter:description"
        content={description}
      />

      <meta key="twitter-image" name="twitter:image" content={metaImage} />

      <meta property="fb:page_id" content="1321836767955949" />
      <meta key="og-url" property="og:url" content={ogUrl} />
      <meta key="og-type" property="og:type" content="website" />
      <meta key="og-title" property="og:title" content={title} />

      <meta key="og-image" property="og:image" content={metaImage} />
      <meta
        key="og-description"
        property="og:description"
        content={description}
      />
      <meta key="og-site-name" property="og:site_name" content="Capacitor" />
      <meta
        property="article:publisher"
        content="https://www.facebook.com/ionicframework"
      />
      <meta property="og:locale" content="en_US" />
      {props.children}
    </Head>
  );
};

export default SiteMeta;

import clsx from "clsx";

import styles from "./index.module.scss";
import NewsletterSignup from "@components/newsletter-signup";
import Prefooter from "@components/prefooter";
import SiteFooter from "@components/site-footer";
import Image from "next/image";
import SiteHeader from "@/src/components/site-header";
import SiteMeta from "@/src/components/site-meta";

const SolutionPageLayout = ({
  children,
  framework,
}: {
  framework: {
    id: string;
    name: string;
    theme: string;
    logo: string;
  };
}) => {
  const { src, width, height } = framework.logo;
  return (
    <>
      <SiteMeta title={`${framework.name} Solution for Capacitor`} />
      <SiteHeader />
      <main className={styles.page}>
        <section className={clsx(styles.top, "ds-container")}>
          <div className="heading-group">
            <Image
              width={width}
              height={height}
              src={src}
              alt={framework.name + " logo"}
              className="react"
            />
            <h1 className="ds-heading-2">{framework.name} &amp; Capacitor</h1>
            <p className="ds-paragraph-2">
              Build native mobile apps with web technology and {framework.name}
            </p>
          </div>
        </section>
        {children}
        <NewsletterSignup />
        <Prefooter />
      </main>
      <SiteFooter />
    </>
  );
};

export default SolutionPageLayout;

import clsx from 'clsx';

import styles from './index.module.scss';
import NewsletterSignup from '@components/newsletter-signup';
import Prefooter from '@components/prefooter';
import SiteFooter from '@components/site-footer';
import Image, { ImageProps, StaticImageData } from 'next/image';
import SiteHeader from '@components/site-header';
import SiteMeta from '@components/site-meta';
import { HTMLAttributes } from 'react';

type SolutionPageLayoutProps = {
  framework: {
    id: string;
    name: string;
    theme: string;
    logo: StaticImageData;
  };
} & HTMLAttributes<HTMLElement>;

const SolutionPageLayout = ({ children, framework }: SolutionPageLayoutProps) => {
  const { src, width, height } = framework.logo;

  return (
    <>
      <SiteMeta
        title={`Using Capacitor with ${framework.name}`}
        description={`Build iOS, Android, and Progressive Web Apps with ${framework.name}`}
      />
      <SiteHeader />
      <main className={styles.page}>
        <section className={clsx(styles.top, 'ds-container')}>
          <div className="heading-group">
            <Image width={width} height={height} src={src} alt={framework.name + ' logo'} className="react" />
            <h1 className="ds-heading-2">{framework.name} &amp; Capacitor</h1>
            <p className="ds-paragraph-2">Build native mobile apps with web technology and {framework.name}</p>
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

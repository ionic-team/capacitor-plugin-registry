import clsx from 'clsx';
import styles from './index.module.scss';

import Logo from './assets/logo.png';
import Image from 'next/image';

const PlatformBar = () => {
  return (
    <section className={styles.platformBar}>
      <div className="ds-container">
        <div>
          <Image src={Logo} width={Logo.width / 2} height={Logo.height / 2} alt="Capacitor Registry Logo" />
        </div>
        <div className={styles.platformBarCtas}>
          {/* <a className={clsx("ds-paragraph-5", styles.platformBarCtaLink)}>
            Account
          </a> */}
          <a
            href="https://github.com/ionic-team/capacitor-plugin-registry"
            target="_blank"
            rel="noopener noreferrer"
            className={clsx('ds-paragraph-5', styles.platformBarCtaButton)}
          >
            Submit plugin
          </a>
        </div>
      </div>
    </section>
  );
};

export default PlatformBar;

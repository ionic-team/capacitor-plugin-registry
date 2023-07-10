import { clsx } from 'clsx';
import { forwardRef, HTMLAttributes } from 'react';

import LogoLight from '../assets/logo-light.png';
import LogoDark from '../assets/logo-dark.png';
import LogoDiscordLight from '../assets/discord-light.png';
import LogoDiscordDark from '../assets/discord-dark.png';
import LogoGithubLight from '../assets/github-light.png';
import LogoGithubDark from '../assets/github-dark.png';
import LogoTwitterLight from '../assets/twitter-light.png';
import LogoTwitterDark from '../assets/twitter-dark.png';
import LogoTranslationsLight from '../assets/translations-light.png';
import LogoTranslationsDark from '../assets/translations-dark.png';

import Link from 'next/link';
import { useMediaQuery } from 'usehooks-ts';

import Search from './components/search';

import styles from './index.module.scss';
import Image from 'next/image';
import { pascalCase } from 'change-case';
import { GlobalSideHeaderProps } from '..';

const SiteHeaderDesktop = forwardRef<HTMLElement, HTMLAttributes<HTMLElement> & GlobalSideHeaderProps>(
  function SiteHeaderDesktop({ theme = 'light', ...props }, ref) {
    const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

    return (
      <>
        <style jsx global>
          {`
            .DocSearch {
              z-index: 2000;

              font-family: var(--ff-inter);
            }
          `}
        </style>
        <nav
          {...props}
          ref={ref}
          className={clsx(
            'site-header',
            'site-header--desktop',
            props.className,
            styles.header,
            styles[`header${pascalCase(theme)}`],
            {
              [styles.headerReducedMotion]: prefersReducedMotion,
            }
          )}
        >
          <div className={clsx('ds-container', styles.headerContainer)}>
            <div className={styles.headerSkipContent}>
              <a href="#skip-header">Skip to main content</a>
            </div>
            <Link href="/" aria-label="link to home">
              {theme === 'light' ? (
                <Image
                  src={LogoLight.src}
                  width={LogoLight.width / 2}
                  height={LogoLight.height / 2}
                  alt="Capacitor Logo"
                />
              ) : (
                <Image
                  src={LogoDark.src}
                  width={LogoDark.width / 2}
                  height={LogoDark.height / 2}
                  alt="Capacitor Logo"
                />
              )}
            </Link>
            <ul className={styles.headerRoutes}>
              <Search />
              <div className={styles.headerRoutesGroup}>
                <li className={styles.headerLink}>
                  <Link href="/docs">Docs</Link>
                </li>
                <li className={styles.headerLink}>
                  <Link href="/docs/plugins">Plugins</Link>
                </li>
                <li className={styles.headerLink}>
                  <Link href="/docs/cli">CLI</Link>
                </li>
              </div>
              <li className={styles.headerVerticalRule}></li>
              <div className={styles.headerRoutesGroup}>
                <li className={styles.headerLink}>
                  <Link href="/community">Community</Link>
                </li>
                <li className={styles.headerLink}>
                  <Link href="https://ionic.io/blog/tag/capacitor">Blog</Link>
                </li>
                <li className={styles.headerLink}>
                  <Link href="/enterprise">Enterprise</Link>
                </li>
              </div>
              <li className={styles.headerVerticalRule}></li>
              <li className={clsx(styles.headerLink, styles.headerIcon)}>
                <Link href="https://capacitorjs.jp" target="_blank" aria-label="discord link">
                  {theme === 'light' ? (
                    <Image
                      src={LogoTranslationsLight.src}
                      width={LogoTranslationsLight.width / 2}
                      height={LogoTranslationsLight.height / 2}
                      alt="Translations Logo"
                    />
                  ) : (
                    <Image
                      src={LogoTranslationsDark.src}
                      width={LogoTranslationsDark.width / 2}
                      height={LogoTranslationsDark.height / 2}
                      alt="Translations Logo"
                    />
                  )}
                </Link>
              </li>
              <li className={clsx(styles.headerLink, styles.headerIcon)}>
                <Link href="https://twitter.com/capacitorjs" target="_blank" aria-label="twitter link">
                  {theme === 'light' ? (
                    <Image
                      src={LogoTwitterLight.src}
                      width={LogoTwitterLight.width / 2}
                      height={LogoTwitterLight.height / 2}
                      alt="Twitter Logo"
                    />
                  ) : (
                    <Image
                      src={LogoTwitterDark.src}
                      width={LogoTwitterDark.width / 2}
                      height={LogoTwitterDark.height / 2}
                      alt="Twitter Logo"
                    />
                  )}
                </Link>
              </li>
              <li className={clsx(styles.headerLink, styles.headerIcon)}>
                <Link href="https://discord.com/invite/UPYYRhtyzp" target="_blank" aria-label="discord link">
                  {theme === 'light' ? (
                    <Image
                      src={LogoDiscordLight.src}
                      width={LogoDiscordLight.width / 2}
                      height={LogoDiscordLight.height / 2}
                      alt="Discord Logo"
                    />
                  ) : (
                    <Image
                      src={LogoDiscordDark.src}
                      width={LogoDiscordDark.width / 2}
                      height={LogoDiscordDark.height / 2}
                      alt="Discord Logo"
                    />
                  )}
                </Link>
              </li>
              <li className={clsx(styles.headerLink, styles.headerIcon)}>
                <Link passHref href="https://github.com/ionic-team/capacitor" target="_blank" aria-label="github link">
                  {theme === 'light' ? (
                    <Image
                      src={LogoGithubLight.src}
                      width={LogoGithubLight.width / 2}
                      height={LogoGithubLight.height / 2}
                      alt="Github Logo"
                    />
                  ) : (
                    <Image
                      src={LogoGithubDark.src}
                      width={LogoGithubDark.width / 2}
                      height={LogoGithubDark.height / 2}
                      alt="Github Logo"
                    />
                  )}
                </Link>
              </li>
            </ul>
          </div>
          <div id="skip-header"></div>
        </nav>
      </>
    );
  }
);

export default SiteHeaderDesktop;

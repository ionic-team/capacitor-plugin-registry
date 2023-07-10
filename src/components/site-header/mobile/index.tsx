import CloseIcon from '../assets/icon-close.svg';

import { clsx } from 'clsx';
import Link from 'next/link';
import { HTMLAttributes, forwardRef, useCallback, useEffect, useState } from 'react';
import MenuItemExpander from './components/menu-item-expander';
import { useWindowSize } from 'usehooks-ts';

import LogoLight from '../assets/logo-light.png';
import LogoDark from '../assets/logo-dark.png';

import styles from './index.module.scss';
import Image from 'next/image';

import Button from '../../old/Button';
import { GlobalSideHeaderProps } from '..';

//TODO: Fix props any type
const SiteHeaderMobile = forwardRef<HTMLElement, HTMLAttributes<HTMLElement> & GlobalSideHeaderProps>(
  function SiteHeaderModile({ theme = 'light', ...props }, ref) {
    const [open, setOpen] = useState(false);
    const [shouldLoadMenu, setShouldLoadMenu] = useState(false);
    const { width } = useWindowSize();

    useEffect(() => {
      open ? document.body.classList.add('no-scroll') : document.body.classList.remove('no-scroll');

      () => document.body.classList.remove('no-scroll');
    }, [open]);

    useEffect(() => {
      setOpen(false);
      document.body.classList.remove('no-scroll');
    }, [width]);

    const connectedCallback = useCallback((e: HTMLElement | null) => {
      e?.classList.add('open');
    }, []);

    return (
      <nav
        {...props}
        ref={ref}
        className={clsx(props.className, 'site-header', 'site-header--mobile', styles.header, {
          [styles.headerOpen]: open,
        })}
      >
        <div className="ds-container site-header__container">
          <Link href="/" className="site-header__logo" aria-label="ionic logo">
            {theme === 'light' ? (
              <Image
                src={LogoLight.src}
                width={LogoLight.width / 2}
                height={LogoLight.height / 2}
                alt="Capacitor Logo"
              />
            ) : (
              <Image src={LogoDark.src} width={LogoDark.width / 2} height={LogoDark.height / 2} alt="Capacitor Logo" />
            )}
          </Link>
          <button
            aria-label="Open Mobile Menu"
            className="site-header__expand-button"
            onClick={() => {
              setShouldLoadMenu(true);
              setOpen(true);
            }}
          >
            ⋮
          </button>
        </div>
        {shouldLoadMenu && (
          <div ref={connectedCallback} className={clsx('site-header__menu', { open })}>
            <button aria-label="Close mobile Menu" onClick={() => setOpen(false)} className="site-header__close-button">
              <CloseIcon />
            </button>

            <div className="site-header__menu-container">
              <div className="site-header__menu-wrapper">
                <div className="site-header__menu-section">
                  <MenuItemExpander>
                    <h3>Docs</h3>
                    <ul>
                      <li>
                        <Link href="/docs">Docs</Link>
                      </li>
                      <li>
                        <Link href="/docs/plugins">Plugins</Link>
                      </li>
                      <li>
                        <Link href="/docs/cli">CLI</Link>
                      </li>
                    </ul>
                  </MenuItemExpander>
                </div>
                <div className="site-header__menu-section">
                  <MenuItemExpander>
                    <h3>Resources</h3>
                    <ul>
                      <li>
                        <Link href="/community">Community</Link>
                      </li>
                      <li>
                        <Link href="https://ionic.io/blog/tag/capacitor">Blog</Link>
                      </li>
                      <li>
                        <Link href="/enterprise">Enterprise</Link>
                      </li>
                    </ul>
                  </MenuItemExpander>
                </div>
              </div>
              <div className="site-header__drawer">
                <div className="site-header__drawer-end">
                  <Link href="/login" className="link">
                    Log in
                  </Link>
                  <Link passHref href="/signup" legacyBehavior>
                    <Button kind="round" size="md">
                      Sign up →
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    );
  }
);

export default SiteHeaderMobile;

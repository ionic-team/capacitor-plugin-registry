import { Column, Grid, HubspotForm } from "@ionic-internal/components-react";

import styles from "./index.module.scss";
import clsx from "clsx";

import Logo from "./assets/logo.png";
import Image from "next/image";

const SiteFooter = () => {
  return (
    <footer className={clsx(styles.footer, "site-footer")}>
      <div className="ds-container">
        <div className="newsletter">
          <div>
            <h4>Join our Newsletter</h4>
            <p className="ds-paragraph-4">
              Keep up to date with all the latest Capacitor news and updates
            </p>
          </div>
          <HubspotForm
            createProps={{ formId: "c8d355e3-a5ad-4f91-a2c0-c9dc93e10658" }}
          />
        </div>
        <Grid rowGap={2}>
          <Column cols={[12, 4, 6, 6, 6]} className="copyright">
            <Image
              src={Logo}
              alt="Capacitor Logo"
              className="logo"
              width={Logo.width / 2}
              height={Logo.height / 2}
            />
            <p className="ds-paragraph-4">
              © {new Date().getFullYear()} Capacitor
            </p>
            <p className="ds-paragraph-4">
              <a href="https://ionic.io">Ionic Open Source</a> | Released under{" "}
              <span id="mit">MIT License</span>
            </p>
          </Column>
          <Column cols={[12, 8, 6, 6, 6]}>
            <Grid rowGap={2} className="routes-group">
              <Column cols={[12, 4, 4, 4, 4]}>
                <h5>Developers</h5>
                <ul className="routes">
                  <li>
                    <a
                      className="ds-paragraph-4 link"
                      href="/docs/getting-started"
                    >
                      Install
                    </a>
                  </li>
                  <li>
                    <a className="ds-paragraph-4 link" href="/docs">
                      Docs
                    </a>
                  </li>
                  <li>
                    <a className="ds-paragraph-4 link" href="/docs/apis">
                      Plugins
                    </a>
                  </li>
                </ul>
              </Column>
              <Column cols={[12, 4, 4, 4, 4]}>
                <h5>Resources</h5>
                <ul className="routes">
                  <li>
                    <a className="ds-paragraph-4 link" href="/community">
                      Community
                    </a>
                  </li>
                  <li>
                    <a
                      className="ds-paragraph-4 link"
                      href="https://ionic.io/blog/tag/capacitor"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      className="ds-paragraph-4 link"
                      href="https://github.com/ionic-team/capacitor/discussions"
                    >
                      Discussions
                    </a>
                  </li>
                </ul>
              </Column>
              <Column cols={[12, 4, 4, 4, 4]}>
                <h5>Connect</h5>
                <ul className="routes">
                  <li>
                    <a
                      className="ds-paragraph-4 link"
                      href="https://github.com/ionic-team/capacitor"
                    >
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a
                      className="ds-paragraph-4 link"
                      href="https://twitter.com/capacitorjs"
                    >
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a className="ds-paragraph-4 link" href="https://ionic.io">
                      Ionic
                    </a>
                  </li>
                </ul>
              </Column>
            </Grid>
          </Column>
        </Grid>
      </div>
    </footer>
  );
};

export default SiteFooter;

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
        <Grid>
          <Column cols={[12, 4, 6, 6, 6]} className="copyright">
            <Image
              src={Logo}
              alt="Capacitor Logo"
              className="logo"
              width={Logo.width / 2}
              height={Logo.height / 2}
            />
            <p>© {new Date().getFullYear()} Capacitor</p>
            <p>
              <a href="https://ionic.io">Ionic Open Source</a> | Released under{" "}
              <span id="mit">MIT License</span>
            </p>
          </Column>
          <Column cols={[12, 8, 6, 6, 6]}>
            <div className="routes-group">
              <div>
                <h5>Developers</h5>
                <ul className="routes">
                  <li>
                    <a className="ui-paragraph-4" href="/docs/getting-started">
                      Install
                    </a>
                  </li>
                  <li>
                    <a className="ui-paragraph-4" href="/docs">
                      Docs
                    </a>
                  </li>
                  <li>
                    <a className="ui-paragraph-4" href="/docs/apis">
                      Plugins
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h5>Resources</h5>
                <ul className="routes">
                  <li>
                    <a className="ui-paragraph-4" href="/community">
                      Community
                    </a>
                  </li>
                  <li>
                    <a
                      className="ui-paragraph-4"
                      href="https://ionic.io/blog/tag/capacitor"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      className="ui-paragraph-4"
                      href="https://github.com/ionic-team/capacitor/discussions"
                    >
                      Discussions
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h5>Connect</h5>
                <ul className="routes">
                  <li>
                    <a
                      className="ui-paragraph-4"
                      href="https://github.com/ionic-team/capacitor"
                    >
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a
                      className="ui-paragraph-4"
                      href="https://twitter.com/capacitorjs"
                    >
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a className="ui-paragraph-4" href="https://ionic.io">
                      Ionic
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </Column>
        </Grid>
      </div>
    </footer>
  );
};

export default SiteFooter;

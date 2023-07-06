import { HubspotForm } from "@ionic-internal/components-react";
import clsx from "clsx";

import styles from "./index.module.scss";

const NewsletterSignup = () => {
  return (
    <section
      className={clsx(styles.newsletter, "newsletter-signup", "ds-container")}
      id="newsletter"
    >
      <div className="wrapper">
        <div className="heading-group">
          <h3>The latest updates. Delivered monthly.</h3>
          <p>
            Capacitor is getting better every day. Sign up for a monthly email
            on the latest updates, releases, articles, and news!
          </p>
        </div>
        <div className="form-group">
          <HubspotForm
            createProps={{ formId: "c8d355e3-a5ad-4f91-a2c0-c9dc93e10658" }}
          />
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;

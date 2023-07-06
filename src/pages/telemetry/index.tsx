import clsx from "clsx";

import styles from "./index.module.scss";
import Prefooter from "@components/prefooter";
import SiteFooter from "@components/site-footer";
import { HighlightedCode } from "@ionic-internal/components-react";

const TelemetryPage = () => {
  return (
    <>
      <main className={styles.page}>
        <Telemetry />
        <Prefooter />
      </main>
      <SiteFooter />
    </>
  );
};

const Telemetry = () => (
  <section className={clsx(styles.telemetry, "ds-container")}>
    <h1>Telemetry</h1>
    <p>
      Capacitor collects anonymous telemetry data about general usage. This is
      an opt-in program that provides insight to the Capacitor team to help
      improve the product. By opting in, you will be able to provide valuable
      insights that could shape the future of the product.
    </p>
    <p>
      You will be asked after the Capacitor CLI successfully finishes its first
      command if you would like to enter the program. If you opt out, telemetry
      data will not be collected and you will not be asked again.
    </p>

    <h3>Why?</h3>
    <p>
      Anonymous usage data allows the team to gain insight into how Capacitor is
      being used. With this information, we can better prioritize fixes and
      features. It also provides the team with a better understanding of the
      developer experience.
    </p>

    <h3> What is Collected?</h3>
    <p>Usage data is entirely anonymous and will only include the following:</p>
    <ul>
      <li>Timestamp</li>
      <li>Command name, arguments, and selected flags</li>
      <li>Command duration</li>
      <li>Error message (if the command failed, no stacktrace included)</li>
      <li>Capacitor machine ID (anonymous, generated ID)</li>
      <li>Project ID (anonymous, generated ID)</li>
      <li>Your operating system (Mac, Linux, Windows)</li>
      <li>
        Versions of: NodeJS, Capacitor CLI, core, and official platforms and
        plugins
      </li>
    </ul>

    <h3>How to opt in or out</h3>
    <p>
      You may opt out at any time from the program by running{" "}
      <code className="sc-docs-component">npx cap telemetry off</code> in the
      root of your project:
    </p>
    <pre>
      <HighlightedCode
        language="shell-session"
        code={`
        npx cap telemetry off
        `}
      />
    </pre>
    <p>
      You can check the status by running the following command in the root of
      your project:
    </p>
    <pre>
      <HighlightedCode
        language="shell-session"
        code={`
        npx cap telemetry
        `}
      />
    </pre>
    <p>
      If you would like to rejoin the program and provide telemetry on your
      project then run the following command:
    </p>
    <pre>
      <HighlightedCode
        language="shell-session"
        code={`
        npx cap telemetry on
        `}
      />
    </pre>
  </section>
);

export default TelemetryPage;

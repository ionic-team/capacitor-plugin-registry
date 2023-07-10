import { HighlightedCode } from "@ionic-internal/components-react";
import SolutionPageLayout from "../components/layout";

import SvelteImage from "./assets/logo.png";

import LogoApple from "../assets/apple.png";
import LogoAndroid from "../assets/android.png";
import Image from "next/image";

import nightOwl from "prism-react-renderer/themes/nightOwl";

const framework = {
  id: "svelte",
  name: "Svelte",
  theme: "#FF3D00",
  logo: SvelteImage,
};

const SolutionSveltePage = () => {
  return (
    <SolutionPageLayout framework={framework}>
      <section className="ds-container" id="getting-started">
        <article className="step">
          <div className="number">01</div>
          <div className="heading-group">
            <h3 id="install">Install Capacitor.</h3>
            <p>
              Add Capacitor to your project and create a config for your app
            </p>
          </div>
          <div className="code-panel">
            <pre>
              <HighlightedCode
                theme={nightOwl}
                language="shell-session"
                code={`npm install @capacitor/core @capacitor/cli
npx cap init [name] [id]`}
              />
            </pre>
          </div>
        </article>

        <article className="step">
          <div className="number">02</div>
          <div className="heading-group">
            <h3>Build the Web App.</h3>
            <p>
              The compiled web assets will be copied into each Capacitor native
              platform during the next step.
            </p>
          </div>
          <div className="code-panel">
            <pre>
              <pre>
                <HighlightedCode
                  theme={nightOwl}
                  language="shell-session"
                  code={`npm run build`}
                />
              </pre>
            </pre>
          </div>
        </article>

        <article className="step">
          <div className="number">03</div>
          <div className="heading-group">
            <h3>Install the native platforms you want to target.</h3>
            <div className="platforms">
              <Image
                src={LogoApple}
                width={LogoApple.width / 2}
                height={LogoApple.height / 2}
                alt="Apple logo"
              />
              <Image
                src={LogoAndroid}
                width={LogoAndroid.width / 4}
                height={LogoAndroid.height / 4}
                alt="Android logo"
              />
            </div>
            <p>
              Capacitor's native projects exist in their own top-level folders
              and should be considered part of your app (check them into source
              control).
            </p>
          </div>
          <div className="code-panel">
            <pre>
              <HighlightedCode
                theme={nightOwl}
                language="shell-session"
                code={`npm i @capacitor/ios @capacitor/android
npx cap add android
npx cap add ios`}
              />
            </pre>
          </div>
        </article>

        <article className="step">
          <div className="number">04</div>
          <div className="heading-group">
            <h3>Adding calls to Native APIs</h3>
            <p>
              With Capacitor installed, adding calls to native device features
              is as straight forward as calling other JavaScript methods
            </p>
          </div>
          <div className="code-panel">
            <pre>
              <HighlightedCode
                theme={nightOwl}
                language="markup"
                code={`<script>
  import { Geolocation } from '@capacitor/geolocation';

  let loc = null;
  async function getCurrentPosition(){
    const res = await Geolocation.getCurrentPosition()
    loc = res
  }
</script>

<div>
  <h1>Geolocation</h1>
  <p>Your location is:</p>
  <p>Latitude: {loc?.coords.latitude}</p>
  <p>Longitude: {loc?.coords.longitude}</p>

  <button on:click={getCurrentPosition}>
    Get Current Location
  </button>
</div>`}
              />
            </pre>
          </div>
        </article>
      </section>
      <section id="continue">
        <div className="ds-container">
          <h3>Continue your Capacitor Journey.</h3>
          <p>
            This is only the beginning. Learn more about the Capacitor{" "}
            <a href="/docs/basics/workflow" target="_blank">
              development workflow
            </a>{" "}
            or using more{" "}
            <a href="/docs/apis" target="_blank">
              {" "}
              native APIs
            </a>{" "}
            .
          </p>
        </div>
      </section>
    </SolutionPageLayout>
  );
};

export default SolutionSveltePage;

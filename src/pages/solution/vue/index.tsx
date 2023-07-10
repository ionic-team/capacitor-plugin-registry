import { HighlightedCode } from "@ionic-internal/components-react";
import SolutionPageLayout from "../components/layout";

import VueImage from "./assets/logo.png";

import LogoApple from "../assets/apple.png";
import LogoAndroid from "../assets/android.png";
import Image from "next/image";

import nightOwl from "prism-react-renderer/themes/nightOwl";

const framework = {
  id: "vue",
  name: "Vue",
  theme: "#42b983",
  logo: VueImage,
};

const SolutionVuePage = () => {
  return (
    <SolutionPageLayout framework={framework}>
      <section className="ds-container" id="getting-started">
        <article className="step">
          <div className="number">01</div>
          <div className="heading-group">
            <h3>Install Capacitor.</h3>
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
npx cap init [name] [id] --web-dir=dist`}
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
              <HighlightedCode
                theme={nightOwl}
                language="shell-session"
                code={`npm run build`}
              />
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
                code={`<template>
<div>
  <h1>Geolocation</h1>
  <p>Your location is:</p>
  <p>Latitude: {{ loc.lat }}</p>
  <p>Longitude: {{ loc.long }}</p>

  <button @click="getCurrentPosition">
    Get Current Location
  </button>
</div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { Geolocation } from '@capacitor/geolocation';
export default defineComponent({
  setup() {
    const loc = ref<{
      lat: null | number;
      long: null | number;
    }>({
      lat: null,
      long: null,
    });

    const getCurrentPosition = async () => {
      const pos = await Geolocation.getCurrentPosition();
      loc.value = {
        lat: pos.coords.latitude,
        long: pos.coords.longitude,
      };
    };
    return { getCurrentPosition, loc };
  },
});
</script>`}
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

export default SolutionVuePage;

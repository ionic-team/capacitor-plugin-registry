import Prefooter from '@components/prefooter';
import NewsletterSignup from '@components/newsletter-signup';
import clsx from 'clsx';
import { createContext, useState } from 'react';
import SiteFooter from '@components/site-footer';

import styles from './index.module.scss';
import { HighlightedCode } from '@ionic-internal/components-react';

import LogoApple from './assets/apple.png';
import LogoAndroid from './assets/android.png';
import Image from 'next/image';
import CodeTabs from '@components/code-tabs';
import SiteHeader from '@components/site-header';
import SiteMeta from '@components/site-meta';

import nightOwl from 'prism-react-renderer/themes/nightOwl';

const CordovaPageContext = createContext<{
  selectedCodeTab: string;
} | null>(null);

const CordovaPage = () => {
  const [selectedCodeTab, setSetSelectedCodeTab] = useState('before');

  return (
    <>
      <SiteMeta title="Cordova to Capacitor Migration" description="A step by step guide to migrating your app" />
      <SiteHeader />
      <CordovaPageContext.Provider value={{ selectedCodeTab }}>
        <main className={styles.page}>
          <Top />
          <GettingStarted />
          {/* <MoreResources /> */}
          <NewsletterSignup />
          <Prefooter />
        </main>
      </CordovaPageContext.Provider>{' '}
      <SiteFooter />
    </>
  );
};

const Top = () => (
  <section className={clsx(styles.top, 'ds-container')}>
    <div className="heading-group">
      <h1 className="ds-heading-2">Cordova to Capacitor Migration</h1>
      <p className="ds-paragraph-2">A modern development experience and 99% backward-compatibility with Cordova.</p>
      {/* <Button anchor href="#code-branch" id="get-started">
          Get Started
        </Button> */}
    </div>
  </section>
);

const GettingStarted = () => (
  <section className={clsx(styles.gettingStarted, 'ds-container')}>
    <article className="step">
      <div className="number">01</div>
      <div className="heading-group">
        <h3 id="code-branch">Create a new code branch.</h3>
        <p>Recommended, but not required.</p>
      </div>
      <div className="code-panel">
        <pre>
          <HighlightedCode
            theme={nightOwl}
            language="shell-session"
            code={`cd my-app
git checkout -b cap-migration`}
          />
        </pre>
      </div>
    </article>
    <article className="step">
      <div className="number">02</div>
      <div className="heading-group">
        <h3>Install Capacitor.</h3>
        <p>Create the Capacitor app using the Cordova app's name and id found in `config.xml`.</p>
      </div>
      <div className="code-panel">
        <pre>
          <HighlightedCode
            theme={nightOwl}
            language="shell-session"
            code={`npm install @capacitor/cli @capacitor/core
npx cap init [name] [id]`}
          />
        </pre>
      </div>
    </article>
    <article className="step">
      <div className="number">03</div>
      <div className="heading-group">
        <h3>Build the Web App.</h3>
        <p>The compiled web assets will be copied into each Capacitor native platform during the next step.</p>
      </div>
      <div className="code-panel">
        <pre>
          <HighlightedCode
            theme={nightOwl}
            language="shell-session"
            code={`# Most web apps
npm run build

# Ionic app
ionic build`}
          />
        </pre>
      </div>
    </article>
    <article className="step">
      <div className="number">04</div>
      <div className="heading-group">
        <h3>Install the native platforms you want to target.</h3>
        <div className="platforms">
          <Image src={LogoApple} width={LogoApple.width / 2} height={LogoApple.height / 2} alt="Apple logo" />
          <Image src={LogoAndroid} width={LogoAndroid.width / 4} height={LogoAndroid.height / 4} alt="Android logo" />
        </div>
        <p>
          Capacitor native projects exist in their own top-level folders and should be considered part of your app
          (check them into source control). Any existing Cordova plugins are automatically installed into each native
          project. 🎉
        </p>
      </div>
      <div className="code-panel">
        <pre>
          <HighlightedCode
            theme={nightOwl}
            language="shell-session"
            code={`npx cap add android
npx cap add ios`}
          />
        </pre>
      </div>
    </article>
    <article className="step">
      <div className="number">05</div>
      <div className="heading-group">
        <h3>Recreate Splash Screens and Icons.</h3>
        <p>
          Reuse the existing splash screen/icon images, located in the top-level `resources` folder of your Cordova
          project, using the `cordova-res` tool. Images are copied into each native project.
        </p>
      </div>
      <div className="code-panel">
        <pre>
          <HighlightedCode
            theme={nightOwl}
            language="shell-session"
            code={`npm install -g cordova-res

cordova-res ios --skip-config --copy
cordova-res android --skip-config --copy`}
          />
        </pre>
      </div>
    </article>
    <article className="step">
      <div className="number">06</div>
      <div className="heading-group">
        <h3>Audit existing Cordova plugins.</h3>
        <p>
          Review all of Capacitor's{' '}
          <a href="/docs/apis" target="_blank">
            core
          </a>{' '}
          and{' '}
          <a href="/docs/plugins/community" target="_blank">
            community
          </a>{' '}
          plugins. You may be able to switch to the Capacitor-equivalent Cordova plugin, such as the Camera.
        </p>
        <p>Remove unneeded ones to improve performance and reduce app size.</p>
      </div>
      <div className="code-panel">
        <CodeTabs
          theme={nightOwl}
          data={{
            tabs: ['Cordova Camera', 'Capacitor Camera'],
            languages: ['typescript'],
            code: [
              `import { Camera } from '@ionic-native/camera/ngx';

constructor(private camera: Camera) {}

const photo = await this.camera.getPicture({
  quality: 100,
  destinationType: this.camera.DestinationType.FILE_URI,
  allowEdit: true,
  saveToPhotoAlbum: true
});
`, //----------------------------------
              `import { Camera } from '@capacitor/camera';

const photo = await Camera.getPhoto({
  quality: 100,
  resultType: CameraResultType.Uri,
  allowEditing: true,
  saveToGallery: true
});
`,
            ],
          }}
        />
      </div>
    </article>
    <article className="step">
      <div className="number">07</div>
      <div className="heading-group">
        <h3>Remove Cordova from your project.</h3>
        <p>After successful migration testing, Cordova can be removed from the project.</p>
      </div>
      <div className="code-panel">
        <pre>
          <HighlightedCode
            theme={nightOwl}
            language="shell-session"
            code={`# Remove a Cordova plugin
npm uninstall cordova-plugin-name
npx cap sync

# Delete Cordova folders and files
rm config.xml
rm -R platforms/
rm -R plugins/`}
          />
        </pre>
      </div>
    </article>
    <article className="step">
      <div className="number">08</div>
      <div className="heading-group">
        <h3>Continue your Capacitor Journey.</h3>
        <p>
          This is only the beginning. Learn more about <a href="/docs/plugins/cordova">using Cordova plugins</a> in a
          Capacitor project, check out the Capacitor <a href="/docs/basics/workflow">development workflow</a>, or create
          your own <a href="/docs/plugins">native plugin</a>.
        </p>
      </div>
      <div className="code-panel">
        <pre>
          <HighlightedCode
            theme={nightOwl}
            language="shell-session"
            code={`# Install a Cordova plugin
npm install cordova-plugin-name
npx cap sync

# Create a custom plugin
npm init @capacitor/plugin`}
          />
        </pre>
      </div>
    </article>
  </section>
);

const MoreResources = () => (
  <section id="more-resources">
    <div className="heading-group">
      <h3>More Resources</h3>
      <p>
        Explore these resources to learn more about Capacitor
        <br />
        and make your Cordova migration easier.
      </p>
    </div>
    {/* <more-resources
      resourceData={[
        {
          uid: "capacitor-vs-cordova-modern-hybrid-app-development",
          type: "article",
        },
        { uid: "capacitor-2-launch", type: "webinar" },
        {
          uid: "migrating-from-phonegap-build-to-ionic-appflow",
          type: "blog",
        },
        {
          uid: "thanks-to-capacitor-ive-fallen-in-love-with-mobile-again",
          type: "blog",
        },
        { uid: "the-modern-hybrid-app-developer", type: "blog" },
      ]}
      routing={{
        base: "https://ionicframework.com/resources",
      }}
    /> */}
  </section>
);

export default CordovaPage;

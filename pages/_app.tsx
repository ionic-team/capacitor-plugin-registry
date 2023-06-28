import type { AppProps } from "next/app";

import "modern-normalize/modern-normalize.css";
import "@ionic-internal/design-system/dist/reset/index.css";
import "@ionic-internal/design-system/dist/tokens/index.css";
import "@styles/ds.css";

import "@styles/global.css";

import { clsx } from "clsx";

import { inter, robotoMono } from "@assets/fonts";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div
      className={clsx(
        "font-root",
        inter.className,
        inter.variable,
        robotoMono.variable
      )}
    >
      <Component {...pageProps} />
    </div>
  );
}

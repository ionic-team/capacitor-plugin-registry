import type { AppProps } from "next/app";

import "modern-normalize/modern-normalize.css";
import "@ionic-internal/design-system/dist/reset/index.css";
import "@ionic-internal/design-system/dist/tokens/index.css";
import "@/styles/ds.css";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

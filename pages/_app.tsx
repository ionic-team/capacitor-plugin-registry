import '@styles/global.css';

import type { AppProps } from 'next/app';

import clsx from 'clsx';

import { inter, robotoMono } from '@assets/fonts';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={clsx('font-root', inter.className, inter.variable, robotoMono.variable)}>
      <Component {...pageProps} />
    </div>
  );
}

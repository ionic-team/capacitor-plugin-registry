import { Roboto_Mono } from 'next/font/google';
import localFont from 'next/font/local';

const inter = localFont({
  src: './inter/inter-var.woff2',
  fallback: ['-apple-system', 'BlinkMacSystemFont', 'Roboto', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
  weight: '1 1000',
  variable: '--ff-inter',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  fallback: ['Courier New', 'Courier', 'monospace'],
  variable: '--ff-roboto-mono',
});

export { inter, robotoMono };

const { images, webpack } = require("@ionic-internal/config-next");
const bundle = require("@next/bundle-analyzer");

const withBundleAnalyzer = bundle({
  enabled: process.env.ANALYZE === "true",
});

const STAGING = [{ type: "host", value: "staging.capacitorjs.com" }];
const PRODUCTION = [{ type: "host", value: "capacitorjs.com" }];

const securityHeaders = [
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
];

/** @type {import('next').NextConfig} */
module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: [
    "@ionic-internal/components-next",
    "@ionic-internal/components-react",
  ],
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex",
          },
        ],
        has: STAGING,
      },
    ];
  },

  images,
  webpack,
});

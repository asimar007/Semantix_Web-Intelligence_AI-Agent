/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: [
      "puppeteer", // changed from puppeteer-core
      "chromadb",
      "@chroma-core/default-embed",
    ],
    outputFileTracingExcludes: {
      "*": [
        "node_modules/@swc/core-linux-x64-gnu",
        "node_modules/@swc/core-linux-x64-musl",
        "node_modules/@esbuild/linux-x64",
        "node_modules/puppeteer/.local-chromium/**/*", // correct for puppeteer
      ],
    },
  },

  webpack: (config, { isServer, dev }) => {
    if (isServer && !dev) {
      config.externals.push(
        "puppeteer", // changed from puppeteer-core
        "chromadb",
        "@chroma-core/default-embed"
      );
    }

    config.resolve.alias = {
      ...config.resolve.alias,
      puppeteer$: "puppeteer", // changed from puppeteer-core
    };

    return config;
  },

  output: "standalone",
  productionBrowserSourceMaps: false,
  images: {
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60,
  },
  compress: true,
  optimizeFonts: true,
  swcMinify: true,
};

export default nextConfig;

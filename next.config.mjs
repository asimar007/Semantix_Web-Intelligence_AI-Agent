/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize bundle size
  experimental: {
    serverComponentsExternalPackages: [
      "puppeteer",
      "puppeteer-core",
      "chromadb",
      "@chroma-core/default-embed",
      "cheerio",
      "axios",
    ],
    outputFileTracingExcludes: {
      "*": [
        "node_modules/@swc/core-linux-x64-gnu",
        "node_modules/@swc/core-linux-x64-musl",
        "node_modules/@esbuild/linux-x64",
        "node_modules/puppeteer/.local-chromium/**/*",
        "node_modules/puppeteer-core/.local-chromium/**/*",
      ],
    },
  },

  // Webpack optimizations
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Exclude heavy packages from client bundle
      config.externals.push({
        puppeteer: "commonjs puppeteer",
        "puppeteer-core": "commonjs puppeteer-core",
        chromadb: "commonjs chromadb",
        cheerio: "commonjs cheerio",
      });
    }

    // Optimize bundle size
    config.resolve.alias = {
      ...config.resolve.alias,
      puppeteer$: "puppeteer-core",
    };

    return config;
  },

  // Output optimization
  output: "standalone",

  // Disable source maps in production
  productionBrowserSourceMaps: false,

  // Optimize images
  images: {
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60,
  },

  // Compress responses
  compress: true,

  // Optimize fonts
  optimizeFonts: true,
};

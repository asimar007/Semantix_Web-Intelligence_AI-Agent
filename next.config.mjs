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
      "@google/genai",
      "@langchain/textsplitters",
    ],
    outputFileTracingExcludes: {
      "*": [
        "node_modules/@swc/core-linux-x64-gnu",
        "node_modules/@swc/core-linux-x64-musl",
        "node_modules/@esbuild/linux-x64",
        "node_modules/puppeteer/.local-chromium/**/*",
        "node_modules/puppeteer-core/.local-chromium/**/*",
        "node_modules/chromadb/dist/**/*",
        "node_modules/@google/genai/dist/**/*",
        "node_modules/@langchain/**/*",
        "node_modules/axios/dist/**/*",
        "node_modules/cheerio/dist/**/*",
      ],
    },
  },

  // Webpack optimizations
  webpack: (config, { isServer, dev }) => {
    if (isServer && !dev) {
      // More aggressive externalization
      config.externals.push(
        "puppeteer",
        "puppeteer-core",
        "chromadb",
        "@chroma-core/default-embed",
        "cheerio",
        "@google/genai",
        "@langchain/textsplitters",
        "axios"
      );
    }

    // Optimize bundle size
    config.resolve.alias = {
      ...config.resolve.alias,
      puppeteer$: "puppeteer-core",
    };

    // Ignore large files
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
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

  // Reduce bundle size
  swcMinify: true,
};

export default nextConfig;

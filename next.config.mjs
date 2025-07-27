/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize bundle size
  experimental: {
    serverComponentsExternalPackages: [
      "puppeteer",
      "chromadb",
      "@chroma-core/default-embed",
    ],
    outputFileTracingExcludes: {
      "*": [
        "node_modules/@swc/core-linux-x64-gnu",
        "node_modules/@swc/core-linux-x64-musl",
        "node_modules/@esbuild/linux-x64",
        "node_modules/puppeteer/.local-chromium/**/*",
      ],
    },
  },

  // Webpack optimizations
  webpack: (config, { isServer, dev }) => {
    if (isServer && !dev) {
      // Only externalize the heaviest packages that cause issues
      config.externals.push(
        "puppeteer",
        "chromadb",
        "@chroma-core/default-embed"
      );
    }

    // Optimize bundle size
    config.resolve.alias = {
      ...config.resolve.alias,
      puppeteer$: "puppeteer",
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

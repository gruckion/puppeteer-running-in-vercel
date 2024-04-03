/** @type {import('next').NextConfig} */
let nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['puppeteer-core', '@sparticuz/chromium'],
  }
};

if (process.env.ANALYZE === "true") {
  const withBundleAnalyzer = await import("@next/bundle-analyzer").then(mod => mod.default);

  nextConfig = withBundleAnalyzer({
    enabled: true
  })(nextConfig);
}

export default nextConfig;

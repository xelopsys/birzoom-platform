/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    // providing the locales supported by your application
    locales: ["en", "uz"],
    //  default locale used when the non-locale paths are visited
    defaultLocale: "en",
  },
  images: {
    domains: ['john-mohamed.com'],
  },

}

module.exports = nextConfig

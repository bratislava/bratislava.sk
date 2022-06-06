// TODO use @ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
const fs = require('fs')
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  i18n: {
    defaultLocale: 'sk',
    locales: ['en', 'sk'],
    serializeConfig: false,
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  images: {
    domains: ['localhost'], // TODO will need fixing before deployment
  },
  reactStrictMode: true,
  async rewrites() {
    return {
      beforeFiles: [
        // Graphql Proxy
        {
          source: '/graphql',
          destination: `http://${process.env.STRAPI_URL}/graphql`,
        },
        // Media proxy for getting media from Strapi
        {
          source: '/uploads/:file',
          destination: `http://${process.env.STRAPI_URL}/uploads/:file`,
        },
        /**
         * Rewrites to make the the translation of URL work. Based on an approached outlined here:
         * https://stackoverflow.com/questions/68723485/how-to-setup-i18n-translated-url-routes-in-next-js/68731057#68731057
         */
        {
          source: '/visit-us',
          destination: '/navstivte',
        },
        {
          source: '/exhibitions',
          destination: '/vystavy',
        },
        {
          source: '/about-gallery',
          destination: '/o-galerii',
        },
        {
          source: '/explore',
          destination: '/objavujte',
        },
        {
          source: '/get-involved',
          destination: '/zapoj-sa',
        },
        {
          source: '/collections',
          destination: '/zbierky',
        },
        {
          source: '/tickets/:event',
          destination: '/vstupenky/:event',
        },
        {
          source: '/disclosure-of-information',
          destination: '/zverejnovanie-informacii',
        },
      ],
    }
  },
  serverRuntimeConfig: {
    strapiUrl: process.env.STRAPI_URL,
  },
}

module.exports = (phase, { defaultConfig }) => {
  return {
    ...defaultConfig,
    ...nextConfig,
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      })

      return config
    },
  }
}

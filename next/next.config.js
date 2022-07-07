// TODO use @ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
const fs = require('fs')
const { i18n } = require('./next-i18next.config')
const { withSentryConfig } = require('@sentry/nextjs')

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  i18n,
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  images: {
    domains: ['localhost'], // TODO will need fixing before deployment
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: false,
  },
  reactStrictMode: true,
  async rewrites() {
    return {
      beforeFiles: [
        // Graphql Proxy
        {
          source: '/graphql',
          destination: `${process.env.STRAPI_URL}/graphql`,
        },
        // Media proxy for getting media from Strapi
        {
          source: '/uploads/:file',
          destination: `${process.env.STRAPI_URL}/uploads/:file`,
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
        {
          source: '/search',
          destination: '/vyhladavanie',
        },
        {
          source: '/city-of-bratislava/transparent-city/official-noticeboard',
          destination: '/mesto-bratislava/transparentne-mesto/uradna-tabula',
        },
      ],
    }
  },
  serverRuntimeConfig: {
    strapiUrl: process.env.STRAPI_URL,
  },
}
const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
}

const moduleExports = (phase, { defaultConfig }) => {
  // Assign phase to modify on-demand revalidation part
  nextConfig.serverRuntimeConfig['phase'] = phase

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
// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions)

const { withPlausibleProxy } = require('next-plausible')
const i18nextConfig = require('./next-i18next.config.js')

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  i18n: i18nextConfig.i18n,
  reactStrictMode: true,
  output: 'standalone',
  images: {
    qualities: [75, 100],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'cdn-api.bratislava.sk',
      },
      {
        protocol: 'https',
        hostname: '*.s3.bratislava.sk',
      },
      {
        protocol: 'https',
        hostname: 'api.tootoot.co',
        pathname: '/api/event/*/images/*/*/*/(AUTO|WIDTH|HEIGHT|MINSIDE)',
      },
    ],
  },
  async rewrites() {
    return {
      beforeFiles: [
        // Graphql Proxy
        {
          source: '/graphql',
          destination: `${process.env.NEXT_PUBLIC_STRAPI_URL}/graphql`,
        },
        // Media proxy for getting media from Strapi
        {
          source: '/uploads/:file',
          destination: `${process.env.NEXT_PUBLIC_STRAPI_URL}/uploads/:file`,
        },
        /**
         * Rewrites to make the translation of URL work. Based on an approach outlined here:
         * https://stackoverflow.com/questions/68723485/how-to-setup-i18n-translated-url-routes-in-next-js/68731057#68731057
         */
        {
          source: '/search',
          destination: '/vyhladavanie',
        },
      ],
    }
  },
  // Always add new redirects at the end of the array with a comment why it is needed
  async redirects() {
    return [
      {
        source: '/robots.txt',
        destination: '/api/robots',
        permanent: true,
      },
      {
        source: '/sprava/:path*',
        destination: '/spravy/:path*',
        permanent: true,
      },
      {
        source: '/blog/:path*',
        destination: '/spravy/:path*',
        permanent: true,
      },
      {
        source: '/inba/clanky/:path*',
        destination: '/spravy/:path*',
        permanent: true,
      },
      // Rearrange Camping in sitemap, rename from "camping" to "kemping" in slovak
      {
        source: '/vzdelavanie-a-volny-cas/camping/:path*',
        destination: '/vzdelavanie-a-volny-cas/sport/kemping/:path*',
        permanent: true,
      },
      {
        source: '/vzdelavanie-a-volny-cas/sport/:path*',
        destination: '/vzdelavanie-a-volny-cas/starz/:path*',
        permanent: true,
      },
      {
        source: '/en/education-and-leisure/camping/:path*',
        destination: '/en/education-and-leisure/sport/camping/:path*',
        locale: false,
        permanent: true,
      },
      // Unpublish "bratislava for ukraine" pages and redirect to new "assistance centre" page
      {
        source: '/bratislava-pre-ukrajinu/:path*',
        destination:
          '/kultura-a-komunity/komunity/asistencne-centrum-pre-ludi-s-cudzineckym-povodom',
        permanent: true,
      },
      {
        source: '/братислава-для-украiни/:path*',
        destination:
          '/kultura-a-komunity/komunity/asistencne-centrum-pre-ludi-s-cudzineckym-povodom',
        permanent: true,
      },
      {
        source: '/en/bratislava-for-ukraine/:path*',
        destination:
          '/en/culture-and-communities/communities/assistance-centre-for-people-of-foreign-origin',
        locale: false,
        permanent: true,
      },
      {
        source: '/en/братислава-для-украiни/:path*',
        destination:
          '/en/culture-and-communities/communities/assistance-centre-for-people-of-foreign-origin',
        locale: false,
        permanent: true,
      },
      // Renaming of pages
      {
        source:
          '/zivotne-prostredie-a-vystavba/rozvoj-mesta/usmernovanie-vystavby/zavazne-stanovisko-k-investicnej-cinnosti',
        destination:
          '/zivotne-prostredie-a-vystavba/rozvoj-mesta/usmernovanie-vystavby/zavazne-stanovisko-hlavneho-mesta-sr-bratislavy-ako-organu-uzemneho-planovania',
        permanent: true,
      },
      {
        source:
          '/en/environment-and-construction/development-of-the-city/construction-guidelines/investment-project-proclamation',
        destination:
          '/en/environment-and-construction/development-of-the-city/construction-guidelines/binding-opinion-of-the-capital-of-the-slovak-republic-bratislava',
        locale: false,
        permanent: true,
      },
      {
        source: '/mesto-bratislava/archiv-mesta-bratislavy/archivne-pomocky/narodne-vybory',
        destination:
          '/mesto-bratislava/archiv-mesta-bratislavy/archivne-pomocky/archivny-fond-narodny-vybor-v-bratislave',
        permanent: true,
      },
      {
        source:
          '/mesto-bratislava/archiv-mesta-bratislavy/archivne-pomocky/magistrat-mesta-bratislavy',
        destination:
          '/mesto-bratislava/archiv-mesta-bratislavy/archivne-pomocky/archivny-fond-magistrat-mesta-bratislavy',
        permanent: true,
      },
      {
        source: '/mesto-bratislava/archiv-mesta-bratislavy/archivne-pomocky/mestske-organizacie',
        destination:
          '/mesto-bratislava/archiv-mesta-bratislavy/archivne-pomocky/archivne-fondy-mestskych-organizacii',
        permanent: true,
      },
      {
        source:
          '/mesto-bratislava/sprava-mesta/organizacie-mesta/obchodne-spolocnosti-mesta/mepasys',
        destination:
          '/mesto-bratislava/sprava-mesta/organizacie-mesta/obchodne-spolocnosti-mesta/paas-sro',
        permanent: true,
      },
      {
        source:
          '/en/city-of-bratislava/city-administration/city-owned-entities/municipal-companies/city-parking-system',
        destination:
          '/en/city-of-bratislava/city-administration/city-owned-entities/municipal-companies/paas-sro',
        locale: false,
        permanent: true,
      },
      {
        source: '/mesto-bratislava/transparentne-mesto/verejny-navrh-affiliate',
        destination:
          '/mesto-bratislava/transparentne-mesto/verejny-navrh-affiliate-pre-predaj-parkovneho',
        permanent: true,
      },
      {
        source: '/en/city-of-bratislava/transparent-city/open-call-affiliate',
        destination:
          '/en/city-of-bratislava/transparent-city/open-call-affiliate-for-parking-payment',
        locale: false,
        permanent: true,
      },
      {
        source: '/mesto-bratislava/transparentne-mesto/planovane-zbery-dat-pomocou-dronou',
        destination: '/mesto-bratislava/transparentne-mesto/planovane-zbery-dat-pomocou-dronov',
        permanent: true,
      },
      {
        source: '/socialne-sluzby-a-byvanie/socialne-sluzby-a-zariadenia/fortunacik',
        destination: '/socialne-sluzby-a-byvanie/socialne-sluzby-a-zariadenia/fokus',
        permanent: true,
      },
      {
        source: '/en/social-services-and-housing/social-services-and-facilities/fortunacik',
        destination: '/en/social-services-and-housing/social-services-and-facilities/fokus',
        locale: false,
        permanent: true,
      },
    ]
  },
  // Turbopack configuration for SVG handling
  // Docs: https://nextjs.org/docs/app/api-reference/next-config-js/turbopack
  // SVGs are converted to React components by default using @svgr/webpack
  // SVGs with ?url query parameter are handled as file URLs automatically by Turbopack
  turbopack: {
    rules: {
      '*.svg': {
        loaders: [
          {
            loader: '@svgr/webpack',
            options: {
              svgo: true,
              svgoConfig: {
                plugins: [
                  {
                    name: 'preset-default',
                    params: {
                      overrides: {
                        removeViewBox: false,
                      },
                    },
                  },
                ],
              },
            },
          },
        ],
        as: '*.js',
      },
    },
  },
}

// https://github.com/4lejandrito/next-plausible#proxy-the-analytics-script
module.exports = withPlausibleProxy()({
  ...nextConfig,
})

import type { NextConfig } from 'next'
import { withPlausibleProxy } from 'next-plausible'

import i18nextConfig from './next-i18next.config'
import svgoConfig from './svgo.config'

const nextConfig: NextConfig = {
  // Cast needed because next-i18next.config.js is plain JS: TS widens its `localeDetection: false`
  // to `boolean`, while Next's I18NConfig accepts only the literal `false`.
  i18n: i18nextConfig.i18n as NextConfig['i18n'],
  reactStrictMode: true,
  images: {
    // After upgrading to Next.js 16, image loading from local IP addresses is blocked.
    // In our Kubernetes setup, S3 resolves to a local IP range (10.10.x.x),
    // which causes images to fail loading.
    // To work around this, we temporarily allow local IPs.
    // TODO Revisit this setting and implement a safer long-term solution.
    // Docs: https://nextjs.org/docs/pages/api-reference/components/image#dangerouslyallowlocalip
    dangerouslyAllowLocalIP: true,
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
  output: 'standalone',
  outputFileTracingIncludes: {
    '/**': [
      // Workaround: Turbopack file tracer misses `module-sync` exports condition files (e.g. require.mjs)
      // on Node.js >= 22.10. Will be fixed when Next.js bumps @vercel/nft to >= 0.30.0.
      // https://github.com/vercel/next.js/issues/90567
      './node_modules/**/require.mjs',
      // tells Next to force-copy the config file into the standalone bundle for all routes, so the runtime require finds it at /home/node/app/next-i18next.config.js
      './next-i18next.config.js',
    ],
  },
  experimental: {
    turbopackLocalPostcssConfig: true,
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: [
          {
            loader: '@svgr/webpack',
            options: { svgoConfig },
          },
        ],
        as: '*.js',
      },
    },
  },
  logging: {
    // disable browser logs in terminals
    browserToTerminal: false,
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
      // E-scooters reporting form redirect - it must remain functional, as it’s linked from QR codes and stickers on scooters
      {
        source: '/kolobezky',
        destination:
          'https://konto.bratislava.sk/mestske-sluzby/nahlasenie-podnetu-k-elektrickym-kolobezkam',
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
        source:
          '/mesto-bratislava/projekty/eu-projekty/program-slovensko/nizkoprahova-socialna-sluzba-fortunacik',
        destination:
          '/mesto-bratislava/projekty/eu-projekty/program-slovensko/nizkoprahova-socialna-sluzba-pre-deti-a-rodinu-fokus',
        permanent: true,
      },
      {
        source: '/en/social-services-and-housing/social-services-and-facilities/fortunacik',
        destination: '/en/social-services-and-housing/social-services-and-facilities/fokus',
        locale: false,
        permanent: true,
      },
      {
        source:
          '/mesto-bratislava/dane-a-poplatky/dan-z-nehnutelnosti/digitalna-platba-dane-z-nehnutelnosti',
        destination: '/mesto-bratislava/dane-a-poplatky/digitalna-platba-dani-a-poplatkov',
        permanent: true,
      },
      {
        source: '/mesto-bratislava/dane-a-poplatky/dan-z-nehnutelnosti/digitalna-platba',
        destination: '/mesto-bratislava/dane-a-poplatky/digitalna-platba-dani-a-poplatkov',
        permanent: true,
      },
      {
        source: '/mesto-bratislava/projekty/inovacie-mesta-bratislava',
        destination: '/konto',
        permanent: true,
      },
      {
        source: '/bratislavske-konto',
        destination: '/konto',
        permanent: true,
      },
      {
        source: '/konto/vyhlasenie-o-spracovani-osobnych-udajov',
        destination: '/dokumenty/podmienky-ochrany-sukromia-pre-bratislavske-konto',
        permanent: true,
      },
      {
        source: '/doprava-a-mapy/mapy/strategicka-hlukova-mapa-a-akcne-plany',
        destination:
          '/zivotne-prostredie-a-vystavba/rozvoj-mesta/environmentalistika-a-technicka-infrastruktura/hluk-a-urbanisticka-akustika/strategicka-hlukova-mapa-a-akcne-plany',
        permanent: true,
      },
      {
        source:
          '/zivotne-prostredie-a-vystavba/rozvoj-mesta/environmentalistika-a-technicka-infrastruktura/hluk-a-urbanisticka-akustika-',
        destination:
          '/zivotne-prostredie-a-vystavba/rozvoj-mesta/environmentalistika-a-technicka-infrastruktura/hluk-a-urbanisticka-akustika',
        permanent: true,
      },
      {
        source: '/doprava-a-mapy/zdielana-mobilita/bikesharing',
        destination: '/doprava-a-mapy/zdielana-mobilita',
        permanent: true,
      },
      {
        source: '/doprava-a-mapy/zdielana-mobilita/kolobezky',
        destination: '/doprava-a-mapy/zdielana-mobilita',
        permanent: true,
      },
      {
        source: '/kultura-a-komunity/komunity/asistencne-centrum-pre-ludi-s-cudzineckym-povodom',
        destination: '/kultura-a-komunity/loom-centrum-pre-ludi-s-cudzineckym-povodom',
        permanent: true,
      },
      {
        source: '/doprava-a-mapy/:path*',
        destination: '/doprava-a-komunikacie/:path*',
        permanent: true,
      },
      {
        source: '/mesto-bratislava/datovy-portal-Bratislavy',
        destination: '/mesto-bratislava/transparentne-mesto/datovy-portal-bratislavy',
        permanent: true,
      },
      {
        source: '/en/city-of-bratislava/data-portal',
        destination: '/en/city-of-bratislava/transparent-city/data-portal',
        locale: false,
        permanent: true,
      },
      {
        source: '/doprava-a-komunikacie/mapy',
        destination: '/mesto-bratislava/transparentne-mesto/datovy-portal-bratislavy',
        permanent: true,
      },
      {
        source: '/en/transport-and-maps/maps',
        destination: '/en/city-of-bratislava/transparent-city/data-portal',
        locale: false,
        permanent: true,
      },
      {
        source: '/doprava-a-komunikacie/cyklodoprava/:path*',
        destination: '/doprava-a-komunikacie/cyklodoprava',
        permanent: false,
      },
      {
        source: '/en/transport-and-maps/cycling/:path*',
        destination: '/en/transport-and-maps/cycling',
        locale: false,
        permanent: false,
      },
      {
        source: '/ochlad-sa',
        destination: '/ochladsa',
        permanent: true,
      },
    ]
  },
}

// https://github.com/4lejandrito/next-plausible#proxy-the-analytics-script
export default withPlausibleProxy()({
  ...nextConfig,
})

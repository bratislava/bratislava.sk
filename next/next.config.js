const { withPlausibleProxy } = require('next-plausible')
const i18nextConfig = require('./next-i18next.config.js')
const svgoConfig = require('./svgo.config.js')

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  i18n: i18nextConfig.i18n,
  reactStrictMode: true,
  images: {
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
        hostname: 'api.tootoot.co',
        pathname: '/api/event/*/images/*/*/*/(AUTO|WIDTH|HEIGHT|MINSIDE)',
      },
    ],
  },
  output: 'standalone',
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
         * Rewrites to make the translation of URL work. Based on an approached outlined here:
         * https://stackoverflow.com/questions/68723485/how-to-setup-i18n-translated-url-routes-in-next-js/68731057#68731057
         */
        {
          source: '/search',
          destination: '/vyhladavanie',
        },
      ],
    }
  },
  serverRuntimeConfig: {
    strapiUrl: process.env.STRAPI_URL,
  },
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
      /// Obmedzenia a poruchy
      {
        source: '/rozkopavka-alebo-uzavierka/:slug',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/obmedzenia-a-poruchy', // ignore slug, redirect to listing page
        permanent: true,
      },
      {
        source: '/filter/rozkopavky-a-uzavierky',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/obmedzenia-a-poruchy',
        permanent: true,
      },
      {
        source: '/rss/rozkopavky-a-uzavierky',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/obmedzenia-a-poruchy',
        permanent: true,
      },
      {
        source: '/uzavery-d4-r7-a-mlynske-nivy',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/obmedzenia-a-poruchy',
        permanent: true,
      },
      {
        source: '/najnovsie-rozkopavky-a-uzavierky',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/obmedzenia-a-poruchy',
        permanent: true,
      },
      {
        source: '/situacia-v-bratislave-od-15-2-2019',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/obmedzenia-a-poruchy',
        permanent: true,
      },
      {
        source: '/iframe/rozkopavky-a-uzavierky',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/obmedzenia-a-poruchy',
        permanent: true,
      },
      {
        source: '/rozkopavky-a-uzavierky/d-77246/p1=11049948',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/obmedzenia-a-poruchy',
        permanent: true,
      },
      {
        source: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/obmedzenia-a-poruchy',
        permanent: true,
      },
      /// Uzemny plan a dodatky
      {
        source: '/uzemny-plan-hlavneho-mesta-sr-bratislavy-zmeny-a-doplnky-01',
        destination:
          '/zivotne-prostredie-a-vystavba/rozvoj-mesta/platna-uzemnoplanovacia-dokumentacia/uzemny-plan-mesta-a-jeho-zmeny-a-doplnky/zmeny-a-doplnky-01',
        permanent: true,
      },
      {
        source: '/uzemny-plan-hlavneho-mesta-sr-bratislavy-zmeny-a-doplnky-02',
        destination:
          '/zivotne-prostredie-a-vystavba/rozvoj-mesta/platna-uzemnoplanovacia-dokumentacia/uzemny-plan-mesta-a-jeho-zmeny-a-doplnky/zmeny-a-doplnky-02',
        permanent: true,
      },
      {
        source: '/uzemny-plan-hlavneho-mesta-sr-bratislavy-zmeny-a-doplnky-03',
        destination:
          '/zivotne-prostredie-a-vystavba/rozvoj-mesta/platna-uzemnoplanovacia-dokumentacia/uzemny-plan-mesta-a-jeho-zmeny-a-doplnky/zmeny-a-doplnky-03',
        permanent: true,
      },
      {
        source: '/uzemny-plan-hlavneho-mesta-sr-bratislavy-zmeny-a-doplnky-05',
        destination:
          '/zivotne-prostredie-a-vystavba/rozvoj-mesta/platna-uzemnoplanovacia-dokumentacia/uzemny-plan-mesta-a-jeho-zmeny-a-doplnky/zmeny-a-doplnky-05',
        permanent: true,
      },
      {
        source: '/uzemny-plan-hlavneho-mesta-sr-bratislavy-zmeny-a-doplnky-06',
        destination:
          '/zivotne-prostredie-a-vystavba/rozvoj-mesta/platna-uzemnoplanovacia-dokumentacia/uzemny-plan-mesta-a-jeho-zmeny-a-doplnky/zmeny-a-doplnky-06',
        permanent: true,
      },
      {
        source: '/uzemny-plan-hlavneho-mesta-sr-bratislavy-zmeny-a-doplnky-07',
        destination:
          '/zivotne-prostredie-a-vystavba/rozvoj-mesta/platna-uzemnoplanovacia-dokumentacia/uzemny-plan-mesta-a-jeho-zmeny-a-doplnky/zmeny-a-doplnky-07',
        permanent: true,
      },
      {
        source: '/uzemny-plan-hlavneho-mesta-sr-bratislavy-zmeny-a-doplnky-08',
        destination:
          '/zivotne-prostredie-a-vystavba/rozvoj-mesta/platna-uzemnoplanovacia-dokumentacia/uzemny-plan-mesta-a-jeho-zmeny-a-doplnky/zmeny-a-doplnky-08',
        permanent: true,
      },
      {
        source: '/dan-z-nehnutelnosti',
        destination: '/mesto-bratislava/dane-a-poplatky/dan-z-nehnutelnosti',
        permanent: true,
      },
      {
        source: '/magistrat',
        destination: '/mesto-bratislava/sprava-mesta/magistrat',
        permanent: true,
      },
      {
        source: '/organizacna-struktura',
        destination: '/mesto-bratislava/sprava-mesta/magistrat/organizacna-struktura',
        permanent: true,
      },
      {
        source: '/mesto-bratislava/sprava-mesta/magistrat/organizacna-struktura-a-kontakty',
        destination: '/mesto-bratislava/sprava-mesta/magistrat/organizacna-struktura',
        permanent: true,
      },
      {
        source: '/mesto-bratislava/kontakty',
        destination: '/kontakty',
        permanent: true,
      },
      {
        source: '/uradne-a-navstevne-hodiny',
        destination: '/kontakty',
        permanent: true,
      },
      {
        source: '/informacie-a-odporucania-k-novemu-koronavirusu-a-ochoreniu-covid-19',
        destination: '/informacie-a-odporucania-k-ochoreniu-covid-19',
        permanent: true,
      },
      {
        source: '/dane-a-poplatky',
        destination: '/mesto-bratislava/dane-a-poplatky',
        permanent: true,
      },
      {
        source: '/filter/pracovne-prilezitosti',
        destination: '/mesto-bratislava/sprava-mesta/magistrat/pracovne-prilezitosti',
        permanent: true,
      },
      {
        source: '/uzemny-plan',
        destination:
          '/zivotne-prostredie-a-vystavba/rozvoj-mesta/uzemnoplanovacie-dokumenty/platna-uzemnoplanovacia-dokumentacia/uzemny-plan-mesta-a-jeho-zmeny-a-doplnky',
        permanent: true,
      },
      {
        source: '/miestne-dane-a-poplatky-uradne-a-navstevne-hodiny',
        destination: '/mesto-bratislava/dane-a-poplatky',
        permanent: true,
      },
      {
        source: '/poplatky-za-komunalne-odpady-a-drobne-stavebne-odpady',
        destination:
          '/mesto-bratislava/dane-a-poplatky/poplatok-za-komunalne-odpady-a-drobne-stavebne-odpady',
        permanent: true,
      },
      {
        source: '/sadzby-dane-z-nehnutelnosti',
        destination: '/mesto-bratislava/dane-a-poplatky/dan-z-nehnutelnosti',
        permanent: true,
      },
      {
        source: '/najomne-byty-mesta',
        destination:
          '/socialne-sluzby-a-byvanie/byvanie-a-ubytovanie/najomne-byvanie/najomne-byty-mesta',
        permanent: true,
      },
      {
        source: '/komunalny-odpad',
        destination: '/zivotne-prostredie-a-vystavba/zivotne-prostredie/odpady',
        permanent: true,
      },
      {
        source: '/filter/uradna-tabula',
        destination: '/mesto-bratislava/transparentne-mesto/uradna-tabula',
        permanent: true,
      },
      {
        source: '/zastupitelstvo',
        destination: '/mesto-bratislava/sprava-mesta/volene-organy/zastupitelstvo',
        permanent: true,
      },
      {
        source: '/zberne-miesta-odpadu',
        destination: '/zivotne-prostredie-a-vystavba/zivotne-prostredie/odpady/zmesovy-odpad',
        permanent: true,
      },
      {
        source: '/nadacia-mesta-bratislavy',
        destination: '/kultura-a-komunity/kulturne-sluzby/nadacia-mesta-bratislavy',
        permanent: true,
      },
      {
        source: '/mestske-casti',
        destination: '/mesto-bratislava/sprava-mesta/mestske-casti',
        permanent: true,
      },
      {
        source: '/doprava',
        destination: '/doprava-a-mapy/doprava',
        permanent: true,
      },
      {
        source: '/primator',
        destination: '/mesto-bratislava/sprava-mesta/volene-organy/primator',
        permanent: true,
      },
      {
        source:
          '/harmonogram-zberu-triedeneho-odpadu-2021-pre-rodinne-domy-v-mestskych-castiach-v-prvej-etape',
        destination:
          '/zivotne-prostredie-a-vystavba/zivotne-prostredie/odpady/triedeny-zber/zber-a-odvoz-vytriedeneho-odpadu-z-rodinnych-domov',
        permanent: true,
      },
      {
        source: '/byvanie',
        destination: '/socialne-sluzby-a-byvanie/byvanie-a-ubytovanie',
        permanent: true,
      },
      {
        source: '/chcem-stavat',
        destination: '/zivotne-prostredie-a-vystavba/rozvoj-mesta/usmernovanie-vystavby',
        permanent: true,
      },
      {
        source: '/udalost/bratislavske-mestske-dni-2022',
        destination: '/kultura-a-komunity/podujatia/mestske-podujatia',
        permanent: true,
      },
      {
        source: '/legislativa-mesta',
        destination: '/mesto-bratislava/sprava-mesta/legislativa-mesta',
        permanent: true,
      },
      {
        source: '/danove-ulavy-pre-fyzicke-osoby',
        destination: '/mesto-bratislava/dane-a-poplatky/dan-z-nehnutelnosti',
        permanent: true,
      },
      {
        source: '/triedeny-zber',
        destination: '/zivotne-prostredie-a-vystavba/zivotne-prostredie/odpady/triedeny-zber',
        permanent: true,
      },
      {
        source: '/granty',
        destination: '/mesto-bratislava/transparentne-mesto/pridelovanie-dotacii',
        permanent: true,
      },
      {
        source: '/zmena-sposobu-zberu-a-odvozu-vytriedeneho-odpadu-z-rodinnych-domov',
        destination:
          '/zivotne-prostredie-a-vystavba/zivotne-prostredie/odpady/triedeny-zber/zber-a-odvoz-vytriedeneho-odpadu-z-rodinnych-domov',
        permanent: true,
      },
      {
        source: '/prugerka',
        destination: '/zivotne-prostredie-a-vystavba/zelen/udrzba-a-tvorba-zelene/parky-a-zahrady',
        permanent: true,
      },
      {
        source: '/samosprava',
        destination: '/mesto-bratislava/sprava-mesta',
        permanent: true,
      },
      {
        source: '/cestny-spravny-organ',
        destination: '/doprava-a-mapy/doprava/dopravne-povolenia',
        permanent: true,
      },
      {
        source: '/symboly-mesta',
        destination: '/mesto-bratislava/sprava-mesta/vizualna-identita/symboly-mesta',
        permanent: true,
      },
      {
        source: '/verejne-osvetlenie-poruchova-sluzba',
        destination: '/zivotne-prostredie-a-vystavba/verejne-osvetlenie',
        permanent: true,
      },
      {
        source: '/filter/predaj-a-prenajom-nehnutelnosti',
        destination: '/mesto-bratislava/transparentne-mesto/majetok-mesta',
        permanent: true,
      },
      {
        source: '/odtahovanie-vozidiel',
        destination: '/doprava-a-mapy/parkovanie/odtah-vozidiel',
        permanent: true,
      },
      {
        source: '/archiv-mesta-bratislavy',
        destination:
          '/kultura-a-komunity/kulturne-sluzby/sluzby-badatelne-archivu-mesta-bratislavy',
        permanent: true,
      },
      {
        source: '/financny-prispevok-na-hospodarenie-so-zrazkovou-vodou',
        destination:
          '/mesto-bratislava/transparentne-mesto/pridelovanie-dotacii/financny-prispevok-na-hospodarenie-so-zrazkovou-vodou',
        permanent: true,
      },
      {
        source: '/grantovy-program-pre-rozvoj-sportu-a-vzdelavania-v-bratislave',
        destination: '/vzdelavanie-a-volny-cas/dotacie/podprogram-2',
        permanent: true,
      },
      {
        source: '/rozvoj-mesta',
        destination: '/zivotne-prostredie-a-vystavba/rozvoj-mesta',
        permanent: true,
      },
      {
        source: '/zivotne-prostredie',
        destination: '/zivotne-prostredie-a-vystavba/zivotne-prostredie',
        permanent: true,
      },
      {
        source: '/zber-biologicky-rozlozitelneho-odpadu-zo-zahrad',
        destination: '/zivotne-prostredie-a-vystavba/zivotne-prostredie/odpady/triedeny-zber',
        permanent: true,
      },
      {
        source: '/zmesovy-odpad',
        destination: '/zivotne-prostredie-a-vystavba/zivotne-prostredie/odpady/zmesovy-odpad',
        permanent: true,
      },
      {
        source: '/verejne-obstaravanie',
        destination: '/mesto-bratislava/transparentne-mesto/verejne-obstaravanie',
        permanent: true,
      },
      {
        source: '/majetok',
        destination: '/mesto-bratislava/transparentne-mesto/majetok-mesta',
        permanent: true,
      },
      {
        source: '/socialne-sluzby-a-pomoc',
        destination:
          '/socialne-sluzby-a-byvanie/aktivity-v-socialnej-oblasti/sekcia-socialnych-veci',
        permanent: true,
      },
      {
        source:
          '/socialne-sluzby-a-byvanie/aktivity-mesta-v-socialnej-oblasti/mapa-pomoci-ludom-bez-domova',
        destination:
          '/socialne-sluzby-a-byvanie/aktivity-mesta-v-socialnej-oblasti/mapa-sluzieb-pre-ludi-v-nudzi',
        permanent: true,
      },
      {
        source: '/zavedenie-zberu-kuchynskeho-biologicky-rozlozitelneho-odpadu',
        destination:
          '/zivotne-prostredie-a-vystavba/zivotne-prostredie/odpady/triedeny-zber/zber-kuchynskeho-bioodpadu',
        permanent: true,
      },
      {
        source: '/nahradne-najomne-byvanie',
        destination: '/socialne-sluzby-a-byvanie/byvanie-a-ubytovanie/najomne-byvanie',
        permanent: true,
      },
      {
        source: '/archivne-pomocky',
        destination:
          '/kultura-a-komunity/kulturne-sluzby/sluzby-badatelne-archivu-mesta-bratislavy/archivne-pomocky',
        permanent: true,
      },
      {
        source: '/uzemny-plan-zony-petrzalka',
        destination:
          '/zivotne-prostredie-a-vystavba/rozvoj-mesta/uzemnoplanovacie-dokumenty/platna-uzemnoplanovacia-dokumentacia/uzemne-plany-zon',
        permanent: true,
      },
      {
        source: '/mapa',
        destination: '/doprava-a-mapy/mapy',
        permanent: true,
      },
      {
        source: '/transparentne-mesto',
        destination: '/mesto-bratislava/transparentne-mesto',
        permanent: true,
      },
      {
        source: '/interne-predpisy',
        destination: '/mesto-bratislava/sprava-mesta/legislativa-mesta/interne-predpisy',
        permanent: true,
      },
      {
        source: '/udalost/kulturne-leto',
        destination: '/kultura-a-komunity/podujatia/mestske-podujatia',
        permanent: true,
      },
      {
        source: '/ruzinov',
        destination: '/mesto-bratislava/sprava-mesta/mestske-casti',
        permanent: true,
      },
      {
        source:
          '/grantovy-podprogram-1-na-podporu-pohybovych-aktivit-a-neformalneho-vzdelavania-v-oblasti-prace-s-detmi-a-mladezou',
        destination: '/vzdelavanie-a-volny-cas/dotacie/podprogram-1',
        permanent: true,
      },
      {
        source: '/dan-za-uzivanie-verejneho-priestranstva',
        destination: '/mesto-bratislava/dane-a-poplatky/dan-za-uzivanie-verejneho-priestranstva',
        permanent: true,
      },
      {
        source: '/ochrana-ovzdusia',
        destination: '/zivotne-prostredie-a-vystavba/zivotne-prostredie/ochrana-ovzdusia',
        permanent: true,
      },
      {
        source: '/dan-za-ubytovanie',
        destination: '/mesto-bratislava/dane-a-poplatky/dan-za-ubytovanie',
        permanent: true,
      },
      {
        source: '/rozvoj-najomneho-byvania',
        destination: '/socialne-sluzby-a-byvanie/byvanie-a-ubytovanie/rozvoj-najomneho-byvania',
        permanent: true,
      },
      {
        source: '/filter/zakladne-umelecke-skoly',
        destination: '/vzdelavanie-a-volny-cas/skolstvo/zakladne-umelecke-skoly',
        permanent: true,
      },
      {
        source: '/mapa-skolskych-obvodov',
        destination: '/vzdelavanie-a-volny-cas/skolstvo/mapa-skolskych-obvodov',
        permanent: true,
      },
      {
        source: '/братислава-для-украіни',
        destination: '/kultura-a-komunity/komunity/братислава-для-украіни',
        permanent: true,
      },
      {
        source: '/rozpocet',
        destination: '/mesto-bratislava/transparentne-mesto/rozpocet-a-hospodarenie',
        permanent: true,
      },
      {
        source: '/kultura',
        destination: '/kultura-a-komunity/koncepcia-kultury',
        permanent: true,
      },
      {
        source: '/namestnici-primatora',
        destination: '/mesto-bratislava/sprava-mesta/volene-organy/primator/namestnicky-primatora',
        permanent: true,
      },
      {
        source: '/organizacia-alebo-institucia/marianum-pohrebnictvo-mesta-bratislavy',
        destination: '/mesto-bratislava/sprava-mesta/organizacie-mesta/prispevkove-organizacie',
        permanent: true,
      },
      {
        source: '/organizacia-alebo-institucia/bratislavska-vodarenska-spolocnost',
        destination:
          '/mesto-bratislava/sprava-mesta/organizacie-mesta/obchodne-spolocnosti-mesta/bratislavska-vodarenska-spolocnost',
        permanent: true,
      },
      {
        source: '/tlaciva-k-dani-z-nehnutelnosti',
        destination: '/mesto-bratislava/dane-a-poplatky/dan-z-nehnutelnosti',
        permanent: true,
      },
      {
        source: '/bratislava-pre-vsetkych-grantovy-program-v-socialnej-oblasti',
        destination:
          '/socialne-sluzby-a-byvanie/financna-podpora/grantovy-program-v-socialnej-oblasti-bratislava-pre-vsetkych',
        permanent: true,
      },
      {
        source: '/elektricka-v-novom-centre',
        destination:
          '/doprava-a-mapy/doprava/dopravne-projekty/nova-elektrickova-trat-pribinova-kosicka',
        permanent: true,
      },
      {
        source: '/strategicke-dokumenty',
        destination: '/mesto-bratislava/sprava-mesta/legislativa-mesta/strategicke-dokumenty',
        permanent: true,
      },
      {
        source: '/ubytovna-fortuna',
        destination: '/socialne-sluzby-a-byvanie/byvanie-a-ubytovanie/mestske-ubytovne',
        permanent: true,
      },
      {
        source: '/uzemnoplanovacia-informacia',
        destination:
          '/zivotne-prostredie-a-vystavba/rozvoj-mesta/usmernovanie-vystavby/uzemnoplanovacia-informacia',
        permanent: true,
      },
      {
        source: '/seniori',
        destination:
          '/socialne-sluzby-a-byvanie/socialne-zariadenia/zariadenia-pre-seniorov-zariadenia-opatrovatelskej-sluzby-a-denny-stacionar',
        permanent: true,
      },
      {
        source: '/ochrana-prirody-a-krajiny',
        destination: '/zivotne-prostredie-a-vystavba/zivotne-prostredie/ochrana-prirody-a-krajiny',
        permanent: true,
      },
      {
        source: '/bratislava-potrebuje-ferove-parkovanie',
        destination: '/doprava-a-mapy/parkovanie/system-regulovaneho-parkovania-paas',
        permanent: true,
      },
      {
        source: '/prenajom-primacialneho-palaca',
        destination: '/mesto-bratislava/transparentne-mesto/majetok-mesta/prenajom-priestorov',
        permanent: true,
      },
      {
        source: '/vyberove-konania-clenov-predstavenstiev-mestskych-podnikov-a-organizacii',
        destination: '/mesto-bratislava/transparentne-mesto/vyberove-konania',
        permanent: true,
      },
      {
        source: '/uzemne-plany-zon',
        destination:
          '/zivotne-prostredie-a-vystavba/rozvoj-mesta/uzemnoplanovacie-dokumenty/platna-uzemnoplanovacia-dokumentacia/uzemne-plany-zon',
        permanent: true,
      },
      {
        source: '/aktivne-starnutie-a-benefity-pre-seniorov',
        destination:
          '/socialne-sluzby-a-byvanie/aktivity-v-socialnej-oblasti/proseniorske-organizacie-a-aktivne-starnutie',
        permanent: true,
      },
      {
        source: '/filter/centra-volneho-casu',
        destination: '/vzdelavanie-a-volny-cas/skolstvo/centra-volneho-casu',
        permanent: true,
      },
      {
        source: '/filter/organizacie-a-institucie',
        destination: '/mesto-bratislava/sprava-mesta/organizacie-mesta',
        permanent: true,
      },
      {
        source: '/uzemny-plan-zony-a6-bratislava',
        destination:
          '/zivotne-prostredie-a-vystavba/rozvoj-mesta/uzemnoplanovacie-dokumenty/platna-uzemnoplanovacia-dokumentacia/uzemne-plany-zon/uzemny-plan-zony-a6-bratislava',
        permanent: true,
      },
      {
        source: '/urbanisticke-studie',
        destination:
          '/zivotne-prostredie-a-vystavba/rozvoj-mesta/uzemnoplanovacie-dokumenty/prerokovane-uzemnoplanovacie-podklady/urbanisticke-studie',
        permanent: true,
      },
      {
        source: '/vykonne-organy',
        destination: '/mesto-bratislava/sprava-mesta',
        permanent: true,
      },
      {
        source: '/mestska-hromadna-doprava',
        destination: '/doprava-a-mapy/mestska-hromadna-doprava',
        permanent: true,
      },
      {
        source: '/mestska-zelen',
        destination: '/zivotne-prostredie-a-vystavba/zelen',
        permanent: true,
      },
      {
        source: '/orezy-vyruby-a-vysadba-drevin-v-sprave-mesta',
        destination: '/zivotne-prostredie-a-vystavba/zelen/udrzba-a-tvorba-zelene/stromy-v-meste',
        permanent: true,
      },
      {
        source: '/filter/spravy',
        destination: '/mesto-bratislava/transparentne-mesto/aktuality',
        permanent: true,
      },
      {
        source: '/ustredna-evidencia-staznosti',
        destination: '/mesto-bratislava/transparentne-mesto/peticie-a-staznosti',
        permanent: true,
      },
      {
        source: '/dostupne-byvanie',
        destination:
          '/socialne-sluzby-a-byvanie/byvanie-a-ubytovanie/projekty-v-mestskom-najomnom-byvani',
        permanent: true,
      },
      {
        source: '/hlavna-architektka',
        destination: '/mesto-bratislava/sprava-mesta/volene-organy/hlavna-architektka',
        permanent: true,
      },
      {
        source: '/tulave-zvierata',
        destination: '/zivotne-prostredie-a-vystavba/zivotne-prostredie/tulave-zvierata',
        permanent: true,
      },
      {
        source: '/pobytove-sluzby',
        destination:
          '/socialne-sluzby-a-byvanie/socialne-zariadenia/zariadenia-pre-seniorov-zariadenia-opatrovatelskej-sluzby-a-denny-stacionar',
        permanent: true,
      },
      {
        source: '/projekty-a-kampane',
        destination: '/mesto-bratislava/projekty',
        permanent: true,
      },
      {
        source: '/zoznam-pridelenych-bytov',
        destination:
          '/socialne-sluzby-a-byvanie/byvanie-a-ubytovanie/najomne-byvanie/zoznam-pridelenych-bytov',
        permanent: true,
      },
      {
        source: '/rozpocet-a-hospodarenie',
        destination: '/mesto-bratislava/transparentne-mesto/rozpocet-a-hospodarenie',
        permanent: true,
      },
      {
        source: '/grantovy-podprogram-2-na-podporu-sportovych-a-vzdelavacich-podujati',
        destination: '/vzdelavanie-a-volny-cas/dotacie/podprogram-2',
        permanent: true,
      },
      {
        source: '/komunitne-planovanie-socialnych-sluzieb',
        destination:
          '/socialne-sluzby-a-byvanie/aktivity-v-socialnej-oblasti/komunitny-plan-socialnych-sluzieb',
        permanent: true,
      },
      {
        source: '/organizacia-alebo-institucia/odvoz-a-likvidacia-odpadu-a-s',
        destination:
          '/mesto-bratislava/sprava-mesta/organizacie-mesta/obchodne-spolocnosti-mesta/olo',
        permanent: true,
      },
      {
        source:
          '/grantovy-podprogram-4-na-podporu-investicii-do-sportovej-infrastruktury-v-hlavnom-meste-sr-bratislave',
        destination: '/vzdelavanie-a-volny-cas/dotacie/podprogram-4',
        permanent: true,
      },
      {
        source: '/zaverecny-ucet',
        destination: '/mesto-bratislava/transparentne-mesto/rozpocet-a-hospodarenie/zaverecny-ucet',
        permanent: true,
      },
      {
        source: '/zoznam-dokumentacii',
        destination: '/zivotne-prostredie-a-vystavba/rozvoj-mesta/uzemnoplanovacie-dokumenty',
        permanent: true,
      },
      {
        source: '/organizacie-mesta',
        destination: '/mesto-bratislava/sprava-mesta/organizacie-mesta',
        permanent: true,
      },
      {
        source: '/cierne-skladky',
        destination: '/zivotne-prostredie-a-vystavba/zivotne-prostredie/odpady/nelegalne-skladky',
        permanent: true,
      },
      {
        source: '/strategicka-podpora-kulturnych-podujati',
        destination:
          '/kultura-a-komunity/kulturne-sluzby/podpora-strategickych-kulturnych-podujati',
        permanent: true,
      },
      {
        source: '/logo-bratislavy',
        destination: '/mesto-bratislava/sprava-mesta/vizualna-identita',
        permanent: true,
      },
      {
        source: '/uzemny-generel-dopravy',
        destination: '/doprava-a-mapy/doprava/uzemny-generel-dopravy',
        permanent: true,
      },
      {
        source: '/sport',
        destination: '/vzdelavanie-a-volny-cas/sport',
        permanent: true,
      },
      {
        source: '/spristupnovanie-informacii',
        destination: '/mesto-bratislava/transparentne-mesto/spristupnovanie-informacii',
        permanent: true,
      },
      {
        source: '/uzemny-plan-zony-dunajska',
        destination:
          '/zivotne-prostredie-a-vystavba/rozvoj-mesta/uzemnoplanovacie-dokumenty/platna-uzemnoplanovacia-dokumentacia/uzemne-plany-zon/uzemny-plan-zony-dunajska',
        permanent: true,
      },
      {
        source: '/ubytovna-kopcany',
        destination: '/socialne-sluzby-a-byvanie/byvanie-a-ubytovanie/mestske-ubytovne',
        permanent: true,
      },
      {
        source: '/skolstvo-a-mladez',
        destination: '/vzdelavanie-a-volny-cas/skolstvo',
        permanent: true,
      },
      {
        source: '/nakladanie-s-odpadom',
        destination: '/zivotne-prostredie-a-vystavba/zivotne-prostredie/odpady/zmesovy-odpad',
        permanent: true,
      },
      {
        source: '/obstaravanie-uzemnoplanovacej-dokumentacie-a-uzemnoplanovacich-podkladov',
        destination:
          '/zivotne-prostredie-a-vystavba/rozvoj-mesta/uzemnoplanovacie-dokumenty/procesy-obstaravania-uzemnoplanovacich-dokumentov',
        permanent: true,
      },
      {
        source: '/funkcie-zelene-a-jej-vyznam',
        destination: '/zivotne-prostredie-a-vystavba/zelen',
        permanent: true,
      },
      {
        source: '/uzemne-generely',
        destination:
          '/zivotne-prostredie-a-vystavba/rozvoj-mesta/uzemnoplanovacie-dokumenty/prerokovane-uzemnoplanovacie-podklady/uzemne-generely',
        permanent: true,
      },
      {
        source:
          '/organizacia-alebo-institucia/bratislavska-organizacia-cestovneho-ruchu-bratislava-tourist-board',
        destination:
          '/mesto-bratislava/sprava-mesta/organizacie-mesta/ostatne-organizacie/bratislavska-organizacia-cestovneho-ruchu',
        permanent: true,
      },
      {
        source: '/nove-sadzby-dane-z-nehnutelnosti',
        destination: '/mesto-bratislava/dane-a-poplatky/dan-z-nehnutelnosti',
        permanent: true,
      },
      {
        source: '/mestsky-kontrolor',
        destination: '/mesto-bratislava/transparentne-mesto/cinnost-mestskeho-kontrolora',
        permanent: true,
      },
      {
        source: '/sluzby-do-domacnosti',
        destination:
          '/socialne-sluzby-a-byvanie/socialne-zariadenia/zariadenia-pre-seniorov-zariadenia-opatrovatelskej-sluzby-a-denny-stacionar',
        permanent: true,
      },
      {
        source: '/organizacia-alebo-institucia/mestska-kniznica',
        destination: '/kultura-a-komunity/mestske-kulturne-organizacie/mestska-kniznica',
        permanent: true,
      },
      {
        source: '/invazne-dreviny',
        destination:
          '/zivotne-prostredie-a-vystavba/zelen/udrzba-a-tvorba-zelene/stromy-v-meste/invazne-dreviny',
        permanent: true,
      },
      {
        source: '/poradne-organy-mesta',
        destination: '/mesto-bratislava/sprava-mesta/volene-organy/primator/poradne-organy',
        permanent: true,
      },
      {
        source: '/organizacia-alebo-institucia/mestsky-parkovaci-system-spol-s-r-o',
        destination:
          '/mesto-bratislava/sprava-mesta/organizacie-mesta/obchodne-spolocnosti-mesta/mepasys',
        permanent: true,
      },
      {
        source: '/uzemny-plan-zony-podhradie',
        destination:
          '/zivotne-prostredie-a-vystavba/rozvoj-mesta/uzemnoplanovacie-dokumenty/platna-uzemnoplanovacia-dokumentacia/uzemne-plany-zon/uzemny-plan-zony-podhradie',
        permanent: true,
      },
      {
        source: '/organizacia-alebo-institucia/dopravny-podnik-bratislava',
        destination:
          '/mesto-bratislava/sprava-mesta/organizacie-mesta/obchodne-spolocnosti-mesta/dopravny-podnik-bratislava',
        permanent: true,
      },
      {
        source: '/talentovana-mladez',
        destination: '/vzdelavanie-a-volny-cas/ocenovanie/talentovana-mladez',
        permanent: true,
      },
      {
        source: '/modernizacia-ruzinovskej-radialy',
        destination: '/doprava-a-mapy/doprava/dopravne-projekty/modernizacia-ruzinovskej-radialy',
        permanent: true,
      },
      {
        source: '/udrzba-zelene',
        destination: '/zivotne-prostredie-a-vystavba/zelen/udrzba-a-tvorba-zelene',
        permanent: true,
      },
      {
        source: '/uzemny-plan-zony-machnac',
        destination:
          '/zivotne-prostredie-a-vystavba/rozvoj-mesta/uzemnoplanovacie-dokumenty/platna-uzemnoplanovacia-dokumentacia/uzemne-plany-zon/uzemny-plan-zony-machnac',
        permanent: true,
      },
      {
        source: '/cyklodoprava',
        destination: '/doprava-a-mapy/cyklodoprava',
        permanent: true,
      },
      {
        source: '/organizacia-alebo-institucia/centrum-volneho-casu-hlinicka-3',
        destination: '/vzdelavanie-a-volny-cas/skolstvo/centra-volneho-casu',
        permanent: true,
      },
      {
        source: '/zber-vianocnych-stromcekov',
        destination:
          '/zivotne-prostredie-a-vystavba/zivotne-prostredie/odpady/triedeny-zber/zber-vianocnych-stromcekov',
        permanent: true,
      },
      {
        source:
          '/ziadost-o-financny-prispevok-pre-neverejneho-poskytovatela-socialnej-sluzby-v-zariadeni-pre-seniorov',
        destination:
          '/socialne-sluzby-a-byvanie/financna-podpora/financovanie-neverejnych-poskytovatelov-socialnych-sluzieb',
        permanent: true,
      },
      {
        source: '/odstranovanie-vrakov',
        destination: '/zivotne-prostredie-a-vystavba/zivotne-prostredie/odstranovanie-vrakov',
        permanent: true,
      },
      {
        source: '/integrovany-dopravny-system',
        destination: '/doprava-a-mapy/mestska-hromadna-doprava/integrovany-dopravny-system',
        permanent: true,
      },
      {
        source: '/bankove-ucty-uradu',
        destination:
          '/mesto-bratislava/transparentne-mesto/rozpocet-a-hospodarenie/bankove-ucty-uradu',
        permanent: true,
      },
      {
        source: '/organizacia-alebo-institucia/zakladna-umelecka-skola-jana-albrechta',
        destination: '/vzdelavanie-a-volny-cas/skolstvo/zakladne-umelecke-skoly',
        permanent: true,
      },
      {
        source: '/organizacia-alebo-institucia/centrum-volneho-casu-gessayova-6',
        destination:
          '/vzdelavanie-a-volny-cas/skolstvo/centra-volneho-casu/centrum-volneho-casu-gessayova-6',
        permanent: true,
      },
      {
        source: '/organizacia-alebo-institucia/mestske-lesy-v-bratislave',
        destination: '/zivotne-prostredie-a-vystavba/zelen/mestske-lesy',
        permanent: true,
      },
      {
        source: '/mikrozona-stare-mesto',
        destination: '/doprava-a-mapy/parkovanie/mikrozona-stare-mesto',
        permanent: true,
      },
      {
        source: '/elektricka-v-petrzalke',
        destination: '/doprava-a-mapy/doprava/dopravne-projekty/petrzalska-elektricka',
        permanent: true,
      },
      {
        source: '/komunikacia-bez-barier',
        destination: '/socialne-sluzby-a-byvanie/socialne-sluzby/komunikacia-bez-barier',
        permanent: true,
      },
      {
        source: '/bratislavsky-lesopark',
        destination: '/zivotne-prostredie-a-vystavba/zelen/mestske-lesy',
        permanent: true,
      },
      {
        source: '/kulturne-dedicstvo-a-pamiatkova-starostlivost',
        destination: '/kultura-a-komunity/kulturne-dedicstvo-a-pamiatkova-starostlivost',
        permanent: true,
      },
      {
        source: '/komunitny-plan-socialnych-sluzieb-2020-2021',
        destination:
          '/socialne-sluzby-a-byvanie/aktivity-v-socialnej-oblasti/komunitny-plan-socialnych-sluzieb',
        permanent: true,
      },
      {
        source: '/organizacia-alebo-institucia/generalny-investor-bratislavy-gib',
        destination: '/mesto-bratislava/sprava-mesta/organizacie-mesta/prispevkove-organizacie',
        permanent: true,
      },
      {
        source: '/odmenovanie',
        destination: '/mesto-bratislava/transparentne-mesto/odmenovanie',
        permanent: true,
      },
      {
        source: '/organizacia-alebo-institucia/metro-bratislava-a-s',
        destination:
          '/mesto-bratislava/sprava-mesta/organizacie-mesta/obchodne-spolocnosti-mesta/metro',
        permanent: true,
      },
      {
        source:
          '/ziadost-o-umiestnenie-v-zariadeni-pre-seniorov-u-neverejneho-poskytovatela-socialnej-sluzby',
        destination:
          '/socialne-sluzby-a-byvanie/socialne-zariadenia/zariadenia-pre-seniorov-zariadenia-opatrovatelskej-sluzby-a-denny-stacionar',
        permanent: true,
      },
      {
        source: '/uzemnoplanovacie-podklady',
        destination:
          '/zivotne-prostredie-a-vystavba/rozvoj-mesta/uzemnoplanovacie-dokumenty/prerokovane-uzemnoplanovacie-podklady',
        permanent: true,
      },
      {
        source: '/kulturne-organizacie',
        destination: '/kultura-a-komunity/mestske-kulturne-organizacie',
        permanent: true,
      },
      {
        source: '/vyberove-konanie-clen-predstavenstva-cso-bvs-3',
        destination: '/mesto-bratislava/transparentne-mesto/vyberove-konania',
        permanent: true,
      },
      {
        source: '/organizacia-alebo-institucia/bratislavske-kulturne-a-informacne-stredisko',
        destination:
          '/kultura-a-komunity/mestske-kulturne-organizacie/bratislavske-kulturne-a-informacne-stredisko',
        permanent: true,
      },
      {
        source: '/obehove-hospodarstvo-mesta-bratislava',
        destination:
          '/zivotne-prostredie-a-vystavba/zivotne-prostredie/odpady/obehove-hospodarstvo',
        permanent: true,
      },
      {
        source: '/vyberove-konanie-riaditel-ka-muzea-mesta-bratislava',
        destination: '/mesto-bratislava/transparentne-mesto/vyberove-konania',
        permanent: true,
      },
      {
        source: '/prerokovanie-uzemneho-generelu',
        destination:
          '/zivotne-prostredie-a-vystavba/rozvoj-mesta/uzemnoplanovacie-dokumenty/prerokovane-uzemnoplanovacie-podklady/uzemne-generely',
        permanent: true,
      },
      {
        source: '/filter/prispevkove-organizacia-mesta',
        destination: '/mesto-bratislava/sprava-mesta/organizacie-mesta/prispevkove-organizacie',
        permanent: true,
      },
      {
        source: '/informacie-o-stave-zivotneho-prostredia',
        destination:
          '/zivotne-prostredie-a-vystavba/zivotne-prostredie/ochrana-prirody-a-krajiny/informacie-o-stave-zivotneho-prostredia',
        permanent: true,
      },
      {
        source: '/koncepcia-kultury',
        destination: '/kultura-a-komunity/koncepcia-kultury',
        permanent: true,
      },
      {
        source: '/program-komplexnej-obnovy-zus-a-cvc-v-bratislave',
        destination: '/vzdelavanie-a-volny-cas/skolstvo/centra-volneho-casu',
        permanent: true,
      },
      {
        source: '/najvacsi-bikesharingovy-system-na-slovensku-slovnaft-bajk',
        destination: '/doprava-a-mapy/zdielana-mobilita/bikesharing',
        permanent: true,
      },
      {
        source: '/dopravne-projekty',
        destination: '/doprava-a-mapy/doprava/dopravne-projekty',
        permanent: true,
      },
      {
        source: '/filter/obchodne-spolocnosti-mesta',
        destination: '/mesto-bratislava/sprava-mesta/organizacie-mesta/obchodne-spolocnosti-mesta',
        permanent: true,
      },
      {
        source: '/kompetencie-primatora',
        destination: '/mesto-bratislava/sprava-mesta/volene-organy/primator/kompetencie-primatora',
        permanent: true,
      },
      {
        source: '/volene-organy',
        destination: '/mesto-bratislava/sprava-mesta/volene-organy',
        permanent: true,
      },
      {
        source: '/environmentalne-zataze',
        destination:
          '/zivotne-prostredie-a-vystavba/zivotne-prostredie/ochrana-prirody-a-krajiny/environmentalne-zataze',
        permanent: true,
      },
      {
        source: '/organizacia-alebo-institucia/centrum-volneho-casu-stefanikova-35',
        destination: '/vzdelavanie-a-volny-cas/skolstvo/centra-volneho-casu',
        permanent: true,
      },
      {
        source: '/organizacia-alebo-institucia/zakladna-umelecka-skola-ludovita-rajtera',
        destination: '/vzdelavanie-a-volny-cas/skolstvo/zakladne-umelecke-skoly',
        permanent: true,
      },
      {
        source: '/organizacia-alebo-institucia/centrum-volneho-casu-peknikova-2',
        destination: '/vzdelavanie-a-volny-cas/skolstvo/centra-volneho-casu',
        permanent: true,
      },
      {
        source: '/lamac',
        destination: '/mesto-bratislava/sprava-mesta/mestske-casti',
        permanent: true,
      },
      {
        source: '/adopcia-zelene',
        destination: '/zivotne-prostredie-a-vystavba/zelen/udrzba-a-tvorba-zelene/adopcia-zelene',
        permanent: true,
      },
      {
        source: '/odborne-komisie',
        destination: '/kultura-a-komunity/koncepcia-kultury/odborne-komisie',
        permanent: true,
      },
      {
        source: '/zastity-primatora',
        destination: '/mesto-bratislava/sprava-mesta/volene-organy/primator/zastita-primatora',
        permanent: true,
      },
      {
        source: '/rozpoctove-organizacie',
        destination: '/mesto-bratislava/sprava-mesta/organizacie-mesta/rozpoctove-organizacie',
        permanent: true,
      },
      {
        source:
          '/oznamenie-o-zacati-preskumania-uzemneho-planu-zony-dunajska-v-zneni-zmien-a-doplnkov-a-uzemneho-planu-zony-podhradie-k-u-stare-mesto-bratislava',
        destination:
          '/zivotne-prostredie-a-vystavba/rozvoj-mesta/uzemnoplanovacie-dokumenty/platna-uzemnoplanovacia-dokumentacia/uzemne-plany-zon/uzemny-plan-zony-dunajska',
        permanent: true,
      },
      {
        source: '/historicke-parky-a-zahrady',
        destination: '/zivotne-prostredie-a-vystavba/zelen/udrzba-a-tvorba-zelene/parky-a-zahrady',
        permanent: true,
      },
      {
        source: '/karlova-ves',
        destination: '/mesto-bratislava/sprava-mesta/mestske-casti',
        permanent: true,
      },
      {
        source: '/kapacity-newcomers-of-bratislava',
        destination: '/kultura-a-komunity/komunity/informacie-pre-cudzincov-zijucich-v-bratislave',
        permanent: true,
      },
      {
        source: '/organizacia-alebo-institucia/divadlo-p-o-hviezdoslava',
        destination: '/kultura-a-komunity/mestske-kulturne-organizacie/dpoh',
        permanent: true,
      },
      {
        source: '/uzemny-generel-vodnych-tokov-a-protipovodnovej-ochrany-mesta-bratislavy',
        destination:
          '/zivotne-prostredie-a-vystavba/rozvoj-mesta/uzemnoplanovacie-dokumenty/prerokovane-uzemnoplanovacie-podklady/uzemne-generely',
        permanent: true,
      },
      {
        source:
          '/organizacia-alebo-institucia/zakladna-umelecka-skola-milosa-ruppeldta-panenska-11',
        destination: '/vzdelavanie-a-volny-cas/skolstvo/zakladne-umelecke-skoly',
        permanent: true,
      },
      {
        source: '/kvetnate-luky',
        destination: '/zivotne-prostredie-a-vystavba/zelen/udrzba-a-tvorba-zelene/kvitnuce-luky',
        permanent: true,
      },
      {
        source: '/organizacia-alebo-institucia/centrum-volneho-casu-kuliskova-6',
        destination: '/vzdelavanie-a-volny-cas/skolstvo/centra-volneho-casu',
        permanent: true,
      },
      {
        source: '/organizacia-alebo-institucia/ksp-s-r-o',
        destination:
          '/mesto-bratislava/sprava-mesta/organizacie-mesta/obchodne-spolocnosti-mesta/ksp-sro',
        permanent: true,
      },
      {
        source: '/podunajske-biskupice',
        destination: '/mesto-bratislava/sprava-mesta/mestske-casti',
        permanent: true,
      },
      {
        source: '/spravy-z-vykonanych-kontrol',
        destination: '/mesto-bratislava/transparentne-mesto/cinnost-mestskeho-kontrolora',
        permanent: true,
      },
      {
        source: '/urbanisticka-studia-umiestnenia-najomneho-byvania-na-uzemi-bratislavy',
        destination:
          '/zivotne-prostredie-a-vystavba/rozvoj-mesta/uzemnoplanovacie-dokumenty/prerokovane-uzemnoplanovacie-podklady/urbanisticke-studie',
        permanent: true,
      },
      {
        source: '/vysledky-vybavenia-peticii',
        destination: '/mesto-bratislava/transparentne-mesto/peticie-a-staznosti',
        permanent: true,
      },
      {
        source: '/organizacia-alebo-institucia/zakladna-umelecka-skola-eugena-suchona',
        destination: '/vzdelavanie-a-volny-cas/skolstvo/zakladne-umelecke-skoly',
        permanent: true,
      },
      {
        source: '/organizacia-alebo-institucia/zakladna-umelecka-skola-radlinskeho-53',
        destination: '/vzdelavanie-a-volny-cas/skolstvo/zakladne-umelecke-skoly',
        permanent: true,
      },
      {
        source: '/organizacia-alebo-institucia/zakladna-umelecka-skola-vrbenskeho-1',
        destination: '/vzdelavanie-a-volny-cas/skolstvo/zakladne-umelecke-skoly',
        permanent: true,
      },
      {
        source: '/vykonnostne-audity-a-revizie-vydavkov',
        destination:
          '/mesto-bratislava/transparentne-mesto/rozpocet-a-hospodarenie/vykonnostne-audity-a-revizie-vydavkov',
        permanent: true,
      },
      {
        source: '/deti-pre-bratislavu',
        destination: '/vzdelavanie-a-volny-cas/deti-a-mladez/deti-pre-bratislavu',
        permanent: true,
      },
      {
        source: '/organizacia-alebo-institucia/zakladna-umelecka-skola-juliusa-kowalskeho',
        destination: '/vzdelavanie-a-volny-cas/skolstvo/zakladne-umelecke-skoly',
        permanent: true,
      },
      {
        source: '/organizacia-alebo-institucia/zakladna-umelecka-skola-jozefa-kresanka',
        destination: '/vzdelavanie-a-volny-cas/skolstvo/zakladne-umelecke-skoly',
        permanent: true,
      },
      {
        source: '/devin',
        destination: '/mesto-bratislava/sprava-mesta/mestske-casti',
        permanent: true,
      },
      {
        source: '/organizacia-alebo-institucia/zakladna-umelecka-skola-halkova-54',
        destination: '/vzdelavanie-a-volny-cas/skolstvo/zakladne-umelecke-skoly',
        permanent: true,
      },
      {
        source: '/organizacia-alebo-institucia/galeria-mesta-bratislavy',
        destination: '/mesto-bratislava/prilezitosti-pre-partnerstva/galeria-mesta-bratislavy',
        permanent: true,
      },
      {
        source: '/organizacia-alebo-institucia/zakladna-umelecka-skola-exnarova-6',
        destination: '/vzdelavanie-a-volny-cas/skolstvo/zakladne-umelecke-skoly',
        permanent: true,
      },
      {
        source: '/vyznam-znaciek-na-obaloch',
        destination: '/zivotne-prostredie-a-vystavba/zivotne-prostredie/odpady/triedeny-zber',
        permanent: true,
      },
      {
        source: '/metropolitny-institut-bratislavy',
        destination: '/mesto-bratislava/sprava-mesta/organizacie-mesta/prispevkove-organizacie',
        permanent: true,
      },
      {
        source: '/nacelnik-cka-mestskej-policie-vyberove-konanie',
        destination: '/mesto-bratislava/transparentne-mesto/vyberove-konania',
        permanent: true,
      },
      {
        source: '/system-zberu',
        destination: '/zivotne-prostredie-a-vystavba/zivotne-prostredie/odpady/triedeny-zber',
        permanent: true,
      },
      {
        source: '/organizacia-alebo-institucia/zakladna-umelecka-skola-frantiska-oswalda',
        destination: '/vzdelavanie-a-volny-cas/skolstvo/zakladne-umelecke-skoly',
        permanent: true,
      },
      {
        source: '/triedeny-odpad',
        destination: '/zivotne-prostredie-a-vystavba/zivotne-prostredie/odpady/triedeny-zber',
        permanent: true,
      },
      {
        source: '/zmluvy',
        destination: '/mesto-bratislava/transparentne-mesto/zmluvy-faktury-objednavky',
        permanent: true,
      },
      {
        source: '/organizacia-alebo-institucia/muzeum-mesta-bratislavy',
        destination: 'mesto-bratislava/prilezitosti-pre-partnerstva/muzeum-mesta-bratislavy',
        permanent: true,
      },
      {
        source: '/organizacia-alebo-institucia/zakladna-umelecka-skola-istrijska-22',
        destination: '/vzdelavanie-a-volny-cas/skolstvo/zakladne-umelecke-skoly',
        permanent: true,
      },
      {
        source: '/vyberove-konanie-clen-predstavenstva-cfo-olo-2',
        destination: '/mesto-bratislava/transparentne-mesto/vyberove-konania',
        permanent: true,
      },
      {
        source: '/vyberove-konanie-riaditel-ka-marianum',
        destination: '/mesto-bratislava/transparentne-mesto/vyberove-konania',
        permanent: true,
      },
      {
        source: '/horsky-park-je-historicky',
        destination:
          '/zivotne-prostredie-a-vystavba/zelen/udrzba-a-tvorba-zelene/parky-a-zahrady/horsky-park',
        permanent: true,
      },
      {
        source: '/zastava',
        destination: '/mesto-bratislava/sprava-mesta/vizualna-identita/symboly-mesta',
        permanent: true,
      },
      {
        source: '/pracovne-prilezitosti',
        destination: 'mesto-bratislava/sprava-mesta/magistrat/pracovne-prilezitosti',
        permanent: true,
      },
      {
        source: '/medzinarodna-spolupraca',
        destination: '/mesto-bratislava/sprava-mesta/medzinarodna-spolupraca',
        permanent: true,
      },
      {
        source: '/zdielana-mobilita',
        destination: '/doprava-a-mapy/zdielana-mobilita',
        permanent: true,
      },
      {
        source: '/organizacia-alebo-institucia/bratislavska-integrovana-doprava',
        destination:
          '/mesto-bratislava/sprava-mesta/organizacie-mesta/obchodne-spolocnosti-mesta/bratislavska-integrovana-doprava',
        permanent: true,
      },
      {
        source: '/vyhladavanie-podani',
        destination: '/sledovanie-podania',
        permanent: true,
      },
      {
        source: '/organizacia-alebo-institucia/spolocnost-pre-rozvoj-byvania-v-bratislave',
        destination:
          '/mesto-bratislava/sprava-mesta/organizacie-mesta/ostatne-organizacie/bratislavska-organizacia-byvania',
        permanent: true,
      },
      {
        source: '/organizacia-alebo-institucia/retest',
        destination:
          '/socialne-sluzby-a-byvanie/socialne-zariadenia/centrum-pre-deti-a-rodiny-s-resocializacnym-programom-retest',
        permanent: true,
      },
      {
        source: '/zonacia-horskeho-parku',
        destination:
          '/zivotne-prostredie-a-vystavba/zelen/udrzba-a-tvorba-zelene/parky-a-zahrady/horsky-park',
        permanent: true,
      },
      {
        source: '/rocne-spravy',
        destination: '/mesto-bratislava/transparentne-mesto/vyrocne-spravy',
        permanent: true,
      },
      {
        source:
          '/organizacia-alebo-institucia/sprava-telovychovnych-a-rekreacnych-zariadeni-hlavneho-mesta-sr-bratislava-starz',
        destination: '/vzdelavanie-a-volny-cas/sport/STARZ',
        permanent: true,
      },
      {
        source: '/upnz-podhradie-zavazna-cast',
        destination:
          '/zivotne-prostredie-a-vystavba/rozvoj-mesta/uzemnoplanovacie-dokumenty/platna-uzemnoplanovacia-dokumentacia/uzemne-plany-zon/uzemny-plan-zony-podhradie',
        permanent: true,
      },
      {
        source: '/nestatne-skolstvo',
        destination: '/vzdelavanie-a-volny-cas/skolstvo/nestatne-skolstvo',
        permanent: true,
      },
      {
        source: '/budovanie-stanovist',
        destination:
          '/zivotne-prostredie-a-vystavba/zivotne-prostredie/odpady/kontajnerove-stanovistia',
        permanent: true,
      },
      {
        source: '/specifikum-horskeho-parku',
        destination:
          '/zivotne-prostredie-a-vystavba/zelen/udrzba-a-tvorba-zelene/parky-a-zahrady/horsky-park',
        permanent: true,
      },
      {
        source: '/vyberove-konanie-riaditel-ka-mestskeho-parkovacieho-systemu-s-r-o',
        destination: '/mesto-bratislava/transparentne-mesto/vyberove-konania',
        permanent: true,
      },
      {
        source: '/hazardne-hry',
        destination: 'mesto-bratislava/dane-a-poplatky/hazardne-hry',
        permanent: true,
      },
      {
        source: '/poplatky-za-komunalne-odpady-a-drobne-stavebne-odpady',
        destination:
          '/mesto-bratislava/dane-a-poplatky/poplatok-za-komunalne-odpady-a-drobne-stavebne-odpady',
        permanent: true,
      },
      {
        source: '/mestska-skolska-rada',
        destination: 'vzdelavanie-a-volny-cas/skolstvo/mestska-skolska-rada',
        permanent: true,
      },
      {
        source: '/organizacia-alebo-institucia/mestsky-ustav-ochrany-pamiatok',
        destination:
          '/kultura-a-komunity/mestske-kulturne-organizacie/mestsky-ustav-ochrany-pamiatok',
        permanent: true,
      },
      {
        source: '/integrovany-regionalny-operacny-program',
        destination:
          '/mesto-bratislava/projekty/eu-projekty/integrovany-regionalny-operacny-program',
        permanent: true,
      },
      {
        source: '/mestsky-parlament-mladych',
        destination: '/vzdelavanie-a-volny-cas/deti-a-mladez/mestsky-parlament-mladych',
        permanent: true,
      },
      {
        source: '/projekty',
        destination: '/mesto-bratislava/projekty',
        permanent: true,
      },
      {
        source: '/vyberove-konanie-predseda-predstavenstva-ceo-technicke-siete-bratislava',
        destination: '/mesto-bratislava/transparentne-mesto/vyberove-konania',
        permanent: true,
      },
      {
        source: '/ziadosti-o-poskytnutie-informacie',
        destination: '/mesto-bratislava/transparentne-mesto/spristupnovanie-informacii',
        permanent: true,
      },
      {
        source: '/vyberove-konanie-predseda-predstavenstva-bvs',
        destination: '/mesto-bratislava/transparentne-mesto/vyberove-konania',
        permanent: true,
      },
      {
        source: '/cleanmobility',
        destination:
          '/mesto-bratislava/projekty/eu-projekty/interreg-v-a-slovenska-republika–rakusko',
        permanent: true,
      },
      {
        source: '/informacie-o-plneni-a-cerpani-rozpoctu',
        destination: '/mesto-bratislava/transparentne-mesto/rozpocet-a-hospodarenie',
        permanent: true,
      },
      {
        source: '/vyberove-konanie-clen-predstavenstva-cfo',
        destination: '/mesto-bratislava/transparentne-mesto/vyberove-konania',
        permanent: true,
      },
      {
        source: '/dokumenty-uzemneho-generelu',
        destination: '/doprava-a-mapy/doprava/uzemny-generel-dopravy',
        permanent: true,
      },
      {
        source: '/zimna-udrzba-co-robi-mesto',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/zimna-udrzba',
        permanent: true,
      },
      {
        source: '/triedenie-zelene',
        destination: '/zivotne-prostredie-a-vystavba/zelen',
        permanent: true,
      },
      {
        source: '/vyberove-konanie-predseda-nicka-predstavenstva-olo',
        destination:
          '/mesto-bratislava/sprava-mesta/organizacie-mesta/obchodne-spolocnosti-mesta/olo',
        permanent: true,
      },
      {
        source: '/organizacia-alebo-institucia/halbart',
        destination:
          '/mesto-bratislava/sprava-mesta/organizacie-mesta/obchodne-spolocnosti-mesta/halbart',
        permanent: true,
      },
      {
        source: '/vyberove-konanie-clen-predstavenstva-cso-bvs',
        destination: '/mesto-bratislava/transparentne-mesto/vyberove-konania',
        permanent: true,
      },
      {
        source: '/cezhranicna-spolupraca-v-oblasti-kultury',
        destination: '/kultura-a-komunity/koncepcia-kultury/kulturne-projekty',
        permanent: true,
      },
      {
        source: '/vyberove-konanie-clen-predstavenstva-cfo-bvs',
        destination: '/mesto-bratislava/transparentne-mesto/vyberove-konania',
        permanent: true,
      },
      {
        source: '/financny-mechanizmus-ehp-a-norska-2014-2021',
        destination:
          '/mesto-bratislava/projekty/eu-projekty/financny-mechanizmus-ehp-a-norska-2014-2021',
        permanent: true,
      },
      {
        source: '/protikorupcne-standardy',
        destination: '/mesto-bratislava/transparentne-mesto/protikorupcne-standardy',
        permanent: true,
      },
      {
        source:
          '/vyberove-konanie-na-riaditela-ku-bratislavskeho-a-kulturneho-informacneho-strediska',
        destination: '/mesto-bratislava/transparentne-mesto/vyberove-konania',
        permanent: true,
      },
      {
        source: '/rozpoctove-pravidla',
        destination:
          '/mesto-bratislava/transparentne-mesto/rozpocet-a-hospodarenie/rozpoctove-pravidla',
        permanent: true,
      },
      {
        source: '/o-com-je-zimna-udrzba',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/zimna-udrzba',
        permanent: true,
      },
      {
        source: '/uzemny-plan-zony-podhradie',
        destination:
          '/zivotne-prostredie-a-vystavba/rozvoj-mesta/uzemnoplanovacie-dokumenty/platna-uzemnoplanovacia-dokumentacia/uzemne-plany-zon/uzemny-plan-zony-podhradie',
        permanent: true,
      },
      {
        source: '/protikorupcne-minimum',
        destination: '/mesto-bratislava/transparentne-mesto/protikorupcne-standardy',
        permanent: true,
      },
      {
        source: '/uzemny-plan-zony-dunajska',
        destination:
          '/zivotne-prostredie-a-vystavba/rozvoj-mesta/uzemnoplanovacie-dokumenty/platna-uzemnoplanovacia-dokumentacia/uzemne-plany-zon/uzemny-plan-zony-dunajska',
        permanent: true,
      },
      {
        source: '/ako-bude-horsky-park-vyuzivany-po-novom',
        destination:
          '/zivotne-prostredie-a-vystavba/zelen/udrzba-a-tvorba-zelene/parky-a-zahrady/horsky-park',
        permanent: true,
      },
      {
        source: '/novinky',
        destination: '/mesto-bratislava/transparentne-mesto/aktuality',
        permanent: true,
      },
      {
        source: '/faktury',
        destination: '/mesto-bratislava/transparentne-mesto/zmluvy-faktury-objednavky',
        permanent: true,
      },
      {
        source: '/kultura-a-pamiatkova-starostlivost',
        destination: '/kultura-a-komunity/kulturne-dedicstvo-a-pamiatkova-starostlivost',
        permanent: true,
      },
      {
        source: '/zakladne-umelecke-skoly',
        destination: '/vzdelavanie-a-volny-cas/skolstvo/zakladne-umelecke-skoly',
        permanent: true,
      },
      {
        source: '/ubytovna-fortuna/',
        destination:
          '/socialne-sluzby-a-byvanie/socialne-sluzby/nizkoprahova-socialna-sluzba-pre-deti-a-rodinu-fortunacik',
        permanent: true,
      },
      {
        source: '/strategia-nakladania-s-komunalnymi-odpadmi',
        destination: '/zivotne-prostredie-a-vystavba/zivotne-prostredie/odpady',
        permanent: true,
      },
      {
        source: '/vyberove-konanie-predseda-predstavenstva-olo',
        destination:
          '/mesto-bratislava/sprava-mesta/organizacie-mesta/obchodne-spolocnosti-mesta/olo',
        permanent: true,
      },
      {
        source: '/kalendar/',
        destination: '/kultura-a-komunity/podujatia/kalendar-podujati',
        permanent: true,
      },
      {
        source: '/územný-plán',
        destination:
          '/zivotne-prostredie-a-vystavba/rozvoj-mesta/uzemnoplanovacie-dokumenty/platna-uzemnoplanovacia-dokumentacia/uzemny-plan-mesta-a-jeho-zmeny-a-doplnky',
        permanent: true,
      },
      {
        source: '/objednavky',
        destination: '/mesto-bratislava/transparentne-mesto/zmluvy-faktury-objednavky',
        permanent: true,
      },
      {
        source: '/parky-a-parkovo-upravovane-plochy',
        destination: '/zivotne-prostredie-a-vystavba/zelen/udrzba-a-tvorba-zelene/parky-a-zahrady',
        permanent: true,
      },
      {
        source: '/rozvoj-najomneho-byvania',
        destination: '/socialne-sluzby-a-byvanie/byvanie-a-ubytovanie/rozvoj-najomneho-byvania',
        permanent: true,
      },
      {
        source: '/archiv-mesta-bratislavy',
        destination:
          '/kultura-a-komunity/kulturne-sluzby/sluzby-badatelne-archivu-mesta-bratislavy',
        permanent: true,
      },
      {
        source:
          '/organizacia-alebo-institucia/bratislavska-organizacia-byvania-neziskova-organizacia',
        destination:
          '/mesto-bratislava/sprava-mesta/organizacie-mesta/ostatne-organizacie/bratislavska-organizacia-byvania',
        permanent: true,
      },
      {
        source: '/zimna-udrzba-pridat-ruku-k-dielu-mozeme-vsetci',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/zimna-udrzba',
        permanent: true,
      },
      {
        source: '/sucasny-stav-horskeho-parku-a-dalsie-vizie',
        destination:
          '/zivotne-prostredie-a-vystavba/zelen/udrzba-a-tvorba-zelene/parky-a-zahrady/horsky-park',
        permanent: true,
      },
      {
        source: '/erb-bratislavy-jednofarebny',
        destination: '/mesto-bratislava/sprava-mesta/vizualna-identita/symboly-mesta',
        permanent: true,
      },
      {
        source: '/erb-bratislavy-farebny',
        destination: '/mesto-bratislava/sprava-mesta/vizualna-identita/symboly-mesta',
        permanent: true,
      },
      {
        source: '/bratislava-pre-vsetkych-grantovy-program-v-socialnej-oblasti',
        destination:
          '/socialne-sluzby-a-byvanie/financna-podpora/grantovy-program-v-socialnej-oblasti-bratislava-pre-vsetkych',
        permanent: true,
      },
      {
        source: '/zimna-udrzba',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/zimna-udrzba',
        permanent: true,
      },
      {
        source: '/analyzy-v-socialnej-oblasti',
        destination:
          '/socialne-sluzby-a-byvanie/aktivity-v-socialnej-oblasti/analyzy-v-socialnej-oblasti',
        permanent: true,
      },
      {
        source: '/sekcia-zivotneho-prostredia',
        destination: '/zivotne-prostredie-a-vystavba/zivotne-prostredie',
        permanent: true,
      },
      {
        source: '/ubytovanie',
        destination: '/socialne-sluzby-a-byvanie/byvanie-a-ubytovanie',
        permanent: true,
      },
      {
        source: '/urbanisticka-studia-malokarpatskej-casti-bratislavskeho-lesoparku/d-11022481',
        destination:
          '/zivotne-prostredie-a-vystavba/rozvoj-mesta/uzemnoplanovacie-dokumenty/prerokovane-uzemnoplanovacie-podklady/urbanisticke-studie',
        permanent: true,
      },
      {
        source: '/horuca-linka-pre-zimnu-udrzbu-chodnikov',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/zimna-udrzba',
        permanent: true,
      },
      {
        source: '/baum-2020-de',
        destination:
          '/mesto-bratislava/projekty/eu-projekty/interreg-v-a-slovenska-republika–rakusko',
        permanent: true,
      },
      {
        source: '/sekcia-uzemneho-planovania',
        destination:
          '/zivotne-prostredie-a-vystavba/rozvoj-mesta/uzemnoplanovacie-dokumenty/platna-uzemnoplanovacia-dokumentacia/uzemne-plany-zon',
        permanent: true,
      },
      {
        source: '/financny-prispevok-na-hospodarenie-so-zrazkovou-vodou',
        destination:
          '/mesto-bratislava/transparentne-mesto/pridelovanie-dotacii/financny-prispevok-na-hospodarenie-so-zrazkovou-vodou',
        permanent: true,
      },
      {
        source: '/fortunacik/d-11037489/p1=11056800',
        destination:
          '/socialne-sluzby-a-byvanie/socialne-sluzby/nizkoprahova-socialna-sluzba-pre-deti-a-rodinu-fortunacik',
        permanent: true,
      },
      {
        source: '/sekcia-dopravy',
        destination: '/doprava-a-mapy',
        permanent: true,
      },
      {
        source: '/nocna-pomoc',
        destination: '/mesto-bratislava/projekty/kampane/nocna-pomoc',
        permanent: true,
      },
      {
        source: '/sadni-si',
        destination: '/mesto-bratislava/projekty/sadni-si',
        permanent: true,
      },
      {
        source: '/mesto-bratislava/projekty/kampane/sadni-si',
        destination: '/mesto-bratislava/projekty/sadni-si',
        permanent: true,
      },
      {
        source: '/vzdelavanie-a-volny-cas/camping/:slug*',
        destination: '/vzdelavanie-a-volny-cas/sport/kemping/:slug*',
        permanent: true,
      },
      {
        source: '/en/education-and-leisure/camping/:slug*',
        destination: '/en/education-and-leisure/sport/camping/:slug*',
        locale: false,
        permanent: true,
      },
      {
        source: '/bratislava-pre-ukrajinu/asistencne-centrum-bottova',
        destination:
          '/kultura-a-komunity/komunity/asistencne-centrum-pre-ludi-s-cudzineckym-povodom',
        permanent: true,
      },
      {
        source: '/en/bratislava-for-ukraine/assistance-centre-of-help-on-bottova-street',
        destination:
          '/en/culture-and-communities/communities/assistance-centre-for-people-of-foreign-origin',
        locale: false,
        permanent: true,
      },
    ]
  },
  // Docs: https://react-svgr.com/docs/next/
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'))

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: {
          loader: '@svgr/webpack',
          options: { svgoConfig },
        },
      },
    )

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i

    return config
  },
}

// https://github.com/4lejandrito/next-plausible#proxy-the-analytics-script
module.exports = withPlausibleProxy()({
  ...nextConfig,
})

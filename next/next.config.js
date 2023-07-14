const { withPlausibleProxy } = require('next-plausible')

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  i18n: {
    defaultLocale: 'sk',
    locales: ['en', 'sk'],
    localeDetection: false,
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
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
        destination: '/blog/:path*',
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
        destination: '/mesto-bratislava/sprava-mesta/magistrat/organizacna-struktura-a-kontakty',
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
        source:
          '/sprava/bratislava-vyhlasuje-sutaz-o-rocne-elektricenky-pre-zaockovanych-chce-rychlejsie-dosiahnut-kolektivnu-imunitu',
        destination:
          '/blog/bratislava-vyhlasuje-sutaz-o-rocne-elektricenky-pre-zaockovanych-chce-rychlejsie-dosiahnut-kolektivnu-imunitu',
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
        source:
          '/sprava/prve-udaje-zo-scitania-obyvatelov-bratislavy-vykazuju-zasadny-rozdiel-medzi-evidenciou-obce-a-vysledkom-statistov',
        destination:
          '/blog/prve-udaje-zo-scitania-obyvatelov-bratislavy-vykazuju-zasadny-rozdiel-medzi-evidenciou-obce-a-vysledkom-statistov',
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
        source: '/uzemny-plan-hlavneho-mesta-sr-bratislavy-zmeny-a-doplnky-06',
        destination:
          '/zivotne-prostredie-a-vystavba/rozvoj-mesta/platna-uzemnoplanovacia-dokumentacia/uzemny-plan-mesta-a-jeho-zmeny-a-doplnky/zmeny-a-doplnky-06',
        permanent: true,
      },
      {
        source: '/filter/rozkopavky-a-uzavierky',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source: '/filter/predaj-a-prenajom-nehnutelnosti',
        destination: '/mesto-bratislava/transparentne-mesto/majetok-mesta',
        permanent: true,
      },
      {
        source:
          '/sprava/bratislavske-letne-kupaliska-sa-pripravuju-na-sezonu-mesto-ponuka-akciu-na-zvyhodnenu-permanentku',
        destination:
          '/blog/bratislavske-letne-kupaliska-sa-pripravuju-na-sezonu-mesto-ponuka-akciu-na-zvyhodnenu-permanentku',
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
        source: '/uzemny-plan-hlavneho-mesta-sr-bratislavy-zmeny-a-doplnky-02',
        destination:
          '/zivotne-prostredie-a-vystavba/rozvoj-mesta/platna-uzemnoplanovacia-dokumentacia/uzemny-plan-mesta-a-jeho-zmeny-a-doplnky/zmeny-a-doplnky-02',
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
        source: '/filter/pracovne-prilezitosti',
        destination: '/mesto-bratislava/sprava-mesta/magistrat/pracovne-prilezitosti',
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
        source: '/uzemny-plan-hlavneho-mesta-sr-bratislavy-zmeny-a-doplnky-01',
        destination:
          '/zivotne-prostredie-a-vystavba/rozvoj-mesta/uzemnoplanovacie-dokumenty/platna-uzemnoplanovacia-dokumentacia/uzemny-plan-mesta-a-jeho-zmeny-a-doplnky/zmeny-a-doplnky-01',
        permanent: true,
      },
      {
        source: '/братислава-для-украіни',
        destination: '/kultura-a-komunity/komunity/братислава-для-украіни',
        permanent: true,
      },
      {
        source: '/uzemny-plan-hlavneho-mesta-sr-bratislavy-zmeny-a-doplnky-07',
        destination:
          'zivotne-prostredie-a-vystavba/rozvoj-mesta/uzemnoplanovacie-dokumenty/platna-uzemnoplanovacia-dokumentacia/uzemny-plan-mesta-a-jeho-zmeny-a-doplnky/zmeny-a-doplnky-07',
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
        source: '/uzemny-plan-hlavneho-mesta-sr-bratislavy-zmeny-a-doplnky-05',
        destination:
          'zivotne-prostredie-a-vystavba/rozvoj-mesta/uzemnoplanovacie-dokumenty/platna-uzemnoplanovacia-dokumentacia/uzemny-plan-mesta-a-jeho-zmeny-a-doplnky/zmeny-a-doplnky-05',
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
          '/sprava/bratislava-ma-novy-geoportal-data-o-meste-spristupnuje-na-prehladnych-mapach-ci-vizualizaciach',
        destination:
          '/blog/bratislava-ma-novy-geoportal-data-o-meste-spristupnuje-na-prehladnych-mapach-ci-vizualizaciach',
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
        source: '/uzemny-plan-hlavneho-mesta-sr-bratislavy-zmeny-a-doplnky-03',
        destination:
          'zivotne-prostredie-a-vystavba/rozvoj-mesta/uzemnoplanovacie-dokumenty/platna-uzemnoplanovacia-dokumentacia/uzemny-plan-mesta-a-jeho-zmeny-a-doplnky/zmeny-a-doplnky-03',
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
        source:
          '/sprava/vianocne-stromceky-budeme-po-novom-zbierat-podla-harmonogramu-a-aj-zo-specialnych-drevenych-ohradok',
        destination:
          '/blog/vianocne-stromceky-budeme-po-novom-zbierat-podla-harmonogramu-a-aj-zo-specialnych-drevenych-ohradok',
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
        source: '/dan-z-nehnutelnosti',
        destination: '/mesto-bratislava/dane-a-poplatky/dan-z-nehnutelnosti',
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
        source:
          '/sprava/hlavna-stanica-sa-bude-riesit-komplexne-ministerstvo-dopravy-zeleznice-slovenskej-republiky-a-hlavne-mesto-bratislava-podpisali-memorandum-o-spolupraci-pri-realizacii-projektu-rozvoja-hlavnej-stanice-a-jej-prilahleho-uzemia',
        destination:
          '/blog/hlavna-stanica-sa-bude-riesit-komplexne-ministerstvo-dopravy-zeleznice-slovenskej-republiky-a-hlavne-mesto-bratislava-podpisali-memorandum-o-spolupraci-pri-realizacii-projektu-rozvoja-hlavnej-stanice-a-jej-prilahleho-uzemia',
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
        source:
          '/sprava/hlavne-mesto-bratislava-sa-opat-zapaja-do-celosvetovej-iniciativy-climathon-a-podpori-inovativne-riesenia-bojujuce-s-klimatickou-krizou',
        destination:
          '/blog/hlavne-mesto-bratislava-sa-opat-zapaja-do-celosvetovej-iniciativy-climathon-a-podpori-inovativne-riesenia-bojujuce-s-klimatickou-krizou',
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
          '/sprava/vznika-novy-mestsky-podnik-technicke-siete-bratislava-do-konca-roku-2025-zmodernizuje-osvetlenie-v-hlavnom-meste',
        destination:
          '/blog/vznika-novy-mestsky-podnik-technicke-siete-bratislava-do-konca-roku-2025-zmodernizuje-osvetlenie-v-hlavnom-meste',
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
        source:
          '/sprava/od-jula-pride-k-viacerym-zmenam-v-mhd-predlzenie-trasy-66-ky-a-lepsie-nadvazovanie-ostatnych-liniek',
        destination:
          '/blog/od-jula-pride-k-viacerym-zmenam-v-mhd-predlzenie-trasy-66-ky-a-lepsie-nadvazovanie-ostatnych-liniek',
        permanent: true,
      },
      {
        source:
          '/sprava/mesto-bratislava-otvara-grantovu-vyzvu-na-podporu-pohybovych-aktivit-a-neformalneho-vzdelavania-deti-mladeze-a-pracovnikov-v-oblasti-prace-s-detmi-a-mladezou',
        destination:
          '/blog/mesto-bratislava-otvara-grantovu-vyzvu-na-podporu-pohybovych-aktivit-a-neformalneho-vzdelavania-deti-mladeze-a-pracovnikov-v-oblasti-prace-s-detmi-a-mladezou',
        permanent: true,
      },
      {
        source: '/organizacia-alebo-institucia/zakladna-umelecka-skola-exnarova-6',
        destination: '/vzdelavanie-a-volny-cas/skolstvo/zakladne-umelecke-skoly',
        permanent: true,
      },
      {
        source:
          '/sprava/vitazny-navrh-pre-zive-namestie-opat-po-desatrociach-zjednoti-kamenne-namestie-namestie-neznej-revolucie-a-namestie-snp',
        destination:
          '/blog/vitazny-navrh-pre-zive-namestie-opat-po-desatrociach-zjednoti-kamenne-namestie-namestie-neznej-revolucie-a-namestie-snp',
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
        source:
          '/sprava/mesto-tvori-novu-viziu-pre-bratislavu-ako-bude-vyzerat-bratislava-v-roku-2030-mozu-ovplyvnit-aj-bratislavcanky-a-bratislavcania',
        destination:
          '/blog/mesto-tvori-novu-viziu-pre-bratislavu-ako-bude-vyzerat-bratislava-v-roku-2030-mozu-ovplyvnit-aj-bratislavcanky-a-bratislavcania',
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
        source:
          '/sprava/hlavne-mesto-vyhlasuje-grantovu-vyzvu-na-podporu-investicii-do-sportovej-infrastruktury-na-rok-2022-2',
        destination:
          '/blog/hlavne-mesto-vyhlasuje-grantovu-vyzvu-na-podporu-investicii-do-sportovej-infrastruktury-na-rok-2022-2',
        permanent: true,
      },
      {
        source: '/organizacia-alebo-institucia/zakladna-umelecka-skola-istrijska-22',
        destination: '/vzdelavanie-a-volny-cas/skolstvo/zakladne-umelecke-skoly',
        permanent: true,
      },
      {
        source:
          '/sprava/mestske-zastupitelstvo-schvalilo-v-ramci-zmien-a-doplnkov-uzemneho-planu-novu-regulaciu-reklamnych-stavieb',
        destination:
          '/blog/mestske-zastupitelstvo-schvalilo-v-ramci-zmien-a-doplnkov-uzemneho-planu-novu-regulaciu-reklamnych-stavieb',
        permanent: true,
      },
      {
        source:
          '/sprava/od-septembra-pride-k-viacerym-zmenam-v-mhd-obnovenie-plnej-prevadzky-podla-rezimu-skolsky-rok-a-zlepsenie-obsluznosti-vo-viacerych-castiach-mesta',
        destination:
          '/blog/od-septembra-pride-k-viacerym-zmenam-v-mhd-obnovenie-plnej-prevadzky-podla-rezimu-skolsky-rok-a-zlepsenie-obsluznosti-vo-viacerych-castiach-mesta',
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
        source:
          '/sprava/vodna-veza-v-bratislavskom-podhradi-prejde-citlivou-obnovou-investor-je-tesne-pred-vyhlasenim-architektonickej-sutaze',
        destination:
          '/blog/vodna-veza-v-bratislavskom-podhradi-prejde-citlivou-obnovou-investor-je-tesne-pred-vyhlasenim-architektonickej-sutaze',
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
        source:
          '/sprava/dnes-bolo-ukoncene-predkladanie-ponuk-verejneho-obstaravania-na-zhotovitela-novej-elektrickovej-trate-v-petrzalke',
        destination:
          '/blog/dnes-bolo-ukoncene-predkladanie-ponuk-verejneho-obstaravania-na-zhotovitela-novej-elektrickovej-trate-v-petrzalke',
        permanent: true,
      },
      {
        source:
          '/sprava/bratislava-bude-mat-po-vzore-inych-europskych-miest-vlastnu-dlazbu-inspirovana-je-fullom-ciparom-a-dobesom',
        destination:
          '/blog/bratislava-bude-mat-po-vzore-inych-europskych-miest-vlastnu-dlazbu-inspirovana-je-fullom-ciparom-a-dobesom',
        permanent: true,
      },
      {
        source: '/medzinarodna-spolupraca',
        destination: '/mesto-bratislava/sprava-mesta/medzinarodna-spolupraca',
        permanent: true,
      },
      {
        source:
          '/sprava/mesto-obnovuje-cinnost-organizacie-pre-potreby-realizacie-politiky-mestskeho-najomneho-byvania',
        destination:
          '/blog/mesto-obnovuje-cinnost-organizacie-pre-potreby-realizacie-politiky-mestskeho-najomneho-byvania',
        permanent: true,
      },
      {
        source: '/zdielana-mobilita',
        destination: '/doprava-a-mapy/zdielana-mobilita',
        permanent: true,
      },
      {
        source: '/rozkopavka-alebo-uzavierka/ciastocna-uzavierka-most-snp',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source:
          '/sprava/den-otvorenych-dveri-dopravneho-podniku-bratislava-prehliadka-vozidiel-dielni-a-bohaty-program',
        destination:
          '/blog/den-otvorenych-dveri-dopravneho-podniku-bratislava-prehliadka-vozidiel-dielni-a-bohaty-program',
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
        source:
          '/rozkopavka-alebo-uzavierka/ciastocna-uzavierka-karpatskej-ulice-podkolibskej-ulice-a-pionierskej-ulice',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source:
          '/sprava/mesto-bratislava-podpori-v-roku-2022-kulturne-a-komunitne-projekty-rekordnou-sumou-1-2-miliona-eur',
        destination:
          '/blog/mesto-bratislava-podpori-v-roku-2022-kulturne-a-komunitne-projekty-rekordnou-sumou-1-2-miliona-eur',
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
        source:
          '/sprava/bratislava-ziskala-v-ramci-ocenenia-zlate-vedro-2020-od-odkazprestarostu-sk-2-miesto-v-kategorii-komunikacia',
        destination:
          '/blog/bratislava-ziskala-v-ramci-ocenenia-zlate-vedro-2020-od-odkazprestarostu-sk-2-miesto-v-kategorii-komunikacia',
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
        source:
          '/sprava/architekti-navrhli-novu-podobu-zanedbaneho-priestoru-v-okoli-domu-sluzieb-v-dubravke-pribudne-vodna-plocha-aj-multifunkcny-pavilon',
        destination:
          '/blog/architekti-navrhli-novu-podobu-zanedbaneho-priestoru-v-okoli-domu-sluzieb-v-dubravke-pribudne-vodna-plocha-aj-multifunkcny-pavilon',
        permanent: true,
      },
      {
        source: '/organizacia-alebo-institucia/mestsky-ustav-ochrany-pamiatok',
        destination:
          '/kultura-a-komunity/mestske-kulturne-organizacie/mestsky-ustav-ochrany-pamiatok',
        permanent: true,
      },
      {
        source:
          '/sprava/spustenie-ankety-o-najuspesnejsieho-sportovca-sportovkynu-a-sportovy-kolektiv-bratislavy-a-bratislavskeho-kraja-za-rok-2021',
        destination:
          '/blog/spustenie-ankety-o-najuspesnejsieho-sportovca-sportovkynu-a-sportovy-kolektiv-bratislavy-a-bratislavskeho-kraja-za-rok-2021',
        permanent: true,
      },
      {
        source: '/integrovany-regionalny-operacny-program',
        destination:
          '/mesto-bratislava/projekty/eu-projekty/integrovany-regionalny-operacny-program',
        permanent: true,
      },
      {
        source:
          '/sprava/bratislava-ziska-300-novych-bratislavskych-laviciek-vdaka-partnerstvu-s-csob-prve-pribudnu-v-uliciach-hlavneho-mesta-do-konca-roka',
        destination:
          '/blog/bratislava-ziska-300-novych-bratislavskych-laviciek-vdaka-partnerstvu-s-csob-prve-pribudnu-v-uliciach-hlavneho-mesta-do-konca-roka',
        permanent: true,
      },
      {
        source: '/mestsky-parlament-mladych',
        destination: '/vzdelavanie-a-volny-cas/deti-a-mladez/mestsky-parlament-mladych',
        permanent: true,
      },
      {
        source:
          '/sprava/bratislava-ma-na-dosah-tridsat-novych-elektriciek-najnovsie-kusy-budu-vybavene-modernymi-technologiami-a-nahradia-zastarane-ktore-sluzia-aj-viac-ako-styri-dekady',
        destination:
          '/blog/bratislava-ma-na-dosah-tridsat-novych-elektriciek-najnovsie-kusy-budu-vybavene-modernymi-technologiami-a-nahradia-zastarane-ktore-sluzia-aj-viac-ako-styri-dekady',
        permanent: true,
      },
      {
        source: '/rozkopavka-alebo-uzavierka/uplna-uzavierka-pribinova-culenova-a-kosicka',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source:
          '/sprava/mobilna-aplikacia-ids-bk-prinasa-jednoduche-a-sikovne-cestovanie-po-novom-v-bratislavskom-kraji',
        destination:
          '/blog/mobilna-aplikacia-ids-bk-prinasa-jednoduche-a-sikovne-cestovanie-po-novom-v-bratislavskom-kraji',
        permanent: true,
      },
      {
        source:
          '/sprava/startovne-z-jubilujuceho-narodneho-behu-devin-bratislava-je-na-ceste-k-zdravotnikom-poputuje-im-viac-ako-29-tisic-eur',
        destination:
          '/blog/startovne-z-jubilujuceho-narodneho-behu-devin-bratislava-je-na-ceste-k-zdravotnikom-poputuje-im-viac-ako-29-tisic-eur',
        permanent: true,
      },
      {
        source:
          '/sprava/v-hlavnom-meste-pribudnu-nove-a-modernizovane-trolejbusove-trate-projektanti-sa-mozu-pustit-do-prace',
        destination:
          '/blog/v-hlavnom-meste-pribudnu-nove-a-modernizovane-trolejbusove-trate-projektanti-sa-mozu-pustit-do-prace',
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
        source:
          '/sprava/v-klimatickom-atlase-bratislavy-je-zhodnotena-zranitelnost-mesta-na-dosledky-klimatickej-krizy',
        destination:
          '/blog/v-klimatickom-atlase-bratislavy-je-zhodnotena-zranitelnost-mesta-na-dosledky-klimatickej-krizy',
        permanent: true,
      },
      {
        source:
          '/sprava/cestujuci-dostanu-vyse-dvesto-vylepsenych-zastavok-dopravny-podnik-bratislava-osadi-nove-pristresky-aj-oznacniky',
        destination:
          '/blog/cestujuci-dostanu-vyse-dvesto-vylepsenych-zastavok-dopravny-podnik-bratislava-osadi-nove-pristresky-aj-oznacniky',
        permanent: true,
      },
      {
        source:
          '/rozkopavka-alebo-uzavierka/uplne-uzavierky-spojene-s-podujatim-csob-bratislava-marathon-2019',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source:
          '/sprava/vysledok-apriloveho-vyberoveho-konania-na-poziciu-riaditel-ka-prispevkovej-organizacie-marianum-pohrebnictvo-mesta-bratislava',
        destination:
          '/blog/vysledok-apriloveho-vyberoveho-konania-na-poziciu-riaditel-ka-prispevkovej-organizacie-marianum-pohrebnictvo-mesta-bratislava',
        permanent: true,
      },
      {
        source:
          '/sprava/bratislavska-spolocnost-olo-spustila-proces-modernizacie-a-ekologizacie-zariadenia-na-energeticke-vyuzitie-odpadu',
        destination:
          '/blog/bratislavska-spolocnost-olo-spustila-proces-modernizacie-a-ekologizacie-zariadenia-na-energeticke-vyuzitie-odpadu',
        permanent: true,
      },
      {
        source:
          '/sprava/vysledok-vyberoveho-konania-na-poziciu-riaditel-ka-a-konatel-ka-firmy-mestsky-parkovaci-system-spol-s-r-o',
        destination:
          '/blog/vysledok-vyberoveho-konania-na-poziciu-riaditel-ka-a-konatel-ka-firmy-mestsky-parkovaci-system-spol-s-r-o',
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
        source: '/rozkopavka-alebo-uzavierka/ciastocna-uzavierka-mlynske-nivy-56',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
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
        source:
          '/sprava/bratislava-podporuje-neverejnych-poskytovatelov-socialnych-sluzieb-v-zariadeniach-pre-seniorov',
        destination:
          '/blog/bratislava-podporuje-neverejnych-poskytovatelov-socialnych-sluzieb-v-zariadeniach-pre-seniorov',
        permanent: true,
      },
      {
        source:
          '/sprava/smart-city-projekt-atelier-inteligentne-mesta-riadene-komunitami-sa-zameria-na-rozvoj-pozitivne-energetickych-oblasti',
        destination:
          '/blog/smart-city-projekt-atelier-inteligentne-mesta-riadene-komunitami-sa-zameria-na-rozvoj-pozitivne-energetickych-oblasti',
        permanent: true,
      },
      {
        source: '/rss/rozkopavky-a-uzavierky',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
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
        source: '/rozkopavka-alebo-uzavierka/uplna-uzavierka-prokopa-velkeho',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source:
          '/sprava/zanedbany-verejny-priestor-pri-vozovni-krasnany-prejde-rekonstrukciou-sluzit-bude-chodcom-cyklistom-aj-vodicom',
        destination:
          '/blog/zanedbany-verejny-priestor-pri-vozovni-krasnany-prejde-rekonstrukciou-sluzit-bude-chodcom-cyklistom-aj-vodicom',
        permanent: true,
      },
      {
        source:
          '/sprava/trolejbusom-zo-stanice-na-letisko-a-megatrolejbusom-do-vychodnej-casti-bratislavy-dopravny-podnik-podpisal-zmluvy-na-nakup-novych-hybridnych-vozidiel',
        destination:
          '/blog/trolejbusom-zo-stanice-na-letisko-a-megatrolejbusom-do-vychodnej-casti-bratislavy-dopravny-podnik-podpisal-zmluvy-na-nakup-novych-hybridnych-vozidiel',
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
        source: '/rozkopavka-alebo-uzavierka/ciastocna-uzavierka-bajkalska-8',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source:
          '/sprava/bratislava-opat-podpori-pohybove-aktivity-a-neformalne-vzdelavanie-v-oblasti-prace-s-detmi-a-mladezou',
        destination:
          '/blog/bratislava-opat-podpori-pohybove-aktivity-a-neformalne-vzdelavanie-v-oblasti-prace-s-detmi-a-mladezou',
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
        source:
          '/sprava/dopravny-podnik-bratislava-predstavuje-verejnosti-flotilu-novych-autobusov-solaris-new-urbino-18',
        destination:
          '/blog/dopravny-podnik-bratislava-predstavuje-verejnosti-flotilu-novych-autobusov-solaris-new-urbino-18',
        permanent: true,
      },
      {
        source: '/rozkopavka-alebo-uzavierka/ciastocna-uzavierka-kosicka-7',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source:
          '/sprava/mesto-bratislava-a-neziskove-organizacie-podpisali-memorandum-o-spolupraci-v-ramci-projektu-dostupneho-byvania-so-socialnou-podporou',
        destination:
          '/blog/mesto-bratislava-a-neziskove-organizacie-podpisali-memorandum-o-spolupraci-v-ramci-projektu-dostupneho-byvania-so-socialnou-podporou',
        permanent: true,
      },
      {
        source:
          '/sprava/mestske-lesy-v-bratislave-vybudovali-naucny-chodnik-s-altankom-a-piknikovym-miestom-nad-liscim-udolim-v-karlovej-vsi',
        destination:
          '/blog/mestske-lesy-v-bratislave-vybudovali-naucny-chodnik-s-altankom-a-piknikovym-miestom-nad-liscim-udolim-v-karlovej-vsi',
        permanent: true,
      },
      {
        source:
          '/rozkopavka-alebo-uzavierka/ciastocna-uzavierka-nabrezie-armadneho-generala-ludvika-svobodu-3',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source: '/o-com-je-zimna-udrzba',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/zimna-udrzba',
        permanent: true,
      },
      {
        source: '/rozkopavka-alebo-uzavierka/ciastocna-uzavierka-bajkalska-ulica-5',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source: '/dan-z-nehnutelnosti',
        destination: '/mesto-bratislava/dane-a-poplatky/dan-z-nehnutelnosti',
        permanent: true,
      },
      {
        source:
          '/sprava/poslanci-mestskeho-zastupitelstva-schvalili-rozpocet-na-rok-2021-aj-uplny-zakaz-hazardu-na-uzemi-bratislavy',
        destination:
          '/blog/poslanci-mestskeho-zastupitelstva-schvalili-rozpocet-na-rok-2021-aj-uplny-zakaz-hazardu-na-uzemi-bratislavy',
        permanent: true,
      },
      {
        source: '/rozkopavka-alebo-uzavierka/ciastocna-uzavierka-hodzovo-namestie-stefanikova',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source: '/rozkopavka-alebo-uzavierka/ciastocna-uzavierka-matusova-a-lovinskeho',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source: '/rozkopavka-alebo-uzavierka/uzavierka-landererovej-a-culenovej',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source: '/uzavery-d4-r7-a-mlynske-nivy',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source:
          '/sprava/cakanie-na-spoj-bude-vyrazne-komfortnejsie-cestujuci-dostanu-vyse-dvesto-zastavkovych-pristreskov',
        destination:
          '/blog/cakanie-na-spoj-bude-vyrazne-komfortnejsie-cestujuci-dostanu-vyse-dvesto-zastavkovych-pristreskov',
        permanent: true,
      },
      {
        source:
          '/sprava/bratislava-podpisala-memorandum-chce-ziskat-dalsi-objekt-na-vybudovanie-mestskych-najomnych-bytov',
        destination:
          '/blog/bratislava-podpisala-memorandum-chce-ziskat-dalsi-objekt-na-vybudovanie-mestskych-najomnych-bytov',
        permanent: true,
      },
      {
        source: '/uzemny-plan-zony-podhradie',
        destination:
          '/zivotne-prostredie-a-vystavba/rozvoj-mesta/uzemnoplanovacie-dokumenty/platna-uzemnoplanovacia-dokumentacia/uzemne-plany-zon/uzemny-plan-zony-podhradie',
        permanent: true,
      },
      {
        source: '/rozkopavka-alebo-uzavierka/ciastocna-uzavierka-brnianska',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source: '/rozkopavka-alebo-uzavierka/ciastocna-uzavierka-slovnaftska-ulica-2',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source:
          '/sprava/vyhlasujeme-architektonicku-sutaz-na-kulturne-stredisko-a-kniznicu-na-zarnovickej-ulici-v-raci',
        destination:
          '/blog/vyhlasujeme-architektonicku-sutaz-na-kulturne-stredisko-a-kniznicu-na-zarnovickej-ulici-v-raci',
        permanent: true,
      },
      {
        source: '/rozkopavka-alebo-uzavierka/ciastocna-uzavierka-pristavna-5',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source: '/protikorupcne-minimum',
        destination: '/mesto-bratislava/transparentne-mesto/protikorupcne-standardy',
        permanent: true,
      },
      {
        source:
          '/sprava/mesto-dosiahlo-dohodu-vdaka-ktorej-znizia-statne-lesy-tazbu-v-lesoch-na-uzemi-bratislavy-o-polovicu-a-podporia-rekreaciu',
        destination:
          '/blog/mesto-dosiahlo-dohodu-vdaka-ktorej-znizia-statne-lesy-tazbu-v-lesoch-na-uzemi-bratislavy-o-polovicu-a-podporia-rekreaciu',
        permanent: true,
      },
      {
        source: '/uzemny-plan-zony-dunajska',
        destination:
          '/zivotne-prostredie-a-vystavba/rozvoj-mesta/uzemnoplanovacie-dokumenty/platna-uzemnoplanovacia-dokumentacia/uzemne-plany-zon/uzemny-plan-zony-dunajska',
        permanent: true,
      },
      {
        source:
          '/sprava/komunitny-zivot-mesta-a-umelecke-stipendia-nadacia-mesta-bratislavy-zverejnila-projekty-podporene-sumou-takmer-150-000-eur',
        destination:
          '/blog/komunitny-zivot-mesta-a-umelecke-stipendia-nadacia-mesta-bratislavy-zverejnila-projekty-podporene-sumou-takmer-150-000-eur',
        permanent: true,
      },
      {
        source: '/najnovsie-rozkopavky-a-uzavierky',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source:
          '/sprava/architekti-prinavratia-budove-byvaleho-nocneho-salona-dostojnost-buducu-gastroprevadzku-prepoja-s-parkom',
        destination:
          '/blog/architekti-prinavratia-budove-byvaleho-nocneho-salona-dostojnost-buducu-gastroprevadzku-prepoja-s-parkom',
        permanent: true,
      },
      {
        source: '/ako-bude-horsky-park-vyuzivany-po-novom',
        destination:
          '/zivotne-prostredie-a-vystavba/zelen/udrzba-a-tvorba-zelene/parky-a-zahrady/horsky-park',
        permanent: true,
      },
      {
        source:
          '/sprava/buduca-podoba-bytoveho-objektu-v-zahorskej-bystrici-je-znama-napreduju-aj-dalsie-projekty-mestskeho-najomneho-byvania',
        destination:
          '/blog/buduca-podoba-bytoveho-objektu-v-zahorskej-bystrici-je-znama-napreduju-aj-dalsie-projekty-mestskeho-najomneho-byvania',
        permanent: true,
      },
      {
        source: '/novinky',
        destination: '/mesto-bratislava/transparentne-mesto/aktuality',
        permanent: true,
      },
      {
        source:
          '/sprava/kaviaren-v-kostole-ci-dalsie-ufo-v-bratislave-aj-to-sa-dozviete-v-pokracovani-projektu-turistom-vo-vlastnom-meste',
        destination:
          '/blog/kaviaren-v-kostole-ci-dalsie-ufo-v-bratislave-aj-to-sa-dozviete-v-pokracovani-projektu-turistom-vo-vlastnom-meste',
        permanent: true,
      },
      {
        source:
          '/sprava/nezavisla-skupina-expertov-potvrdila-moznost-elektrickovej-trate-pri-snd-bez-negativnych-dopadov-na-budovu-divadla',
        destination:
          '/blog/nezavisla-skupina-expertov-potvrdila-moznost-elektrickovej-trate-pri-snd-bez-negativnych-dopadov-na-budovu-divadla',
        permanent: true,
      },
      {
        source: '/rozkopavka-alebo-uzavierka/ciastocna-uzavierka-spitalska',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source:
          '/sprava/bratislava-pracuje-na-programe-komplexnej-obnovy-svojich-zakladnych-umeleckych-skol-a-centier-volneho-casu',
        destination:
          '/blog/bratislava-pracuje-na-programe-komplexnej-obnovy-svojich-zakladnych-umeleckych-skol-a-centier-volneho-casu',
        permanent: true,
      },
      {
        source:
          '/sprava/bratislava-bude-ekologickejsia-cast-tepla-z-energetickeho-zhodnocovania-odpadov-bude-vyuzivat-na-vykurovanie',
        destination:
          '/blog/bratislava-bude-ekologickejsia-cast-tepla-z-energetickeho-zhodnocovania-odpadov-bude-vyuzivat-na-vykurovanie',
        permanent: true,
      },
      {
        source: '/rozkopavka-alebo-uzavierka/ciastocna-uzavierka-landererova-a-kosicka',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
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
        source:
          '/sprava/hlavne-mesto-je-zapojene-do-medzinarodneho-projektu-arch-v-oblasti-klimatickej-adaptacie-miest',
        destination:
          '/blog/hlavne-mesto-je-zapojene-do-medzinarodneho-projektu-arch-v-oblasti-klimatickej-adaptacie-miest',
        permanent: true,
      },
      {
        source: '/zakladne-umelecke-skoly',
        destination: '/vzdelavanie-a-volny-cas/skolstvo/zakladne-umelecke-skoly',
        permanent: true,
      },
      {
        source: '/rozkopavka-alebo-uzavierka/ciastocna-uzavierka-kosicka-3',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source: '/ubytovna-fortuna/',
        destination:
          '/socialne-sluzby-a-byvanie/socialne-sluzby/nizkoprahova-socialna-sluzba-pre-deti-a-rodinu-fortunacik',
        permanent: true,
      },
      {
        source:
          '/sprava/bratislava-zintenzivnuje-monitoring-liahnisk-komarov-a-zavadza-vzdusnu-aplikaciu-biologickeho-prostriedku-dronmi-2',
        destination:
          '/blog/bratislava-zintenzivnuje-monitoring-liahnisk-komarov-a-zavadza-vzdusnu-aplikaciu-biologickeho-prostriedku-dronmi-2',
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
        source: '/rozkopavka-alebo-uzavierka/ciastocna-uzavierka-namestie-snp',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source:
          '/sprava/bratislavske-open-data-prvy-mesiac-prevadzky-priniesol-tisicky-navstevnikov-aj-viac-novych-dat',
        destination:
          '/blog/bratislavske-open-data-prvy-mesiac-prevadzky-priniesol-tisicky-navstevnikov-aj-viac-novych-dat',
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
        source:
          '/sprava/bratislava-pokracuje-v-priprave-celomestskej-parkovacej-politiky-na-proces-inovativneho-verejneho-obstaravania-bude-dohliadat-externa-komisia',
        destination:
          '/blog/bratislava-pokracuje-v-priprave-celomestskej-parkovacej-politiky-na-proces-inovativneho-verejneho-obstaravania-bude-dohliadat-externa-komisia',
        permanent: true,
      },
      {
        source: '/rozkopavka-alebo-uzavierka/ciastocna-uzavierka-kosicka-5',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source:
          '/sprava/dopravny-podnik-obnovi-frekventovane-zastavky-na-racianskej-radiale-v-tychto-dnoch-spusta-realizaciu-programu-obnovy-a-doplnenia-pristreskov',
        destination:
          '/blog/dopravny-podnik-obnovi-frekventovane-zastavky-na-racianskej-radiale-v-tychto-dnoch-spusta-realizaciu-programu-obnovy-a-doplnenia-pristreskov',
        permanent: true,
      },
      {
        source: '/situacia-v-bratislave-od-15-2-2019',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source:
          '/sprava/premena-komenskeho-namestia-na-parcik-je-dobrym-prikladom-premeny-verejneho-priestoru-vitazny-navrh-architektonickej-sutaze-predstavujeme-verejnosti-v-pavilone',
        destination:
          '/blog/premena-komenskeho-namestia-na-parcik-je-dobrym-prikladom-premeny-verejneho-priestoru-vitazny-navrh-architektonickej-sutaze-predstavujeme-verejnosti-v-pavilone',
        permanent: true,
      },
      {
        source:
          '/sprava/v-grosslingu-sa-zacalo-rekonstruovat-obnovuje-sa-aj-niekdajsia-dominanta-stareho-mesta-komin-z-roku-1914',
        destination:
          '/blog/v-grosslingu-sa-zacalo-rekonstruovat-obnovuje-sa-aj-niekdajsia-dominanta-stareho-mesta-komin-z-roku-1914',
        permanent: true,
      },
      {
        source:
          '/sprava/bratislava-zintenzivnuje-monitoring-liahnisk-komarov-a-zavadza-vzdusnu-aplikaciu-biologickeho-prostriedku-dronmi',
        destination:
          '/blog/bratislava-zintenzivnuje-monitoring-liahnisk-komarov-a-zavadza-vzdusnu-aplikaciu-biologickeho-prostriedku-dronmi',
        permanent: true,
      },
      {
        source: '/iframe/rozkopavky-a-uzavierky',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source: '/parky-a-parkovo-upravovane-plochy',
        destination: '/zivotne-prostredie-a-vystavba/zelen/udrzba-a-tvorba-zelene/parky-a-zahrady',
        permanent: true,
      },
      {
        source:
          '/sprava/bratislava-ma-v-otazke-umiestnovania-diel-vo-verejnom-priestore-jasny-nazor-naraza-vsak-na-legislativne-limity',
        destination:
          '/blog/bratislava-ma-v-otazke-umiestnovania-diel-vo-verejnom-priestore-jasny-nazor-naraza-vsak-na-legislativne-limity',
        permanent: true,
      },
      {
        source: '/rozkopavka-alebo-uzavierka/ciastocna-uzavierka-lieskovska-cesta-2',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source: '/rozvoj-najomneho-byvania',
        destination: '/socialne-sluzby-a-byvanie/byvanie-a-ubytovanie/rozvoj-najomneho-byvania',
        permanent: true,
      },
      {
        source: '/rozkopavka-alebo-uzavierka/ciastocna-uzavierka-kosicka-4',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source: '/rozkopavka-alebo-uzavierka/ciastocna-uzavierka-namestie-1-maja-2',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source:
          '/sprava/virtualna-realita-klimaticky-futurizmus-aj-hudba-ako-protest-festival-sensorium-beyond-the-sound-2021',
        destination:
          '/blog/virtualna-realita-klimaticky-futurizmus-aj-hudba-ako-protest-festival-sensorium-beyond-the-sound-2021',
        permanent: true,
      },
      {
        source: '/archiv-mesta-bratislavy',
        destination:
          '/kultura-a-komunity/kulturne-sluzby/sluzby-badatelne-archivu-mesta-bratislavy',
        permanent: true,
      },
      {
        source: '/rozkopavka-alebo-uzavierka/ciastocna-uzavierka-bosakova',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source: '/rozkopavka-alebo-uzavierka/ciastocna-uzavierka-pristavna-6',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
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
        source: '/rozkopavka-alebo-uzavierka/ciastocna-uzavierka-namestie-1-maja',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source: '/rozkopavka-alebo-uzavierka/ciastocna-uzavierka-stara-vinarska',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source: '/rozkopavka-alebo-uzavierka/ciastocna-uzavierka-biskupicka-2',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source:
          '/sprava/bezci-vybehali-pre-zdravotnicky-a-zdravotnikov-v-stom-rocniku-narodneho-behu-devin-bratislava-viac-ako-29-tisic-eur',
        destination:
          '/blog/bezci-vybehali-pre-zdravotnicky-a-zdravotnikov-v-stom-rocniku-narodneho-behu-devin-bratislava-viac-ako-29-tisic-eur',
        permanent: true,
      },
      {
        source: '/zimna-udrzba-pridat-ruku-k-dielu-mozeme-vsetci',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/zimna-udrzba',
        permanent: true,
      },
      {
        source: '/rozkopavka-alebo-uzavierka/ciastocna-uzavierka-bulharska-a-slovinska',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source: '/rozkopavka-alebo-uzavierka/ciastocna-uzavierka-dostojevskeho-rad-2',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source: '/rozkopavka-alebo-uzavierka/ciastocna-uzavierka',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source: '/rozkopavka-alebo-uzavierka/ciastocna-uzavierka-drienova',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source: '/rozkopavka-alebo-uzavierka/ciastocna-uzavierka-radlinskeho-3',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source: '/rozkopavka-alebo-uzavierka/uplna-uzavierka-parickova',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source: '/rozkopavka-alebo-uzavierka/ciastocna-uzavierka-biskupicka',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source: '/rozkopavka-alebo-uzavierka/ciastocna-uzavierka-jelacicova',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source:
          '/sprava/zaujemcovia-o-stanky-pre-neziskove-mimovladne-organizacie-na-vianocne-trhy-sa-uz-mozu-prihlasovat',
        destination:
          '/blog/zaujemcovia-o-stanky-pre-neziskove-mimovladne-organizacie-na-vianocne-trhy-sa-uz-mozu-prihlasovat',
        permanent: true,
      },
      {
        source:
          '/sprava/v-ramci-europskeho-tyzdna-mobility-zlacnujeme-rocny-predplatny-cestovny-listok-na-mhd-a-vsetky-typy-cestovnych-listkov-zakupenych-cez-mobilnu-aplikaciu-ids-bk',
        destination:
          '/blog/v-ramci-europskeho-tyzdna-mobility-zlacnujeme-rocny-predplatny-cestovny-listok-na-mhd-a-vsetky-typy-cestovnych-listkov-zakupenych-cez-mobilnu-aplikaciu-ids-bk',
        permanent: true,
      },
      {
        source: '/sucasny-stav-horskeho-parku-a-dalsie-vizie',
        destination:
          '/zivotne-prostredie-a-vystavba/zelen/udrzba-a-tvorba-zelene/parky-a-zahrady/horsky-park',
        permanent: true,
      },
      {
        source: '/rozkopavka-alebo-uzavierka/ciastocna-uzavierka-panonska-cesta-5',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source: '/rozkopavka-alebo-uzavierka/ciastocna-uzavierka-radlinskeho-ulica-4',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source:
          '/sprava/vysledky-junovych-vyberovych-konani-na-riaditela-ku-pamiatkoveho-ustavu-nacelnika-mestskej-policie-a-riaditela-ku-zoo',
        destination:
          '/blog/vysledky-junovych-vyberovych-konani-na-riaditela-ku-pamiatkoveho-ustavu-nacelnika-mestskej-policie-a-riaditela-ku-zoo',
        permanent: true,
      },
      {
        source:
          '/sprava/vznikla-regionalna-rada-partnerstva-pre-efektivne-manazovanie-europskych-fondov-na-uzemi-bratislavskeho-kraja',
        destination:
          '/blog/vznikla-regionalna-rada-partnerstva-pre-efektivne-manazovanie-europskych-fondov-na-uzemi-bratislavskeho-kraja',
        permanent: true,
      },
      {
        source:
          '/sprava/bratislava-grantom-podpori-pohybove-aktivity-a-neformalne-vzdelavanie-v-oblasti-prace-s-detmi-a-mladezou',
        destination:
          '/blog/bratislava-grantom-podpori-pohybove-aktivity-a-neformalne-vzdelavanie-v-oblasti-prace-s-detmi-a-mladezou',
        permanent: true,
      },
      {
        source:
          '/vseobecne-zavazne-nariadenie-hlavneho-mesta-slovenskej-republiky-bratislavy-c-12-2014/d-11045771/p1=11049947',
        destination:
          '/mesto-bratislava/sprava-mesta/legislativa-mesta/vseobecne-zavazne-nariadenia',
        permanent: true,
      },
      {
        source: '/erb-bratislavy-jednofarebny',
        destination: '/mesto-bratislava/sprava-mesta/vizualna-identita/symboly-mesta',
        permanent: true,
      },
      {
        source: '/rozkopavka-alebo-uzavierka/ciastocna-uzavierka-bocna',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source:
          '/sprava/prispevkove-organizacie-bratislavy-v-oblasti-kultury-oboznamia-verejnost-s-vysledkami-svojej-prace',
        destination:
          '/blog/prispevkove-organizacie-bratislavy-v-oblasti-kultury-oboznamia-verejnost-s-vysledkami-svojej-prace',
        permanent: true,
      },
      {
        source: '/rozkopavka-alebo-uzavierka/uplna-uzavierka-most-snp',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source: '/rozkopavka-alebo-uzavierka/ciastocna-uzavierka-prokopa-velkeho',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source: '/rozkopavka-alebo-uzavierka/ciastocna-uzavierka-hradska-4',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source:
          '/sprava/dopravny-podnik-bratislava-oznamuje-novinky-po-otvoreni-dubravsko-karloveskej-radialy-a-trasy-liniek',
        destination:
          '/blog/dopravny-podnik-bratislava-oznamuje-novinky-po-otvoreni-dubravsko-karloveskej-radialy-a-trasy-liniek',
        permanent: true,
      },
      {
        source: '/erb-bratislavy-farebny',
        destination: '/mesto-bratislava/sprava-mesta/vizualna-identita/symboly-mesta',
        permanent: true,
      },
      {
        source: '/rozkopavka-alebo-uzavierka/ciastocna-uzavierka-hradska-2',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source: '/rozkopavka-alebo-uzavierka/ciastocna-uzavierka-pri-suchom-mlyne',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source:
          '/sprava/hlavne-mesto-vyhlasilo-vyzvu-na-podporu-narodnych-a-medzinarodnych-sportovych-a-vzdelavacich-podujati',
        destination:
          '/blog/hlavne-mesto-vyhlasilo-vyzvu-na-podporu-narodnych-a-medzinarodnych-sportovych-a-vzdelavacich-podujati',
        permanent: true,
      },
      {
        source: '/rozkopavka-alebo-uzavierka/ciastocna-uzavierka-kosicka-6',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source: '/rozkopavka-alebo-uzavierka/ciastocna-uzavierka-samorinska',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source: '/rozkopavka-alebo-uzavierka/ciastocna-uzavierka-edisonova',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source: '/rozkopavka-alebo-uzavierka/ciastocna-uzavierka-hradska-3',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source: '/bratislava-pre-vsetkych-grantovy-program-v-socialnej-oblasti',
        destination:
          '/socialne-sluzby-a-byvanie/financna-podpora/grantovy-program-v-socialnej-oblasti-bratislava-pre-vsetkych',
        permanent: true,
      },
      {
        source: '/rozkopavka-alebo-uzavierka/ciastocna-uzavierka-kosicka-2',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source:
          '/sprava/na-zrekonstruovanej-elektrickovej-trati-na-americkom-namesti-sme-odstranili-bilboardy-pribudnu-zelene-plochy',
        destination:
          '/blog/na-zrekonstruovanej-elektrickovej-trati-na-americkom-namesti-sme-odstranili-bilboardy-pribudnu-zelene-plochy',
        permanent: true,
      },
      {
        source:
          '/sprava/verejne-prerokovanie-konceptov-urbanistickej-studie-riesenie-centralnej-rozvojovej-osi-petrzalka',
        destination:
          '/blog/verejne-prerokovanie-konceptov-urbanistickej-studie-riesenie-centralnej-rozvojovej-osi-petrzalka',
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
        source: '/rozkopavka-alebo-uzavierka/ciastocna-uzavierka-svatoplukova-6',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source: '/rozkopavka-alebo-uzavierka/ciastocna-uzavierka-ucitelska',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source:
          '/sprava/vysledok-marcoveho-vyberoveho-konania-na-poziciu-riaditela-ky-metropolitneho-institutu-bratislavy',
        destination:
          '/blog/vysledok-marcoveho-vyberoveho-konania-na-poziciu-riaditela-ky-metropolitneho-institutu-bratislavy',
        permanent: true,
      },
      {
        source: '/rozkopavka-alebo-uzavierka/ciastocna-uzavierka-a-g-l-svobodu',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source: '/rozkopavka-alebo-uzavierka/docasne-dopravne-obmedzenia-hranicna-gagarinova',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
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
        source: '/rozkopavka-alebo-uzavierka/ciastocna-uzavierka-cesta-do-spalovne-3',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source: '/rozkopavka-alebo-uzavierka/ciastocna-uzavierka-dvojkrizna',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source: '/rozkopavka-alebo-uzavierka/ciastocna-uzavierka-parickova-3',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source: '/zavedenie-zberu-kuchynskeho-biologicky-rozlozitelneho-odpadu',
        destination:
          '/zivotne-prostredie-a-vystavba/zivotne-prostredie/odpady/triedeny-zber/zber-kuchynskeho-bioodpadu',
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
        source: '/prugerka',
        destination: '/zivotne-prostredie-a-vystavba/zelen/udrzba-a-tvorba-zelene/parky-a-zahrady',
        permanent: true,
      },
      {
        source:
          '/sprava/spolocne-stanovisko-primatorov-paktu-slobodnych-miest-za-spravodlive-a-udrzatelne-zotavenie-po-pandemii',
        destination:
          '/blog/spolocne-stanovisko-primatorov-paktu-slobodnych-miest-za-spravodlive-a-udrzatelne-zotavenie-po-pandemii',
        permanent: true,
      },
      {
        source:
          '/sprava/video-spolu-s-3d-prehliadkou-prevedie-sutaziacich-aj-divakov-kupelmi-grossling-od-kotolne-az-po-strechu',
        destination:
          '/blog/video-spolu-s-3d-prehliadkou-prevedie-sutaziacich-aj-divakov-kupelmi-grossling-od-kotolne-az-po-strechu',
        permanent: true,
      },
      {
        source:
          '/sprava/vodna-veza-v-bratislavskom-podhradi-prejde-citlivou-obnovou-investor-je-tesne-pred-vyhlasenim-architektonickej-sutaze',
        destination:
          '/blog/vodna-veza-v-bratislavskom-podhradi-prejde-citlivou-obnovou-investor-je-tesne-pred-vyhlasenim-architektonickej-sutaze',
        permanent: true,
      },
      {
        source: '/rozkopavka-alebo-uzavierka/uplna-uzavierka-kadnarova',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source: '/rozkopavka-alebo-uzavierka/uplna-uzavierka-pristavna-3',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source: '/baum-2020-de',
        destination:
          '/mesto-bratislava/projekty/eu-projekty/interreg-v-a-slovenska-republika–rakusko',
        permanent: true,
      },
      {
        source: '/nadacia-mesta-bratislavy',
        destination: '/kultura-a-komunity/kulturne-sluzby/nadacia-mesta-bratislavy',
        permanent: true,
      },
      {
        source: '/rozkopavka-alebo-uzavierka/ciastocna-uzavierka-bosakova-a-sustekova',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source: '/rozkopavka-alebo-uzavierka/ciastocna-uzavierka-radnicna-ulica',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source: '/rozkopavka-alebo-uzavierka/uplna-uzavierka-mlynske-nivy-2',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source: '/sekcia-uzemneho-planovania',
        destination:
          '/zivotne-prostredie-a-vystavba/rozvoj-mesta/uzemnoplanovacie-dokumenty/platna-uzemnoplanovacia-dokumentacia/uzemne-plany-zon',
        permanent: true,
      },
      {
        source:
          '/sprava/olo-zacina-s-rozvozom-vriec-a-informacnych-letakov-pre-zvoz-triedeneho-odpadu-z-rodinnych-domov-v-ruzinove-novom-meste-a-raci',
        destination:
          '/blog/olo-zacina-s-rozvozom-vriec-a-informacnych-letakov-pre-zvoz-triedeneho-odpadu-z-rodinnych-domov-v-ruzinove-novom-meste-a-raci',
        permanent: true,
      },
      {
        source: '/zavedenie-zberu-kuchynskeho-biologicky-rozlozitelneho-odpadu',
        destination:
          '/zivotne-prostredie-a-vystavba/zivotne-prostredie/odpady/triedeny-zber/zber-kuchynskeho-bioodpadu',
        permanent: true,
      },
      {
        source: '/dan-z-nehnutelnosti',
        destination: '/mesto-bratislava/dane-a-poplatky/dan-z-nehnutelnosti',
        permanent: true,
      },
      {
        source: '/rozkopavka-alebo-uzavierka/ciastocna-uzavierka-kocankova',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source: '/rozkopavka-alebo-uzavierka/ciastocna-uzavierka-kosicka-8',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source: '/rozkopavka-alebo-uzavierka/ciastocna-uzavierka-misikova',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source:
          '/sprava/grantova-schema-na-predkladanie-ziadosti-pre-podporu-malych-projektov-trvalo-udrzatelneho-hospodarenia-so-zrazkovou-vodou',
        destination:
          '/blog/grantova-schema-na-predkladanie-ziadosti-pre-podporu-malych-projektov-trvalo-udrzatelneho-hospodarenia-so-zrazkovou-vodou',
        permanent: true,
      },
      {
        source: '/dan-z-nehnutelnosti',
        destination: '/mesto-bratislava/dane-a-poplatky/dan-z-nehnutelnosti',
        permanent: true,
      },
      {
        source: '/financny-prispevok-na-hospodarenie-so-zrazkovou-vodou',
        destination:
          '/mesto-bratislava/transparentne-mesto/pridelovanie-dotacii/financny-prispevok-na-hospodarenie-so-zrazkovou-vodou',
        permanent: true,
      },
      {
        source: '/rozkopavka-alebo-uzavierka/ciastocna-uzavierka-razusovo-nabrezie',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source:
          '/sprava/bratislava-spusta-grantovy-program-na-podporu-investicii-do-sportovej-infrastruktury-v-hlavnom-meste',
        destination:
          '/blog/bratislava-spusta-grantovy-program-na-podporu-investicii-do-sportovej-infrastruktury-v-hlavnom-meste',
        permanent: true,
      },
      {
        source: '/uzemny-plan',
        destination:
          '/zivotne-prostredie-a-vystavba/rozvoj-mesta/uzemnoplanovacie-dokumenty/platna-uzemnoplanovacia-dokumentacia/uzemny-plan-mesta-a-jeho-zmeny-a-doplnky',
        permanent: true,
      },
      {
        source: '/zavedenie-zberu-kuchynskeho-biologicky-rozlozitelneho-odpadu',
        destination:
          '/zivotne-prostredie-a-vystavba/zivotne-prostredie/odpady/triedeny-zber/zber-kuchynskeho-bioodpadu',
        permanent: true,
      },
      {
        source: '/fortunacik/d-11037489/p1=11056800',
        destination:
          '/socialne-sluzby-a-byvanie/socialne-sluzby/nizkoprahova-socialna-sluzba-pre-deti-a-rodinu-fortunacik',
        permanent: true,
      },
      {
        source: '/rozkopavky-a-uzavierky/d-77246/p1=11049948',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source: '/rozkopavka-alebo-uzavierka/ciastocna-uzavierka-zahorska',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
        permanent: true,
      },
      {
        source: '/sekcia-dopravy',
        destination: '/doprava-a-mapy',
        permanent: true,
      },
      {
        source:
          '/sprava/druhy-hokejovy-sampionat-v-historii-slovenska-zacina-o-16-dni-organizatori-i-samospravy-finisuju-s-pripravami',
        destination:
          '/blog/druhy-hokejovy-sampionat-v-historii-slovenska-zacina-o-16-dni-organizatori-i-samospravy-finisuju-s-pripravami',
        permanent: true,
      },
      {
        source: '/dan-z-nehnutelnosti',
        destination: '/mesto-bratislava/dane-a-poplatky/dan-z-nehnutelnosti',
        permanent: true,
      },
      {
        source: '/rozkopavka-alebo-uzavierka/uplna-uzavierka-bajkalska',
        destination: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery',
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
    ]
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: {
        loader: '@svgr/webpack',
        options: {
          svgoConfig: {
            plugins: [
              {
                name: 'removeViewBox',
                active: false,
              },
            ],
          },
        },
      },
    })
    return config
  },
}

// https://github.com/4lejandrito/next-plausible#proxy-the-analytics-script
module.exports = withPlausibleProxy()({
  ...nextConfig,
})

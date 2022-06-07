import { GeneralPageFragment } from '@bratislava/strapi-sdk-homepage'
import {
  BasicSearch,
  DocumentCards,
  Footer,
  FooterProps,
  NoResultsFound,
  PageHeader,
  SectionContainer,
} from '@bratislava/ui-bratislava'
import BasePageLayout from '../components/layouts/BasePageLayout'
import PageWrapper from '../components/layouts/PageWrapper'
import { pageStyle } from '../utils/page'
import { isPresent } from '../utils/utils'
import PageBreadcrumbs from '../components/molecules/PageBreadcrumbs'
import OfficialBoardBackgroundImage from '../assets/images/official-board.png'

export interface SearchPageProps {
  page?: GeneralPageFragment
  footer: FooterProps
}

const OfficialBoard = ({ page, footer }: SearchPageProps) => {
  const noResultsFound = true
  return (
    <PageWrapper
      locale={page?.locale ?? 'sk'}
      slug={page?.slug ?? ''}
      localizations={page?.localizations?.filter(isPresent)}
    >
      <BasePageLayout footer={footer} menuItems={menuItems} activeMenuItem={page ? page.pageCategory?.id : '1'}>
        <style
          dangerouslySetInnerHTML={{
            __html: pageStyle(page ? page.pageCategory.color : 'red'),
          }}
        />
        {/* Header */}
        <PageHeader
          color="var(--secondary-color)"
          transparentColor="var(--secondary-color--transparent)"
          transparentColorMobile="var(--secondary-color--semi-transparent)"
          imageSrc={OfficialBoardBackgroundImage.src}
        >
          <SectionContainer>
            <div className="min-h-[220px] relative">
              <div className="absolute top-6">
                <PageBreadcrumbs page={boardPage} />
              </div>
              <h1 className="pt-30 text-md md:text-2xl font-bold whitespace-pre-wrap">{boardPage?.title}</h1>
            </div>
          </SectionContainer>
        </PageHeader>
        <SectionContainer className="pt-14 md:pt-18">
          <BasicSearch className="pb-14 lg:pb-24" />
          {noResultsFound ? (
            <NoResultsFound
              title=""
              message="Ľutujeme, pre dané vyhľadávanie
            sa nenašli žiadne výsledky."
              messageClassName="max-w-sm text-center -mt-16 leading-normal"
            />
          ) : (
            <DocumentCards documents={documents} dividerStyle="mesto_01" />
          )}
          <Footer />
        </SectionContainer>
      </BasePageLayout>
    </PageWrapper>
  )
}

//hardcoded until we find a way to pass them
const menuItems = [
  {
    id: '3',
    color: 'rgb(var(--color-red--light))',
    colorDark: 'rgb(var(--color-red--dark))',
    icon: 'mesto_01',
    coloredIcon: 'mesto_color_01',
    title: 'Mesto\nBratislava',
    subItems: [
      {
        icon: 'sprava_mesta_01',
        title: 'Správa mesta',
        moreLinkTitle: 'Ďalšie',
        url: 'mesto-bratislava/sprava-mesta',
        subItems: [
          {
            title: 'Volené orgány',
            url: 'mesto-bratislava/sprava-mesta/volene-organy',
          },
          {
            title: 'Magistrát',
            url: 'mesto-bratislava/sprava-mesta/magistrat',
          },
          {
            title: 'Organizácie mesta',
            url: 'mesto-bratislava/sprava-mesta/organizacie-mesta',
          },
        ],
      },
      {
        icon: 'transparentne_mesto_01',
        title: 'Transparentné mesto',
        moreLinkTitle: 'Ďalšie',
        url: 'mesto-bratislava/transparentne-mesto/transparentne-mesto',
        subItems: [
          {
            title: 'Aktuality',
            url: '',
          },
          {
            title: 'Úradná tabuľa',
            url: 'mesto-bratislava/transparentne-mesto/uradna-tabula',
          },
          {
            title: 'Sprístupňovanie informácií',
            url: 'mesto-bratislava/transparentne-mesto/spristupnovanie-informacii',
          },
        ],
      },
      {
        icon: 'dane_01',
        title: 'Dane a poplatky',
        moreLinkTitle: 'Ďalšie',
        url: 'mesto-bratislava/dane-a-poplatky',
        subItems: [
          {
            title: 'Daň z nehnuteľnosti',
            url: 'mesto-bratislava/dane-a-poplatky/dan-z-nehnutelnosti',
          },
          {
            title: 'Daň za užívanie verejného priestranstva',
            url: 'mesto-bratislava/dane-a-poplatky/dan-za-uzivanie-verejneho-priestranstva',
          },
          {
            title: 'Daň za ubytovanie',
            url: 'mesto-bratislava/dane-a-poplatky/dan-za-ubytovanie',
          },
        ],
      },
      {
        icon: 'projekty_01',
        title: 'Projekty',
        moreLinkTitle: 'Ďalšie',
        url: 'mesto-bratislava/projekty',
        subItems: [
          {
            title: 'Električka v Novom centre',
            url: 'mesto-bratislava/projekty/elektricka-v-novom-centre',
          },
          {
            title: 'Modernizácia Ružinovskej radiály',
            url: 'mesto-bratislava/projekty/modernizacia-ruzinovskej-radialy',
          },
          {
            title: 'Živé miesta',
            url: 'mesto-bratislava/projekty/zive-miesta',
          },
        ],
      },
      {
        icon: 'partnerstva_01',
        title: 'Príležitosti pre partnerstvá',
        moreLinkTitle: 'Ďalšie',
        url: 'mesto-bratislava/prilezitosti-pre-partnerstva',
        subItems: [
          {
            title: 'Živé miesta',
            url: 'mesto-bratislava/prilezitosti-pre-partnerstva/zive-miesta',
          },
          {
            title: '10 000 stromov',
            url: 'mesto-bratislava/prilezitosti-pre-partnerstva/10000-stromov',
          },
          {
            title: 'Muzeum mesta Bratislavy',
            url: 'mesto-bratislava/prilezitosti-pre-partnerstva/muzeum-mesta-bratislavy',
          },
        ],
      },
    ],
  },
  {
    id: '5',
    color: 'rgb(var(--color-blue--light))',
    colorDark: 'rgb(var(--color-blue--dark))',
    icon: 'doprava_mapy_02',
    coloredIcon: 'doprava_mapy_color_02',
    title: 'Doprava\na mapy',
    subItems: [
      {
        icon: 'sprava_a_udrzba_02',
        title: 'Správa a údržba komunikácií',
        moreLinkTitle: 'Ďalšie',
        url: 'doprava-a-mapy/sprava-a-udrzba-komunikacii',
        subItems: [
          {
            title: 'Rozkopávky a uzávery',
            url: 'doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky',
          },
          {
            title: 'Zimná údržba',
            url: 'doprava-a-mapy/sprava-a-udrzba-komunikacii/zimna-udrzba',
          },
          {
            title: 'Cestná zeleň',
            url: 'doprava-a-mapy/sprava-a-udrzba-komunikacii/cestna-zelen',
          },
        ],
      },
      {
        icon: 'doprava_02',
        title: 'Doprava',
        moreLinkTitle: 'Ďalšie',
        url: 'doprava-a-mapy/doprava',
        subItems: [
          {
            title: 'Uzemný generel dopravy',
            url: 'doprava-a-mapy/doprava/uzemny-generel-dopravy',
          },
          {
            title: 'Cestný správny orgán',
            url: 'doprava-a-mesto/doprava/cestny-spravny-organ',
          },
          {
            title: 'Dopravné projekty',
            url: 'doprava-a-mapy/doprava/dopravne-projekty',
          },
        ],
      },
      {
        icon: 'parkovanie_02',
        title: 'Parkovanie',
        moreLinkTitle: 'Ďalšie',
        url: 'doprava-a-mapy/parkovanie',
        subItems: [
          {
            title: 'Odťahovanie vozidiel',
            url: 'doprava-a-mapy/parkovanie/odtahovanie-vozidiel',
          },
          {
            title: 'Vyhradené parkovanie',
            url: 'doprava-a-mesto/parkovanie/vyhradene-parkovanie',
          },
        ],
      },
      {
        icon: 'mhd_02',
        title: 'Mestská hromadná doprava',
        moreLinkTitle: 'Ďalšie',
        url: 'doprava-a-mapy/mestska-hromadna-doprava',
        subItems: [
          {
            title: 'MHD',
            url: 'doprava-a-mapy/mestska-hromadna-doprava/mhd',
          },
          {
            title: 'Integrovaný dopravný systém',
            url: 'doprava-a-mapy/mestska-hromadna-doprava/integrovany-system',
          },
        ],
      },
      {
        icon: 'cyklo_02',
        title: 'Cyklodoprava',
        moreLinkTitle: 'Ďalšie',
        url: 'doprava-a-mesto/cyklodoprava',
        subItems: [
          {
            title: 'Mapa',
            url: 'doprava-a-mapy/cyklodoprava/mapa',
          },
          {
            title: 'Čo pripravujeme',
            url: 'doprava-a-mapy/cyklodoprava/co-pripravujeme',
          },
          {
            title: 'Bikesharing',
            url: 'doprava-a-mapy/zdielana-mobilita/bikesharing',
          },
        ],
      },
      {
        icon: 'zdielana_mobilita_02',
        title: 'Zdieľaná mobilita',
        moreLinkTitle: 'Ďalšie',
        url: 'doprava-mesto/zdielana-mobilita',
        subItems: [
          {
            title: 'Bikesharing',
            url: 'doprava-a-mapy/zdielana-mobilita/bikesharing',
          },
          {
            title: 'Kolobežky',
            url: 'doprava-a-mapy/zdielana-mobilita/kolobezky',
          },
          {
            title: 'Skútre',
            url: 'doprava-a-mapy/zdielana-mobilita/skutre',
          },
        ],
      },
      {
        icon: 'mapy_02',
        title: 'Mapy',
        moreLinkTitle: 'Ďalšie',
        url: 'doprava-a-mapy/mapy',
        subItems: [],
      },
    ],
  },
  {
    id: '6',
    color: 'rgb(var(--color-green--light))',
    colorDark: 'rgb(var(--color-green--dark))',
    icon: 'zp_vystavba_03',
    coloredIcon: 'zp_vystavba_color_03',
    title: 'Životné prostredie \na výstavba',
    subItems: [
      {
        icon: 'zivotne_prostredie_03',
        title: 'Životné prostredie',
        moreLinkTitle: 'Ďalšie',
        url: 'zivotne-prostredie-vystavba/zivotne-prostredie',
        subItems: [
          {
            title: 'Odpady',
            url: 'zivotne-prostredie-a-vystavba/zivotne-prostredie/odpady',
          },
          {
            title: 'Ovzdušie',
            url: 'zivotne-prostredie-a-vystavba/zivotne-prostredie/ovzdusie',
          },
          {
            title: 'Ochrana prírody a krajiny',
            url: 'zivotne-prostredie-a-vystavba/zivotne-prostredie/ochrana-prirody-a-krajiny',
          },
        ],
      },
      {
        icon: 'zelen_03',
        title: 'Zeleň',
        moreLinkTitle: 'Ďalšie',
        url: 'zivotne-prostredie-a-vystavba/zelen',
        subItems: [
          {
            title: 'Údržba a tvorba zelene',
            url: 'zivotne-prostredie-a-vystavba/zelen/udrzba-a-tvorba-zelene',
          },
          {
            title: 'Mestské lesy',
            url: 'zivotne-prostredie-a-vystavba/zelen/mestske-lesy',
          },
        ],
      },
      {
        icon: 'verejne_osvetlenie_03',
        title: 'Verejné osvetlenie',
        moreLinkTitle: 'Ďalšie',
        url: 'zivotne-prostredie-a-vystavba/verejne-osvetlenie',
        subItems: [
          {
            title: 'Podnety',
            url: 'zivotne-prostredie-a-vystavba/verejne-osvetlenie',
          },
          {
            title: 'Stavebná činnosť na uzemí mesta',
            url: 'zivotne-prostredie-a-vystavba/verejne-osvetlenie/stavebna-cinnost-na-uzemi-mesta',
          },
          {
            title: 'Využitie existujúcej infraštruktúry',
            url: 'zivotne-prostredie-a-vystavba/verejne-osvetlenie/vyuzitie-existujucej-infrastruktury',
          },
        ],
      },
      {
        icon: 'rozvoj_mesta_03',
        title: 'Rozvoj mesta',
        moreLinkTitle: 'Ďalšie',
        url: 'zivotne-prostredie-a-vystavba/rozvoj-mesta',
        subItems: [
          {
            title: 'Územnoplánovacie dokumenty',
            url: 'zivotne-prostredie-a-vystavba/rozvoj-mesta/uzemnoplanovacie-dokumenty',
          },
          {
            title: 'Obstarávanie územnoplánovacích dokumentov',
            url: 'zivotne-prostredie-a-vystavba/rozvoj-mesta/obstaravanie-uzemnoplanovacich-dokumentov',
          },
          {
            title: 'Usmeňovanie výstavby',
            url: 'zivotne-prostredie-a-vystavba/rozvoj-mesta/usmernovanie-vystavby',
          },
        ],
      },
    ],
  },
  {
    id: '2',
    color: 'rgb(var(--color-yellow--light))',
    colorDark: 'rgb(var(--color-yellow--dark))',
    icon: 'socialna_pomoc_04',
    coloredIcon: 'socialna_pomoc_color_04',
    title: 'Sociálne služby \na bývanie',
    subItems: [
      {
        icon: 'byvanie_04',
        title: 'Bývanie a ubytovanie',
        moreLinkTitle: 'Ďalšie',
        url: 'socialne-sluzby-a-byvanie/byvanie-a-ubytovanie',
        subItems: [
          {
            title: 'Nájomné bývanie',
            url: 'socialne-sluzby-a-byvanie/byvanie-a-ubytovanie/najomne-byvanie',
          },
          {
            title: 'Ubytovne',
            url: 'socialne-sluzby-a-byvanie/byvanie-a-ubytovanie/ubytovne',
          },
          {
            title: 'Krízové ubytovanie',
            url: 'socialne-sluzby-a-byvanie/byvanie-a-ubytovanie/krizove-ubytovanie',
          },
        ],
      },
      {
        icon: 'zariadenia_04',
        title: 'Sociálne zariadenia',
        moreLinkTitle: 'Ďalšie',
        url: 'socialne-sluzby-a-byvanie/socialne-zariadenia',
        subItems: [
          {
            title: 'Zariadenia a služby pre seniorov',
            url: 'socialne-sluzby-a-byvanie/socialne-zariadenia/zariadenia-pre-seniorov-a-zariadenia-opatrovatelskej-sluzby',
          },
          {
            title: 'RETEST centrum pre deti a rodiny',
            url: 'socialne-sluzby-a-byvanie/socialne-zariadenia/centrum-pre-deti-a-rodiny-s-resocializacnym-programom-retest',
          },
          {
            title: 'Centrum pre deti a rodiny REPULS',
            url: 'socialne-sluzby-a-byvanie/socialne-zariadenia/centrum-pre-deti-a-rodiny-repuls',
          },
        ],
      },
      {
        icon: 'sluzby_04',
        title: 'Sociálne služby',
        moreLinkTitle: 'Ďalšie',
        url: 'socialne-sluzby-a-byvanie/socialne-sluzby',
        subItems: [
          {
            title: 'Služba FORTUNÁČIK',
            url: 'socialne-sluzby-a-byvanie/socialne-sluzby/nizkoprahova-socialna-sluzba-pre-deti-a-rodinu-fortunacik',
          },
          {
            title: 'Domáca opatrovateľská služba',
            url: 'socialne-sluzby-a-byvanie/socialne-sluzby/domaca-opatrovatelska-sluzba',
          },
          {
            title: 'Komunikácia bez bariér',
            url: 'socialne-sluzby-a-byvanie/socialne-sluzby/komunikacia-bez-barier',
          },
        ],
      },
      {
        icon: 'pomoc_04',
        title: 'Sociálna pomoc',
        moreLinkTitle: 'Ďalšie',
        url: 'socialne-sluzby-a-byvanie/socialna-pomoc',
        subItems: [
          {
            title: 'Služby finančnej pomoci',
            url: 'socialne-sluzby-a-byvanie/socialna-pomoc/sluzby-financnej-pomoci',
          },
          {
            title: 'Nocľaháreň a útulok pre ľudí bez domova',
            url: 'socialne-sluzby-a-byvanie/socialna-pomoc/noclah-a-utulok-pre-ludi-bez-domova',
          },
          {
            title: 'Linky pomoci a podpory',
            url: 'socialne-sluzby-a-byvanie/socialna-pomoc/linky-pomoci',
          },
        ],
      },
      {
        icon: 'dotacie_05',
        title: 'Finančná podpora ',
        moreLinkTitle: 'Ďalšie',
        url: 'socialne-sluzby-a-byvanie/financna-podpora',
        subItems: [
          {
            title: 'Financovanie poskytovateľov',
            url: 'socialne-sluzby-a-byvanie/financna-podpora/financovanie-poskytovatelov-v-socialnych-sluzbach',
          },
          {
            title: 'Grantový program v sociálnej oblasti',
            url: 'socialne-sluzby-a-byvanie/financna-podpora/grantovy-program-v-socialnej-oblasti-bratislava-pre-vsetkych',
          },
          {
            title: 'Dotácie',
            url: 'socialne-sluzby-a-byvanie/financna-podpora/financovanie-poskytovatelov-v-socialnych-sluzbach/dotacie',
          },
        ],
      },
      {
        icon: 'aktivity_04',
        title: 'Aktivity v sociálnej oblasti',
        moreLinkTitle: 'Ďalšie',
        url: 'socialne-sluzby-a-byvanie/aktivity-v-socialnej-oblasti',
        subItems: [
          {
            title: 'Sekcia sociálnych vecí',
            url: 'socialne-sluzby-a-byvanie/aktivity-v-socialnej-oblasti/sekcia-socialnych-veci',
          },
          {
            title: 'Mestský terénny tím',
            url: 'socialne-sluzby-a-byvanie/aktivity-v-socialnej-oblasti/mestsky-terenny-tim',
          },
          {
            title: 'Proseniorske organizácie',
            url: 'socialne-sluzby-a-byvanie/aktivity-v-socialnej-oblasti/proseniorske-organizacie-a-aktivne-starnutie',
          },
        ],
      },
    ],
  },
  {
    id: '8',
    color: 'rgb(var(--color-purple--light))',
    colorDark: 'rgb(var(--color-purple--dark))',
    icon: 'vzdelavanie_05',
    coloredIcon: 'vzdelavanie_color_05',
    title: 'Vzdelávanie \na voľný čas',
    subItems: [
      {
        icon: 'skolstvo_05',
        title: 'Školstvo',
        moreLinkTitle: 'Ďalšie',
        url: 'vzdelavanie-a-volny-cas/skolstvo',
        subItems: [
          {
            title: 'Základné umelecké školy',
            url: 'vzdelavanie-a-volny-cas/skolstvo/zakladne-umelecke-skoly',
          },
          {
            title: 'Centrá voľného času (CVČ)',
            url: 'vzdelavanie-a-volny-cas/skolstvo/centra-volneho-casu',
          },
          {
            title: 'Neštátne školstvo',
            url: 'vzdelavanie-a-volny-cas/skolstvo/nestatne-skolstvo',
          },
        ],
      },
      {
        icon: 'sport_05',
        title: 'Šport',
        moreLinkTitle: 'Ďalšie',
        url: 'vzdelavanie-a-volny-cas/sport',
        subItems: [
          {
            title: 'Mapa športovísk',
            url: 'vzdelavanie-a-volny-cas/sport/mapa-sportovisk',
          },
          {
            title: 'STARZ',
            url: 'vzdelavanie-a-volny-cas/sport/STARZ',
          },
          {
            title: 'Koncepcia šport',
            url: 'vzdelavanie-a-volny-cas/sport/koncepcia-sport',
          },
        ],
      },
      {
        icon: 'deti_a_mladez_05',
        title: 'Deti a mládež',
        moreLinkTitle: 'Ďalšie',
        url: 'vzdelavanie-a-volny-cas/deti-a-mladez',
        subItems: [
          {
            title: 'Mestský parlament mladých',
            url: 'vzdelavanie-a-volny-cas/deti-a-mladez/mestsky-parlament-mladych',
          },
          {
            title: 'Centrá voľného času (CVČ)',
            url: 'vzdelavanie-a-volny-cas/skolstvo/centra-volneho-casu',
          },
          {
            title: 'Deti pre Bratislavu',
            url: 'vzdelavanie-a-volny-cas/deti-a-mladez/deti-pre-bratislavu',
          },
        ],
      },
      {
        icon: 'ocenovanie_05',
        title: 'Oceňovanie',
        moreLinkTitle: 'Ďalšie',
        url: 'vzdelavanie-a-volny-cas/ocenovanie',
        subItems: [
          {
            title: 'Talentovaná mládež',
            url: 'vzdelavanie-a-volny-cas/ocenovanie/talentovana-mladez',
          },
          {
            title: 'Bratislavská cena za šport',
            url: 'vzdelavanie-a-volny-cas/ocenovanie/bratislavska-cena-za-sport',
          },
          {
            title: 'Deň učiteľov',
            url: 'vzdelavanie-a-volny-cas/ocenovanie/den-ucitelov',
          },
        ],
      },
      {
        icon: 'dotacie_05',
        title: 'Dotácie',
        moreLinkTitle: 'Ďalšie',
        url: 'vzdelavanie-a-volny-cas/dotacie',
        subItems: [
          {
            title: 'Podprogram 1',
            url: 'vzdelavanie-a-volny-cas/dotacie/podprogram-1',
          },
          {
            title: 'Podprogram 2',
            url: 'vzdelavanie-a-volny-cas/dotacie/podprogram-2',
          },
          {
            title: 'Podprogram 3',
            url: 'vzdelavanie-a-volny-cas/dotacie/podprogram-3',
          },
        ],
      },
    ],
  },
  {
    id: '9',
    color: 'rgb(var(--color-brown--light))',
    colorDark: 'rgb(var(--color-brown--dark))',
    icon: 'kultura_06',
    coloredIcon: 'kultura_color_06',
    title: 'Kultúra \na komunity',
    subItems: [
      {
        icon: 'kalendar_06',
        title: 'Podujatia',
        moreLinkTitle: 'Ďalšie',
        url: 'kultura-a-komunity/podujatia',
        subItems: [
          {
            title: 'Kalendár podujatí',
            url: 'kultura-a-komunity/podujatia/kalendar-podujati',
          },
          {
            title: 'Mestské podujatia',
            url: 'kultura-a-komunity/podujatia/mestske-podujatia',
          },
          {
            title: 'Covid opatrenia pre kultúru',
            url: 'kultura-a-komunity/podujatia/covid-opatrenia-pre-kulturu',
          },
        ],
      },
      {
        icon: 'organizacie_06',
        title: 'Mestské kultúrne organizácie',
        moreLinkTitle: 'Ďalšie',
        url: 'kultura-a-komunity/mestske-kulturne-organizacie',
        subItems: [
          {
            title: 'Galéria mesta Bratislavy',
            url: 'kultura-a-komunity/mestske-kulturne-organizacie/galeria-mesta-bratislavy',
          },
          {
            title: 'Múzeum mesta Bratislavy',
            url: 'kultura-a-komunity/mestske-kulturne-organizacie/muzeum-mesta-bratislavy',
          },
          {
            title: 'Mestská knižnica v Bratislave',
            url: 'kultura-a-komunity/mestske-kulturne-organizacie/mestska-kniznica-v-bratislave',
          },
        ],
      },
      {
        icon: 'koncepcia_06',
        title: 'Koncepcia kultúry',
        moreLinkTitle: 'Ďalšie',
        url: 'kultura-a-komunity/konceepcia-kultury',
        subItems: [
          {
            title: 'Oddelenie kultúry',
            url: 'kultura-a-komunity/koncepcia-kultury/oddelenie-kultury',
          },
          {
            title: 'Odborné komisie',
            url: 'kultura-a-komunity/koncepcia-kultury/odborne-komisie',
          },
          {
            title: 'Projekty',
            url: 'kultura-a-komunity/koncepcia-kultury/projekty',
          },
        ],
      },
      {
        icon: 'sluzby_06',
        title: 'Kultúrne služby',
        moreLinkTitle: 'Ďalšie',
        url: 'kultura-a-komunity/kulturne-sluzby',
        subItems: [
          {
            title: 'Nadácia mesta Bratislavy',
            url: 'kultura-a-komunity/kulturne-sluzby/nadacia-mesta-bratislavy',
          },
          {
            title: 'Podpora strategických kultúrnych podujatí',
            url: 'kultura-a-komunity/kulturne-sluzby/podpora-strategickych-kulturnych-podujati',
          },
          {
            title: 'Nefinančná podpora podujatí',
            url: 'kultura-a-komunity/kulturne-sluzby/nefinancna-podpora-kulturnych-a-komunitnych-podujati',
          },
        ],
      },
      {
        icon: 'dedicstvo_06',
        title: 'Kultúrne dedičstvo a pamiatková starostlivosť',
        moreLinkTitle: 'Ďalšie ',
        url: 'kultura-a-komunity/kulturne-dedicstvo-a-pamiatkova-starostlivost',
        subItems: [
          {
            title: 'Národné kultúrne pamiatky',
            url: 'kultura-a-komunity/kulturne-dedicstvo-a-pamiatkova-starostlivost',
          },
          {
            title: 'Pamätihodnosti',
            url: 'kultura-a-komunity/kulturne-dedicstvo-a-pamiatkova-starostlivost',
          },
          {
            title: 'Umelecké diela vo verejnom priestore',
            url: 'kultura-a-komunity/kulturne-dedicstvo-a-pamiatkova-starostlivost',
          },
        ],
      },
      {
        icon: 'komunity_06',
        title: 'Komunity',
        moreLinkTitle: 'Ďalšie',
        url: 'kultura-a-komunity/komunity',
        subItems: [
          {
            title: 'Dôležité informácie pre cudzincov',
            url: 'kultura-a-komunity/komunity/informacie-pre-cudzincov-zijucich-v-bratislave',
          },
          {
            title: 'Bratislava pre Ukrajinu',
            url: 'kultura-a-komunity/komunity/bratislava-pre-ukrajinu',
          },
          {
            title: 'Братислава для України',
            url: 'братислава-для-украіни',
          },
        ],
      },
    ],
  },
]
const boardPage = {
  slug: 'mesto-bratislava/transparentne-mesto/official-board',
  title: 'Úradná tabuľa',
  pageBackgroundImage: null,
  pageButtonContent: null,
  locale: 'sk',
  parentPage: {
    slug: 'mesto-bratislava/transparentne-mesto',
    locale: 'sk',
    title: 'Transparentné mesto',
    parentPage: {
      slug: 'mesto-bratislava',
      locale: 'sk',
      title: 'Mesto Bratislava',
    },
  },
  relatedBlogPosts: [],
}

const documents = [
  {
    title: 'Kúpna zmluva technológie garáže M. Benku',
    createdAt: 'utorok 19. decembra 2017',
    fileExtension: '.pdf',
    fileSize: '164 kB',
    content: 'Kúpna zmluva na technológie inštalované v podzemnej garáži na Nám. M. Benku od odovzdávajúceho nájomcu',
  },
  {
    title: 'Kúpna zmluva technológie garáže M. Benku',
    createdAt: 'utorok 19. decembra 2017',
    fileExtension: '.pdf',
    fileSize: '164 kB',
    content: 'Kúpna zmluva na technológie inštalované v podzemnej garáži na Nám. M. Benku od odovzdávajúceho nájomcu',
  },
  {
    title: 'Kúpna zmluva technológie garáže M. Benku',
    createdAt: 'utorok 19. decembra 2017',
    fileExtension: '.pdf',
    fileSize: '164 kB',
    content: 'Kúpna zmluva na technológie inštalované v podzemnej garáži na Nám. M. Benku od odovzdávajúceho nájomcu',
  },
  {
    title: 'Kúpna zmluva technológie garáže M. Benku',
    createdAt: 'utorok 19. decembra 2017',
    fileExtension: '.pdf',
    fileSize: '164 kB',
    content: 'Kúpna zmluva na technológie inštalované v podzemnej garáži na Nám. M. Benku od odovzdávajúceho nájomcu',
  },
  {
    title: 'Kúpna zmluva technológie garáže M. Benku',
    createdAt: 'utorok 19. decembra 2017',
    fileExtension: '.pdf',
    fileSize: '164 kB',
    content: 'Kúpna zmluva na technológie inštalované v podzemnej garáži na Nám. M. Benku od odovzdávajúceho nájomcu',
  },
  {
    title: 'Kúpna zmluva technológie garáže M. Benku',
    createdAt: 'utorok 19. decembra 2017',
    fileExtension: '.pdf',
    fileSize: '164 kB',
    content: 'Kúpna zmluva na technológie inštalované v podzemnej garáži na Nám. M. Benku od odovzdávajúceho nájomcu',
  },
  {
    title: 'Kúpna zmluva technológie garáže M. Benku',
    createdAt: 'utorok 19. decembra 2017',
    fileExtension: '.pdf',
    fileSize: '164 kB',
    content: 'Kúpna zmluva na technológie inštalované v podzemnej garáži na Nám. M. Benku od odovzdávajúceho nájomcu',
  },
  {
    title: 'Kúpna zmluva technológie garáže M. Benku',
    createdAt: 'utorok 19. decembra 2017',
    fileExtension: '.pdf',
    fileSize: '164 kB',
    content: 'Kúpna zmluva na technológie inštalované v podzemnej garáži na Nám. M. Benku od odovzdávajúceho nájomcu',
  },
  {
    title: 'Kúpna zmluva technológie garáže M. Benku',
    createdAt: 'utorok 19. decembra 2017',
    fileExtension: '.pdf',
    fileSize: '164 kB',
    content: 'Kúpna zmluva na technológie inštalované v podzemnej garáži na Nám. M. Benku od odovzdávajúceho nájomcu',
  },
  {
    title: 'Kúpna zmluva technológie garáže M. Benku',
    createdAt: 'utorok 19. decembra 2017',
    fileExtension: '.pdf',
    fileSize: '164 kB',
    content: 'Kúpna zmluva na technológie inštalované v podzemnej garáži na Nám. M. Benku od odovzdávajúceho nájomcu',
  },
  {
    title: 'Kúpna zmluva technológie garáže M. Benku',
    createdAt: 'utorok 19. decembra 2017',
    fileExtension: '.pdf',
    fileSize: '164 kB',
    content: 'Kúpna zmluva na technológie inštalované v podzemnej garáži na Nám. M. Benku od odovzdávajúceho nájomcu',
  },
  {
    title: 'Kúpna zmluva technológie garáže M. Benku',
    createdAt: 'utorok 19. decembra 2017',
    fileExtension: '.pdf',
    fileSize: '164 kB',
    content: 'Kúpna zmluva na technológie inštalované v podzemnej garáži na Nám. M. Benku od odovzdávajúceho nájomcu',
  },
  {
    title: 'Kúpna zmluva technológie garáže M. Benku',
    createdAt: 'utorok 19. decembra 2017',
    fileExtension: '.pdf',
    fileSize: '164 kB',
    content: 'Kúpna zmluva na technológie inštalované v podzemnej garáži na Nám. M. Benku od odovzdávajúceho nájomcu',
  },
  {
    title: 'Kúpna zmluva technológie garáže M. Benku',
    createdAt: 'utorok 19. decembra 2017',
    fileExtension: '.pdf',
    fileSize: '164 kB',
    content: 'Kúpna zmluva na technológie inštalované v podzemnej garáži na Nám. M. Benku od odovzdávajúceho nájomcu',
  },
  {
    title: 'Kúpna zmluva technológie garáže M. Benku',
    createdAt: 'utorok 19. decembra 2017',
    fileExtension: '.pdf',
    fileSize: '164 kB',
    content: 'Kúpna zmluva na technológie inštalované v podzemnej garáži na Nám. M. Benku od odovzdávajúceho nájomcu',
  },
]

export default OfficialBoard

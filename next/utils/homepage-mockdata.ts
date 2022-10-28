import { MenuMainItem } from '@bratislava/ui-bratislava'
import { TOP_NINE } from '@bratislava/ui-bratislava/TopNineItem/TopNineService'

import { getPosts } from '../components/organisms/posts/PostsService'

export const buildMockData = ({
  postImage1,
  postImage2,
  postImage3,
  newsImage1,
  newsImage2,
  inBaImage1,
  inBaImage2,
  primatorImage,
  councilImage,
  locale = 'sk',
}: {
  primatorImage: string
  councilImage: string
  postImage1: string
  postImage2: string
  postImage3: string
  newsImage1: string
  newsImage2: string
  inBaImage1: string
  inBaImage2: string
  locale?: string
}) => {
  const sk = {
    pageTitle: 'Bratislava',
    pageSubtitle: 'odolné a starostlivé mesto',
    blogCardPosts: [
      {
        imageSrc: postImage1,
        title: 'Verejný priestor na Kazanskej ulici vo Vrakuni sa dočká obnovy',
        url: '/',
      },
      {
        imageSrc: postImage3,
        title: 'Nový bytový súbor s nájomnými bytmi na Terchovskej ulici',
        url: '/',
      },
      {
        imageSrc: postImage1,
        title: 'Verejný priestor na Kazanskej ulici vo Vrakuni sa dočká obnovy',
        url: '/',
      },
      {
        imageSrc: postImage2,
        title: 'Bratislava mapuje lokality s najviac priestupkami',
        url: '/',
      },
      {
        imageSrc: postImage1,
        title: 'Verejný priestor na Kazanskej ulici vo Vrakuni sa dočká obnovy',
        url: '/',
      },
      {
        imageSrc: postImage2,
        title: 'Bratislava mapuje lokality s najviac priestupkami',
        url: '/',
      },
      {
        imageSrc: postImage1,
        title: 'Verejný priestor na Kazanskej ulici vo Vrakuni sa dočká obnovy',
        url: '/',
      },
      {
        imageSrc: postImage2,
        title: 'Bratislava mapuje lokality s najviac priestupkami',
        url: '/',
      },
    ],
    posts: getPosts(),
    council: {
      cards: [
        {
          title: 'Primátor',
          imageSrc: primatorImage,
          href: 'mesto-bratislava/sprava-mesta/volene-organy/primator',
        },
        {
          title: 'Zastupiteľstvo',
          imageSrc: councilImage,
          smImageAlign: 'right' as const,
          href: 'mesto-bratislava/sprava-mesta/volene-organy/zastupitelstvo',
        },
      ],
    },
    topNineTitle: 'Najvyhľadávanejšie služby',
    topNine: TOP_NINE.SK,
    inba: {
      title: 'in.ba',
      content: 'V bratislavskom informačnom magazíne in.ba vždy nájdete to, čo o dianí v meste potrebuje vedieť.',
      images: [inBaImage1, inBaImage2],
    },
    homepageMenu: MAIN_MENU,
    bookmarks: [
      {
        ...NEWCOMMER_BOOKMARK,
        bookmarkTitle: 'Я з України',
        variant: 'blue' as const,
      },
      {
        ...BOOKMARK,
        bookmarkTitle: 'Som turista',
        variant: 'red' as const,
      },
    ],
  }

  // ENGLISH VERSION

  const en = {
    pageTitle: 'Bratislava',
    pageSubtitle: 'resilient and caring city',
    blogCardPosts: [
      {
        imageSrc: postImage1,
        title: 'The public space on Kazanska Street in Vrakuňa will be renovated',
        url: '/',
      },
      {
        imageSrc: postImage2,
        title: 'Bratislava maps the sites with the most violations',
        url: '/',
      },
      {
        imageSrc: postImage1,
        title: 'The public space on Kazanska Street in Vrakuňa will be renovated',
        url: '/',
      },
      {
        imageSrc: postImage2,
        title: 'Bratislava maps the sites with the most violations',
        url: '/',
      },
      {
        imageSrc: postImage1,
        title: 'The public space on Kazanska Street in Vrakuňa will be renovated',
        url: '/',
      },
      {
        imageSrc: postImage2,
        title: 'Bratislava maps the sites with the most violations',
        url: '/',
      },
      {
        imageSrc: postImage1,
        title: 'The public space on Kazanska Street in Vrakuňa will be renovated',
        url: '/',
      },
      {
        imageSrc: postImage2,
        title: 'Bratislava maps the sites with the most violations',
        url: '/',
      },
    ],
    posts: getPosts(),
    council: {
      cards: [
        {
          title: 'Mayor',
          imageSrc: primatorImage,
          href: '/en/city-of-bratislava/city-administration/elected-bodies/mayor',
        },
        {
          title: 'City Council',
          imageSrc: councilImage,
          smImageAlign: 'right' as const,
          href: '/en/city-of-bratislava/city-administration/elected-bodies/city-council',
        },
      ],
    },
    topNineTitle: 'Top Services',
    topNine: TOP_NINE.EN,
    inba: {
      title: 'in.ba',
      content:
        'Your information magazine in.ba where you can always find what you need to know about what is going on in the city.',
      images: [inBaImage1, inBaImage2],
    },
    homepageMenu: MAIN_MENU_EN,
    bookmarks: [
      {
        ...NEWCOMMER_BOOKMARK_EN,
        bookmarkTitle: 'Help for Ukraine',
        variant: 'blue' as const,
      },
      {
        ...BOOKMARK_EN,
        bookmarkTitle: 'I am a tourist',
        variant: 'red' as const,
      },
    ],
  }

  if (locale !== 'sk') return en
  return sk
}

// This represents menu as present in figma

const MAIN_MENU: MenuMainItem[] = [
  {
    id: '1',
    title: 'Mesto\nBratislava',
    color: '#F8D7D4',
    colorDark: '#E46054',
    icon: 'castle',
    coloredIcon: 'castle-colored',
    subItems: [
      {
        title: 'Správa mesta',
        icon: 'city-hall',
        url: '',
        subItems: [
          { title: 'Magistrát', url: '' },
          { title: 'Volené orgány', url: '' },
          { title: 'Mestské organizácie', url: '' },
        ],
      },
      {
        title: 'Transparentné mesto',
        icon: 'looking-glass',
        url: '',
        subItems: [
          { title: 'Open Data', url: '' },
          { title: 'Zverejňovanie', url: '' },
          { title: 'Majetok mesta', url: '' },
          { title: 'Financie mesta', url: '' },
          { title: 'Výročné správy', url: '' },
          { title: 'Protikorupčné minimum', url: '' },
        ],
      },
      {
        title: 'Dane a poplatky',
        icon: 'coin',
        url: '',
        subItems: [
          { title: 'Daň z nehnuteľnosti', url: '' },
          { title: 'Daň za užívanie verejného priestranstva', url: '' },
          { title: 'Daň za ubytovanie', url: '' },
          {
            title: 'Poplatok za komunálny odpad a drobný stavebný odpad',
            url: '',
          },
        ],
      },
      {
        title: 'Projekty',
        icon: 'bulb-off',
        url: '',
        subItems: [
          { title: 'Modernizácia Ružinovskej radiály', url: '' },
          { title: 'Kúpele Grossling', url: '' },
          { title: 'Lovci komárov', url: '' },
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'Doprava\na mapy',
    color: '#D0ECF8',
    colorDark: '#0F6D95',
    icon: 'car-with-map',
    coloredIcon: 'car-with-map-colored',
    subItems: [
      {
        title: 'Doprava',
        icon: 'car',
        url: '',
        subItems: [
          { title: 'Územný generel dopravy', url: '' },
          { title: 'Dopravné povolenia', url: '' },
        ],
      },
      {
        title: 'Správa a údržba komunikácií',
        icon: 'road',
        url: '',
        subItems: [
          { title: 'Rozkopávky a uzávery', url: '' },
          { title: 'Zimná údržba', url: '' },
        ],
      },
      {
        title: 'Mapy',
        icon: 'map',
        url: '',
        subItems: [
          { title: 'Rozkopávky a uzávery', url: '' },
          { title: 'Zimná údržba', url: '' },
        ],
      },
      {
        title: 'Parkovanie',
        icon: 'parking',
        url: '',
        subItems: [
          { title: 'Parkovacia politika', url: '' },
          { title: 'Odťahovanie vozidiel', url: '' },
        ],
      },
      {
        title: 'Cyklodoprava',
        icon: 'bicycle',
        url: '',
        subItems: [
          { title: 'Cykloradiály a okruhy', url: '' },
          { title: 'Pripravované cyklotrasy', url: '' },
        ],
      },
      {
        title: 'Zdieľaná mobilita',
        icon: 'share',
        url: '',
        subItems: [
          { title: 'Zdieľané bicykle', url: '' },
          { title: 'Zdieľané autá', url: '' },
        ],
      },
      {
        title: 'Mestská hromadná doprava',
        icon: 'trolleybus',
        url: '',
        subItems: [
          { title: 'Dopravný podnik Bratislava', url: '' },
          { title: 'Integrovaný dopravný systém', url: '' },
        ],
      },
    ],
  },
  {
    id: '3',
    title: 'Životné prostredie\na výstavba',
    color: '#C4EFCE',
    colorDark: '#237C36',
    icon: 'house-with-tree',
    coloredIcon: 'house-with-tree-colored',
    subItems: [
      {
        title: 'Životné prostredie',
        icon: 'hand-plant',
        url: '',
        subItems: [
          { title: 'Odpady', url: '' },
          { title: 'Ovzdušie', url: '' },
          { title: 'Ochrana prírody a krajiny', url: '' },
        ],
      },
      {
        title: 'Zeleň',
        icon: 'tree',
        url: '',
        subItems: [
          { title: 'Mestská zeleň', url: '' },
          { title: 'Parky a záhrady', url: '' },
          { title: 'Metské lesy', url: '' },
        ],
      },
      {
        title: 'Územnoplánovacie dokumenty',
        icon: 'compass',
        url: '',
        subItems: [
          { title: 'Platná územnoplánovacia dokumentácia', url: '' },
          { title: 'Prerokované územnoplánovacie podklady', url: '' },
        ],
      },
      {
        title: 'Rozvoj mesta',
        icon: 'crane',
        url: '',
        subItems: [
          { title: 'Usmerňovanie výstavby', url: '' },
          { title: 'Územnoplánovacia informácia', url: '' },
          { title: 'Záväzné stanovisko k investičnej činnosti', url: '' },
        ],
      },
    ],
  },
  {
    id: '4',
    title: 'Sociálne služby\na bývanie',
    color: '#FFE781',
    colorDark: '#E3A612',
    icon: 'hand-heart',
    coloredIcon: 'hand-heart-colored',
    subItems: [
      {
        title: 'Bývanie a ubytovanie',
        icon: 'large-building',
        url: '',
        subItems: [
          { title: 'Nájomné bývanie', url: '' },
          { title: 'Mestské ubytovne', url: '' },
          { title: 'Krízové centrá', url: '' },
          { title: 'Projekt Dostupné bývanie', url: '' },
        ],
      },
      {
        title: 'Sociálne zariadenia',
        icon: 'old-person',
        url: '',
        subItems: [
          { title: 'Domovy dôchodcov', url: '' },
          { title: 'Resocializačné zariadenia', url: '' },
        ],
      },
      {
        title: 'Sociálne služby',
        icon: 'hand-person',
        url: '',
        subItems: [
          { title: 'Poradenstvo', url: '' },
          { title: 'Opatrovateľská služba a osobná asistencia', url: '' },
          { title: 'Mestský terénny tím', url: '' },
          { title: 'Komunitný plán sociálnych služieb', url: '' },
        ],
      },
      {
        title: 'Sociálna pomoc',
        icon: 'heart',
        url: '',
        subItems: [
          { title: 'Finančná pomoc', url: '' },
          { title: 'Materiálna pomoc', url: '' },
          { title: 'Jedlo a šatstvo', url: '' },
          { title: 'Linky pomoci', url: '' },
        ],
      },
    ],
  },
  {
    id: '5',
    title: 'Vzdelávanie\na voľný čas',
    color: '#C7CAFF',
    colorDark: '#5158D8',
    icon: 'book-with-child',
    coloredIcon: 'book-with-child-colored',
    subItems: [
      {
        title: 'Školstvo',
        icon: 'school',
        url: '',
        subItems: [
          { title: 'Základné umelecké školy (ZUŠ)', url: '' },
          { title: 'Centrá voľného času (CVČ)', url: '' },
          { title: 'Neštátne školstvo', url: '' },
          { title: 'Mestská školská rada', url: '' },
        ],
      },
      {
        title: 'Šport',
        icon: 'ball',
        url: '',
        subItems: [
          { title: 'Mapa športovísk', url: '' },
          { title: 'CeSTARZ', url: '' },
          { title: 'Koncepcia šport', url: '' },
          { title: 'Medzinárodné spolupráce', url: '' },
        ],
      },
      {
        title: 'Deti a mládež',
        icon: 'child',
        url: '',
        subItems: [
          { title: 'Mestský parlament mladých', url: '' },
          { title: 'Centrá voľného času (CVČ)', url: '' },
          { title: 'Deti pre Bratislavu', url: '' },
          { title: 'Koncepcia mládeže', url: '' },
        ],
      },
      {
        title: 'Oceňovanie',
        icon: 'medal',
        url: '',
        subItems: [
          { title: 'Talentovaná mládež', url: '' },
          { title: 'Bratislavská cena za šport', url: '' },
          { title: 'Deň učiteľov', url: '' },
        ],
      },
      {
        title: 'Dotácie',
        icon: 'hand-coins',
        url: '',
        subItems: [
          {
            title: 'Podpora pohybových aktivít a vzdelávania detí a mládeže',
            url: '',
          },
          { title: 'Podpora športových a vzdelávacích podujatí', url: '' },
        ],
      },
    ],
  },
  {
    id: '6',
    title: 'Kultúra\na komunity',
    color: '#FFCB9B',
    colorDark: '#D97921',
    icon: 'mask-with-ball',
    coloredIcon: 'mask-with-ball-colored',
    subItems: [
      {
        title: 'Kalendár podujatí',
        icon: 'calendar',
        url: '',
        subItems: [
          { title: 'Finančná pomoc', url: '' },
          { title: 'Materiálna pomoc', url: '' },
          { title: 'Jedlo a šatstvo', url: '' },
          { title: 'Linky pomoci', url: '' },
        ],
      },
      {
        title: 'Mestské podujatia',
        icon: 'stall',
        url: '',
        subItems: [
          { title: 'Bratislavské mestské dni', url: '' },
          { title: 'Kultúrne leto', url: '' },
          { title: 'Vianočné trhy', url: '' },
        ],
      },
      {
        title: 'Kultúrne organizácie',
        icon: 'history',
        url: '',
        subItems: [
          { title: 'Finančná pomoc', url: '' },
          { title: 'Materiálna pomoc', url: '' },
          { title: 'Jedlo a šatstvo', url: '' },
          { title: 'Linky pomoci', url: '' },
        ],
      },
      {
        title: 'Kultúrne dedičstvo a pamiatková starostlivosť',
        icon: 'chest',
        url: '',
        subItems: [
          { title: 'Zoznam pamätihodností mesta', url: '' },
          { title: 'Diela vo verejnom priestore', url: '' },
        ],
      },
      {
        title: 'Podpora kultúrnych podujatí',
        icon: 'theater',
        url: '',
        subItems: [
          { title: 'Dotácie', url: '' },
          { title: 'Záštita primátora', url: '' },
        ],
      },
      {
        title: 'Cezharničná spolupráca',
        icon: 'globe',
        url: '',
        subItems: [
          { title: 'Finančná pomoc', url: '' },
          { title: 'Materiálna pomoc', url: '' },
          { title: 'Jedlo a šatstvo', url: '' },
          { title: 'Linky pomoci', url: '' },
        ],
      },
      {
        title: 'Koncepcia kultúry',
        icon: 'paper-mask',
        url: '',
        subItems: [
          { title: 'Finančná pomoc', url: '' },
          { title: 'Materiálna pomoc', url: '' },
          { title: 'Jedlo a šatstvo', url: '' },
          { title: 'Linky pomoci', url: '' },
        ],
      },
      {
        title: 'Komunity',
        icon: 'paper-mask',
        url: '',
        subItems: [
          { title: 'Finančná pomoc', url: '' },
          { title: 'Materiálna pomoc', url: '' },
          { title: 'Jedlo a šatstvo', url: '' },
          { title: 'Linky pomoci', url: '' },
        ],
      },
    ],
  },
]

const BOOKMARK = {
  title: 'Spoznajte Bratislavu',
  icon: 'signpost',
  content: 'Aktuálne novinky, podujatia a atrakcie v Bratislave na jednom mieste.',
  link: {
    title: 'Prejsť na stránku',
    href: 'https://www.visitbratislava.com/sk/',
  },
}

const NEWCOMMER_BOOKMARK = {
  title: 'Братислава для України',
  icon: 'ua',
  content: 'Вся необхідна інформація про допомогу та послуги для народу України.',
  link: {
    title: 'Дізнатися більше',
    href: '/kultura-a-komunity/komunity/братислава-для-украіни',
  },
}

// This represents menu as present in figma

const MAIN_MENU_EN: MenuMainItem[] = [
  {
    id: '1',
    title: 'Mesto\nBratislava',
    color: '#F8D7D4',
    colorDark: '#E46054',
    icon: 'castle',
    coloredIcon: 'castle-colored',
    subItems: [
      {
        title: 'Správa mesta',
        icon: 'city-hall',
        url: '',
        subItems: [
          { title: 'Magistrát', url: '' },
          { title: 'Volené orgány', url: '' },
          { title: 'Mestské organizácie', url: '' },
        ],
      },
      {
        title: 'Transparentné mesto',
        icon: 'looking-glass',
        url: '',
        subItems: [
          { title: 'Open Data', url: '' },
          { title: 'Zverejňovanie', url: '' },
          { title: 'Majetok mesta', url: '' },
          { title: 'Financie mesta', url: '' },
          { title: 'Výročné správy', url: '' },
          { title: 'Protikorupčné minimum', url: '' },
        ],
      },
      {
        title: 'Dane a poplatky',
        icon: 'coin',
        url: '',
        subItems: [
          { title: 'Daň z nehnuteľnosti', url: '' },
          { title: 'Daň za užívanie verejného priestranstva', url: '' },
          { title: 'Daň za ubytovanie', url: '' },
          {
            title: 'Poplatok za komunálny odpad a drobný stavebný odpad',
            url: '',
          },
        ],
      },
      {
        title: 'Projekty',
        icon: 'bulb-off',
        url: '',
        subItems: [
          { title: 'Modernizácia Ružinovskej radiály', url: '' },
          { title: 'Kúpele Grossling', url: '' },
          { title: 'Lovci komárov', url: '' },
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'Doprava\na mapy',
    color: '#D0ECF8',
    colorDark: '#0F6D95',
    icon: 'car-with-map',
    coloredIcon: 'car-with-map-colored',
    subItems: [
      {
        title: 'Doprava',
        icon: 'car',
        url: '',
        subItems: [
          { title: 'Územný generel dopravy', url: '' },
          { title: 'Dopravné povolenia', url: '' },
        ],
      },
      {
        title: 'Správa a údržba komunikácií',
        icon: 'road',
        url: '',
        subItems: [
          { title: 'Rozkopávky a uzávery', url: '' },
          { title: 'Zimná údržba', url: '' },
        ],
      },
      {
        title: 'Mapy',
        icon: 'map',
        url: '',
        subItems: [
          { title: 'Rozkopávky a uzávery', url: '' },
          { title: 'Zimná údržba', url: '' },
        ],
      },
      {
        title: 'Parkovanie',
        icon: 'parking',
        url: '',
        subItems: [
          { title: 'Parkovacia politika', url: '' },
          { title: 'Odťahovanie vozidiel', url: '' },
        ],
      },
      {
        title: 'Cyklodoprava',
        icon: 'bicycle',
        url: '',
        subItems: [
          { title: 'Cykloradiály a okruhy', url: '' },
          { title: 'Pripravované cyklotrasy', url: '' },
        ],
      },
      {
        title: 'Zdieľaná mobilita',
        icon: 'share',
        url: '',
        subItems: [
          { title: 'Zdieľané bicykle', url: '' },
          { title: 'Zdieľané autá', url: '' },
        ],
      },
      {
        title: 'Mestská hromadná doprava',
        icon: 'trolleybus',
        url: '',
        subItems: [
          { title: 'Dopravný podnik Bratislava', url: '' },
          { title: 'Integrovaný dopravný systém', url: '' },
        ],
      },
    ],
  },
  {
    id: '3',
    title: 'Životné prostredie\na výstavba',
    color: '#C4EFCE',
    colorDark: '#237C36',
    icon: 'house-with-tree',
    coloredIcon: 'house-with-tree-colored',
    subItems: [
      {
        title: 'Životné prostredie',
        icon: 'hand-plant',
        url: '',
        subItems: [
          { title: 'Odpady', url: '' },
          { title: 'Ovzdušie', url: '' },
          { title: 'Ochrana prírody a krajiny', url: '' },
        ],
      },
      {
        title: 'Zeleň',
        icon: 'tree',
        url: '',
        subItems: [
          { title: 'Mestská zeleň', url: '' },
          { title: 'Parky a záhrady', url: '' },
          { title: 'Metské lesy', url: '' },
        ],
      },
      {
        title: 'Územnoplánovacie dokumenty',
        icon: 'compass',
        url: '',
        subItems: [
          { title: 'Platná územnoplánovacia dokumentácia', url: '' },
          { title: 'Prerokované územnoplánovacie podklady', url: '' },
        ],
      },
      {
        title: 'Rozvoj mesta',
        icon: 'crane',
        url: '',
        subItems: [
          { title: 'Usmerňovanie výstavby', url: '' },
          { title: 'Územnoplánovacia informácia', url: '' },
          { title: 'Záväzné stanovisko k investičnej činnosti', url: '' },
        ],
      },
    ],
  },
  {
    id: '4',
    title: 'Sociálne služby\na bývanie',
    color: '#FFE781',
    colorDark: '#E3A612',
    icon: 'hand-heart',
    coloredIcon: 'hand-heart-colored',
    subItems: [
      {
        title: 'Bývanie a ubytovanie',
        icon: 'large-building',
        url: '',
        subItems: [
          { title: 'Nájomné bývanie', url: '' },
          { title: 'Mestské ubytovne', url: '' },
          { title: 'Krízové centrá', url: '' },
          { title: 'Projekt Dostupné bývanie', url: '' },
        ],
      },
      {
        title: 'Sociálne zariadenia',
        icon: 'old-person',
        url: '',
        subItems: [
          { title: 'Domovy dôchodcov', url: '' },
          { title: 'Resocializačné zariadenia', url: '' },
        ],
      },
      {
        title: 'Sociálne služby',
        icon: 'hand-person',
        url: '',
        subItems: [
          { title: 'Poradenstvo', url: '' },
          { title: 'Opatrovateľská služba a osobná asistencia', url: '' },
          { title: 'Mestský terénny tím', url: '' },
          { title: 'Komunitný plán sociálnych služieb', url: '' },
        ],
      },
      {
        title: 'Sociálna pomoc',
        icon: 'heart',
        url: '',
        subItems: [
          { title: 'Finančná pomoc', url: '' },
          { title: 'Materiálna pomoc', url: '' },
          { title: 'Jedlo a šatstvo', url: '' },
          { title: 'Linky pomoci', url: '' },
        ],
      },
    ],
  },
  {
    id: '5',
    title: 'Vzdelávanie\na voľný čas',
    color: '#C7CAFF',
    colorDark: '#5158D8',
    icon: 'book-with-child',
    coloredIcon: 'book-with-child-colored',
    subItems: [
      {
        title: 'Školstvo',
        icon: 'school',
        url: '',
        subItems: [
          { title: 'Základné umelecké školy (ZUŠ)', url: '' },
          { title: 'Centrá voľného času (CVČ)', url: '' },
          { title: 'Neštátne školstvo', url: '' },
          { title: 'Mestská školská rada', url: '' },
        ],
      },
      {
        title: 'Šport',
        icon: 'ball',
        url: '',
        subItems: [
          { title: 'Mapa športovísk', url: '' },
          { title: 'CeSTARZ', url: '' },
          { title: 'Koncepcia šport', url: '' },
          { title: 'Medzinárodné spolupráce', url: '' },
        ],
      },
      {
        title: 'Deti a mládež',
        icon: 'child',
        url: '',
        subItems: [
          { title: 'Mestský parlament mladých', url: '' },
          { title: 'Centrá voľného času (CVČ)', url: '' },
          { title: 'Deti pre Bratislavu', url: '' },
          { title: 'Koncepcia mládeže', url: '' },
        ],
      },
      {
        title: 'Oceňovanie',
        icon: 'medal',
        url: '',
        subItems: [
          { title: 'Talentovaná mládež', url: '' },
          { title: 'Bratislavská cena za šport', url: '' },
          { title: 'Deň učiteľov', url: '' },
        ],
      },
      {
        title: 'Dotácie',
        icon: 'hand-coins',
        url: '',
        subItems: [
          {
            title: 'Podpora pohybových aktivít a vzdelávania detí a mládeže',
            url: '',
          },
          { title: 'Podpora športových a vzdelávacích podujatí', url: '' },
        ],
      },
    ],
  },
  {
    id: '6',
    title: 'Kultúra\na komunity',
    color: '#FFCB9B',
    colorDark: '#D97921',
    icon: 'mask-with-ball',
    coloredIcon: 'mask-with-ball-colored',
    subItems: [
      {
        title: 'Kalendár podujatí',
        icon: 'calendar',
        url: '',
        subItems: [
          { title: 'Finančná pomoc', url: '' },
          { title: 'Materiálna pomoc', url: '' },
          { title: 'Jedlo a šatstvo', url: '' },
          { title: 'Linky pomoci', url: '' },
        ],
      },
      {
        title: 'Mestské podujatia',
        icon: 'stall',
        url: '',
        subItems: [
          { title: 'Bratislavské mestské dni', url: '' },
          { title: 'Kultúrne leto', url: '' },
          { title: 'Vianočné trhy', url: '' },
        ],
      },
      {
        title: 'Kultúrne organizácie',
        icon: 'history',
        url: '',
        subItems: [
          { title: 'Finančná pomoc', url: '' },
          { title: 'Materiálna pomoc', url: '' },
          { title: 'Jedlo a šatstvo', url: '' },
          { title: 'Linky pomoci', url: '' },
        ],
      },
      {
        title: 'Kultúrne dedičstvo a pamiatková starostlivosť',
        icon: 'chest',
        url: '',
        subItems: [
          { title: 'Zoznam pamätihodností mesta', url: '' },
          { title: 'Diela vo verejnom priestore', url: '' },
        ],
      },
      {
        title: 'Podpora kultúrnych podujatí',
        icon: 'theater',
        url: '',
        subItems: [
          { title: 'Dotácie', url: '' },
          { title: 'Záštita primátora', url: '' },
        ],
      },
      {
        title: 'Cezharničná spolupráca',
        icon: 'globe',
        url: '',
        subItems: [
          { title: 'Finančná pomoc', url: '' },
          { title: 'Materiálna pomoc', url: '' },
          { title: 'Jedlo a šatstvo', url: '' },
          { title: 'Linky pomoci', url: '' },
        ],
      },
      {
        title: 'Koncepcia kultúry',
        icon: 'paper-mask',
        url: '',
        subItems: [
          { title: 'Finančná pomoc', url: '' },
          { title: 'Materiálna pomoc', url: '' },
          { title: 'Jedlo a šatstvo', url: '' },
          { title: 'Linky pomoci', url: '' },
        ],
      },
      {
        title: 'Komunity',
        icon: 'paper-mask',
        url: '',
        subItems: [
          { title: 'Finančná pomoc', url: '' },
          { title: 'Materiálna pomoc', url: '' },
          { title: 'Jedlo a šatstvo', url: '' },
          { title: 'Linky pomoci', url: '' },
        ],
      },
    ],
  },
]

const BOOKMARK_EN = {
  title: 'Get to know Bratislava',
  icon: 'signpost',
  content: 'Your ultimate guide - all the things you should know before travelling to Bratislava.',
  link: {
    title: 'Prejsť na stránku',
    href: 'https://www.visitbratislava.com/',
  },
}

const NEWCOMMER_BOOKMARK_EN = {
  title: 'Bratislava for Ukraine',
  icon: 'ua',
  content: 'All information about help and services for Ukrainians provided by Bratislava',
  link: {
    title: 'Find out more',
    href: '/en/bratislava-for-ukraine',
  },
}

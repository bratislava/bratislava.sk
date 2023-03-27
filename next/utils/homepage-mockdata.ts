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
    posts: [
      {
        category: 'Aktuality',
      },
      {
        category: 'Úradná tabuľa',
      },
      {
        category: 'Rozkopávky',
      },
      {
        category: 'Zverejňovanie',
      },
    ],
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
    topNine: [
      {
        title: 'Elektronické\nslužby',
        icon: 'icon1',
        href: 'https://esluzby.bratislava.sk/',
        linkTitle: 'Zistiť viac',
      },
      {
        title: 'Miestne dane\na poplatky',
        icon: 'icon2',
        href: '/mesto-bratislava/dane-a-poplatky',
        linkTitle: 'Zistiť viac',
      },
      {
        title: 'Verejné \npriestory',
        icon: 'icon3',
        href: '/mesto-bratislava/projekty/zive-miesta',
        linkTitle: 'Zistiť viac',
      },
      {
        title: 'Nahlásenie\npodnetov',
        icon: 'icon4',
        href: '/rychle-zasahy',
        linkTitle: 'Zistiť viac',
      },
      {
        title: 'Projekty',
        icon: 'icon5',
        href: '/mesto-bratislava/projekty',
        linkTitle: 'Zistiť viac',
      },
      {
        title: 'Turistom v hlavnom\nmeste',
        icon: 'icon6',
        href: 'https://www.visitbratislava.com',
        linkTitle: 'Zistiť viac',
      },
      {
        title: 'Organizačná\nštruktúra',
        icon: 'icon7',
        href: '/mesto-bratislava/sprava-mesta/magistrat/organizacna-struktura-a-kontakty',
        linkTitle: 'Zistiť viac',
      },
      {
        title: 'Návštevné\na úradné hodiny',
        icon: 'icon8',
        href: '/uradne-a-navstevne-hodiny',
        linkTitle: 'Zistiť viac',
      },
      {
        title: 'Pracovné\npríležitosti',
        icon: 'icon9',
        href: 'https://ats.nalgoo.com/sk/gate/bratislava/positions',
        linkTitle: 'Zistiť viac',
      },
    ],
    inba: {
      title: 'in.ba',
      content:
        'V bratislavskom informačnom magazíne in.ba vždy nájdete to, čo o dianí v meste potrebuje vedieť.',
      images: [inBaImage1, inBaImage2],
    },
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
    posts: [
      {
        category: 'Latest News',
      },
      {
        category: 'Official noticeboard',
      },
      {
        category: 'Road closures',
      },
      {
        category: 'Public information',
      },
    ],
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
    topNine: [
      {
        title: 'eServices',
        icon: 'icon1',
        href: 'https://esluzby.bratislava.sk/',
        linkTitle: 'Read more',
      },
      {
        title: 'Taxes\nand Levies',
        icon: 'icon2',
        href: '/en/city-of-bratislava/taxes-and-levies',
        linkTitle: 'Read more',
      },
      {
        title: 'Public \nspaces',
        icon: 'icon3',
        href: '/en/city-of-bratislava/projects/living-spaces',
        linkTitle: 'Read more',
      },
      {
        title: 'Your\nsuggestions',
        icon: 'icon4',
        href: '/rychle-zasahy',
        linkTitle: 'Read more',
      },
      {
        title: 'Projects',
        icon: 'icon5',
        href: '/en/city-of-bratislava/projects',
        linkTitle: 'Read more',
      },
      {
        title: 'For\nTourists',
        icon: 'icon6',
        href: 'https://www.visitbratislava.com',
        linkTitle: 'Read more',
      },
      {
        title: 'Organisational\nstructure',
        icon: 'icon7',
        href: '/en/city-of-bratislava/city-administration/city-hall/organisational-structure-and-contact-details',
        linkTitle: 'Read more',
      },
      {
        title: 'Visiting\nand office hours',
        icon: 'icon8',
        href: '/en/visiting-and-office-hours',
        linkTitle: 'Read more',
      },
      {
        title: 'Job\nopportunities',
        icon: 'icon9',
        href: 'https://ats.nalgoo.com/sk/gate/bratislava/positions',
        linkTitle: 'Read more',
      },
    ],
    inba: {
      title: 'in.ba',
      content:
        'Your information magazine in.ba where you can always find what you need to know about what is going on in the city.',
      images: [inBaImage1, inBaImage2],
    },
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

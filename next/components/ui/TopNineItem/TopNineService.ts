import { TopNineItemIcon } from '@bratislava/ui-bratislava/TopNineItem/TopNineItem'

export interface TopNine {
  icon: TopNineItemIcon
  title: string
  href: string
  linkTitle: string
}

interface TopNineDictionary {
  EN: TopNine[]
  SK: TopNine[]
}

export const TOP_NINE: TopNineDictionary = {
  SK: [
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
  EN: [
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
}

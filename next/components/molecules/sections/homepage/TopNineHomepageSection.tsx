import React, { useMemo } from 'react'
import { SectionContainer, TopNine } from '@components/ui'
import { TopNineItemProps } from '@components/ui/TopNineItem/TopNineItem'
import { useTranslation } from 'next-i18next'

// TODO: Load from Strapi.
const sk = {
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
}

const en = {
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
}

const TopNineHomepageSection = () => {
  const { i18n } = useTranslation()

  const data = useMemo(() => {
    if (i18n.language === 'sk') {
      return sk
    }
    if (i18n.language === 'en') {
      return en
    }
    return null
  }, [i18n.language])

  if (!data) {
    return null
  }
  return (
    <SectionContainer className="relative bg-category-200 py-8">
      <h2 className="text-h1 pb-10 text-center xs:mt-8 lg:pb-20">{data.topNineTitle}</h2>
      <TopNine items={data.topNine as TopNineItemProps[]} />
    </SectionContainer>
  )
}

export default TopNineHomepageSection

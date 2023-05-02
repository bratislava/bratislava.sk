import SectionContainer from '@components/ui/SectionContainer/SectionContainer'
import BlogCards from '@components/ui/Sections/BlogCards/BlogCards'
import HomepageTabs from '@components/ui/Sections/HomepageTabs/HomepageTabs'
import PrimatorCouncil from '@components/ui/Sections/PrimatorCouncil/PrimatorCouncil'
import { useHomepageContext } from '@utils/homepageContext'
import { isDefined } from '@utils/isDefined'
import { useLocale } from 'next-intl'
import React, { useMemo } from 'react'

// TODO: Load from Strapi.
const sk = {
  councilCards: [
    {
      title: 'Primátor',
      imageSrc: '/primatorReal.png',
      href: 'mesto-bratislava/sprava-mesta/volene-organy/primator',
    },
    {
      title: 'Zastupiteľstvo',
      imageSrc: '/BACoatOfArms.svg',
      smImageAlign: 'right' as const,
      href: 'mesto-bratislava/sprava-mesta/volene-organy/zastupitelstvo',
    },
  ],
}

const en = {
  councilCards: [
    {
      title: 'Primátor',
      imageSrc: '/primatorReal.png',
      href: 'mesto-bratislava/sprava-mesta/volene-organy/primator',
    },
    {
      title: 'Zastupiteľstvo',
      imageSrc: '/BACoatOfArms.svg',
      smImageAlign: 'right' as const,
      href: 'mesto-bratislava/sprava-mesta/volene-organy/zastupitelstvo',
    },
  ],
}

const BlogCardsPrimatorHomepageSection = () => {
  const locale = useLocale()
  const { homepage } = useHomepageContext()

  const data = useMemo(() => {
    if (locale === 'sk') {
      return sk
    }
    if (locale === 'en') {
      return en
    }
    return null
  }, [locale])

  const homepagePosts = homepage?.attributes?.posts?.filter(isDefined) ?? []

  return (
    <SectionContainer className="bg-gray-50 pb-14 md:px-8">
      <BlogCards posts={homepagePosts} />
      <HomepageTabs className="lg:mt-10" />

      {data && <PrimatorCouncil className="mt-14 lg:mt-20" primatorCards={data.councilCards} />}
    </SectionContainer>
  )
}

export default BlogCardsPrimatorHomepageSection

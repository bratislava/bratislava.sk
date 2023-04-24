import SectionContainer from '@components/ui/SectionContainer/SectionContainer'
import BlogCards from '@components/ui/Sections/BlogCards/BlogCards'
import Posts from '@components/ui/Sections/Posts/Posts'
import PrimatorCouncil from '@components/ui/Sections/PrimatorCouncil/PrimatorCouncil'
import { useHomepageContext } from '@utils/homepageContext'
import { isDefined } from '@utils/isDefined'
import { useLocale, useTranslations } from 'next-intl'
import React, { useMemo } from 'react'

// TODO: Load from Strapi.
const sk = {
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
}

const BlogCardsPrimatorHomepageSection = () => {
  const t = useTranslations()
  const locale = useLocale()
  const { homepage, blogPosts, rozkopavkyBlogPosts } = useHomepageContext()

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
      {data && (
        <Posts
          readMoreText={t('readMore')}
          readMoreNewsText={t('seeAllNews')}
          className="lg:mt-10"
          leftHighLight={homepage?.attributes?.left_highlight?.data}
          rightHighLight={homepage?.attributes?.right_highlight?.data}
          posts={data.posts}
          latestPost={blogPosts}
          rozkoPosts={rozkopavkyBlogPosts}
        />
      )}

      {data && <PrimatorCouncil className="mt-14 lg:mt-20" primatorCards={data.councilCards} />}
    </SectionContainer>
  )
}

export default BlogCardsPrimatorHomepageSection

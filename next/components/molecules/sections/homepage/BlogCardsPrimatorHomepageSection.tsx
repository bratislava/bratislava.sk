import { BlogCards, Posts, PrimatorCouncil, SectionContainer } from '@components/ui'
import { useHomepageContext } from '@utils/homepageContext'
import React, { useMemo } from 'react'
import { useTranslation } from 'next-i18next'

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
  const { t, i18n } = useTranslation('common')
  const { homepage, blogPosts, rozkopavkyBlogPosts } = useHomepageContext()

  const data = useMemo(() => {
    if (i18n.language === 'sk') {
      return sk
    }
    if (i18n.language === 'en') {
      return en
    }
    return null
  }, [i18n.language])

  const homepagePosts = homepage?.attributes?.posts?.map((post) => ({
    title: post?.title,
    url: post?.slug,
    imageSrc: post?.image?.data?.attributes?.url,
  }))

  return (
    <SectionContainer className="bg-gray-50 pb-14">
      <BlogCards className="mb-0 lg:mb-8" posts={homepagePosts} shiftIndex={1} />
      {data && (
        <Posts
          readMoreText={t('readMore')}
          readMoreNewsText={t('seeAllNews')}
          className="lg:mt-10"
          leftHighLight={homepage?.attributes?.left_highlight}
          rightHighLight={homepage?.attributes?.right_highlight}
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

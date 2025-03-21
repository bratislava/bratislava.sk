import React from 'react'

import BlogPostCard from '@/src/components/cards/BlogPostCard'
import BlogPostHorizontalCard from '@/src/components/cards/BlogPostHorizontalCard'
import BlogPostImageCard from '@/src/components/cards/BlogPostImageCard'
import ResponsiveCarousel from '@/src/components/common/Carousel/ResponsiveCarousel'
import { InbaArticleEntityFragment } from '@/src/services/graphql'
import { getNumericLocalDate } from '@/src/utils/formatDate'
import { generateImageSizes } from '@/src/utils/generateImageSizes'
import { useTranslation } from '@/src/utils/useTranslation'

export type InbaFeaturedArticlesProps = {
  articles: InbaArticleEntityFragment[]
}

// This component is copied from FeaturedBlogPosts component and adjusted for inba articles
const InbaFeaturedArticles = ({ articles }: InbaFeaturedArticlesProps) => {
  const { t } = useTranslation()

  const majorArticle = articles[0]?.attributes

  return (
    <>
      <div className="hidden gap-x-6 py-4 lg:flex">
        <div className="w-1/2">
          <BlogPostImageCard
            variant="shadow"
            title={majorArticle?.title ?? ''}
            linkHref={`/inba/clanky/${majorArticle?.slug}`}
            imgSrc={majorArticle?.coverImage?.data?.attributes?.url}
            tag={majorArticle?.inbaTag?.data?.attributes?.title ?? undefined}
            date={getNumericLocalDate(majorArticle?.publishedAt)}
            imgSizes={generateImageSizes({ default: '50vw' })}
          />
        </div>
        <div className="flex w-1/2 flex-col gap-y-6">
          {articles?.slice(1, 3).map((blogPost, index) => {
            if (!blogPost.attributes) return null

            const { title, slug, coverImage, inbaTag, publishedAt } = blogPost.attributes
            const tagTitle = inbaTag?.data?.attributes?.title

            return (
              <BlogPostHorizontalCard
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                variant="shadow"
                title={title ?? ''}
                linkHref={`/inba/clanky/${slug}`}
                imgSrc={coverImage?.data?.attributes?.url}
                imgSizes={generateImageSizes({ default: '25vw' })}
                tag={tagTitle ?? undefined}
                date={getNumericLocalDate(publishedAt)}
              />
            )
          })}
        </div>
      </div>

      <ResponsiveCarousel
        className="lg:hidden"
        items={articles.map((blogPost) => {
          const { title, slug, coverImage, inbaTag, publishedAt } = blogPost.attributes ?? {}
          const tagTitle = inbaTag?.data?.attributes?.title

          return (
            <BlogPostCard
              variant="shadow"
              date={getNumericLocalDate(publishedAt)}
              tag={tagTitle ?? undefined}
              title={title ?? ''}
              linkProps={{ children: t('readMore'), href: `/inba/clanky/${slug}` }}
              imgSrc={coverImage?.data?.attributes?.url}
              imgSizes={generateImageSizes({ default: '100vw', lg: '33vw' })}
            />
          )
        })}
      />
    </>
  )
}

export default InbaFeaturedArticles

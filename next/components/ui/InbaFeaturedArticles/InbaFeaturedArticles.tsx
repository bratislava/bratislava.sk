import { InbaArticleEntityFragment } from '@backend/graphql'
import BlogPostCard from '@components/molecules/presentation/BlogPostCard'
import BlogPostHorizontalCard from '@components/molecules/presentation/BlogPostHorizontalCard'
import BlogPostImageCard from '@components/molecules/presentation/BlogPostImageCard'
import ResponsiveCarousel from '@components/organisms/Carousel/ResponsiveCarousel'
import { generateImageSizes } from '@utils/generateImageSizes'
import { getNumericLocalDate } from '@utils/local-date'
import { useTranslations } from 'next-intl'
import React from 'react'

export type InbaFeaturedArticlesProps = {
  articles: InbaArticleEntityFragment[]
}

// This component is copied from FeaturedBlogPosts component and adjusted for inba articles
export const InbaFeaturedArticles = ({ articles }: InbaFeaturedArticlesProps) => {
  const t = useTranslations()

  const majorArticle = articles[0]?.attributes

  return (
    <>
      <div className="hidden gap-x-6 py-4 lg:flex">
        <div className="w-1/2">
          <BlogPostImageCard
            variant="shadow"
            title={majorArticle?.title ?? ''}
            linkHref={`/inba/text/${majorArticle?.slug}`}
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
                linkHref={`/inba/text/${slug}`}
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
              linkProps={{ children: t('readMore'), href: `/inba/text/${slug}` }}
              imgSrc={coverImage?.data?.attributes?.url}
              imgSizes={generateImageSizes({ default: '100vw', lg: '33vw' })}
            />
          )
        })}
      />
    </>
  )
}

import { LatestBlogPostEntityFragment } from '@bratislava/strapi-sdk-homepage'
import BlogPostCard from '@components/molecules/presentation/BlogPostCard'
import BlogPostHorizontalCard from '@components/molecules/presentation/BlogPostHorizontalCard'
import BlogPostImageCard from '@components/molecules/presentation/BlogPostImageCard'
import Carousel from '@components/organisms/Carousel/Carousel'
import { getCategoryColorLocalStyle } from '@utils/colors'
import { generateImageSizes } from '@utils/generateImageSizes'
import { getNumericLocalDate } from '@utils/local-date'
import { useTranslations } from 'next-intl'
import React from 'react'

export interface FeaturedBlogPostsProps {
  blogPosts: LatestBlogPostEntityFragment[]
}

export const FeaturedBlogPosts = ({ blogPosts }: FeaturedBlogPostsProps) => {
  const t = useTranslations()

  const majorBlog = blogPosts?.[0]

  return (
    <>
      <div className="hidden gap-x-6 py-4 lg:flex">
        <div className="w-1/2">
          <BlogPostImageCard
            variant="shadow"
            title={majorBlog.attributes?.title ?? ''}
            linkHref={`/blog/${majorBlog.attributes?.slug}`}
            imgSrc={majorBlog.attributes?.coverImage?.data?.attributes?.url}
            tag={majorBlog.attributes?.tag?.data?.attributes?.title ?? undefined}
            date={getNumericLocalDate(
              majorBlog.attributes?.date_added ?? majorBlog.attributes?.publishedAt,
            )}
            style={getCategoryColorLocalStyle({
              color:
                majorBlog.attributes?.tag?.data?.attributes?.pageCategory?.data?.attributes?.color,
            })}
            imgSizes={generateImageSizes({ default: '50vw' })}
          />
        </div>
        <div className="flex w-1/2 flex-col gap-y-6">
          {blogPosts?.slice(1, 3).map((blog, index) => {
            if (!blog.attributes) return null

            const { title, slug, coverImage, tag, date_added, publishedAt } = blog.attributes
            const tagTitle = tag?.data?.attributes?.title
            const tagColor = tag?.data?.attributes?.pageCategory?.data?.attributes?.color

            return (
              <BlogPostHorizontalCard
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                variant="shadow"
                title={title ?? ''}
                linkHref={`/blog/${slug}`}
                imgSrc={coverImage?.data?.attributes?.url}
                imgSizes={generateImageSizes({ default: '25vw' })}
                tag={tagTitle ?? undefined}
                date={getNumericLocalDate(date_added ?? publishedAt)}
                style={getCategoryColorLocalStyle({ color: tagColor })}
              />
            )
          })}
        </div>
      </div>

      {/* TODO refactor an simplify */}
      <Carousel
        className="-mx-8 lg:hidden"
        itemClassName="w-[calc(100%-1rem)] md:w-[calc(50%-1rem)] py-8"
        listClassName="px-8"
        visibleCount={1}
        hideControls
        items={blogPosts.map((post, index) => {
          const { title, slug, coverImage, date_added, publishedAt, tag } = post.attributes ?? {}
          const tagColor = tag?.data?.attributes?.pageCategory?.data?.attributes?.color
          const tagTitle = tag?.data?.attributes?.title

          return {
            key: `${index}`,
            element: (
              <BlogPostCard
                style={getCategoryColorLocalStyle({ color: tagColor })}
                variant="shadow"
                date={getNumericLocalDate(date_added ?? publishedAt)}
                tag={tagTitle ?? undefined}
                title={title ?? ''}
                linkProps={{ children: t('readMore'), href: `/blog/${slug}` }}
                imgSrc={coverImage?.data?.attributes?.url}
                imgSizes={generateImageSizes({ default: '100vw', lg: '33vw' })}
              />
            ),
          }
        })}
      />
    </>
  )
}

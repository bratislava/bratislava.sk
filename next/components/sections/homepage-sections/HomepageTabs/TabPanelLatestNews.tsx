import { Typography } from '@bratislava/component-library'
import { useTranslations } from 'next-intl'
import React from 'react'
import { TabPanel } from 'react-aria-components'

import BlogPostCard from '@/components/cards/BlogPostCard'
import Button from '@/components/common/Button/Button'
import ResponsiveCarousel from '@/components/common/Carousel/ResponsiveCarousel'
import MLink from '@/components/common/MLink/MLink'
import Tag from '@/components/common/Tag/Tag'
import { useHomepageContext } from '@/components/providers/HomepageContextProvider'
import { getCategoryColorLocalStyle } from '@/utils/colors'
import { getNumericLocalDate } from '@/utils/formatDate'
import { generateImageSizes } from '@/utils/generateImageSizes'
import { getCommonLinkProps } from '@/utils/getCommonLinkProps'
import { isDefined } from '@/utils/isDefined'

const imageSizes = generateImageSizes({ default: '50vw', lg: '33vw' })

const TabPanelLatestNews = () => {
  const t = useTranslations('HomepageTabs')

  const { homepage, blogPosts } = useHomepageContext()
  const { tabs } = homepage?.attributes ?? {}
  const { leftNewsItem, rightNewsItem } = tabs ?? {}
  const latestPostsFiltered =
    blogPosts
      ?.filter(isDefined)
      .filter((post) => post.id !== leftNewsItem?.data?.id && post.id !== rightNewsItem?.data?.id)
      .slice(0, 5) ?? []

  const allPosts =
    [leftNewsItem?.data, rightNewsItem?.data, ...latestPostsFiltered]
      .filter(isDefined)
      .slice(0, 7) ?? []

  return (
    <TabPanel id="LatestNews">
      <ResponsiveCarousel
        className="lg:hidden"
        items={allPosts.map((blogPost) => {
          const { title, slug, coverImage, date_added, publishedAt, tag } =
            blogPost.attributes ?? {}
          const tagColor = tag?.data?.attributes?.pageCategory?.data?.attributes?.color
          const tagTitle = tag?.data?.attributes?.title

          return (
            <BlogPostCard
              key={blogPost.id}
              style={getCategoryColorLocalStyle({ color: tagColor })}
              variant="shadow"
              date={getNumericLocalDate(date_added ?? publishedAt)}
              tag={tagTitle ?? undefined}
              title={title ?? ''}
              linkProps={{ children: t('readMore'), href: `/blog/${slug}` }}
              imgSrc={coverImage?.data?.attributes?.url}
              imgSizes={imageSizes}
            />
          )
        })}
      />
      <div className="mt-14 hidden pb-8 lg:block">
        <div className="grid grid-cols-3 gap-x-8">
          {[leftNewsItem?.data, rightNewsItem?.data].filter(isDefined).map((blogPost) => {
            const { title, slug, coverImage, date_added, publishedAt, tag, excerpt } =
              blogPost.attributes ?? {}
            const tagColor = tag?.data?.attributes?.pageCategory?.data?.attributes?.color
            const tagTitle = tag?.data?.attributes?.title

            return (
              <BlogPostCard
                key={blogPost.id}
                style={getCategoryColorLocalStyle({ color: tagColor })}
                variant="shadow"
                date={getNumericLocalDate(date_added ?? publishedAt)}
                tag={tagTitle ?? undefined}
                title={title ?? ''}
                linkProps={{ children: t('readMore'), href: `/blog/${slug}` }}
                imgSrc={coverImage?.data?.attributes?.url}
                imgSizes={imageSizes}
                text={excerpt ?? undefined}
              />
            )
          })}

          <div className="hidden flex-col gap-6 lg:flex">
            {latestPostsFiltered.map((post, index) => {
              const { tag, slug, title } = post.attributes ?? {}
              const tagColor = tag?.data?.attributes?.pageCategory?.data?.attributes?.color

              return (
                <div
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  className="relative"
                  style={getCategoryColorLocalStyle({ color: tagColor })}
                >
                  {tag?.data?.attributes?.title && (
                    <div className="mb-3">
                      <Tag text={tag.data.attributes.title} size="small" isColored />
                    </div>
                  )}
                  <MLink
                    href={`/blog/${slug}`}
                    stretched
                    variant="underlineOnHover"
                    className="line-clamp-3"
                  >
                    <Typography type="h3" size="h5">
                      {title}
                    </Typography>
                  </MLink>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      {tabs?.newsPageLink ? (
        <div className="flex justify-center">
          <Button
            variant="category-outline"
            hasLinkIcon
            {...getCommonLinkProps(tabs?.newsPageLink)}
          />
        </div>
      ) : null}
    </TabPanel>
  )
}

export default TabPanelLatestNews

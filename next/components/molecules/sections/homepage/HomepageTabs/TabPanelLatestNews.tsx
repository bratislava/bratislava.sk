import { ArrowRightIcon } from '@assets/ui-icons'
import Button from '@components/forms/simple-components/Button'
import MLink from '@components/forms/simple-components/MLink'
import Tag from '@components/forms/simple-components/Tag'
import BlogPostCard from '@components/molecules/presentation/BlogPostCard'
import Carousel from '@components/organisms/Carousel/Carousel'
import { getCategoryColorLocalStyle } from '@utils/colors'
import { generateImageSizes } from '@utils/generateImageSizes'
import { getCommonLinkProps } from '@utils/getCommonLinkProps'
import { useHomepageContext } from '@utils/homepageContext'
import { isDefined } from '@utils/isDefined'
import { getNumericLocalDate } from '@utils/local-date'
import { useTranslations } from 'next-intl'
import React from 'react'
import { TabPanel } from 'react-aria-components'

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
      {/* TODO carousel is used only on mobile */}
      {/* TODO standardize negative scroll spacing and card width */}
      <Carousel
        className="-mx-4 lg:hidden"
        itemClassName="w-[calc(100%-1rem)] md:w-[calc(50%-1rem)] py-8"
        listClassName="px-4"
        visibleCount={1}
        hideControls
        items={allPosts.map((post, index) => {
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
                imgSizes={imageSizes}
              />
            ),
          }
        })}
      />
      <div className="mt-14 hidden pb-8 lg:block">
        <div className="grid grid-cols-3 gap-x-8">
          {[leftNewsItem?.data, rightNewsItem?.data].filter(isDefined).map((post, index) => {
            const { title, slug, coverImage, date_added, publishedAt, tag, excerpt } =
              post.attributes ?? {}
            const tagColor = tag?.data?.attributes?.pageCategory?.data?.attributes?.color
            const tagTitle = tag?.data?.attributes?.title

            return (
              <BlogPostCard
                // eslint-disable-next-line react/no-array-index-key
                key={index}
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
                    <h3 className="text-h5">{title}</h3>
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
            endIcon={<ArrowRightIcon />}
            {...getCommonLinkProps(tabs?.newsPageLink)}
          />
        </div>
      ) : null}
    </TabPanel>
  )
}

export default TabPanelLatestNews

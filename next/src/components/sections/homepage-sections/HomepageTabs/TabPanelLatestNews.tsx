import { Typography } from '@bratislava/component-library'
import { TabPanel } from 'react-aria-components'

import BlogPostCard from '@/src/components/cards/BlogPostCard'
import Button from '@/src/components/common/Button/Button'
import ResponsiveCarousel from '@/src/components/common/Carousel/ResponsiveCarousel'
import MLink from '@/src/components/common/MLink/MLink'
import Tag from '@/src/components/common/Tag/Tag'
import { useHomepageContext } from '@/src/components/providers/HomepageContextProvider'
import { getCategoryColorLocalStyle } from '@/src/utils/colors'
import { getNumericLocalDate } from '@/src/utils/formatDate'
import { generateImageSizes } from '@/src/utils/generateImageSizes'
import { getCommonLinkProps } from '@/src/utils/getCommonLinkProps'
import { isDefined } from '@/src/utils/isDefined'
import { useTranslation } from '@/src/utils/useTranslation'

const imageSizes = generateImageSizes({ default: '50vw', lg: '33vw' })

const TabPanelLatestNews = () => {
  const { t } = useTranslation()

  const { homepage, blogPosts } = useHomepageContext()
  const { tabs } = homepage?.attributes ?? {}
  const { leftNewsItem, rightNewsItem } = tabs ?? {}
  const latestPostsFiltered =
    blogPosts
      ?.filter(isDefined)
      .filter((post) => post.id !== leftNewsItem?.data?.id && post.id !== rightNewsItem?.data?.id)
      .slice(0, 4) ?? []

  const allPosts =
    [leftNewsItem?.data, rightNewsItem?.data, ...latestPostsFiltered]
      .filter(isDefined)
      .slice(0, 6) ?? []

  return (
    <TabPanel id="LatestNews">
      <ResponsiveCarousel
        className="lg:hidden"
        items={allPosts.map((blogPost) => {
          const { title, slug, coverImage, addedAt, tag } = blogPost.attributes ?? {}
          const tagColor = tag?.data?.attributes?.pageCategory?.data?.attributes?.color
          const tagTitle = tag?.data?.attributes?.title

          return (
            <BlogPostCard
              key={blogPost.id}
              style={getCategoryColorLocalStyle({ color: tagColor })}
              variant="no-border"
              date={getNumericLocalDate(addedAt)}
              tag={tagTitle ?? undefined}
              title={title ?? ''}
              linkProps={{ children: t('HomepageTabs.readMore'), href: `/blog/${slug}` }}
              imgSrc={coverImage?.data?.attributes?.url}
              imgSizes={imageSizes}
            />
          )
        })}
      />
      <div className="mt-14 hidden pb-8 lg:block">
        <div className="grid grid-cols-3 gap-x-8">
          {[leftNewsItem?.data, rightNewsItem?.data].filter(isDefined).map((blogPost) => {
            const { title, slug, coverImage, addedAt, tag, excerpt } = blogPost.attributes ?? {}
            const tagColor = tag?.data?.attributes?.pageCategory?.data?.attributes?.color
            const tagTitle = tag?.data?.attributes?.title

            return (
              <BlogPostCard
                key={blogPost.id}
                style={getCategoryColorLocalStyle({ color: tagColor })}
                variant="no-border"
                date={getNumericLocalDate(addedAt)}
                tag={tagTitle ?? undefined}
                title={title ?? ''}
                linkProps={{ children: t('HomepageTabs.readMore'), href: `/blog/${slug}` }}
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
          <Button variant="outline" hasLinkIcon {...getCommonLinkProps(tabs?.newsPageLink)} />
        </div>
      ) : null}
    </TabPanel>
  )
}

export default TabPanelLatestNews

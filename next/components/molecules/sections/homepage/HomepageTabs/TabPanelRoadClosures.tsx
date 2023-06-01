import { ArrowRightIcon } from '@assets/ui-icons'
import Button from '@components/forms/simple-components/Button'
import MLink from '@components/forms/simple-components/MLink'
import Tag from '@components/forms/simple-components/Tag'
import BlogPostCard from '@components/molecules/presentation/BlogPostCard'
import ResponsiveCarousel from '@components/organisms/Carousel/ResponsiveCarousel'
import Iframe from '@components/ui/Iframe/Iframe'
import { getCategoryColorLocalStyle } from '@utils/colors'
import { generateImageSizes } from '@utils/generateImageSizes'
import { getCommonLinkProps } from '@utils/getCommonLinkProps'
import { useHomepageContext } from '@utils/homepageContext'
import { isDefined } from '@utils/isDefined'
import { getNumericLocalDate } from '@utils/local-date'
import { useLocale, useTranslations } from 'next-intl'
import React, { useMemo } from 'react'
import { TabPanel } from 'react-aria-components'

const imageSizes = generateImageSizes({ lg: '33vw', default: '50vw' })

const TabPanelRoadClosures = () => {
  const t = useTranslations('HomepageTabs')
  const locale = useLocale()

  const { homepage, rozkopavkyBlogPosts } = useHomepageContext()
  const { tabs } = homepage?.attributes ?? {}
  const postsFiltered = rozkopavkyBlogPosts?.filter(isDefined) ?? []

  const today = useMemo(() => {
    return new Date()
  }, [])

  const dateOfRelease = useMemo(() => {
    return new Date('2023-06-01')
  }, [])

  return (
    <TabPanel id="RoadClosures">
      {/* TODO: After dateOfRelease, display only iframe part and remove everything else from this tab */}
      {today >= dateOfRelease ? (
        <div className="mt-8 pb-8 lg:mt-14">
          <Iframe
            url={`https://cdn-api.bratislava.sk/static-pages/dev/closures-and-restrictions-map/index.html?lang=${locale}`}
            iframeWidth="container"
            iframeHeight="620"
            fullHeight={false}
            allowFullscreen
            allowGeolocation
          />
        </div>
      ) : (
        <>
          <ResponsiveCarousel
            className="lg:hidden"
            items={postsFiltered.map((blogPost) => {
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
              {postsFiltered.slice(0, 2).map((blogPost) => {
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
                {postsFiltered.slice(2, 7).map((newsCard, index) => {
                  const { tag, slug, title } = newsCard.attributes ?? {}
                  const colorStyle = getCategoryColorLocalStyle({
                    color: tag?.data?.attributes?.pageCategory?.data?.attributes?.color,
                  })

                  return (
                    // eslint-disable-next-line react/no-array-index-key
                    <div key={index} className="relative" style={colorStyle}>
                      {tag?.data?.attributes?.title && (
                        <div className="mb-3">
                          <Tag text={tag.data.attributes.title} size="small" isColored />
                        </div>
                      )}
                      <MLink href={`/blog/${slug}`} stretched variant="underlineOnHover">
                        <h3 className="text-h5">{title}</h3>
                      </MLink>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </>
      )}
      {tabs?.roadClosuresPageLink ? (
        <div className="flex justify-center">
          <Button
            variant="category-outline"
            endIcon={<ArrowRightIcon />}
            {...getCommonLinkProps(tabs.roadClosuresPageLink)}
          />
        </div>
      ) : null}
    </TabPanel>
  )
}

export default TabPanelRoadClosures

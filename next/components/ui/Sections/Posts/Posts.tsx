// @ts-strict-ignore
import { ArrowRightIcon } from '@assets/images'
import { LatestBlogPostEntityFragment } from '@bratislava/strapi-sdk-homepage'
import { Iframe } from '@bratislava/ui-bratislava/Iframe/Iframe'
import Button from '@components/forms/simple-components/Button'
import MLink from '@components/forms/simple-components/MLink'
import Tag from '@components/forms/simple-components/Tag'
import BlogPostCard from '@components/molecules/presentation/BlogPostCard'
import Carousel from '@components/organisms/Carousel/Carousel'
import { getCategoryColorLocalStyle } from '@utils/colors'
import { generateImageSizes } from '@utils/generateImageSizes'
import { getNumericLocalDate } from '@utils/local-date'
import { ParsedOfficialBoardDocument } from 'backend/services/ginis'
import cx from 'classnames'
import { useLocale, useTranslations } from 'next-intl'
import React from 'react'
import useSWR from 'swr'

import { DocumentCard } from '../../DocumentCard/DocumentCard'
import { HorizontalScrollWrapper } from '../../HorizontalScrollWrapper/HorizontalScrollWrapper'
import { NewsCardProps } from '../../NewsCard/NewsCard'
import { TabBarTab } from '../../TabBarTab/TabBarTab'

const imageSizes = generateImageSizes({ lg: '33vw', default: '50vw' })

export type TPostsTab = { category?: string; newsCards?: NewsCardProps[] }

export interface PostsProps {
  className?: string
  posts: TPostsTab[] | undefined
  latestPost: LatestBlogPostEntityFragment[] | null
  leftHighLight: LatestBlogPostEntityFragment | null | undefined
  rightHighLight: LatestBlogPostEntityFragment | null | undefined
  readMoreText?: string
  readMoreNewsText?: string
  rozkoPosts: LatestBlogPostEntityFragment[] | null
}

export const Posts = ({
  className,
  posts = [],
  leftHighLight,
  rightHighLight,
  readMoreText,
  readMoreNewsText,
  latestPost,
  rozkoPosts,
}: PostsProps) => {
  const t = useTranslations()
  const locale = useLocale()

  const [activeTab, setActiveTab] = React.useState(0)

  // TODO handle loading and errors
  const { data: officialBoardData } = useSWR<ParsedOfficialBoardDocument[]>(
    '/api/ginis/newest',
    () => fetch('/api/ginis/newest').then((res) => res.json()),
  )
  const documents = officialBoardData || []

  const roadClosuresAddress = 'doprava-a-mapy/sprava-a-udrzba-komunikacii/rozkopavky-a-uzavery'
  const roadClosuresAddressNew = 'doprava-a-mapy/sprava-a-udrzba-komunikacii'

  const latestPostFiltered = latestPost?.filter(
    (post) => post.id !== leftHighLight?.id && post.id !== rightHighLight?.id,
  )

  return (
    <div className={cx(className)}>
      <HorizontalScrollWrapper className="-mx-8 justify-start space-x-4 px-8 lg:justify-center">
        <div className="flex space-x-8 lg:space-x-32">
          {posts.map((post, index) => (
            <TabBarTab
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              tab={{ key: index.toString(), title: post.category ?? '' }}
              onClick={() => {
                setActiveTab(index)
              }}
              isActive={activeTab === index}
            />
          ))}
        </div>
      </HorizontalScrollWrapper>

      {activeTab === 0 && (
        <>
          {/* TODO carousel and new BlogPostCard is used only on mobile */}
          <Carousel
            className="-mx-8 lg:hidden"
            itemClassName="w-[calc(100%-1rem)] md:w-[calc(50%-1rem)] py-8"
            listClassName="px-8"
            visibleCount={1}
            hideControls
            items={[leftHighLight, rightHighLight, ...latestPostFiltered].map((post, index) => {
              const { title, slug, coverImage, date_added, publishedAt, tag } =
                post.attributes ?? {}
              return {
                key: `${index}`,
                element: (
                  <BlogPostCard
                    style={getCategoryColorLocalStyle({
                      color: tag.data?.attributes?.pageCategory.data.attributes.color,
                    })}
                    variant="shadow"
                    date={getNumericLocalDate(date_added ?? publishedAt)}
                    tag={tag.data?.attributes?.title}
                    title={title}
                    linkProps={{ children: readMoreText, href: `/blog/${slug}` }}
                    imgSrc={coverImage?.data.attributes.url}
                    imgSizes={imageSizes}
                  />
                ),
              }
            })}
          />
          <div className="mt-14 hidden pb-8 lg:block">
            <div className="grid grid-cols-3 gap-x-8">
              {[leftHighLight, rightHighLight].map((post) => {
                const { title, slug, coverImage, date_added, publishedAt, tag, excerpt } =
                  post.attributes ?? {}
                return (
                  <BlogPostCard
                    style={getCategoryColorLocalStyle({
                      color: tag.data?.attributes?.pageCategory.data.attributes.color,
                    })}
                    variant="shadow"
                    date={getNumericLocalDate(date_added ?? publishedAt)}
                    tag={tag.data?.attributes?.title}
                    title={title}
                    linkProps={{ children: readMoreText, href: `/blog/${slug}` }}
                    imgSrc={coverImage?.data.attributes.url}
                    imgSizes={imageSizes}
                    text={excerpt}
                  />
                )
              })}

              <div className="hidden flex-col gap-6 lg:flex">
                {latestPostFiltered.map((post, index) => {
                  const { tag, slug, title } = post.attributes
                  const colorStyle = getCategoryColorLocalStyle({
                    color: tag?.data?.attributes?.pageCategory?.data?.attributes?.color,
                  })

                  return (
                    // eslint-disable-next-line react/no-array-index-key
                    <div key={index} className="relative" style={colorStyle}>
                      {tag && (
                        <div className="mb-3">
                          <Tag text={tag.data?.attributes?.title} size="small" isColored />
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
          <div className="flex justify-center">
            <Button href={t('allNewsLink')} variant="category-outline" endIcon={<ArrowRightIcon />}>
              {readMoreNewsText}
            </Button>
          </div>
        </>
      )}
      {activeTab === 1 && (
        <div className="mt-14 flex flex-col gap-y-10">
          <div className="flex flex-col items-center gap-y-5">
            {documents.map((document, index) => (
              <DocumentCard
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                {...document}
                className="min-w-full max-w-4xl"
                viewButtonText={t('files')}
                downloadButtonText="TODO-fix"
              />
            ))}
          </div>

          <Button
            href="/mesto-bratislava/transparentne-mesto/uradna-tabula"
            variant="category-outline"
            endIcon={<ArrowRightIcon />}
          >
            {t('toOfficialBoard')}
          </Button>
        </div>
      )}
      {activeTab === 2 && (
        <div className="mt-8 block lg:mt-14">
          {/* TODO when agreed, display only iframe part and remove everything else from this tab */}
          <div className="hidden">
            <div className="pb-8">
              <Iframe
                url={`https://cdn-api.bratislava.sk/static-pages/closures-and-restrictions-map/index.html?lang=${locale}`}
                iframeWidth="container"
                iframeHeight="620"
                fullHeight={false}
                allowFullscreen={false}
              />
            </div>
            <div className="flex justify-center">
              <Button
                href={roadClosuresAddressNew}
                variant="category-outline"
                endIcon={<ArrowRightIcon />}
              >
                {t('moreInfo')}
              </Button>
            </div>
          </div>
          {/* TODO to be removed */}
          <Carousel
            className="-mx-8 lg:hidden"
            itemClassName="w-[calc(100%-1rem)] md:w-[calc(50%-1rem)] py-8"
            listClassName="px-8"
            visibleCount={1}
            hideControls
            items={rozkoPosts.map((post, index) => {
              const { title, slug, coverImage, date_added, publishedAt, tag } =
                post.attributes ?? {}
              return {
                key: `${index}`,
                element: (
                  <BlogPostCard
                    style={getCategoryColorLocalStyle({
                      color: tag.data.attributes.pageCategory.data.attributes.color,
                    })}
                    variant="shadow"
                    date={getNumericLocalDate(date_added ?? publishedAt)}
                    tag={tag.data.attributes.title}
                    title={title}
                    linkProps={{ children: readMoreText, href: `/blog/${slug}` }}
                    imgSrc={coverImage?.data.attributes.url}
                    imgSizes={imageSizes}
                  />
                ),
              }
            })}
          />
          <div className="mt-14 hidden pb-8 lg:block">
            <div className="grid grid-cols-3 gap-x-8">
              {rozkoPosts.slice(0, 2).map((post) => {
                const { title, slug, coverImage, date_added, publishedAt, tag, excerpt } =
                  post.attributes ?? {}
                return (
                  <BlogPostCard
                    style={getCategoryColorLocalStyle({
                      color: tag.data.attributes.pageCategory.data.attributes.color,
                    })}
                    variant="shadow"
                    date={getNumericLocalDate(date_added ?? publishedAt)}
                    tag={tag.data.attributes.title}
                    title={title}
                    linkProps={{ children: readMoreText, href: `/blog/${slug}` }}
                    imgSrc={coverImage?.data.attributes.url}
                    imgSizes={imageSizes}
                    text={excerpt}
                  />
                )
              })}

              <div className="hidden flex-col gap-6 lg:flex">
                {rozkoPosts.slice(2, 7).map((newsCard, index) => {
                  const { tag, slug, title } = newsCard.attributes
                  const colorStyle = getCategoryColorLocalStyle({
                    color: tag?.data?.attributes?.pageCategory?.data?.attributes?.color,
                  })

                  return (
                    // eslint-disable-next-line react/no-array-index-key
                    <div key={index} className="relative" style={colorStyle}>
                      {tag && (
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
          <div className="flex justify-center">
            <Button
              href={roadClosuresAddress}
              variant="category-outline"
              endIcon={<ArrowRightIcon />}
            >
              {readMoreNewsText}
            </Button>
          </div>
        </div>
      )}
      {activeTab > 2 && (
        <div className="text-h4 mt-14 flex flex-col gap-4 px-8 text-center">
          <div>{t('allInformationOnSite')}</div>
          <MLink
            variant="underlined"
            className="font-semibold"
            href="https://zverejnovanie.bratislava.sk"
          >
            zverejnovanie.bratislava.sk
          </MLink>
        </div>
      )}
    </div>
  )
}

export default Posts

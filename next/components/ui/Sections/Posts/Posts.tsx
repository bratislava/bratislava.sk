// @ts-strict-ignore
import { ArrowRight, ChevronRight } from '@assets/images'
import { ParsedOfficialBoardDocument } from '@backend/services/ginis'
import { useUIContext } from '@bratislava/common-frontend-ui-context'
import {
  Enum_Pagecategory_Color,
  LatestBlogsFragment,
  LatestBlogsWithTagsQuery,
  NewsCardBlogFragment,
} from '@bratislava/strapi-sdk-homepage'
import HorizontalScrollWrapper from '@bratislava/ui-bratislava/HorizontalScrollWrapper/HorizontalScrollWrapper'
import { PostButton } from '@bratislava/ui-bratislava/Sections/Posts/PostButton'
import React from 'react'
import { useTranslation } from 'react-i18next'
import useSWR from 'swr'

import { PostCard } from '../../../organisms/posts/PostCard'
import { PostsTabs } from '../../../organisms/posts/PostsTabs'
import { SidePosts } from '../../../organisms/posts/SidePosts'
import { Post, TAB_CATEGORY } from '../../../organisms/posts/types'
import { Button } from '../../Button/Button'
import { DocumentCard } from '../../DocumentCard/DocumentCard'
import { NewsCard } from '../../NewsCard/NewsCard'

export interface PostsProps {
  posts?: Post[]
  latestPost?: LatestBlogsFragment | null
  leftHighLight?: NewsCardBlogFragment | null
  rightHighLight?: NewsCardBlogFragment | null
  readMoreText?: string
  readMoreNewsText?: string
  rozkoPosts: LatestBlogsWithTagsQuery['blogPosts']
}

// TODO: The function does not work if it is imported from other file so it is temporarily duplicated here
export const getHoverColor = (color: Enum_Pagecategory_Color): string => {
  switch (color) {
    case Enum_Pagecategory_Color.Red:
      return 'hover:text-main-600'
    case Enum_Pagecategory_Color.Blue:
      return 'hover:text-transport-600'
    case Enum_Pagecategory_Color.Green:
      return 'hover:text-environment-600'
    case Enum_Pagecategory_Color.Yellow:
      return 'hover:text-social-600'
    case Enum_Pagecategory_Color.Purple:
      return 'hover:text-education-600'
    case Enum_Pagecategory_Color.Brown:
      return 'hover:text-culture-600'
    default:
      return 'hover:text-gray-600'
  }
}

export const Posts = ({
  posts = [],
  leftHighLight,
  rightHighLight,
  readMoreText,
  latestPost,
  rozkoPosts,
}: PostsProps) => {
  const [{ tab, newsCards, url }, setActiveTab] = React.useState<Post>(posts[0])

  // TODO handle loading and errors
  const { data: officialBoardData = [] } = useSWR<ParsedOfficialBoardDocument[]>(
    '/api/ginis/newest',
    () => fetch('/api/ginis/newest').then((res) => res.json()),
  )
  const { Link: UILink } = useUIContext()
  const { t } = useTranslation('common')
  const [firstPost, secondPost] = newsCards
  const [firstRozkoPost, secondRozkoPost, ...restRozkoPosts] = rozkoPosts.data

  return (
    <div className="lg:mt-10">
      <PostsTabs posts={posts} onTabClick={setActiveTab} activeTab={tab} />
      {tab === TAB_CATEGORY.NEWS && (
        <PostCard
          highlightedPosts={
            <>
              {!leftHighLight && (
                <>
                  <div>
                    <NewsCard {...firstPost} />
                  </div>
                  <div>
                    <NewsCard {...secondPost} />
                  </div>
                </>
              )}
              {leftHighLight && <NewsCard {...leftHighLight?.data?.attributes} readMoreText={readMoreText} />}
              {rightHighLight && <NewsCard {...rightHighLight?.data?.attributes} readMoreText={readMoreText} />}
            </>
          }
          sidePosts={
            <>
              {latestPost.data.map(({ attributes }, i) => {
                const { tag, title, slug } = attributes
                return (
                  <SidePosts
                    title={title}
                    tagTitle={tag.data.attributes.title}
                    linkHref={`blog/${slug}`}
                    tagColor={tag.data.attributes.pageCategory.data.attributes.color}
                    key={i}
                  />
                )
              })}
            </>
          }
          button={
            <UILink href={t('allNewsLink')}>
              <PostButton buttonTitle={t('allNews')} />
            </UILink>
          }
        />
      )}
      {tab === TAB_CATEGORY.OFFICIAL_BOARD && (
        <div className="mt-14 flex flex-col gap-y-10">
          <div className="flex flex-col items-center gap-y-5">
            {officialBoardData.map((document, index) => (
              <DocumentCard
                key={index}
                {...document}
                className="min-w-full max-w-4xl"
                viewButtonText={t('files')}
                downloadButtonText="TODO-fix"
              />
            ))}
          </div>
          <UILink
            href="/mesto-bratislava/transparentne-mesto/uradna-tabula"
            className="flex justify-center"
          >
            <Button
              className="text-20-medium px-6 py-3 shadow-none hover:text-category-600"
              variant="transparent"
              icon={<ChevronRight />}
              hoverIcon={<ArrowRight />}
            >
              {t('toOfficialBoard')}
            </Button>
          </UILink>
        </div>
      )}
      {tab === TAB_CATEGORY.ROAD_CLOSURES && (
        <PostCard
          highlightedPosts={
            <>
              {firstRozkoPost && <NewsCard {...firstRozkoPost.attributes} readMoreText={readMoreText} />}
              {secondRozkoPost && <NewsCard {...secondRozkoPost.attributes} readMoreText={readMoreText} />}
            </>
          }
          sidePosts={
            <>
              {restRozkoPosts.map(({ attributes }, i) => {
                const { tag, title, slug } = attributes
                return (
                  <SidePosts
                    title={title}
                    tagTitle={tag.data.attributes.title}
                    linkHref={`blog/${slug}`}
                    tagColor={tag.data.attributes.pageCategory.data.attributes.color}
                    key={i}
                  />
                )
              })}
            </>
          }
          button={
            url && (
              <>
                {rozkoPosts?.data?.length > 0 && (
                  <UILink href={url}>
                    <PostButton buttonTitle={t('toAllRoadClosures')} />
                  </UILink>
                )}
              </>
            )
          }
        />
      )}
      {tab === TAB_CATEGORY.PUBLICATION && (
        <div className="text-h4-normal mt-14 items-end px-8 text-center">
          {t('allInformationOnSite')}{' '}
          <UILink
            className="underline hover:text-gray-600"
            href="https://zverejnovanie.bratislava.sk"
          >
            <div className="lg:hidden">
              <br />
            </div>
            <b>zverejnovanie.bratislava.sk</b>
          </UILink>
        </div>
      )}

      {/* Mobile */}
      <div className="mt-9 hidden">
        <HorizontalScrollWrapper className="-mx-8 space-x-4 px-8 pb-12">
          {newsCards.map((newsItem, index) => (
            <NewsCard key={index} readMoreText={readMoreText} className="w-11/12 shrink-0" {...newsItem} />
          ))}
        </HorizontalScrollWrapper>
        <div className="flex justify-center">
          {/* TODO: change this button to custom button */}
          <UILink href={t('allNewsLink')}>
            <Button
              variant="transparent"
              className="text-20-medium mt-9 px-6 py-2 shadow-none"
              icon={<ChevronRight />}
              hoverIcon={<ArrowRight />}
            >
              {t('allNews')}
            </Button>
          </UILink>
        </div>
      </div>
    </div>
  )
}

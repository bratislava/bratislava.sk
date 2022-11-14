// @ts-strict-ignore
import { ArrowRight, ChevronRight } from '@assets/images'
import { useUIContext } from '@bratislava/common-frontend-ui-context'
import { LatestBlogsFragment, NewsCardBlogFragment } from '@bratislava/strapi-sdk-homepage'
import cx from 'classnames'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { ParsedOfficialBoardDocument } from 'backend/services/ginis'
import useSWR from 'swr'

import { Button } from '../../Button/Button'
import { DocumentCard } from '../../DocumentCard/DocumentCard'
import { HorizontalScrollWrapper } from '../../HorizontalScrollWrapper/HorizontalScrollWrapper'
import { NewsCard, NewsCardProps } from '../../NewsCard/NewsCard'
import { TabBarTab } from '../../TabBarTab/TabBarTab'
import { Tag } from '../../Tag/Tag'

export type TPostsTab = { category?: string; newsCards?: NewsCardProps[] }

export interface PostsProps {
  className?: string
  posts?: TPostsTab[]
  // latestPost?: BlogPost[]
  latestPost?: LatestBlogsFragment
  leftHighLight?: NewsCardBlogFragment | null
  rightHighLight?: NewsCardBlogFragment | null
  readMoreText?: string
  readMoreNewsText?: string
  rozkoPosts?: any
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
  const [activeTab, setActiveTab] = React.useState(0)
  // TODO refactor this
  const [activePosts] = React.useState(posts[activeTab])
  const [activeNewsCards] = React.useState<NewsCardProps[]>(activePosts?.newsCards ?? [])

  // TODO handle loading and errors
  const { data: officialBoardData } = useSWR<ParsedOfficialBoardDocument[]>('/api/ginis/newest', () =>
    fetch('/api/ginis/newest').then((res) => res.json())
  )
  const documents = officialBoardData || []

  const largeCount = 2

  const largeNews = activeNewsCards.slice(0, largeCount) // first and second

  const { Link: UILink } = useUIContext()

  const { t } = useTranslation('common')

  return (
    <div className={cx(className)}>
      <HorizontalScrollWrapper className="-mx-8 justify-start space-x-4 px-8 lg:justify-center">
        <div className="flex space-x-8 lg:space-x-32">
          {posts.map((post, index) => (
            <TabBarTab
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
        <div className="mt-8 block lg:mt-14">
          <HorizontalScrollWrapper className="-mx-8 space-x-4 px-8 pb-8 lg:pb-0">
            <div className="flex grid-cols-3 gap-x-5 lg:grid lg:gap-x-8">
              {!leftHighLight &&
                largeNews.map((newsCard, i) => (
                  <div key={i}>
                    <NewsCard {...newsCard} />
                  </div>
                ))}
              {leftHighLight && <NewsCard {...leftHighLight?.data?.attributes} readMoreText={readMoreText} />}
              {rightHighLight && <NewsCard {...rightHighLight?.data?.attributes} readMoreText={readMoreText} />}

              {latestPost?.data?.length > 0 && (
                <div className="hidden lg:block">
                  {latestPost.data.map((newsCard, i) => {
                    const card = newsCard.attributes
                    const tag = card.tag.data?.attributes
                    return (
                      <div key={i}>
                        {tag && (
                          <div className="mb-5">
                            <Tag title={tag?.title} color={tag.pageCategory.data.attributes.color} />
                          </div>
                        )}
                        <UILink href={`blog/${card.slug}`}>
                          <div
                            className={`hover:text-[color:rgb(var(--color- mb-8 font-semibold underline${tag?.pageCategory.data.attributes.color}))]`}
                          >
                            {card.title}
                          </div>
                        </UILink>
                      </div>
                    )
                  })}
                </div>
              )}
              <div className="col-span-3 mt-14 hidden justify-center lg:flex">
                {latestPost?.data?.length > 0 && (
                  <UILink href={t('allNewsLink')}>
                    <Button
                      variant="transparent"
                      className="text-h4 px-6 py-3 font-medium text-font shadow-none hover:text-primary"
                      icon={<ChevronRight />}
                      hoverIcon={<ArrowRight />}
                    >
                      {readMoreNewsText}
                    </Button>
                  </UILink>
                )}
              </div>
            </div>
          </HorizontalScrollWrapper>
          <div className="flex justify-center lg:hidden">
            <UILink href={t('allNewsLink')}>
              <Button
                variant="transparent"
                className="mt-0 px-6 py-2 text-button-1 font-medium shadow-none"
                icon={<ChevronRight />}
                hoverIcon={<ArrowRight />}
              >
                {t('allNews')}
              </Button>
            </UILink>
          </div>
        </div>
      )}
      {activeTab === 1 && (
        <div className="mt-14 flex flex-col gap-y-10">
          <div className="flex flex-col items-center gap-y-5">
            {documents.map((document, index) => (
              <DocumentCard
                key={index}
                {...document}
                className="min-w-full max-w-4xl"
                viewButtonText={t('files')}
                downloadButtonText="TODO-fix"
              />
            ))}
          </div>
          <UILink href="/mesto-bratislava/transparentne-mesto/uradna-tabula" className="flex justify-center">
            <Button
              className="px-6 py-3 text-button-1 font-medium shadow-none hover:text-primary"
              variant="transparent"
              icon={<ChevronRight />}
              hoverIcon={<ArrowRight />}
            >
              {t('toOfficialBoard')}
            </Button>
          </UILink>
        </div>
      )}
      {activeTab === 2 && (
        <div className="mt-8 block lg:mt-14">
          <HorizontalScrollWrapper className="-mx-8 space-x-4 px-8 pb-8 lg:pb-0">
            <div className="flex grid-cols-3 gap-x-5 lg:grid lg:gap-x-8">
              {rozkoPosts?.data[0] && <NewsCard {...rozkoPosts?.data[0].attributes} readMoreText={readMoreText} />}
              {rozkoPosts?.data[1] && <NewsCard {...rozkoPosts?.data[1].attributes} readMoreText={readMoreText} />}

              {rozkoPosts?.data?.length > 2 && (
                <div className="hidden lg:block">
                  {rozkoPosts.data.slice(2, 7).map((newsCard, i) => {
                    const card = newsCard.attributes
                    const tag = card.tag.data?.attributes
                    return (
                      <div key={i}>
                        {card.tag && (
                          <div className="mb-5">
                            <Tag title={tag?.title} color={tag.pageCategory.data.attributes.color} />
                          </div>
                        )}
                        <UILink href={`blog/${card.slug}`}>
                          <div
                            className={`hover:text-[color:rgb(var(--color- mb-8 font-semibold underline${tag.pageCategory.data.attributes.color}))]`}
                          >
                            {card.title}
                          </div>
                        </UILink>
                      </div>
                    )
                  })}
                </div>
              )}
              <div className="col-span-3 mt-14 hidden justify-center lg:flex">
                {/* TODO: change this button to custom button */}
                {rozkoPosts?.data?.length > 0 && (
                  <UILink href={t('rozkopavkyNews')}>
                    <Button
                      variant="transparent"
                      className="text-h4 px-6 py-3 font-medium text-font shadow-none hover:text-primary"
                      icon={<ChevronRight />}
                      hoverIcon={<ArrowRight />}
                    >
                      {readMoreNewsText}
                    </Button>
                  </UILink>
                )}
              </div>
            </div>
          </HorizontalScrollWrapper>
          <div className="flex justify-center lg:hidden">
            {/* TODO: change this button to custom button */}
            <Button
              variant="transparent"
              className="mt-0 px-6 py-2 text-button-1 font-medium shadow-none"
              icon={<ChevronRight />}
              hoverIcon={<ArrowRight />}
            >
              {t('allNews')}
            </Button>
          </div>
        </div>
      )}
      {activeTab > 2 && (
        <div className="text-h4 mt-14 items-end px-8 text-center font-normal">
          {t('allInformationOnSite')}
          <UILink className="underline hover:text-red-brick" href="https://zverejnovanie.bratislava.sk">
            <div className="lg:hidden">
              <br />
            </div>
            <b> zverejnovanie.bratislava.sk</b>
          </UILink>
        </div>
      )}

      {/* Mobile */}
      <div className="mt-9 hidden">
        <HorizontalScrollWrapper className="-mx-8 space-x-4 px-8 pb-12">
          {activeNewsCards.map((newsItem, index) => (
            <NewsCard key={index} readMoreText={readMoreText} className="w-11/12 shrink-0" {...newsItem} />
          ))}
        </HorizontalScrollWrapper>
        <div className="flex justify-center">
          {/* TODO: change this button to custom button */}
          <UILink href={t('allNewsLink')}>
            <Button
              variant="transparent"
              className="mt-9 px-6 py-2 text-button-1 font-medium shadow-none"
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

export default Posts

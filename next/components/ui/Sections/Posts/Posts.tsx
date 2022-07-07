import cx from 'classnames'
import { NewsCard, NewsCardProps } from '../../NewsCard/NewsCard'
import React from 'react'
import { HorizontalScrollWrapper } from '../../HorizontalScrollWrapper/HorizontalScrollWrapper'
import { TabBarTab } from '../../TabBarTab/TabBarTab'
import { Tag } from '../../Tag/Tag'
import { Button } from '../../Button/Button'
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ArrowRight, ChevronRight } from '@assets/images'
import { useUIContext } from '@bratislava/common-frontend-ui-context'
import {
  Homepage,
  BlogPost,
  HomepageQuery,
  LatestBlogsWithTagsQuery,
  BlogPostFragment,
} from '@bratislava/strapi-sdk-homepage'
import { LatestBlogsFragment, NewsCardBlogFragment } from '@bratislava/strapi-sdk-homepage'
import { DocumentCards } from '../../DocumentCards/DocumentCards'
import { DocumentCard } from '../../DocumentCard/DocumentCard'
import { useTranslation } from 'react-i18next'
import { ParsedOfficialBoardDocument } from 'services/ginis'

export type TPostsTab = { category?: string; newsCards?: NewsCardProps[] }

export interface PostsProps {
  className?: string
  posts?: TPostsTab[]
  documents?: ParsedOfficialBoardDocument[]
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
  documents = [],
  leftHighLight,
  rightHighLight,
  readMoreText,
  readMoreNewsText,
  latestPost,
  rozkoPosts,
}: PostsProps) => {
  const [activeTab, setActiveTab] = React.useState(0)
  const [activePosts, setActivePost] = React.useState(posts[activeTab])
  const [activeNewsCards, setActiveNewsCards] = React.useState<NewsCardProps[]>(
    activePosts?.newsCards ? activePosts?.newsCards : []
  )

  const largeCount = 2

  const largeNews = activeNewsCards.slice(0, largeCount) // first and second

  const { Link: UILink } = useUIContext()

  const { t } = useTranslation('common')

  return (
    <div className={cx(className)}>
      <HorizontalScrollWrapper className="justify-start lg:justify-center space-x-4 -mx-8 px-8">
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

      {activeTab == 0 && (
        <div className="block mt-14">
          <HorizontalScrollWrapper className="space-x-4 pb-12 -mx-8 px-8">
            <div className="flex lg:grid grid-cols-3 gap-x-5 lg:gap-x-7.5">
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
                        {card.tag && (
                          <div className="mb-5">
                            <Tag title={tag?.title} color={tag.pageCategory.data.attributes.color} />
                          </div>
                        )}
                        <UILink href={`blog/${card.slug}`}>
                          <div
                            className={`mb-8 underline font-semibold hover:text-[color:rgb(var(--color-${tag.pageCategory.data.attributes.color}))]`}
                          >
                            {card.title}
                          </div>
                        </UILink>
                      </div>
                    )
                  })}
                </div>
              )}
              <div className="mt-14 hidden lg:flex justify-center col-span-3">
                {/* TODO: change this button to custom button */}
                {latestPost?.data?.length > 0 && (
                  <UILink href={t('allNewsLink')}>
                    <Button
                      variant="transparent"
                      className="px-6 py-3 text-default lg:text-md font-medium shadow-none text-font hover:text-primary"
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
              className="px-6 py-2 mt-0 text-default font-medium shadow-none"
              icon={<ChevronRight />}
              hoverIcon={<ArrowRight />}
            >
              Všetky aktuality
            </Button>
          </div>
        </div>
      )}
      {activeTab == 1 && (
        <div className="mt-14 flex flex-col gap-y-10">
          <div className="flex flex-col items-center gap-y-5">
            {documents.map((document, index) => (
              <DocumentCard
                key={index}
                {...document}
                className="max-w-4xl min-w-full"
                viewButtonText={t('files')}
                downloadButtonText="TODO-fix"
              />
            ))}
          </div>
          <UILink href="/mesto-bratislava/transparentne-mesto/uradna-tabula" className="flex justify-center">
            <Button
              className="px-6 py-3 text-default font-medium shadow-none hover:text-primary"
              variant="transparent"
              icon={<ChevronRight />}
              hoverIcon={<ArrowRight />}
            >
              {t('toOfficialBoard')}
            </Button>
          </UILink>
        </div>
      )}
      {activeTab == 2 && (
        <div className="block mt-14">
          <HorizontalScrollWrapper className="space-x-4 pb-12 -mx-8 px-8">
            <div className="flex lg:grid grid-cols-3 gap-x-5 lg:gap-x-7.5">
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
                            className={`mb-8 underline font-semibold hover:text-[color:rgb(var(--color-${tag.pageCategory.data.attributes.color}))]`}
                          >
                            {card.title}
                          </div>
                        </UILink>
                      </div>
                    )
                  })}
                </div>
              )}
              <div className="mt-14 hidden lg:flex justify-center col-span-3">
                {/* TODO: change this button to custom button */}
                {rozkoPosts?.data?.length > 0 && (
                  <UILink href={t('rozkopavkyNews')}>
                    <Button
                      variant="transparent"
                      className="px-6 py-3 text-default lg:text-md font-medium shadow-none text-font hover:text-primary"
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
              className="px-6 py-2 mt-0 text-default font-medium shadow-none"
              icon={<ChevronRight />}
              hoverIcon={<ArrowRight />}
            >
              Všetky aktuality
            </Button>
          </div>
        </div>
      )}
      {activeTab > 2 && (
        <div className="mt-14 px-8 font-sans font-normal lg:text-md text-default text-center items-end">
          Všetky informácie nájdete na stránke
          <UILink className="underline hover:text-red-brick" href="https://zverejnovanie.bratislava.sk">
            {
              <div className="lg:hidden">
                <br></br>
              </div>
            }
            <b> zverejnovanie.bratislava.sk</b>
          </UILink>
        </div>
      )}

      {/* Mobile */}
      <div className="hidden mt-9">
        <HorizontalScrollWrapper className="space-x-4 pb-12 -mx-8 px-8">
          {activeNewsCards.map((newsItem, index) => (
            <NewsCard key={index} readMoreText={readMoreText} className="flex-shrink-0 w-11/12" {...newsItem} />
          ))}
        </HorizontalScrollWrapper>
        <div className="flex justify-center">
          {/* TODO: change this button to custom button */}
          <Button
            variant="transparent"
            className="px-6 py-2 mt-9 text-default font-medium shadow-none"
            icon={<ChevronRight />}
            hoverIcon={<ArrowRight />}
          >
            Všetky aktuality
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Posts

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
}

export const Posts = ({
  className,
  posts = [],
  leftHighLight,
  rightHighLight,
  readMoreText,
  readMoreNewsText,
  latestPost,
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
      <HorizontalScrollWrapper className="justify-start lg:justify-center">
        <div className="flex space-x-8 lg:space-x-32 ml-8 lg:ml-0">
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
        <div className="hidden lg:flex mt-14">
          <div className="grid grid-cols-3 gap-x-7.5">
            {!leftHighLight &&
              largeNews.map((newsCard, i) => (
                <div key={i}>
                  <NewsCard {...newsCard} />
                </div>
              ))}
            {leftHighLight && <NewsCard {...leftHighLight?.data?.attributes} readMoreText={readMoreText} />}
            {rightHighLight && <NewsCard {...rightHighLight?.data?.attributes} readMoreText={readMoreText} />}

            {latestPost?.data?.length > 0 && (
              <div>
                {latestPost.data.map((newsCard, i) => {
                  const card = newsCard.attributes
                  const tag = card.tag.data.attributes
                  return (
                    <div key={i}>
                      {card.tag && (
                        <div className="mb-5">
                          <Tag title={tag.title} color={tag.pageCategory.data.attributes.color} />
                        </div>
                      )}
                      <UILink href={`blog/${card.slug}`}>
                        <div
                          className={`mb-5 underline font-semibold hover:text-[color:rgb(var(--color-${tag.pageCategory.data.attributes.color}))]`}
                        >
                          {card.title}
                        </div>
                      </UILink>
                    </div>
                  )
                })}
              </div>
            )}
            <div className="mt-14 flex justify-center col-span-3">
              {/* TODO: change this button to custom button */}
              {latestPost?.data?.length > 0 && (
                <UILink href={t('allNewsLink')}>
                  <Button
                    variant="transparent"
                    className="px-6 py-3 text-default lg:text-md font-medium shadow-none text-font"
                    icon={<ChevronRight />}
                    hoverIcon={<ArrowRight />}
                  >
                    {readMoreNewsText}
                  </Button>
                </UILink>
              )}
            </div>
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
                className="max-w-4xl"
                viewButtonText="TODO-fix"
                downloadButtonText="TODO-fix"
              />
            ))}
          </div>
          <UILink href="/official-board" className="flex justify-center">
            <Button
              className="px-6 py-3 text-default font-medium"
              variant="transparent-black"
              icon={<ChevronRight />}
              hoverIcon={<ArrowRight />}
            >
              Prejsť na úradnú tabuľu
            </Button>
          </UILink>
        </div>
      )}
      {activeTab > 1 && (
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
      <div className="lg:hidden mt-9">
        <HorizontalScrollWrapper className="space-x-4 pb-12 -mx-8 px-8">
          {activeNewsCards.map((newsItem, index) => (
            <NewsCard key={index} readMoreText={readMoreText} className="flex-shrink-0 w-11/12" {...newsItem} />
          ))}
        </HorizontalScrollWrapper>
        <div className="flex justify-center">
          {/* TODO: change this button to custom button */}
          <Button variant="transparent" className="px-6 py-2 mt-9 text-default font-medium">
            Všetky aktuality
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Posts

const documents = [
  {
    title: 'Kúpna zmluva technológie garáže M. Benku',
    createdAt: 'utorok 19. decembra 2017',
    fileExtension: '.pdf',
    fileSize: '164 kB',
    content: 'Kúpna zmluva na technológie inštalované v podzemnej garáži na Nám. M. Benku od odovzdávajúceho nájomcu',
  },
  {
    title: 'Kúpna zmluva technológie garáže M. Benku',
    createdAt: 'utorok 19. decembra 2017',
    fileExtension: '.pdf',
    fileSize: '164 kB',
    content: 'Kúpna zmluva na technológie inštalované v podzemnej garáži na Nám. M. Benku od odovzdávajúceho nájomcu',
  },
  {
    title: 'Kúpna zmluva technológie garáže M. Benku',
    createdAt: 'utorok 19. decembra 2017',
    fileExtension: '.pdf',
    fileSize: '164 kB',
    content: 'Kúpna zmluva na technológie inštalované v podzemnej garáži na Nám. M. Benku od odovzdávajúceho nájomcu',
  },
]

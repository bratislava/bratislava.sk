import { Typography } from '@bratislava/component-library'
import { Fragment } from 'react'
import { TabPanel } from 'react-aria-components'

import ArticleCard from '@/src/components/cards/ArticleCard'
import { transformArticleProps } from '@/src/components/cards/transformArticleProps'
import Button from '@/src/components/common/Button/Button'
import ResponsiveCarousel from '@/src/components/common/Carousel/ResponsiveCarousel'
import HorizontalDivider from '@/src/components/common/Divider/HorizontalDivider'
import MLink from '@/src/components/common/MLink/MLink'
import { useHomepageContext } from '@/src/components/providers/HomepageContextProvider'
import { formatDate } from '@/src/utils/formatDate'
import { getLinkProps } from '@/src/utils/getLinkProps'
import { isDefined } from '@/src/utils/isDefined'

const TabPanelLatestNews = () => {
  const { homepage, latestArticles } = useHomepageContext()
  const { tabs } = homepage ?? {}
  const { leftArticle, rightArticle } = tabs ?? {}
  const latestArticlesFiltered =
    latestArticles
      ?.filter(isDefined)
      .filter(
        (article) =>
          article.documentId !== leftArticle?.documentId &&
          article.documentId !== rightArticle?.documentId,
      )
      .slice(0, 4) ?? []

  const allLatestArticles =
    [leftArticle, rightArticle, ...latestArticlesFiltered].filter(isDefined).slice(0, 6) ?? []

  return (
    <TabPanel id="LatestNews">
      <ResponsiveCarousel
        className="lg:hidden"
        items={allLatestArticles.map((article) => (
          <ArticleCard key={article.slug} {...transformArticleProps(article)} />
        ))}
      />
      <div className="mt-14 hidden pb-8 lg:block">
        <div className="grid grid-cols-3 gap-x-8">
          {[leftArticle, rightArticle].filter(isDefined).map((article) => (
            <ArticleCard key={article.slug} {...transformArticleProps(article)} />
          ))}

          <div className="hidden flex-col gap-4 self-start rounded-lg bg-white p-6 lg:flex">
            {latestArticlesFiltered.map((post, index) => {
              const { slug, title, addedAt } = post

              return (
                <Fragment key={index}>
                  {index > 0 && <HorizontalDivider />}
                  <div
                    // margin and padding serve to display focus ring better
                    className="wrapper-focus-ring relative -m-1 flex flex-col gap-2 rounded-sm p-1"
                  >
                    <Typography variant="p-small">{formatDate(addedAt)}</Typography>
                    <MLink
                      href={`/spravy/${slug}`}
                      stretched
                      variant="underlineOnHover"
                      className="line-clamp-3"
                    >
                      <Typography variant="h6" as="h3">
                        {title}
                      </Typography>
                    </MLink>
                  </div>
                </Fragment>
              )
            })}
          </div>
        </div>
      </div>
      {tabs?.newsPageLink ? (
        <div className="flex justify-center">
          <Button variant="outline" hasLinkIcon {...getLinkProps(tabs.newsPageLink)} />
        </div>
      ) : null}
    </TabPanel>
  )
}

export default TabPanelLatestNews

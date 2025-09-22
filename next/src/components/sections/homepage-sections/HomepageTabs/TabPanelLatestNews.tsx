import { Typography } from '@bratislava/component-library'
import { TabPanel } from 'react-aria-components'

import ArticleCardOld from '@/src/components/cards/ArticleCardOld'
import { transformArticleProps } from '@/src/components/cards/transformArticleProps'
import Button from '@/src/components/common/Button/Button'
import ResponsiveCarousel from '@/src/components/common/Carousel/ResponsiveCarousel'
import MLink from '@/src/components/common/MLink/MLink'
import Tag from '@/src/components/common/Tag/Tag'
import { useHomepageContext } from '@/src/components/providers/HomepageContextProvider'
import { getCategoryColorLocalStyle } from '@/src/utils/colors'
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
          <ArticleCardOld key={article.slug} {...transformArticleProps(article)} />
        ))}
      />
      <div className="mt-14 hidden pb-8 lg:block">
        <div className="grid grid-cols-3 gap-x-8">
          {[leftArticle, rightArticle].filter(isDefined).map((article) => (
            <ArticleCardOld key={article.slug} {...transformArticleProps(article)} />
          ))}

          <div className="hidden flex-col gap-6 lg:flex">
            {latestArticlesFiltered.map((post, index) => {
              const { tag, slug, title } = post
              const tagColor = tag?.pageCategory?.color

              return (
                <div
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  className="focus-ring-wrapper relative"
                  style={getCategoryColorLocalStyle({ color: tagColor })}
                >
                  {tag?.title && (
                    <div className="mb-3">
                      <Tag text={tag.title} size="small" isColored />
                    </div>
                  )}
                  <MLink
                    href={`/spravy/${slug}`}
                    stretched
                    variant="underlineOnHover"
                    className="line-clamp-3"
                  >
                    <Typography variant="h5" as="h3">
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
          <Button variant="outline" hasLinkIcon {...getLinkProps(tabs.newsPageLink)} />
        </div>
      ) : null}
    </TabPanel>
  )
}

export default TabPanelLatestNews

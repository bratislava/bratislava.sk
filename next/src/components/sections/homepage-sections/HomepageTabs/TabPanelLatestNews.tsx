import { TabPanel } from 'react-aria-components'

import ArticleCard from '@/src/components/cards/ArticleCard'
import { transformArticleProps } from '@/src/components/cards/transformArticleProps'
import Button from '@/src/components/common/Button/Button'
import ResponsiveCarousel from '@/src/components/common/Carousel/ResponsiveCarousel'
import { useHomepageContext } from '@/src/components/providers/HomepageContextProvider'
import LatestNews from '@/src/components/sections/LatestNews'
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
      {leftArticle && rightArticle && (
        <LatestNews
          leftArticle={leftArticle}
          rightArticle={rightArticle}
          otherArticles={latestArticlesFiltered}
        />
      )}
      {tabs?.newsPageLink ? (
        <div className="flex justify-center">
          <Button variant="outline" hasLinkIcon {...getLinkProps(tabs.newsPageLink)} />
        </div>
      ) : null}
    </TabPanel>
  )
}

export default TabPanelLatestNews

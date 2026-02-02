import { TabPanel } from 'react-aria-components'

import LatestNews from '@/src/components/common/LatestNews/LatestNews'
import { useHomepageContext } from '@/src/components/providers/HomepageContextProvider'
import { isDefined } from '@/src/utils/isDefined'

const TabPanelLatestNews = () => {
  const { homepage, latestArticles } = useHomepageContext()
  const { tabs } = homepage ?? {}

  const leftArticle =
    tabs?.leftArticle === null && latestArticles ? latestArticles[0] : tabs?.leftArticle
  const rightArticle =
    tabs?.rightArticle === null && latestArticles
      ? latestArticles.filter((article) => article.documentId !== leftArticle?.documentId)[0]
      : tabs?.rightArticle

  const latestArticlesFiltered =
    latestArticles
      ?.filter(isDefined)
      .filter(
        (article) =>
          article.documentId !== leftArticle?.documentId &&
          article.documentId !== rightArticle?.documentId,
      )
      .slice(0, 4) ?? []

  return (
    <TabPanel id="LatestNews">
      <LatestNews
        leftArticle={leftArticle}
        rightArticle={rightArticle}
        otherArticles={latestArticlesFiltered}
        newsPageLink={tabs?.newsPageLink}
      />
    </TabPanel>
  )
}

export default TabPanelLatestNews

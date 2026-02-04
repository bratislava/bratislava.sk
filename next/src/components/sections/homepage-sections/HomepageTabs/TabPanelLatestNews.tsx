import { TabPanel } from 'react-aria-components'

import LatestNews from '@/src/components/common/LatestNews/LatestNews'
import { useHomepageContext } from '@/src/components/providers/HomepageContextProvider'
import { isDefined } from '@/src/utils/isDefined'

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=19274-19792&t=oEQ6SCdzjktLhq9o-4
 */

const TabPanelLatestNews = () => {
  const { homepage, latestArticles } = useHomepageContext()
  const { tabs } = homepage ?? {}

  const leftArticle = tabs?.leftArticle ?? latestArticles?.[0]
  const rightArticle =
    tabs?.rightArticle ??
    latestArticles?.filter((article) => article.documentId !== leftArticle?.documentId)[0]

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

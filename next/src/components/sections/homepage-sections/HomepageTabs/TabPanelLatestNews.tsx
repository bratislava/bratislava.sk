import { TabPanel } from 'react-aria-components'

import LatestNews from '@/src/components/common/LatestNews/LatestNews'
import { useHomepageContext } from '@/src/components/providers/HomepageContextProvider'
import { isDefined } from '@/src/utils/isDefined'

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
    <TabPanel id="LatestNews" className="flex flex-col gap-y-14">
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

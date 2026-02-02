import { useQuery } from '@tanstack/react-query'

import LatestNews from '@/src/components/common/LatestNews/LatestNews'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import { ArticlesLandingPageSectionFragment } from '@/src/services/graphql'
import { client } from '@/src/services/graphql/gql'
import { isDefined } from '@/src/utils/isDefined'
import { useLocale } from '@/src/utils/useLocale'

type Props = {
  section: ArticlesLandingPageSectionFragment
}

const ArticlesLandingPageSection = ({ section }: Props) => {
  const locale = useLocale()
  const { newsPageLink } = section

  const { data: latestArticles } = useQuery({
    queryKey: ['Articles', locale],
    queryFn: () =>
      client.Articles({
        limit: 7,
        sort: 'addedAt:desc',
        locale,
        filters: {
          and: [
            // Exclude inba articles and articles with adminGroup
            { adminGroups: { adminGroupId: { eq: null } } },
            { articleCategory: { title: { notContains: 'in.ba' } } },
          ],
        },
      }),
    staleTime: Infinity,
    select: (res) => res.articles.filter(isDefined),
  })

  const leftArticle = section.leftArticle ?? latestArticles?.[0]

  const latestArticlesFiltered =
    latestArticles
      ?.filter(isDefined)
      .filter((article) => article.documentId !== leftArticle?.documentId)
      .slice(0, 4) ?? []

  return (
    <SectionContainer className="py-6 lg:py-12">
      <div className="flex flex-col gap-y-14">
        <LatestNews
          leftArticle={leftArticle}
          otherArticles={latestArticlesFiltered}
          newsPageLink={newsPageLink}
        />
      </div>
    </SectionContainer>
  )
}

export default ArticlesLandingPageSection

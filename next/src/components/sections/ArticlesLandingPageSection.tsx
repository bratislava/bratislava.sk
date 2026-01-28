import { useQuery } from '@tanstack/react-query'

import ArticleCard from '@/src/components/cards/ArticleCard'
import { transformArticleProps } from '@/src/components/cards/transformArticleProps'
import Button from '@/src/components/common/Button/Button'
import ResponsiveCarousel from '@/src/components/common/Carousel/ResponsiveCarousel'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import LatestNews from '@/src/components/sections/LatestNews'
import { ArticlesLandingPageSectionFragment } from '@/src/services/graphql'
import { client } from '@/src/services/graphql/gql'
import { getLinkProps } from '@/src/utils/getLinkProps'
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

  const LeftArticle =
    section.leftArticle === null && latestArticles ? latestArticles[0] : section.leftArticle

  const latestArticlesFiltered =
    latestArticles
      ?.filter(isDefined)
      .filter((article) => article.documentId !== LeftArticle?.documentId)
      .slice(0, 4) ?? []

  const allLatestArticles =
    [section.leftArticle, ...latestArticlesFiltered].filter(isDefined).slice(0, 6) ?? []

  return (
    <SectionContainer className="py-6 lg:py-12">
      <ResponsiveCarousel
        className="lg:hidden"
        items={allLatestArticles.map((article) => (
          <ArticleCard key={article.slug} {...transformArticleProps(article)} />
        ))}
      />
      {LeftArticle && (
        <LatestNews leftArticle={LeftArticle} otherArticles={latestArticlesFiltered} />
      )}
      {newsPageLink ? (
        <div className="flex justify-center">
          <Button variant="outline" hasLinkIcon {...getLinkProps(newsPageLink)} />
        </div>
      ) : null}
    </SectionContainer>
  )
}

export default ArticlesLandingPageSection

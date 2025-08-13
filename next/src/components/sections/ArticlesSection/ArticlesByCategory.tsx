import { keepPreviousData, useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'

import ArticleCard from '@/src/components/cards/ArticleCard'
import { transformArticleProps } from '@/src/components/cards/transformArticleProps'
import ResponsiveCarousel from '@/src/components/common/Carousel/ResponsiveCarousel'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import { ArticlesSectionFragment } from '@/src/services/graphql'
import { client } from '@/src/services/graphql/gql'
import {
  articlesDefaultFilters,
  articlesFetcher,
  getArticlesQueryKey,
} from '@/src/services/meili/fetchers/articlesFetcher'
import { isDefined } from '@/src/utils/isDefined'
import { useLocale } from '@/src/utils/useLocale'
import { useRoutePreservedState } from '@/src/utils/useRoutePreservedState'

type Props = {
  section: ArticlesSectionFragment
}

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=16846-35571&m=dev
 */

const ArticlesByCategory = ({ section }: Props) => {
  const locale = useLocale()

  const { title, text, category } = section

  const [filters, setFilters] = useRoutePreservedState({
    ...articlesDefaultFilters,
    pageSize: 12,
  })

  const { data: tagsData } = useQuery({
    queryKey: ['Tags', locale],
    queryFn: () => client.Tags({ locale }),
    staleTime: Infinity,
  })

  const tagDocumentIds =
    tagsData?.tags
      .filter((tag) => {
        return tag?.pageCategory?.documentId === category?.documentId
      })
      .map((tag) => tag?.documentId ?? '')
      .filter(isDefined) ?? []

  useEffect(() => {
    setFilters({ ...filters, tagDocumentIds })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tagsData])

  // TODO prefetch section
  const { data } = useQuery({
    queryKey: getArticlesQueryKey(filters, locale),
    queryFn: () => articlesFetcher(filters, locale),
    placeholderData: keepPreviousData,
    enabled: filters.tagDocumentIds.length > 0,
  })

  return (
    <div className="flex flex-col">
      <SectionHeader title={title} text={text} />
      {data?.hits ? (
        <ResponsiveCarousel
          items={data.hits
            .map((card) => {
              return card ? (
                <ArticleCard
                  key={card.slug}
                  {...transformArticleProps(card, { withText: false })}
                />
              ) : null
            })
            .filter(isDefined)}
          desktop={4}
        />
      ) : null}
    </div>
  )
}

export default ArticlesByCategory

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
  ArticlesFilters,
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

const ArticlesFiltered = ({ section }: Props) => {
  const locale = useLocale()

  const {
    title,
    text,
    articles: articlesFromStrapi,
    category,
    articleCategories,
    tags,
    adminGroups,
    showMoreLink,
  } = section

  const articleCategorySlugs = articleCategories
    .map((articleCategory) => articleCategory?.slug)
    .filter(isDefined)

  const tagSlugs = tags.map((tag) => tag?.slug).filter(isDefined)

  const adminGroupDocumentIds = adminGroups
    .map((adminGroup) => adminGroup?.documentId)
    .filter(isDefined)

  const [filters, setFilters] = useRoutePreservedState<ArticlesFilters>({
    ...articlesDefaultFilters,
    articleCategorySlugs,
    adminGroupDocumentIds,
    tagSlugs,
    pageSize: 12,
  })

  // TODO remove this after removing main categories in strapi
  const { data: tagsDataFromCategoryField } = useQuery({
    queryKey: ['Tags', locale],
    queryFn: () => client.Tags({ locale }),
    staleTime: Infinity,
    enabled: !!category,
  })

  // TODO remove this after removing main categories in strapi
  useEffect(() => {
    if (!category || !tagsDataFromCategoryField) return
    setFilters({
      ...filters,
      adminGroupDocumentIds: [],
      tagSlugs:
        tagsDataFromCategoryField.tags
          .filter((tag) => {
            return tag?.pageCategory?.documentId === category?.documentId
          })
          .map((tag) => tag?.slug ?? '')
          .filter(isDefined) ?? [],
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tagsDataFromCategoryField])

  // TODO prefetch section
  const { data } = useQuery({
    queryKey: getArticlesQueryKey(filters, locale),
    queryFn: () => articlesFetcher(filters, locale),
    placeholderData: keepPreviousData,
    enabled:
      // don't fetch if section contains only manually selected articles and no other filters
      !(
        articlesFromStrapi.length > 0 &&
        [category, ...articleCategories, ...tags, ...adminGroups].filter(isDefined).length === 0
      ),
  })

  const articlesToShow = [
    ...(articlesFromStrapi.filter(isDefined) ?? []),
    ...(data?.hits
      .filter((articleFromMeili) =>
        articlesFromStrapi.every(
          // filter out articles which are already selected manually in Strapi
          (articleFromStrapi) => articleFromStrapi?.documentId !== articleFromMeili.documentId,
        ),
      )
      .filter(isDefined) ?? []),
  ].slice(0, 12)

  return (
    <div className="flex flex-col gap-8">
      <SectionHeader title={title} text={text} showMoreLink={showMoreLink} />
      {articlesToShow.length > 0 ? (
        <ResponsiveCarousel
          items={articlesToShow
            .map((card) => {
              return card ? (
                <ArticleCard
                  key={card.slug}
                  {...transformArticleProps(card, { withText: false })}
                />
              ) : null
            })
            .filter(isDefined)}
          desktop={3}
          hasVerticalPadding={false}
        />
      ) : null}
    </div>
  )
}

export default ArticlesFiltered

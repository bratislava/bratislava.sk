import { Typography } from '@bratislava/component-library'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import React from 'react'

import ArticleCard from '@/src/components/cards/ArticleCard'
import { transformArticleProps } from '@/src/components/cards/transformArticleProps'
import ArticlesFilter from '@/src/components/common/ArticlesFilter/ArticlesFilter'
import Pagination from '@/src/components/common/Pagination/Pagination'
import { ArticlesSectionFragment } from '@/src/services/graphql'
import { client } from '@/src/services/graphql/gql'
import {
  articlesDefaultFilters,
  articlesFetcher,
  getArticlesQueryKey,
} from '@/src/services/meili/fetchers/articlesFetcher'
import { useLocale } from '@/src/utils/useLocale'
import { useRoutePreservedState } from '@/src/utils/useRoutePreservedState'

type Props = {
  section: ArticlesSectionFragment
}

const ArticlesAllSection = ({ section }: Props) => {
  const locale = useLocale()

  const { title, text } = section

  const [filters, setFilters] = useRoutePreservedState({
    ...articlesDefaultFilters,
  })

  const { data } = useQuery({
    queryKey: getArticlesQueryKey(filters, locale),
    queryFn: () => articlesFetcher(filters, locale),
    placeholderData: keepPreviousData,
  })

  const { data: pageCategoriesData } = useQuery({
    queryKey: ['PageCategories', locale],
    queryFn: () => client.PageCategories({ locale }),
    staleTime: Infinity,
  })

  const { data: tagsData } = useQuery({
    queryKey: ['Tags', locale],
    queryFn: () => client.Tags({ locale }),
    staleTime: Infinity,
  })

  const handlePageChange = (page: number) => {
    setFilters({ ...filters, page })
  }

  const handleTagsChange = (tags: string[]) => {
    setFilters({ ...filters, tagIds: tags })
  }

  return (
    <div className="flex flex-col gap-8">
      <ArticlesFilter
        pageCategories={pageCategoriesData?.pageCategories?.data ?? []}
        tags={tagsData?.tags?.data ?? []}
        onTagChange={handleTagsChange}
      />
      {title || text ? (
        <div className="flex flex-col gap-2">
          {title && <Typography type="h2">{title}</Typography>}
          {text && <Typography type="p">{text}</Typography>}
        </div>
      ) : null}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {data?.hits.map((card) => {
          return card.attributes ? (
            <ArticleCard key={card.attributes.slug} {...transformArticleProps(card.attributes)} />
          ) : null
        })}
      </div>

      {data?.estimatedTotalHits ? (
        <Pagination
          key={filters.search}
          totalCount={Math.ceil(data.estimatedTotalHits / filters.pageSize)}
          currentPage={filters.page}
          onPageChange={handlePageChange}
        />
      ) : null}
    </div>
  )
}

export default ArticlesAllSection

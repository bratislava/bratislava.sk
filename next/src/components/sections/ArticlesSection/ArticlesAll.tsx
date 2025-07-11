import { keepPreviousData, useQuery } from '@tanstack/react-query'
import React from 'react'

import ArticleCard from '@/src/components/cards/ArticleCard'
import { transformArticleProps } from '@/src/components/cards/transformArticleProps'
import ArticlesFilter from '@/src/components/common/ArticlesFilter/ArticlesFilter'
import Pagination from '@/src/components/common/Pagination/Pagination'
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
 * TODO Figma link
 */

const ArticlesAll = ({ section }: Props) => {
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
    <div className="flex flex-col">
      <ArticlesFilter
        pageCategories={pageCategoriesData?.pageCategories.filter(isDefined) ?? []}
        tags={tagsData?.tags.filter(isDefined)}
        onTagChange={handleTagsChange}
      />
      <SectionHeader
        title={title}
        text={text}
        // TODO Correct spacing between SectionHeader and remaining content
        className="pb-6 lg:pb-8"
      />
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {data?.hits.map((card) => (
            <ArticleCard key={card.slug} {...transformArticleProps(card)} />
          ))}
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
    </div>
  )
}

export default ArticlesAll

import { Typography } from '@bratislava/component-library'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import React, { useEffect, useRef, useState } from 'react'

import ArticleCard from '@/src/components/cards/ArticleCard'
import { transformArticleProps } from '@/src/components/cards/transformArticleProps'
import Pagination from '@/src/components/common/Pagination/Pagination'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import ArticlesFilterGroup from '@/src/components/sections/ArticlesSection/ArticlesFilterGroup'
import { useArticlesFilters } from '@/src/components/sections/ArticlesSection/useArticlesFilters'
import SearchBar from '@/src/components/sections/SearchSection/SearchBar'
import { ArticlesSectionFragment } from '@/src/services/graphql'
import {
  articlesFetcher,
  ArticlesFilters,
  getArticlesQueryKey,
} from '@/src/services/meili/fetchers/articlesFetcher'
import { useLocale } from '@/src/utils/useLocale'
import { useTranslation } from '@/src/utils/useTranslation'

type Props = {
  section: ArticlesSectionFragment
}

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=18995-28122&m=dev
 */

const ArticlesAll = ({ section }: Props) => {
  const { t } = useTranslation()
  const locale = useLocale()

  const { title, text } = section

  const { filters, setFilters } = useArticlesFilters()

  // URL query params are not availible on first render, so we need to synchonize them
  const [input, setInput] = useState('')

  useEffect(() => {
    setInput(filters.search)
  }, [filters.search])

  // TODO debounce input
  // const [debouncedInput] = useDebounceValue(input, 300)

  const handlePageChange = (page: number) => {
    setFilters({ ...filters, page })
  }

  const handleFiltersChange = (newFilters: ArticlesFilters) => {
    setFilters({ ...filters, ...newFilters, page: 1 })
  }

  const handleInputChange = (newSearch: string) => {
    setInput(newSearch)
    setFilters({ ...filters, search: newSearch, page: 1 })
  }

  // TODO debounce input
  // useEffect(() => {
  //   setFilters({ ...filters, search: debouncedInput, page: 1 })
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [debouncedInput])

  const { data, isPending } = useQuery({
    queryKey: getArticlesQueryKey(filters, locale),
    queryFn: () => articlesFetcher(filters, locale),
    placeholderData: keepPreviousData,
  })

  const searchRef = useRef<null | HTMLInputElement>(null)

  useEffect(() => {
    searchRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [filters.page, filters.pageSize])

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-6">
        <SectionHeader title={title} text={text} />
        <SearchBar
          ref={searchRef}
          placeholder={t('SearchPage.enterKeyword')}
          value={input}
          onChange={handleInputChange}
          isLoading={isPending}
        />
        <ArticlesFilterGroup filters={filters} onFiltersChange={handleFiltersChange} />
      </div>

      {data?.hits?.length ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {data.hits.map((card) => (
            <ArticleCard key={card.slug} {...transformArticleProps(card)} />
          ))}
        </div>
      ) : (
        <Typography>{t('ArticlesAll.noResults')}</Typography>
      )}

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

export default ArticlesAll

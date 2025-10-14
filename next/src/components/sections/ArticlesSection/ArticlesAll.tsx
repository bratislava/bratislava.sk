import { Typography } from '@bratislava/component-library'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import React, { useEffect, useRef, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'

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

  const { filters, setFilters, setSearch, setPage } = useArticlesFilters()

  const [input, setInput] = useState('')
  const [debouncedInput] = useDebounceValue(input, 300)

  const handleFiltersChange = (newFilters: ArticlesFilters) => {
    setFilters({ ...newFilters, page: 1 })
  }

  useEffect(() => {
    setSearch(debouncedInput)
  }, [debouncedInput, setSearch])

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
          input={input}
          setInput={setInput}
          setSearchQuery={setInput}
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
          onPageChange={setPage}
        />
      ) : null}
    </div>
  )
}

export default ArticlesAll

import { Typography } from '@bratislava/component-library'
import Pagination from '@bratislava/ui-bratislava/Pagination/Pagination'
import { SearchOption } from '@components/organisms/SearchSection/GlobalSearchSectionContent'
import SearchResultCard from '@components/organisms/SearchSection/SearchResultCard'
import SearchResultsHeader from '@components/organisms/SearchSection/SearchResultsHeader'
import {
  SearchFilters,
  useQueryBySearchOption,
} from '@components/organisms/SearchSection/useQueryBySearchOption'
import LoadingSpinner from '@components/ui/LoadingSpinner/LoadingSpinner'
import { useTranslations } from 'next-intl'
import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { Selection } from 'react-aria-components'

type SearchResultsProps = {
  filters: SearchFilters
  variant: 'allResults' | 'specificResults'
  searchOption: SearchOption
  onSetResultsCount: (searchOptionId: SearchOption['id'], count: number) => void
  onShowMore?: Dispatch<SetStateAction<Selection>>
  onPageChange?: Dispatch<SetStateAction<number>>
  onLoadingChange?: Dispatch<SetStateAction<boolean>>
}

const SearchResults = ({
  filters,
  variant,
  searchOption,
  onSetResultsCount,
  onShowMore,
  onPageChange,
  // TODO use onLoadingChange to signal loading state to parent component
  onLoadingChange,
}: SearchResultsProps) => {
  const t = useTranslations()

  const searchQuery = useQueryBySearchOption({ optionKey: searchOption.id, filters })

  if (!searchQuery) {
    return null
  }

  const { data, isPending, isError, error, isFetching } = searchQuery
  const { searchResultsData, searchResultsCount } = data ?? { searchResultsCount: 0 }

  const GENERAL_RESULTS_COUNT = 5

  useEffect(() => {
    onSetResultsCount(searchOption.id, searchResultsCount ?? 0)
  }, [searchResultsCount])

  if (isPending) {
    return <LoadingSpinner />
  }

  if (isError) {
    return <Typography type="p">Error {error.message}</Typography>
  }

  return (
    <div className="flex flex-col gap-y-8" data-cy={`search-section-${searchOption?.displayNamePlural}`}>
      <div className="flex flex-col gap-y-4">
        {variant === 'allResults' && (
          <SearchResultsHeader
            title={`${searchOption?.displayNamePlural}` ?? ''}
            showButton={searchResultsCount > 0}
            handleShowMore={() => {
              if (!onShowMore) return
              onShowMore(new Set([searchOption.id]))
            }}
          />
        )}
        {searchResultsData?.length ? (
          <div className="flex flex-col lg:gap-y-2" data-cy="search-results">
            {searchResultsData
              .slice(0, variant === 'allResults' ? GENERAL_RESULTS_COUNT : undefined)
              .map((item) => {
                return (
                  <SearchResultCard
                    data={{ ...item }}
                    key={`item-${variant}-${searchOption.id}-${[
                      item.uniqueId,
                      item.title,
                      ...(item?.metadata ?? []),
                    ].join('')}`}
                  />
                )
              })}
          </div>
        ) : filters.search ? (
          <div data-cy="no-search-results">
            <Typography type="p">{t('SearchPage.noResults')}</Typography>
          </div>
        ) : (
          /* Contacts show only for non-empty search query */
          // TODO keep this also during the first loading
          // TODO IS PENDING, but handle contacts separately
          <Typography type="p">{t('SearchPage.enterSearchQuery')}</Typography>
        )}

        {variant === 'specificResults' && onPageChange ? (
          <div>
            <Pagination
              currentPage={filters.page}
              totalCount={
                searchResultsCount > 0 ? Math.ceil(searchResultsCount / filters.pageSize) : 1
              }
              onPageChange={onPageChange}
            />
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default SearchResults

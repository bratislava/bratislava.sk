import { Typography } from '@bratislava/component-library'
import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { Selection } from 'react-aria-components'

import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner'
import Pagination from '@/components/common/Pagination/Pagination'
import { SearchOption } from '@/components/sections/SearchSection/GlobalSearchSectionContent'
import SearchResultCard from '@/components/sections/SearchSection/SearchResultCard'
import SearchResultsHeader from '@/components/sections/SearchSection/SearchResultsHeader'
import {
  SearchFilters,
  useQueryBySearchOption,
} from '@/components/sections/SearchSection/useQueryBySearchOption'
import { useTranslation } from '@/utils/useTranslation'

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onLoadingChange,
}: SearchResultsProps) => {
  const { t } = useTranslation()

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
    <div
      className="flex flex-col gap-y-8"
      data-cy={`search-section-${searchOption?.displayNamePlural.replaceAll(' ', '-')}`}
    >
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
          <ul className="flex flex-col rounded-lg border-2 py-2" data-cy="search-results">
            {searchResultsData
              .slice(0, variant === 'allResults' ? GENERAL_RESULTS_COUNT : undefined)
              .map((item, index) => {
                return (
                  <li>
                    <SearchResultCard
                      data={{ ...item }}
                      hideBottomDivider={index === GENERAL_RESULTS_COUNT - 1}
                      key={`item-${variant}-${searchOption.id}-${[
                        item.uniqueId,
                        item.title,
                        ...(item?.metadata ?? []),
                      ].join('')}`}
                    />
                  </li>
                )
              })}
          </ul>
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

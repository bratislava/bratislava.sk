import { Typography } from '@bratislava/component-library'
import Pagination from '@bratislava/ui-bratislava/Pagination/Pagination'
import Spinner from '@components/forms/simple-components/Spinner'
import { SearchOption } from '@components/organisms/SearchSection/GlobalSearchSectionContent'
import SearchResultCard from '@components/organisms/SearchSection/SearchResultCard'
import SearchResultsHeader from '@components/organisms/SearchSection/SearchResultsHeader'
import {
  SearchFilters,
  useQueryBySearchOption,
} from '@components/organisms/SearchSection/useQueryBySearchOption'
import { useTranslations } from 'next-intl'
import { Dispatch, SetStateAction, useEffect } from 'react'
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
    return <Spinner />
  }

  if (isError) {
    return <Typography type="p">Error {error.message}</Typography>
  }

  return (
    <div className="flex flex-col gap-y-8">
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
          <div className="flex flex-col gap-y-2">
            {searchResultsData
              .slice(0, variant === 'allResults' ? GENERAL_RESULTS_COUNT : undefined)
              .map((item, index) => {
                return (
                  <SearchResultCard
                    data={{ ...item }}
                    key={`item-${variant}-${searchOption.id}-${[
                      item.uniqueId,
                      item.title,
                      ...(item?.metadata ?? []),
                    ].join('')}`}
                    showBottomDivider={index < GENERAL_RESULTS_COUNT - 1}
                  />
                )
              })}
          </div>
        ) : filters.search ? (
          <Typography type="p">{t('SearchPage.noResults')}</Typography>
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

import { Typography } from '@bratislava/component-library'
import Pagination from '@bratislava/ui-bratislava/Pagination/Pagination'
import SearchResultCard from '@components/organisms/SearchPage/SearchResultCard'
import SearchResultsHeader from '@components/organisms/SearchPage/SearchResultsHeader'
import {
  SearchFilters,
  useQueryBySearchOption,
} from '@components/organisms/SearchPage/useQueryBySearchOption'
import { SearchOption } from '@components/pages/GlobalSearchPageContent'
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
}

const SearchResults = ({
  filters,
  onShowMore,
  onPageChange,
  onSetResultsCount,
  searchOption,
  variant,
}: SearchResultsProps) => {
  const t = useTranslations()

  const searchQuery = useQueryBySearchOption(searchOption.id, filters)

  // FIXME types - ts doesn't know that this can be undefined or null, I added "?? {}" manually
  const { data } = searchQuery ?? {}
  const { searchResultsData, searchResultsCount } = data ?? { searchResultsCount: 0 }

  const GENERAL_RESULTS_COUNT = 5

  useEffect(() => {
    onSetResultsCount(searchOption?.id, searchResultsCount ?? 0)
  }, [searchResultsCount])

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
            data-cy="search-section-more-button"
          />
        )}
        {searchResultsData?.length ? (
          <div className="flex flex-col gap-y-2" data-cy="search-section-results">
            {variant === 'allResults'
              ? searchResultsData.slice(0, GENERAL_RESULTS_COUNT).map((item, index) => {
                  return (
                    <SearchResultCard
                      data={{ ...item }}
                      key={`item-${variant}-${searchOption.id}-${[
                        item.title,
                        ...(item?.metadata ?? []),
                      ].join('')}`}
                      showBottomDivider={index < GENERAL_RESULTS_COUNT - 1}
                    />
                  )
                })
              : null}
            {variant === 'specificResults'
              ? searchResultsData.map((item, index) => {
                  return (
                    <SearchResultCard
                      data={{ ...item }}
                      key={`item-${variant}-${searchOption.id}-${[
                        item.title,
                        ...(item.metadata ?? []),
                      ].join('')}`}
                      showBottomDivider={index < searchResultsData.length - 1}
                    />
                  )
                })
              : null}
          </div>
        ) : filters.search ? (
          <Typography type="p">{t('SearchPage.noResults')}</Typography>
        ) : (
          /* Contacts show only for non-empty search query */
          // TODO keep this also during the first loading
          <Typography type="p">{t('SearchPage.enterSearchQuery')}</Typography>
        )}
      </div>
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
  )
}

export default SearchResults

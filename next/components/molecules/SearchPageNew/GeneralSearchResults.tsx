import { Typography } from '@bratislava/component-library'
import Pagination from '@bratislava/ui-bratislava/Pagination/Pagination'
import SearchCardComposed from '@components/molecules/SearchPageNew/SearchCardComposed'
import SearchResultsHeader from '@components/molecules/SearchPageNew/SearchResultsHeader'
import {
  SearchFilters,
  useQueryBySearchOption,
} from '@components/molecules/SearchPageNew/useQueryBySearchOption'
import { SearchOption } from '@components/pages/searchPageContentNew'
import { useTranslations } from 'next-intl'
import { Dispatch, SetStateAction, useEffect } from 'react'

type GeneralSearchResultsProps = {
  filters: SearchFilters
  variant: 'allResults' | 'specificResults'
  searchOption: SearchOption
  onSetResultsCount?: (searchOptionId: SearchOption['id'], count: number) => void
  onShowMore?: Dispatch<SetStateAction<Set<SearchOption['id']>>>
  onPageChange?: Dispatch<SetStateAction<number>>
}

const GeneralSearchResults = ({
  filters,
  onShowMore,
  onPageChange,
  onSetResultsCount,
  searchOption,
  variant,
}: GeneralSearchResultsProps) => {
  const t = useTranslations()

  const searchQuery = useQueryBySearchOption(searchOption.id, filters)

  // FIXME types - ts doesn't know that this can be undefined or null, I added "?? {}" manually
  const { data } = searchQuery ?? {}
  const { searchResultsData, searchResultsCount } = data ?? {}

  const GENERAL_RESULTS_COUNT = 5

  useEffect(() => {
    onSetResultsCount(searchOption?.id, searchResultsCount ?? 0)
  }, [searchResultsCount])

  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex flex-col gap-y-4">
        {variant === 'allResults' && (
          <SearchResultsHeader
            title={`${searchOption?.displayNamePlural}` ?? ''}
            showButton={searchResultsCount > 0}
            handleShowMore={() => {
              onShowMore(new Set([searchOption.id]))
            }}
          />
        )}
        {searchResultsData?.length > 0 ? (
          <div className="flex flex-col gap-y-2">
            {variant === 'allResults'
              ? searchResultsData.slice(0, GENERAL_RESULTS_COUNT).map((item, index) => {
                  return (
                    <SearchCardComposed
                      data={{ ...item }}
                      key={`item-${variant}-${searchOption.id}-${[
                        item.title,
                        ...item.metadata,
                      ].join('')}`}
                      showBottomDivdivider={index < GENERAL_RESULTS_COUNT - 1}
                    />
                  )
                })
              : null}
            {variant === 'specificResults'
              ? searchResultsData.map((item, index) => {
                  return (
                    <SearchCardComposed
                      data={{ ...item }}
                      key={`item-${variant}-${searchOption.id}-${[
                        item.title,
                        ...item.metadata,
                      ].join('')}`}
                      showBottomDivdivider={index < searchResultsData.length - 1}
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

export default GeneralSearchResults

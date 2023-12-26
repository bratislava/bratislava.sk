import { Typography } from '@bratislava/component-library'
import Pagination from '@bratislava/ui-bratislava/Pagination/Pagination'
import SearchCardComposed from '@components/molecules/SearchPageNew/SearchCardComposed'
import {
  getDataBySearchOptionKey,
  SearchFilters,
} from '@components/molecules/SearchPageNew/searchDataFetchers'
import SearchResultsHeader from '@components/molecules/SearchPageNew/SearchResultsHeader'
import { SearchOption } from '@components/pages/searchPageContentNew'
import { useTranslations } from 'next-intl'
import { Dispatch, SetStateAction } from 'react'

type GeneralSearchResultsProps = {
  filters: SearchFilters
  variant: 'allResults' | 'specificResults'
  searchOption: SearchOption
  onShowMore?: Dispatch<SetStateAction<Set<SearchOption['id']>>>
  onPageChange?: Dispatch<SetStateAction<number>>
}

const GeneralSearchResults = ({
  filters,
  onShowMore,
  onPageChange,
  searchOption,
  variant,
}: GeneralSearchResultsProps) => {
  const t = useTranslations()

  const { searchResultsData, searchResultsCount } = getDataBySearchOptionKey(
    searchOption.id,
    filters,
  )
  const GENERAL_RESULTS_COUNT = 5

  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex flex-col gap-y-4">
        {variant === 'allResults' && (
          <SearchResultsHeader
            title={`${searchOption?.displayNamePlural}` ?? ''}
            handleShowMore={() => {
              onShowMore(new Set([searchOption.id]))
            }}
          />
        )}
        {searchResultsData.length > 0 ? (
          <div className="flex flex-col gap-y-2">
            {variant === 'allResults'
              ? searchResultsData.slice(0, GENERAL_RESULTS_COUNT).map((item) => {
                  return (
                    <SearchCardComposed
                      data={{ ...item }}
                      tagText={searchOption.displayName}
                      variant="withPicture"
                      key={`item-${variant}-${searchOption.id}-${item.linkHref}`}
                    />
                  )
                })
              : null}
            {variant === 'specificResults'
              ? searchResultsData.map((item) => {
                  return (
                    <SearchCardComposed
                      data={{ ...item }}
                      tagText={searchOption.displayName}
                      variant="withPicture"
                      key={`item-${variant}-${searchOption.id}-${item.linkHref}`}
                    />
                  )
                })
              : null}
          </div>
        ) : (
          <Typography type="p">{t('SearchPage.noResults')}</Typography>
        )}
      </div>
      {variant === 'specificResults' && onPageChange ? (
        <div>
          <Pagination
            currentPage={filters.page}
            totalCount={
              searchResultsCount > 0 ? Math.ceil(searchResultsCount / filters.pageSize) : 1
            }
            onPageChange={(pageNumber) => {
              onPageChange(pageNumber)
              window.scrollTo({ top: 0 })
            }}
          />
        </div>
      ) : null}
    </div>
  )
}

export default GeneralSearchResults

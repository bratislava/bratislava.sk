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

  const searchQuery = useQueryBySearchOption(searchOption.id, filters)

  // FIXME types - ts doesn't know that this can be undefined or null, I added "?? {}" manually
  const { data } = searchQuery ?? {}
  const { searchResultsData, searchResultsCount } = data ?? {}

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
        {searchResultsData?.length > 0 ? (
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
        ) : filters.search ? (
          <Typography type="p">{t('SearchPage.noResults')}</Typography>
        ) : (
          /* Contacts show only for non empty search query */
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

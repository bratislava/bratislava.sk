import Pagination from '@bratislava/ui-bratislava/Pagination/Pagination'
import { SearchCardComposed } from '@components/molecules/SearchPageNew/SearchCardComposed'
import {
  getDataBySearchOptionKey,
  SearchFilters,
  SearchResult,
} from '@components/molecules/SearchPageNew/searchDataFetchers'
import { SearchResultsHeader } from '@components/molecules/SearchPageNew/SearchResultsHeader'
import { SearchOption } from '@components/pages/searchPageContentNew'
import { isDefined } from '@utils/isDefined'
import { useTranslations } from 'next-intl'

type GeneralSearchResultsProps = {
  filters: any
  variant: 'allResults' | 'specificResults'
  searchOption: SearchOption
  handleShowMore?: any
  handlePageChange?: any
}

export const GeneralSearchResults = ({
  filters,
  handleShowMore,
  handlePageChange,
  searchOption,
  variant,
}: GeneralSearchResultsProps) => {
  const t = useTranslations()

  const { hits: searchResultsHits, estimatedTotalHits } = getDataBySearchOptionKey(
    searchOption.key,
    filters,
  )
  const DEFAULT_PAGE_SIZE = 5
  const isPaginationNeeded =
    estimatedTotalHits <= DEFAULT_PAGE_SIZE && estimatedTotalHits <= filters.pageSize

  return (
    <div>
      {variant === 'allResults' && (
        <SearchResultsHeader
          title={`${searchOption?.displayNamePlural}` ?? ''}
          handleShowMore={() => {
            handleShowMore(new Set([searchOption.key]))
          }}
        />
      )}
      {searchResultsHits?.length > 0 ? (
        <div className="flex flex-col gap-y-2">
          {variant === 'allResults'
            ? searchResultsHits.slice(0, DEFAULT_PAGE_SIZE).map((item, index) => {
                return (
                  <SearchCardComposed
                    data={{ ...item }}
                    tagText={searchOption.displayName}
                    variant="withPicture"
                    key={`allResults-item${item.slug}-${index}`}
                  />
                )
              })
            : null}
          {variant === 'specificResults'
            ? searchResultsHits.map((item, index) => {
                return (
                  <SearchCardComposed
                    data={{ ...item }}
                    tagText={searchOption.displayName}
                    variant="withPicture"
                    key={`specificResults-item${item.slug}-${index}`}
                  />
                )
              })
            : null}
        </div>
      ) : (
        <p>{t('SearchPage.noResults')}</p>
      )}
      {variant === 'specificResults' && !isPaginationNeeded ? (
        <div className="mt-8">
          <Pagination
            currentPage={filters.page}
            totalCount={Math.ceil(estimatedTotalHits / filters.pageSize)}
            onPageChange={(pageNumber) => {
              if (!isDefined(handlePageChange)) return
              handlePageChange(pageNumber)
              window.scrollTo({ top: 0 })
            }}
          />
        </div>
      ) : null}
    </div>
  )
}

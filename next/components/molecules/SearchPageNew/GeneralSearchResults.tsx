import Pagination from '@bratislava/ui-bratislava/Pagination/Pagination'
import SearchCardComposed from '@components/molecules/SearchPageNew/SearchCardComposed'
import {
  getDataBySearchOptionKey,
  SearchFilters,
} from '@components/molecules/SearchPageNew/searchDataFetchers'
import { SearchResultsHeader } from '@components/molecules/SearchPageNew/SearchResultsHeader'
import { SearchOption } from '@components/pages/searchPageContentNew'
import { isDefined } from '@utils/isDefined'
import { useTranslations } from 'next-intl'

type GeneralSearchResultsProps = {
  filters: SearchFilters
  variant: 'allResults' | 'specificResults'
  searchOption: SearchOption
  handleShowMore?: React.Dispatch<React.SetStateAction<Set<SearchOption['key']>>>
  handlePageChange?: React.Dispatch<React.SetStateAction<number>>
}

const GeneralSearchResults = ({
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
    <div className="flex flex-col gap-y-8">
      <div className="flex flex-col gap-y-4">
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
      </div>
      {variant === 'specificResults' && !isPaginationNeeded ? (
        <div>
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

export default GeneralSearchResults

import { Typography } from '@bratislava/component-library'
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
  handleShowMore?: React.Dispatch<React.SetStateAction<Set<SearchOption['id']>>>
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

  const { searchResultsData, searchResultsCount } = getDataBySearchOptionKey(
    searchOption.id,
    filters,
  )
  const DEFAULT_PAGE_SIZE = 5

  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex flex-col gap-y-4">
        {variant === 'allResults' && (
          <SearchResultsHeader
            title={`${searchOption?.displayNamePlural}` ?? ''}
            handleShowMore={() => {
              handleShowMore(new Set([searchOption.id]))
            }}
          />
        )}
        {searchResultsData.length > 0 ? (
          <div className="flex flex-col gap-y-2">
            {variant === 'allResults'
              ? searchResultsData.slice(0, DEFAULT_PAGE_SIZE).map((item) => {
                  return (
                    <SearchCardComposed
                      data={{ ...item }}
                      tagText={searchOption.displayName}
                      variant="withPicture"
                      key={`item-${variant}-${searchOption.id}-${item.url}`}
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
                      key={`item-${variant}-${searchOption.id}-${item.url}`}
                    />
                  )
                })
              : null}
          </div>
        ) : (
          <Typography type="p">{t('SearchPage.noResults')}</Typography>
        )}
      </div>
      {variant === 'specificResults' ? (
        <div>
          <Pagination
            currentPage={filters.page}
            totalCount={
              searchResultsCount > 0 ? Math.ceil(searchResultsCount / filters.pageSize) : 1
            }
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

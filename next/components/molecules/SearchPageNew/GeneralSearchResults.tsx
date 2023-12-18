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

  const { dataFetcher, numberOfHits } = getDataBySearchOptionKey(searchOption.key)
  const data: SearchResult[] = dataFetcher({ ...filters })
  const totalResultsCount = numberOfHits({ ...filters })
  const RESULTS_SHOWN = 5
  const isPaginationNeeded =
    totalResultsCount <= RESULTS_SHOWN && totalResultsCount <= filters.pageSize

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
      {data?.length > 0 ? (
        <div className="flex flex-col gap-y-2">
          {variant === 'allResults'
            ? data.slice(0, RESULTS_SHOWN).map((item) => {
                return (
                  <SearchCardComposed
                    data={{ ...item }}
                    tagText={searchOption.displayName}
                    variant="withPicture"
                    key={item.slug}
                  />
                )
              })
            : null}
          {variant === 'specificResults'
            ? data.map((item) => {
                return (
                  <SearchCardComposed
                    data={{ ...item }}
                    tagText={searchOption.displayName}
                    variant="withPicture"
                    key={item.slug}
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
            totalCount={Math.ceil(totalResultsCount / filters.pageSize)}
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

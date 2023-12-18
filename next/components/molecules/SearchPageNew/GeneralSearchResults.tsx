import Pagination from '@bratislava/ui-bratislava/Pagination/Pagination'
import { SearchCardComposed } from '@components/molecules/SearchPageNew/SearchCardComposed'
import {
  getDataBySearchOptionKey,
  SearchResult,
} from '@components/molecules/SearchPageNew/searchDataFetchers'
import { SearchResultsHeader } from '@components/molecules/SearchPageNew/SearchResultsHeader'
import { SearchOption } from '@components/pages/searchPageContentNew'
import cx from 'classnames'
import { useTranslations } from 'next-intl'

type GeneralSearchResultsProps = {
  filters: any
  variant: 'basic' | 'advanced'
  searchOption: SearchOption
  handleShowMore?: any
  handlePageChange?: any
}

export const GeneralSearchResults = ({
  filters,
  handleShowMore,
  handlePageChange,
  searchOption,
  variant = 'basic',
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
      {variant === 'basic' && (
        <SearchResultsHeader
          title={`${searchOption?.displayName}` ?? ''}
          handleShowMore={() => {
            handleShowMore(new Set([searchOption.key]))
          }}
        />
      )}
      {data?.length > 0 ? (
        <div
          className={cx({
            'divide-y-2 rounded-lg border-2': variant === 'basic',
            'flex flex-col gap-y-2': variant === 'advanced',
          })}
        >
          {variant === 'basic'
            ? data.slice(0, RESULTS_SHOWN).map((item) => {
                return (
                  <SearchCardComposed
                    data={{ ...item }}
                    tagText={searchOption.displayContentType}
                    variant="default"
                    key={item.slug}
                  />
                )
              })
            : null}
          {variant === 'advanced'
            ? data.map((item) => {
                return (
                  <SearchCardComposed
                    data={{ ...item }}
                    tagText={searchOption.displayContentType}
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
      {variant === 'advanced' && !isPaginationNeeded ? (
        <div className="mt-8">
          <Pagination
            currentPage={filters.page}
            totalCount={Math.ceil(totalResultsCount / filters.pageSize)}
            onPageChange={(pageNumber) => {
              handlePageChange(pageNumber)
              window.scrollTo({ top: 0 })
            }}
          />
        </div>
      ) : null}
    </div>
  )
}

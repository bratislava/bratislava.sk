import { BlogPostsFilters } from '@backend/meili/fetchers/blogPostsFetcher'
import Pagination from '@bratislava/ui-bratislava/Pagination/Pagination'
import { SearchCardComposed } from '@components/molecules/SearchPageNew/SearchCardComposed'
import {
  getSearchBlogPostsData,
  getSearchBlogPostsTotalHits,
  getSearchInbaArticlesData,
  getSearchInbaArticlesTotalHits,
  getSearchPagesData,
  getSearchPagesTotalHits,
  getSearchUsersData,
  getSearchUsersTotalHits,
} from '@components/molecules/SearchPageNew/searchDataFetchers'
import { SearchResultsHeader } from '@components/molecules/SearchPageNew/SearchResultsHeader'
import cx from 'classnames'
import { defaultHead } from 'next/head'
import { useTranslations } from 'next-intl'

export interface GeneralSearchResultsProps {
  title?: string
  filters: any
  variant: 'basic' | 'advanced'
  searchOption?: any
  handleShowMore?: any
  handlePageChange?: any
}

const getDataBySearchParams = (optionKey: any) => {
  switch (optionKey) {
    case 'pages':
      return { dataFetcher: getSearchPagesData, numberOfHits: getSearchPagesTotalHits }

    case 'articles':
      return { dataFetcher: getSearchBlogPostsData, numberOfHits: getSearchBlogPostsTotalHits }

    case 'inbaArticles':
      return {
        dataFetcher: getSearchInbaArticlesData,
        numberOfHits: getSearchInbaArticlesTotalHits,
      }

    case 'users':
      return {
        dataFetcher: getSearchUsersData,
        numberOfHits: getSearchUsersTotalHits,
      }

    default:
      return {
        dataFetcher: getSearchInbaArticlesData,
        numberOfHits: getSearchInbaArticlesTotalHits,
      }
    // default:
    //   throw new Error(`Search option ${optionKey} not allowed as argument in getDataBySearchParams`)
  }
}

const GeneralSearchResults = ({
  filters,
  handleShowMore,
  handlePageChange,
  searchOption,
  variant = 'basic',
}: GeneralSearchResultsProps) => {
  const t = useTranslations()

  const { dataFetcher, numberOfHits } = getDataBySearchParams(searchOption.key)
  const data = dataFetcher ? dataFetcher({ ...filters }) : []
  const totalResultsCount = numberOfHits ? numberOfHits({ ...filters }) : 0
  const RESULTS_SHOWN = 5

  return (
    <div>
      {variant === 'basic' && (
        <SearchResultsHeader
          title={searchOption?.title ?? ''}
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
                  <SearchCardComposed data={{ ...item, tag: t('article') }} variant="default" />
                )
              })
            : null}
          {variant === 'advanced'
            ? data.slice(0, filters.pageSize).map((item) => {
                return (
                  <SearchCardComposed data={{ ...item, tag: t('article') }} variant="withPicture" />
                )
              })
            : null}
        </div>
      ) : (
        <p>{t('SearchPage.noResults')}</p>
      )}
      {variant === 'advanced' ? (
        <Pagination
          currentPage={filters.page}
          totalCount={Math.ceil(totalResultsCount / filters.pageSize)}
          onPageChange={(pageNumber) => {
            handlePageChange(pageNumber)
          }}
        />
      ) : null}
    </div>
  )
}

export default GeneralSearchResults

import { BlogPostsFilters } from '@backend/meili/fetchers/blogPostsFetcher'
import Pagination from '@bratislava/ui-bratislava/Pagination/Pagination'
import {
  SearchCardNew,
  SearchCardWithPictureNew,
} from '@components/molecules/SearchPageNew/SearchCardNew'
import {
  getSearchBlogPostsData,
  getSearchBlogPostsTotalHits,
} from '@components/molecules/SearchPageNew/searchDataFetchers'
import { SearchResultsHeader } from '@components/molecules/SearchPageNew/SearchResultsHeader'
import cx from 'classnames'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

interface BlogPostsResultsProps {
  title?: string
  filters: BlogPostsFilters
  variant: 'basic' | 'advanced'
  handleShowMore?: React.Dispatch<React.SetStateAction<Selection>>
  handlePageChange?: any
}

const BlogPostsResultsNew = ({
  filters,
  title,
  handleShowMore,
  handlePageChange,
  variant = 'basic',
}: BlogPostsResultsProps) => {
  const t = useTranslations()

  const data = getSearchBlogPostsData({ ...filters })
  const totalResultsCount = getSearchBlogPostsTotalHits(filters)
  const RESULTS_SHOWN = 5

  return (
    <>
      {variant === 'advanced' ? (
        <Pagination
          currentPage={filters.page}
          totalCount={Math.ceil(totalResultsCount / filters.pageSize)}
          onPageChange={(pageNumber) => {
            handlePageChange(pageNumber)
          }}
        />
      ) : null}
      <div>
        {variant === 'basic' ? (
          <SearchResultsHeader title={title ?? ''} handleShowMore={handleShowMore} />
        ) : null}
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
                    <SearchCardNew
                      title={`${item.title}`}
                      tag={t('article')}
                      slug={item.slug}
                      metadata={item.metadata}
                      key={`item-${item.title}`}
                    />
                  )
                })
              : null}
            {variant === 'advanced'
              ? data.slice(0, filters.pageSize).map((item) => {
                  return (
                    <SearchCardWithPictureNew
                      title={`${item.title}`}
                      tag={t('article')}
                      slug={item.slug}
                      metadata={item.metadata}
                      picture={item.picture}
                      key={`item-${item.title}`}
                    />
                  )
                })
              : null}
          </div>
        ) : (
          <p>{t('SearchPage.noResults')}</p>
        )}
      </div>
      {variant === 'advanced' ? (
        <Pagination
          currentPage={filters.page}
          totalCount={Math.ceil(totalResultsCount / filters.pageSize)}
          onPageChange={(pageNumber) => {
            handlePageChange(pageNumber)
          }}
        />
      ) : null}
    </>
  )
}

export default BlogPostsResultsNew

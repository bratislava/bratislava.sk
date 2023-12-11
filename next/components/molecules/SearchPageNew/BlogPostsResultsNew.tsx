import { BlogPostsFilters } from '@backend/meili/fetchers/blogPostsFetcher'
import {
  SearchCardNew,
  SearchCardWithPictureNew,
} from '@components/molecules/SearchPageNew/SearchCardNew'
import { getSearchBlogPostsData } from '@components/molecules/SearchPageNew/searchDataFetchers'
import { SearchResultsHeader } from '@components/molecules/SearchPageNew/SearchResultsHeader'
import cx from 'classnames'
import { useTranslations } from 'next-intl'

interface BlogPostsResultsProps {
  title?: string
  filters: BlogPostsFilters
  variant: 'basic' | 'advanced'
  handleShowMore?: React.Dispatch<React.SetStateAction<Selection>>
}

const BlogPostsResultsNew = ({
  filters,
  title,
  handleShowMore,
  variant = 'basic',
}: BlogPostsResultsProps) => {
  const t = useTranslations()

  const data = getSearchBlogPostsData(filters)
  const RESULTS_SHOWN = 5

  return (
    <div>
      {variant === 'basic' ? (
        <SearchResultsHeader title={title ?? ''} handleShowMore={handleShowMore} />
      ) : null}{' '}
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
                  />
                )
              })
            : null}
        </div>
      ) : (
        <p>{t('SearchPage.noResults')}</p>
      )}
    </div>
  )
}

export default BlogPostsResultsNew

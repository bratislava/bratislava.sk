import { BlogPostsFilters } from '@backend/meili/fetchers/blogPostsFetcher'
import { InbaArticlesFilters } from '@backend/meili/fetchers/inbaArticlesFetcher'
import {
  SearchCardNew,
  SearchCardWithPictureNew,
} from '@components/molecules/SearchPageNew/SearchCardNew'
import { getSearchInbaArticlesData } from '@components/molecules/SearchPageNew/searchDataFetchers'
import { SearchResultsHeader } from '@components/molecules/SearchPageNew/SearchResultsHeader'
import cx from 'classnames'
import { useTranslations } from 'next-intl'

interface InbaArticlesResultsProps {
  title?: string
  filters: InbaArticlesFilters
  variant: 'basic' | 'advanced'
  handleShowMore?: React.Dispatch<React.SetStateAction<Selection>>
}

const InbaArticlesResultsNew = ({
  filters,
  title,
  handleShowMore,
  variant = 'basic',
}: InbaArticlesResultsProps) => {
  const t = useTranslations()

  const data = getSearchInbaArticlesData(filters)
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
                    tag={t('inbaArticle')}
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
                    tag={t('inbaArticle')}
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

export default InbaArticlesResultsNew

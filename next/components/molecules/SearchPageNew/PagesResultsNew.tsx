import { PagesFilters } from '@backend/meili/fetchers/pagesFetcher'
import {
  SearchCardNew,
  SearchCardWithPictureNew,
} from '@components/molecules/SearchPageNew/SearchCardNew'
import { getSearchPagesData } from '@components/molecules/SearchPageNew/searchDataFetchers'
import { SearchResultsHeader } from '@components/molecules/SearchPageNew/SearchResultsHeader'
import cx from 'classnames'
import { useTranslations } from 'next-intl'

interface PagesResultsProps {
  title?: string
  filters: PagesFilters
  variant: 'basic' | 'advanced'
  handleShowMore?: React.Dispatch<React.SetStateAction<Selection>>
}

const PagesResultsNew = ({
  filters,
  title,
  handleShowMore,
  variant = 'basic',
}: PagesResultsProps) => {
  const t = useTranslations()

  const data = getSearchPagesData(filters)
  const RESULTS_SHOWN = 5

  return (
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
                    tag={t('website')}
                    slug={item.slug}
                    metadata={item.metadata}
                  />
                )
              })
            : null}
          {variant === 'advanced'
            ? data.slice(0, RESULTS_SHOWN).map((item) => {
                return (
                  <SearchCardWithPictureNew
                    title={`${item.title}`}
                    tag={t('website')}
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

export default PagesResultsNew

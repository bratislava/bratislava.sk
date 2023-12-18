import { SearchCardComposed } from '@components/molecules/SearchPageNew/SearchCardComposed'
// import {
//   getSearchUsersData,
//   UsersFilters,
// } from '@components/molecules/SearchPageNew/searchDataFetchers'
import { SearchResultsHeader } from '@components/molecules/SearchPageNew/SearchResultsHeader'
import cx from 'classnames'
import { useTranslations } from 'next-intl'

interface UsersResultsProps {
  title?: string
  // filters: UsersFilters
  variant: 'basic' | 'advanced'
  handleShowMore?: React.Dispatch<React.SetStateAction<Selection>>
}

const UsersResultsNew = ({ /* filters, */ title, variant, handleShowMore }: UsersResultsProps) => {
  const t = useTranslations()

  // const data = getSearchUsersData(filters)
  const RESULTS_SHOWN = 5

  return (
    <div>
      {variant === 'basic' ? (
        <SearchResultsHeader title={title ?? ''} handleShowMore={handleShowMore} />
      ) : null}
      {/* {data?.length > 0 ? (
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
                    data={{ ...item, tag: 'tag unspecified (hardcoded)' }}
                    variant="default"
                  />
                )
              })
            : null}
          {variant === 'advanced'
            ? data.slice(0, RESULTS_SHOWN).map((item) => {
                return (
                  <SearchCardComposed
                    data={{ ...item, tag: 'tag unspecified (hardcoded)' }}
                    variant="withPicture"
                  />
                )
              })
            : null}
        </div>
      ) : (
        <p>{t('SearchPage.noResults')}</p>
      )} */}
    </div>
  )
}

export default UsersResultsNew

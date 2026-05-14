import { Typography } from '@bratislava/component-library'

import { useTranslation } from '@/src/utils/useTranslation'

type Props = {
  count: number
}

/**
 * This component handles accessibility so screen readers can announce the changing number of results
 * - https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA22
 * - https://www.scottohara.me/blog/2022/02/05/dynamic-results.html
 *
 * TODO consider
 * - delaying the anncouncement for screen readers so it doesn't interrupt users as often
 * - announcing the 'no-results' state with aria-live=assertive
 */

const SearchResultsCount = ({ count }: Props) => {
  const { t } = useTranslation()

  return (
    <div role="status" aria-atomic="true">
      {count > 0 ? (
        <Typography variant="p-small">
          {t('SearchPage.showingResults', {
            // `?? 0` is here only for i18next-parser, otherwise, it doesn't create plurals
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            count: count ?? 0,
          })}
        </Typography>
      ) : (
        <div data-cy="no-search-results">
          <Typography variant="p-small">{t('SearchPage.noResults')}</Typography>
        </div>
      )}
    </div>
  )
}

export default SearchResultsCount

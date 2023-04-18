import { getPagesSwrKey, pagesFetcher, PagesFilters } from '@backend/meili/fetchers/pagesFetcher'
import { PageMeili } from '@backend/meili/types'
import { LoadingSpinner, PageCards } from '@bratislava/ui-bratislava'
import useGetSwrExtras from '@utils/useGetSwrExtras'
import { SearchResponse } from 'meilisearch'
import { useLocale, useTranslations } from 'next-intl'
import useSwr from 'swr'

import { PageCardProps } from '../../ui/PageCard/PageCard'
import LoadingOverlay from './LoadingOverlay'

interface PagesResultsProps {
  filters: PagesFilters
}

const Pages = ({ data }: { data: SearchResponse<PageMeili>; filters: PagesFilters }) => {
  const t = useTranslations()

  if (data.hits.length > 0) {
    return <PageCards pages={data.hits as PageCardProps[]} />
  }
  return <div>{t('noPagesToShow')}</div>
}

const DataWrapper = ({ filters }: { filters: PagesFilters }) => {
  const t = useTranslations()
  const locale = useLocale()

  const { data, error } = useSwr(getPagesSwrKey(filters, locale), pagesFetcher(filters, locale))
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const { dataToDisplay, loadingAndNoDataToDisplay, delayedLoading } = useGetSwrExtras({
    data,
    error,
  })

  if (loadingAndNoDataToDisplay) {
    return <LoadingSpinner />
  }

  // TODO replace by proper error
  if (error) {
    return <div className="whitespace-pre">Error: {JSON.stringify(error, null, 2)}</div>
  }

  return (
    <LoadingOverlay loading={delayedLoading}>
      <h2 className="text-h5 pb-6">{t('websites')}</h2>
      {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion,@typescript-eslint/no-non-null-assertion */}
      <Pages data={dataToDisplay!} filters={filters} />
    </LoadingOverlay>
  )
}

const PagesResults = ({ filters }: PagesResultsProps) => {
  return <DataWrapper filters={filters} />
}

export default PagesResults

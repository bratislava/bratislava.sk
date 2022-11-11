import { getPagesSwrKey, pagesFetcher, PagesFilters } from '@backend/meili/fetchers/pagesFetcher'
import { PageMeili } from '@backend/meili/types'
import { LoadingSpinner, PageCards } from '@bratislava/ui-bratislava'
import useGetSwrExtras from '@utils/useGetSwrExtras'
import { SearchResponse } from 'meilisearch'
import { useTranslation } from 'next-i18next'
import useSwr from 'swr'

import { PageCardProps } from '../../ui/PageCard/PageCard'
import LoadingOverlay from './LoadingOverlay'

interface PagesResultsProps {
  filters: PagesFilters
}

const Pages = ({ data }: { data: SearchResponse<PageMeili>; filters: PagesFilters }) => {
  const { t } = useTranslation('common')

  if (data.hits.length > 0) {
    return <PageCards pages={data.hits as PageCardProps[]} />
  }
  return <div>{t('noPagesToShow')}</div>
}

const DataWrapper = ({ filters }: { filters: PagesFilters }) => {
  const { t, i18n } = useTranslation('common')

  const { data, error } = useSwr(getPagesSwrKey(filters, i18n.language), pagesFetcher(filters, i18n.language))
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
      <h2 className="text-p1 pb-6 font-semibold">{t('websites')}</h2>
      {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion,@typescript-eslint/no-non-null-assertion */}
      <Pages data={dataToDisplay!} filters={filters} />
    </LoadingOverlay>
  )
}

const PagesResults = ({ filters }: PagesResultsProps) => {
  return <DataWrapper filters={filters} />
}

export default PagesResults

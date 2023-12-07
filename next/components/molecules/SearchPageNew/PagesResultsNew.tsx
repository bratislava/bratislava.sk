import { getPagesSwrKey, pagesFetcher, PagesFilters } from '@backend/meili/fetchers/pagesFetcher'
import { PageMeili } from '@backend/meili/types'
import { LoadingSpinner } from '@bratislava/ui-bratislava/LoadingSpinner/LoadingSpinner'
import LoadingOverlay from '@components/molecules/SearchPage/LoadingOverlay'
import { PageCardNewProps } from '@components/molecules/SearchPageNew/PageCardNew'
import { PageCardsNew } from '@components/molecules/SearchPageNew/PageCardsNew'
import useGetSwrExtras from '@utils/useGetSwrExtras'
import { SearchResponse } from 'meilisearch'
import { useLocale, useTranslations } from 'next-intl'
import useSwr from 'swr'
import { SearchCardNew } from '@components/molecules/SearchPageNew/SearchCardNew'

interface PagesResultsProps {
  filters: PagesFilters
}

const sampleData = [
  { title: 'pageTitle', url: 'www.bratislava.sk/someURL', metadata: ['meta1', 'meta2'] },
  { title: 'pageTitle', url: 'www.bratislava.sk/someURL', metadata: ['meta1', 'meta2'] },
  { title: 'pageTitle', url: 'www.bratislava.sk/someURL', metadata: ['meta1', 'meta2'] },
  { title: 'pageTitle', url: 'www.bratislava.sk/someURL', metadata: ['meta1', 'meta2'] },
  { title: 'pageTitle', url: 'www.bratislava.sk/someURL', metadata: ['meta1', 'meta2'] },
]

const PagesResultsNew = ({ filters }: PagesResultsProps) => {
  return (
    <div>
      {sampleData.map((item, index) => {
        return <SearchCardNew title={`${item.title}${index}`} />
      })}
    </div>
  )
}

export default PagesResultsNew

// const Pages = ({ data }: { data: SearchResponse<PageMeili>; filters: PagesFilters }) => {
//   const t = useTranslations()

//   if (data.hits.length > 0) {
//     return <PageCardsNew pages={data.hits as PageCardNewProps[]} />
//   }
//   return <div>{t('noPagesToShow')}</div>
// }

// const DataWrapper = ({ filters }: { filters: PagesFilters }) => {
//   const t = useTranslations()
//   const locale = useLocale()

//   const { data, error } = useSwr(getPagesSwrKey(filters, locale), pagesFetcher(filters, locale))
//   // eslint-disable-next-line @typescript-eslint/no-unsafe-call
//   const { dataToDisplay, loadingAndNoDataToDisplay, delayedLoading } = useGetSwrExtras({
//     data,
//     error,
//   })

//   if (loadingAndNoDataToDisplay) {
//     return <LoadingSpinner />
//   }

//   // TODO replace by proper error
//   if (error) {
//     return <div className="whitespace-pre">Error: {JSON.stringify(error, null, 2)}</div>
//   }

//   return (
//     <LoadingOverlay loading={delayedLoading}>
//       <h2 className="text-h5 pb-6">{t('websites')}</h2>
//       {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion,@typescript-eslint/no-non-null-assertion */}
//       <Pages data={dataToDisplay} filters={filters} />
//     </LoadingOverlay>
//   )
// }

// const PagesResultsNew = ({ filters }: PagesResultsProps) => {
//   return <DataWrapper filters={filters} />
// }

// export default PagesResultsNew

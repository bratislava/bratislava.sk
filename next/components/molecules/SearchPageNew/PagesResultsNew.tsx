import { getPagesSwrKey, pagesFetcher, PagesFilters } from '@backend/meili/fetchers/pagesFetcher'
import { PageMeili } from '@backend/meili/types'
import { LoadingSpinner } from '@bratislava/ui-bratislava/LoadingSpinner/LoadingSpinner'
import LoadingOverlay from '@components/molecules/SearchPage/LoadingOverlay'
import { PageCardNewProps } from '@components/molecules/SearchPageNew/PageCardNew'
import { PageCardsNew } from '@components/molecules/SearchPageNew/PageCardsNew'
import { SearchCardNew } from '@components/molecules/SearchPageNew/SearchCardNew'
import { SearchResultsHeader } from '@components/molecules/SearchPageNew/SearchResultsHeader'
import { formatDate } from '@utils/local-date'
import useGetSwrExtras from '@utils/useGetSwrExtras'
import { sample } from 'lodash'
import { SearchResponse } from 'meilisearch'
import { useLocale, useTranslations } from 'next-intl'
import useSwr from 'swr'

interface PagesResultsProps {
  title: string
  filters: PagesFilters
  handleShowMore: React.Dispatch<React.SetStateAction<Selection>>
}

const sampleData = [
  { title: 'pageTitle1', slug: 'www.bratislava.sk/someURL', metadata: ['meta1', 'meta2'] },
  { title: 'pageTitle2', slug: 'www.bratislava.sk/someURL', metadata: ['meta1', 'meta2'] },
  { title: 'pageTitle3', slug: 'www.bratislava.sk/someURL', metadata: ['meta1', 'meta2'] },
  { title: 'pageTitle4', slug: 'www.bratislava.sk/someURL', metadata: ['meta1', 'meta2'] },
  { title: 'pageTitle5', slug: 'www.bratislava.sk/someURL', metadata: ['meta1', 'meta2'] },
]

const PagesResultsNew = ({ filters, title, handleShowMore }: PagesResultsProps) => {
  const data = getData(filters)
  const RESULTS_SHOWN = 5

  return (
    <div>
      <SearchResultsHeader title={title} handleShowMore={handleShowMore} />
      {data?.length > 0 ? (
        <div className="divide-y-2 rounded-lg border-2">
          {data.slice(0, RESULTS_SHOWN).map((item, index) => {
            return (
              <SearchCardNew
                title={`${item.title}`}
                tag="Stránka"
                slug={item.slug}
                metadata={item.metadata}
              />
            )
          })}
        </div>
      ) : (
        <p>No results</p>
      )}
    </div>
  )
}

const getData = (filters: PagesFilters) => {
  const t = useTranslations()
  const locale = useLocale()

  const { data, error } = useSwr(getPagesSwrKey(filters, locale), pagesFetcher(filters, locale))
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const { dataToDisplay, loadingAndNoDataToDisplay, delayedLoading } = useGetSwrExtras({
    data,
    error,
  })

  const formattedData =
    data?.hits.map((page: PageMeili) => {
      return {
        title: page.title ?? 'title undefined',
        slug: page.slug ?? '',
        metadata: [page.pageCategory?.title, formatDate(page.publishedAt)] ?? [],
      }
    }) ?? []

  return formattedData ?? []

  // TODO: pridat tuto funkcionalitu
  // if (loadingAndNoDataToDisplay) {
  //   return <LoadingSpinner />
  // }

  // TODO replace by proper error
  // if (error) {
  //   return <div className="whitespace-pre">Error: {JSON.stringify(error, null, 2)}</div>
  // }
  // <LoadingOverlay loading={delayedLoading}>
  //   <h2 className="text-h5 pb-6">{t('websites')}</h2>
  //   {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion,@typescript-eslint/no-non-null-assertion */}
  //   <Pages data={dataToDisplay} filters={filters} />
  // </LoadingOverlay>
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

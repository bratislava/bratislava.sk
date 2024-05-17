import { SearchResponse } from 'meilisearch'
import { useTranslations } from 'next-intl'
import useSwr from 'swr'

import Ostatne from '@/assets/images/ostatne.svg'
import LoadingOverlay from '@/components/organisms/SearchSection/LoadingOverlay'
import LoadingSpinner from '@/components/ui/LoadingSpinner/LoadingSpinner'
import NoResultsFound from '@/components/ui/NoResultsFound/NoResultsFound'
import Pagination from '@/components/ui/Pagination/Pagination'
import RegulationListItem from '@/components/ui/RegulationListItem/RegulationListItem'
import { getVznSwrKey, vznFetcher, VznFilters } from '@/services/meili/fetchers/vznFetcher'
import { VznMeili } from '@/services/meili/types'
import DocumentListCategorysMap from '@/utils/documentListCategory'
import useGetSwrExtras from '@/utils/useGetSwrExtras'
import { isPresent } from '@/utils/utils'

const Documents = ({ data }: { data: SearchResponse<VznMeili>; filters: VznFilters }) => {
  const t = useTranslations()

  if (data.hits.length > 0) {
    return (
      <div>
        <div className="text-h4 pb-5 pt-14 font-medium lg:pb-6">{t('listOfDocuments')}</div>
        <div className="modal-content-rent mb-6 flex flex-col gap-4 md:w-auto lg:gap-6">
          {data.hits.map((vzn) => {
            const category = DocumentListCategorysMap.get(vzn.category ?? 'ostatne') ?? {
              value: 'Ostatné',
              icon: Ostatne,
            }
            return (
              <RegulationListItem
                categoryName={category.value}
                title={vzn.title ?? ''}
                key={vzn.id}
                Icon={category.icon}
                moreDocuments={[
                  ...(vzn.amedmentDocument?.map((doc) => doc.title) ?? []),
                  ...(vzn.cancellationDocument?.map((doc) => doc.title) ?? []),
                ].filter(isPresent)}
                mainDocumentHref={vzn.mainDocument?.url}
                vznMeili={vzn}
              />
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div>
      <NoResultsFound title={t('weDidntFindAnything')} message={t('tryEnteringSomethingElse')} />
    </div>
  )
}

type DocumentsResultsProps = {
  filters: VznFilters
  onPageChange: (page: number) => void
}

const RegulationsResults = ({ filters, onPageChange }: DocumentsResultsProps) => {
  const { data, error } = useSwr(getVznSwrKey(filters), vznFetcher(filters))
  const { dataToDisplay, loadingAndNoDataToDisplay, delayedLoading } = useGetSwrExtras({
    data,
    error,
  })

  if (loadingAndNoDataToDisplay) {
    return <LoadingSpinner />
  }

  /** TODO replace by proper error */
  if (error) {
    return <div className="whitespace-pre">Error: {JSON.stringify(error, null, 2)}</div>
  }

  return (
    <LoadingOverlay loading={delayedLoading}>
      <Documents
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion,@typescript-eslint/no-non-null-assertion
        data={dataToDisplay!}
        filters={filters}
      />
      {dataToDisplay?.estimatedTotalHits && (
        <Pagination
          key={filters.search}
          totalCount={Math.ceil(dataToDisplay.estimatedTotalHits / filters.pageSize)}
          currentPage={filters.page}
          onPageChange={onPageChange}
        />
      )}
    </LoadingOverlay>
  )
}

export default RegulationsResults

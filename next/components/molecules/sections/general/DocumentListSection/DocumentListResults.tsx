import { getVznSwrKey, vznFetcher, VznFilters } from '@backend/meili/fetchers/vznFetcher'
import { VznMeili } from '@backend/meili/types'
import { DocumentListItem } from '@components/ui/DocumentListItem/DocumentListItem'
import LoadingSpinner from '@components/ui/LoadingSpinner/LoadingSpinner'
import Modal from '@components/ui/Modal/Modal'
import { NoResultsFound } from '@components/ui/NoResultsFound/NoResultsFound'
import Pagination from '@components/ui/Pagination/Pagination'
import DocumentListCategorysMap from '@utils/documentListCategory'
import useGetSwrExtras from '@utils/useGetSwrExtras'
import { isPresent } from '@utils/utils'
import { SearchResponse } from 'meilisearch'
import { useTranslations } from 'next-intl'
import { Dispatch, SetStateAction, useState } from 'react'
import useSwr from 'swr'

import LoadingOverlay from '../../../SearchPage/LoadingOverlay'
import DocumentListModalBody from './DocumentListModalBody'

const Documents = ({
  data,
  setOpen,
  setActiveData,
}: {
  data: SearchResponse<VznMeili>
  filters: VznFilters
  setOpen: Dispatch<SetStateAction<boolean>>
  setActiveData: Dispatch<SetStateAction<VznMeili | null>>
}) => {
  const t = useTranslations()

  const setOpenModal = (id: string) => {
    const vznClicked = data.hits.find((vzn) => vzn.id === id) ?? null
    setActiveData(vznClicked)
    setOpen(true)
  }

  if (data.hits.length > 0) {
    return (
      <div>
        <div className="text-h4 pb-5 pt-14 font-medium lg:pb-6">{t('listOfDocuments')}</div>
        <div className="modal-content-rent mb-6 flex flex-col gap-4 md:w-auto lg:gap-6">
          {data.hits.map((vzn) => {
            const category = DocumentListCategorysMap.get(vzn.category)
            return (
              <DocumentListItem
                categoryName={category.value}
                title={vzn.title ?? ''}
                key={vzn.id}
                id={vzn.id}
                Icon={category.icon}
                moreDocuments={[
                  ...(vzn.amedmentDocument?.map((doc) => doc.title) ?? []),
                  ...(vzn.cancellationDocument?.map((doc) => doc.title) ?? []),
                ].filter(isPresent)}
                onClick={setOpenModal}
                mainDocumentHref={vzn.mainDocument?.url}
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

interface DocumentsResultsProps {
  filters: VznFilters
  onPageChange: (page: number) => void
}

const DocumentListResults = ({ filters, onPageChange }: DocumentsResultsProps) => {
  const [isOpen, setOpen] = useState(false)
  const [activeVzn, setActiveVzn] = useState<VznMeili | null>(null)

  const { data, error } = useSwr(getVznSwrKey(filters), vznFetcher(filters))
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
    <>
      <LoadingOverlay loading={delayedLoading}>
        <Documents
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion,@typescript-eslint/no-non-null-assertion
          data={dataToDisplay!}
          filters={filters}
          setOpen={setOpen}
          setActiveData={setActiveVzn}
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

      <Modal isOpen={isOpen} onClose={() => setOpen(false)} className="z-50">
        {activeVzn && <DocumentListModalBody vzn={activeVzn} />}
      </Modal>
    </>
  )
}

export default DocumentListResults

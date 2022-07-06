import { DocumentListFragment } from '@bratislava/strapi-sdk-homepage'
import { BasicSearch, DocumentListItem, Modal, NoResultsFound, Pagination } from '@bratislava/ui-bratislava'
import DocumentListCategorysMap from '@utils/documentListCategory'
import { MEILI_PAGE_SIZE, searchVZN } from '@utils/meilisearch'
import { fileCountVzns } from '@utils/utils'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import useSWR from 'swr'
import { DocumentListModalBody } from './modalBody'

export const DocumentList = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [isOpen, setOpen] = useState(false)
  const [activeData, setActiveData] = useState(null)
  const [search, setSearch] = useState('')
  const { t } = useTranslation()

  const offset = (currentPage - 1) * MEILI_PAGE_SIZE

  // TODO show loading / error state
  const { data, error } = useSWR(['vzn', search, offset], () => searchVZN(search, offset))

  const vzns = data?.hits || []
  const total = data?.nbHits || 0

  const totalPages = Math.ceil(total / MEILI_PAGE_SIZE)

  const setOpenModal = (id) => {
    const vzn = vzns.find((vzn) => vzn.id === id)
    setActiveData(vzn)
    setOpen(true)
  }

  const setCloseModal = () => {
    setOpen(false)
  }

  return (
    <div>
      <div>
        <BasicSearch
          placeholder={t('searching')}
          title={t('searching')}
          buttonText={t('search')}
          onSubmit={setSearch}
        />
      </div>
      <div className="pt-10 pb-5 text-md font-semibold">Zoznam dokumentov</div>
      {total === 0 ? (
        <NoResultsFound title={t('weDidntFindAnything')} message={t('tryEnteringSomethingElse')} />
      ) : (
        <>
          <div className="flex flex-row md:flex-col md:w-auto overflow-x-auto gap-4 modal-content-rent">
            {vzns.map((vzn) => {
              const category = DocumentListCategorysMap.get(vzn.category)
              return (
                <DocumentListItem
                  categoryName={category.value}
                  title={vzn.title}
                  key={vzn.id}
                  id={vzn.id}
                  Icon={category.icon}
                  count={fileCountVzns(vzn)}
                  onClick={setOpenModal}
                  mainDocumentHref={vzn.mainDocument?.url}
                />
              )
            })}
          </div>
          <Pagination
            key={search}
            itemsPerPage={MEILI_PAGE_SIZE}
            totalPages={totalPages}
            totalCount={total}
            currentPage={currentPage}
            pageHandler={setCurrentPage}
          />
        </>
      )}
      <Modal isOpen={isOpen} onClose={setCloseModal} className="z-50">
        <DocumentListModalBody {...activeData} />
      </Modal>
    </div>
  )
}

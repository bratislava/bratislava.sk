import DocumentDevider from '@assets/images/documentDevider.svg'
import DocumentDeviderSmall from '@assets/images/documentDevider-small.svg'
import { BasicSearch, DocumentListItem, Modal, NoResultsFound, Pagination } from '@bratislava/ui-bratislava'
import DocumentListCategorysMap from '@utils/documentListCategory'
import { MEILI_PAGE_SIZE, searchVZN } from '@utils/meili'
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
  const { data } = useSWR(['vzn', search, offset], () => searchVZN(search, offset, 16))

  const vzns = data?.hits || []
  const total = data?.estimatedTotalHits || 0

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
      {total === 0 ? (
        <NoResultsFound title={t('weDidntFindAnything')} message={t('tryEnteringSomethingElse')} />
      ) : (
        <>
          <div className="pt-14 pb-5 text-default font-medium lg:pb-6 lg:text-md">{t('listOfDocuments')}</div>
          <div className="modal-content-rent mb-6 flex flex-col gap-4 md:w-auto lg:gap-6">
            {vzns.map.length > 10 ? (
              <>
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
              </>
            ) : (
              <>
                {vzns.map((vzn, index) => {
                  const category = DocumentListCategorysMap.get(vzn.category)
                  return (
                    <>
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
                      {index === 7 ? (
                        <div className="flex items-center justify-center">
                          <DocumentDevider className="my-14 hidden xs:block lg:my-24" />
                          <DocumentDeviderSmall className="my-14 block xs:hidden lg:my-24" />{' '}
                        </div>
                      ) : (
                        ''
                      )}
                    </>
                  )
                })}
              </>
            )}

            {/* {vzns.map((vzn) => {
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
            })} */}
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

import { DocumentListFragment } from '@bratislava/strapi-sdk-homepage'
import { BasicSearch, DocumentListItem, Modal } from '@bratislava/ui-bratislava'
import DocumentListCategorysMap from '@utils/documentListCategory'
import { fileCountVzns } from '@utils/utils'
import { useState } from 'react'
import { DocumentListModalBody } from './modalBody'

export const DocumentList = ({ vzns }: Pick<DocumentListFragment, 'vzns'>) => {
  const [isOpen, setOpen] = useState(false)
  const [activeData, setActiveData] = useState(null)

  const setOpenModal = (id) => {
    const data = vzns?.data?.find((vzn) => vzn.id === id)
    setActiveData(data)
    setOpen(true)
  }

  const setCloseModal = () => {
    setOpen(false)
  }

  return (
    <div>
      <div>
        <BasicSearch placeholder="nana" title="cool" buttonText="click" />
      </div>
      <div className="pt-10 pb-5 text-md font-semibold">Zoznam dokumentov</div>
      <div className="flex flex-row md:flex-col md:w-auto overflow-x-auto gap-4 modal-content-rent">
        {vzns?.data.map((vzn) => {
          const category = DocumentListCategorysMap.get(vzn.attributes.category)
          return (
            <DocumentListItem
              categoryName={category.value}
              discription={vzn.attributes.details}
              key={vzn.id}
              id={vzn.id}
              Icon={category.icon}
              count={fileCountVzns(vzn)}
              onClick={setOpenModal}
            />
          )
        })}
      </div>
      <Modal isOpen={isOpen} onClose={setCloseModal} className="z-50">
        <DocumentListModalBody {...activeData} />
      </Modal>
    </div>
  )
}

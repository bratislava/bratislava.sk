import { Download } from '@assets/images'
import { VznMeili } from '@backend/meili/types'
import MLink from '@components/forms/simple-components/MLink'
import RegulationModalBody from '@components/molecules/sections/general/DocumentListSection/RegulationModalBody'
import Dialog from '@components/ui/ModalDialog/Dialog'
import Modal from '@components/ui/ModalDialog/Modal'
import { useTranslations } from 'next-intl'
import React from 'react'
import { Button as AriaButton, DialogTrigger } from 'react-aria-components'

type RegulationListItemProps = {
  categoryName: string
  title: string
  Icon: string
  vznMeili: VznMeili
  mainDocumentHref?: string
  moreDocuments: string[]
}

export const RegulationListItem = ({
  categoryName,
  title,
  Icon,
  vznMeili,
  moreDocuments,
  mainDocumentHref,
}: RegulationListItemProps) => {
  const t = useTranslations()

  return (
    <div className="mb-1 flex w-full flex-col overflow-hidden rounded-lg bg-white shadow-md md:flex-row">
      <div className="flex w-full flex-col md:flex-row md:items-center">
        <div className="flex p-4 pb-0 md:justify-center lg:px-12 lg:py-10">
          <Icon />
        </div>
        <div className="flex flex-[4] flex-col justify-start px-4 py-3 lg:px-8 lg:py-10 lg:pl-0">
          <div className="text-small lg:text-default">{categoryName}</div>
          <div className="text-default lg:text-large-respo line-clamp-2 font-semibold">{title}</div>
          {moreDocuments.length > 0 ? (
            <div className="text-large-respo lg:text-default pt-4">
              {t('documents')}:{' '}
              {moreDocuments.map((documentTitle, index) => (
                <span>
                  {documentTitle}
                  {index === moreDocuments.length - 1 ? '' : ', '}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
      <div className="flex shrink-0 items-center justify-between py-4 pl-5 md:grow-0 md:basis-[300px] md:justify-evenly md:px-2 md:py-11">
        <div>
          <DialogTrigger>
            {/* TODO use our Button when it's updated to work with DialogTrigger */}
            <AriaButton className="flex h-auto w-fit items-center justify-center rounded-lg border-2 border-category-700 bg-transparent px-4 py-2 text-[1rem] font-semibold leading-[1.5rem] text-gray-700 outline-offset-4 hover:border-category-600 hover:text-gray-600 focus:border-category-800 focus:text-gray-800 lg:py-3">
              {t('show')}
            </AriaButton>

            <Modal modalClassname="md:w-[740px]">
              <Dialog title={vznMeili.title ?? ''}>
                <RegulationModalBody vzn={vznMeili} />
              </Dialog>
            </Modal>
          </DialogTrigger>
        </div>

        {mainDocumentHref && (
          <div className="pr-6 text-category-600 md:pr-0 lg:text-font">
            <MLink href={mainDocumentHref} download>
              <Download />
            </MLink>
          </div>
        )}
      </div>
    </div>
  )
}

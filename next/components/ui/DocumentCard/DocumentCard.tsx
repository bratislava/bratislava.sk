import { getNumericLocalDate } from '@utils/local-date'
import { useState } from 'react'
import { getDocumentDetailURL, getDocumentFileURL, getMockedDetail } from 'services/ginis'
import useSWR from 'swr'

import ArrowRight from '../../../assets/images/arrow-right.svg'
import ChevronRight from '../../../assets/images/chevron-right-small.svg'
import Download from '../../../assets/images/download-document.svg'
import Button from '../Button/Button'
import { FileList, TFile, TFileSection } from '../FileList/FileList'
import Modal from '../Modal/Modal'
import Panel from '../Panel/Panel'

export interface DocumentCardProps {
  title: string
  id: string
  createdAt: string
  content: string
  className?: string
  viewButtonText: string
  downloadButtonText: string
}

export const DocumentCard = ({
  title,
  createdAt,
  id,
  content,
  className,
  viewButtonText,
  downloadButtonText,
}: DocumentCardProps) => {
  const [isOpen, setIsOpen] = useState(false)

  // if you need to develop this and can't connect to bratislava VPN, check out services/ginis.ts for mocks
  const { data } = useSWR(isOpen ? getDocumentDetailURL(id) : null, () =>
    fetch(getDocumentDetailURL(id)).then((res) => res.json())
  )

  const files: TFile[] =
    data?.['Soubory-dokumentu']?.map((file) => ({
      title: file.Nazev,
      media: {
        url: getDocumentFileURL(file['Id-souboru']),
        created_at: createdAt,
        // TODO figure out size
        size: 0,
        // size: Number.parseInt(file['Velikost']),
      },
    })) ?? []

  const fileSections: TFileSection[] = [
    {
      category: title,
      files,
    },
  ]

  return (
    <>
      <Panel className={className}>
        <div className="flex w-full flex-col gap-y-5 px-4 pt-6 lg:px-10 lg:pt-8 lg:pb-6">
          <div className="-mb-3 text-default font-semibold">{title}</div>
          <div className="flex flex-col gap-x-6 text-xs text-gray-dark lg:flex-row">
            <div>{createdAt}</div>
            {/* <div>{`${fileExtension}; ${fileSize}`}</div> */}
          </div>
          <div>{content}</div>
          <div className="mb-2 flex flex-row flex-col items-start gap-x-6">
            <Button
              variant="secondaryDarkText"
              className="hover:color-white w-fit px-6 py-4 text-sm font-medium shadow-none hover:bg-primary hover:text-white"
              icon={<ChevronRight />}
              hoverIcon={<ArrowRight />}
              onClick={() => setIsOpen(true)}
            >
              {viewButtonText}
            </Button>
            {/* <Button
              variant="full-transparent"
              className="px-6 py-4 text-sm font-medium shadow-none"
              icon={<Download />}
            >
              {downloadButtonText}
            </Button> */}
          </div>
        </div>
        {/* <div className="flex lg:hidden bg-red-superlight h-[86px] -mt-[86px]" /> */}
      </Panel>
      <Modal closeButtonColor="#E46054" isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="rounded-2xl bg-background px-5 py-8">
          {/* TODO handle loading/error */}
          <FileList fileSections={fileSections} noScroll />
        </div>
      </Modal>
    </>
  )
}

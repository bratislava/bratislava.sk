import Button from '../Button/Button'
import Panel from '../Panel/Panel'
import ChevronRight from '../../../assets/images/chevron-right-small.svg'
import ArrowRight from '../../../assets/images/arrow-right.svg'
import Download from '../../../assets/images/download-document.svg'
import { getNumericLocalDate } from '@utils/local-date'
import Modal from '../Modal/Modal'
import useSWR from 'swr'
import { getDocumentDetailURL, getDocumentFileURL } from 'services/ginis'
import { useState } from 'react'
import { TFile, FileList, TFileSection } from '../FileList/FileList'

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
        <div className="w-full flex flex-col pt-6 lg:pt-8 lg:pb-6 px-4 lg:px-10 gap-y-5">
          <div className="-mb-3 text-default font-semibold">{title}</div>
          <div className="flex flex-col lg:flex-row text-xs gap-x-6 text-gray-dark">
            <div>{createdAt}</div>
            {/* <div>{`${fileExtension}; ${fileSize}`}</div> */}
          </div>
          <div>{content}</div>
          <div className="flex flex-col flex-row items-start gap-x-6 mb-2">
            <Button
              variant="secondaryDarkText"
              className="px-6 py-4 text-sm font-medium shadow-none w-fit hover:bg-primary hover:text-white hover:color-white"
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

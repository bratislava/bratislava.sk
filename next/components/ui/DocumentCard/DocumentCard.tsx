// @ts-strict-ignore
import { ArrowRightIcon } from '@assets/images'
import Button from '@components/forms/simple-components/Button'
import { getDocumentDetailURL, getDocumentFileURL } from 'backend/services/ginis'
import { useState } from 'react'
import useSWR from 'swr'

import { FileList, TFile, TFileSection } from '../FileList/FileList'
import { Modal } from '../Modal/Modal'
import { Panel } from '../Panel/Panel'

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
}: DocumentCardProps) => {
  const [isOpen, setIsOpen] = useState(false)

  // if you need to develop this and can't connect to bratislava VPN, check out services/ginis.ts for mocks
  const { data } = useSWR(isOpen ? getDocumentDetailURL(id) : null, () =>
    fetch(getDocumentDetailURL(id)).then((res) => res.json()),
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
        <div className="flex w-full flex-col gap-y-5 px-5 py-6 lg:px-10 lg:py-8">
          <div className="text-large -mb-3 font-semibold">{title}</div>
          <div className="text-small flex flex-col gap-x-6 text-font/75 lg:flex-row">
            {/* TODO: Fix local date */}
            <div>{new Date(createdAt).toLocaleDateString('sk')}</div>

            {/* <div>{`${fileExtension}; ${fileSize}`}</div> */}
          </div>
          <div>{content}</div>
          <div className="flex flex-col items-start gap-x-6">
            <Button
              variant="category-outline"
              endIcon={<ArrowRightIcon />}
              onPress={() => setIsOpen(true)}
            >
              {viewButtonText}
            </Button>
            {/* TODO  download button */}
          </div>
        </div>
        {/* <div className="flex lg:hidden h-[86px] -mt-[86px]" /> */}
      </Panel>
      <Modal closeButtonColor="#E46054" isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="rounded-2xl bg-gray-50 px-5 py-8">
          {/* TODO handle loading/error */}
          <FileList fileSections={fileSections} noScroll />
        </div>
      </Modal>
    </>
  )
}

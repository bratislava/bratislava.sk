import { getDocumentDetailURL, getDocumentFileURL } from '@backend/services/ginis'
import { Typography } from '@bratislava/component-library'
import FileCard, { FileCardProps } from '@components/molecules/presentation/FileCard'
import { formatDate } from '@utils/local-date'
import { useTranslations } from 'next-intl'
import React from 'react'
import useSWR from 'swr'

type Props = {
  id: string
  createdAt: string
}

const OfficialBoardCardModalContent = ({ id, createdAt }: Props) => {
  const t = useTranslations()

  // Returns mocks for local development, check /services/ginis.ts
  const { data } = useSWR(getDocumentDetailURL(id), () =>
    fetch(getDocumentDetailURL(id)).then((res) => res.json()),
  )

  const files: FileCardProps[] =
    data?.['Soubory-dokumentu']?.map(
      (file: any): FileCardProps => ({
        title: `${file.Nazev}`,
        downloadLink: getDocumentFileURL(file['Id-souboru']),
        format: file.Pripona?.replace(/^\./, '').toUpperCase().trim(),
        size: file.Velikost, // It comes as formatted string already, e.g. "1,2 MB" or "126 KB"
        uploadDate: formatDate(createdAt),
      }),
    ) ?? []

  /* TODO handle loading/error */
  /* <FileList fileSections={fileSections} noScroll hideCategory /> */

  return (
    <>
      <Typography type="p" fontWeight="semibold" className="pb-5">
        {t('documents')}
      </Typography>
      <div className="grid grid-cols-1 gap-4">
        {files.map((fileItem) => (
          <FileCard {...fileItem} />
        ))}
      </div>
    </>
  )
}

export default OfficialBoardCardModalContent

import {
  getOfficialBoardDocumentQueryKey,
  officialBoardDocumentFetcher,
} from '@backend/ginis/fetchers/officialBoardDocumentFetcher'
import { generateUrlForOfficialBoardFile } from '@backend/ginis/utils/generateUrlForOfficialBoardFile'
import { Typography } from '@bratislava/component-library'
import FileCard, { FileCardProps } from '@components/molecules/presentation/FileCard'
import { useQuery } from '@tanstack/react-query'
import { formatDate } from '@utils/local-date'
import { useTranslations } from 'next-intl'
import React from 'react'

type Props = {
  id: string
  createdAt: string
}

const OfficialBoardCardModalContent = ({ id, createdAt }: Props) => {
  const t = useTranslations()

  const { data, isLoading, isError, error } = useQuery({
    queryKey: getOfficialBoardDocumentQueryKey(id),
    queryFn: () => officialBoardDocumentFetcher(id),
    keepPreviousData: true,
    select: (res) => res.data,
  })

  // TODO move parsing into endpoint
  const files: FileCardProps[] =
    data?.['Soubory-dokumentu']?.map(
      (file: any): FileCardProps => ({
        title: `${file.Nazev}`,
        downloadLink: generateUrlForOfficialBoardFile(file.IdSouboru, file.Nazev),
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
          <FileCard key={fileItem.downloadLink} {...fileItem} />
        ))}
      </div>
    </>
  )
}

export default OfficialBoardCardModalContent

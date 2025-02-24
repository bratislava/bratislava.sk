import React from 'react'

import { FileCardProps } from '@/components/cards/FileCard'
import FileRowCard from '@/components/cards/FileRowCard'
import { FileBlockFragment, FileItemBlockFragment } from '@/services/graphql'
import { formatDate } from '@/utils/formatDate'
import { formatFileExtension } from '@/utils/formatFileExtension'
import { formatFileSize } from '@/utils/formatFileSize'
import { useGetDownloadAriaLabel } from '@/utils/useGetDownloadAriaLabel'
import { useLocale } from '@/utils/useLocale'

export type FileCardWrapperProps = {
  fileItem: FileItemBlockFragment | FileBlockFragment
}

/**
 * Figma: https://www.figma.com/file/17wbd0MDQcMW9NbXl6UPs8/DS-ESBS%2BBK%3A-Component-library?type=design&node-id=7367-17767&t=Km8W7qXXiWIDWSYw-0
 */
const FileCardWrapper = ({ fileItem }: FileCardWrapperProps) => {
  const locale = useLocale()
  const { getDownloadAriaLabel } = useGetDownloadAriaLabel()

  if (!fileItem.media?.data?.attributes) {
    return null
  }

  const transformFileProps = (
    fileItemInner: FileItemBlockFragment | FileBlockFragment,
  ): FileCardProps => {
    const { url, ext, size, createdAt, name } = fileItemInner.media?.data?.attributes ?? {}

    return {
      title: fileItemInner.title ?? name ?? '',
      downloadLink: url,
      format: formatFileExtension(ext) ?? undefined,
      size: formatFileSize(size, locale),
      uploadDate: formatDate(createdAt),
      ariaLabel: getDownloadAriaLabel(fileItemInner),
    }
  }

  const transformedProps = transformFileProps(fileItem)

  return <FileRowCard {...transformedProps} />
}

export default FileCardWrapper

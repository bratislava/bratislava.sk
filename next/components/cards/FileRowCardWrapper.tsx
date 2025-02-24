import React from 'react'

import FileRowCard, { FileRowCardProps } from '@/components/cards/FileRowCard'
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
 * Wrapper component that transforms the fragment into the props for the FileRowCard component.
 * TODO revisit if it's needed
 *
 * Figma: https://www.figma.com/file/17wbd0MDQcMW9NbXl6UPs8/DS-ESBS%2BBK%3A-Component-library?node-id=867%3A2067&mode=dev
 */
const FileRowCardWrapper = ({ fileItem }: FileCardWrapperProps) => {
  const locale = useLocale()
  const { getDownloadAriaLabel } = useGetDownloadAriaLabel()

  if (!fileItem.media?.data?.attributes) {
    return null
  }

  const transformFileProps = (
    fileItemInner: FileItemBlockFragment | FileBlockFragment,
  ): FileRowCardProps => {
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

export default FileRowCardWrapper

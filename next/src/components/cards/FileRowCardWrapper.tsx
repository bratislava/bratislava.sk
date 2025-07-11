import React from 'react'

import FileRowCard, { FileRowCardProps } from '@/src/components/cards/FileRowCard'
import { FileBlockFragment, FileItemBlockFragment } from '@/src/services/graphql'
import { formatDate } from '@/src/utils/formatDate'
import { formatFileExtension } from '@/src/utils/formatFileExtension'
import { formatFileSize } from '@/src/utils/formatFileSize'
import { useGetDownloadAriaLabel } from '@/src/utils/useGetDownloadAriaLabel'
import { useLocale } from '@/src/utils/useLocale'

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

  if (!fileItem.media) {
    return null
  }

  const transformFileProps = (
    fileItemInner: FileItemBlockFragment | FileBlockFragment,
  ): FileRowCardProps => {
    const { url, ext, size, createdAt, name } = fileItemInner.media ?? {}

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

import { FileItemBlockFragment } from '@backend/graphql'
import FileCard, { FileCardProps } from '@components/molecules/presentation/FileCard'
import FileRowCard from '@components/molecules/presentation/FileRowCard'
import { formatFileSize } from '@utils/formatFileSize'
import { useGetDownloadAriaLabel } from '@utils/useGetDownloadAriaLabel'
import { useLocale } from 'next-intl'
import React from 'react'

export type FileCardWrapperProps = {
  fileItem: FileItemBlockFragment
  variant?: 'grid' | 'rows'
}

/**
 * Figma: https://www.figma.com/file/17wbd0MDQcMW9NbXl6UPs8/DS-ESBS%2BBK%3A-Component-library?type=design&node-id=7367-17767&t=Km8W7qXXiWIDWSYw-0
 */
const FileCardWrapper = ({ fileItem, variant = 'grid' }: FileCardWrapperProps) => {
  const locale = useLocale()
  const { getDownloadAriaLabel } = useGetDownloadAriaLabel()

  if (!fileItem.media.data?.attributes) {
    return null
  }

  const transformFileProps = (fileItemInner: FileItemBlockFragment): FileCardProps => {
    const { url, ext, size, createdAt, name } = fileItemInner.media.data?.attributes ?? {}

    return {
      title: fileItemInner.title ?? name ?? '',
      downloadLink: url,
      format: ext?.replace(/^\./, '').toUpperCase(),
      size: formatFileSize(size, locale),
      uploadDate: createdAt,
      ariaLabel: getDownloadAriaLabel(fileItemInner),
    }
  }

  const transformedProps = transformFileProps(fileItem)

  return variant === 'rows' ? (
    <FileRowCard {...transformedProps} />
  ) : (
    <FileCard {...transformedProps} />
  )
}

export default FileCardWrapper

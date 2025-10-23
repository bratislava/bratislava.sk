import { Typography } from '@bratislava/component-library'
import { useTranslation } from 'next-i18next'
import { Fragment } from 'react'

import { DocumentIcon, DownloadIcon } from '@/src/assets/icons'
import { FolderIcon } from '@/src/assets/material-icons'
import Button from '@/src/components/common/Button/Button'
import { DocumentEntityFragment } from '@/src/services/graphql'
import cn from '@/src/utils/cn'
import { formatDate } from '@/src/utils/formatDate'
import { formatFileExtension } from '@/src/utils/formatFileExtension'
import { formatFileSize } from '@/src/utils/formatFileSize'
import { isDefined } from '@/src/utils/isDefined'

type Props = {
  document: DocumentEntityFragment
}

/**
 * Figma OLO: https://www.figma.com/design/2qF09hDT9QNcpdztVMNAY4/OLO-Web?node-id=1946-18524&m=dev
 */

const DocumentPageHeader = ({ document }: Props) => {
  const { t, i18n } = useTranslation()
  const locale = i18n.language

  const { title, files, updatedAt } = document

  const filteredFiles = files.filter(isDefined) ?? []

  const formattedUpdatedAt = formatDate(updatedAt)
  const fileExtensionString = formatFileExtension(filteredFiles[0].ext)
  const fileSizeString = formatFileSize(filteredFiles[0].size, locale)

  const isSingleFile = filteredFiles.length === 1

  const metadata = (
    isSingleFile
      ? [formattedUpdatedAt, fileExtensionString, fileSizeString]
      : [
          formattedUpdatedAt,
          t('DocumentPageContent.numberOfFiles', { count: filteredFiles.length }),
        ]
  ).filter(isDefined)

  return (
    <div className={cn('relative overflow-x-clip bg-grey-100')}>
      <div className="mx-auto max-w-(--breakpoint-xl) px-4 lg:px-8">
        <div className="py-6 lg:py-8">
          <div className="flex flex-col items-start gap-4 lg:gap-6">
            <div className="rounded-2xl bg-background-passive-base p-4">
              {isSingleFile ? <DocumentIcon /> : <FolderIcon />}
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <Typography variant="h1">{title}</Typography>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
                  {metadata.map((item, index) => (
                    <Fragment key={index}>
                      {index > 0 ? (
                        <div
                          className="size-1 rounded-full bg-content-passive-secondary max-sm:hidden"
                          aria-hidden
                        />
                      ) : null}
                      <Typography>{item}</Typography>
                    </Fragment>
                  ))}
                </div>
              </div>
              {isSingleFile ? (
                <Button
                  variant="solid"
                  href={filteredFiles[0].url ?? '#'}
                  target="_blank"
                  hasLinkIcon={false}
                  startIcon={<DownloadIcon />}
                  // TODO use common function?
                  aria-label={t('FileList.aria.downloadFileAriaLabel', {
                    title: filteredFiles[0].name,
                    format: fileExtensionString,
                    size: fileSizeString,
                  })}
                >
                  {t('DocumentPageContent.downloadButtonLabel')}
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DocumentPageHeader

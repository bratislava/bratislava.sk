import { Typography } from '@bratislava/component-library'
import { useTranslation } from 'next-i18next'
import React, { Fragment } from 'react'

import DocumentRowCard from '@/src/components/cards/DocumentRowCard'
import HorizontalDivider from '@/src/components/common/Divider/HorizontalDivider'
import DocumentsAllSection from '@/src/components/sections/DocumentsAllSection'
import { DocumentsSectionFragment } from '@/src/services/graphql'
import { formatDate } from '@/src/utils/formatDate'
import { formatFileExtension } from '@/src/utils/formatFileExtension'
import { formatFileSize } from '@/src/utils/formatFileSize'
import { isDefined } from '@/src/utils/isDefined'
import { useLocale } from '@/src/utils/useLocale'

type Props = {
  section: DocumentsSectionFragment
}

/**
 * Figma OLO: https://www.figma.com/design/2qF09hDT9QNcpdztVMNAY4/OLO-Web?node-id=1932-18019&t=U7rn1Il95Xd9GkCS-0
 */
const DocumentsSection = ({ section }: Props) => {
  const { t } = useTranslation()
  const locale = useLocale()

  if (section.showAll) {
    return <DocumentsAllSection />
  }

  const { title, text, documents } = section

  const filteredDocuments = documents?.data.filter(isDefined) ?? []

  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      {title || text ? (
        <div className="flex flex-col gap-2">
          {title ? <Typography variant="h2">{title}</Typography> : null}
          {text ? <Typography variant="p-default">{text}</Typography> : null}
        </div>
      ) : null}

      <ul className="flex flex-col rounded-lg border-2 py-2">
        {filteredDocuments
          .map((document, index) => {
            if (!document.attributes) {
              return null
            }

            const {
              title: documentTitle,
              files,
              documentCategory,
              slug,
              updatedAt,
            } = document.attributes

            const filteredFiles = files.data.filter(isDefined)
            const isSingleFile = filteredFiles.length === 1

            const { size, url, ext } = filteredFiles[0].attributes ?? {}

            return (
              <Fragment key={document.id}>
                {index > 0 ? <HorizontalDivider asListItem className="mx-4 lg:mx-6" /> : null}
                <li className="w-full">
                  <DocumentRowCard
                    linkHref={isSingleFile ? (url ?? '#') : `/dokumenty/${slug}`}
                    title={documentTitle}
                    variant={isSingleFile ? 'single-file' : 'multiple-files'}
                    className="px-4 lg:px-6"
                    ariaLabel={
                      isSingleFile
                        ? t('FileList.aria.downloadFileAriaLabel', {
                            title: documentTitle,
                            format: formatFileExtension(ext),
                            size: formatFileSize(size, locale),
                          })
                        : t('DocumentsSection.openDocumentPage', { title: documentTitle })
                    }
                    metadata={
                      isSingleFile
                        ? [
                            formatDate(updatedAt),
                            documentCategory?.data?.attributes?.title,
                            formatFileExtension(ext),
                            formatFileSize(size, locale),
                          ].filter(isDefined)
                        : [
                            formatDate(updatedAt),
                            documentCategory?.data?.attributes?.title,
                            t('DocumentPageContent.numberOfFiles', { count: filteredFiles.length }),
                          ].filter(isDefined)
                    }
                  />
                </li>
              </Fragment>
            )
          })
          .filter(isDefined)}
      </ul>
    </div>
  )
}

export default DocumentsSection

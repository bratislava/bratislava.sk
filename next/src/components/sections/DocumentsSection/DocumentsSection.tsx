import { useTranslation } from 'next-i18next'
import React, { Fragment } from 'react'

import DocumentRowCard from '@/src/components/cards/DocumentRowCard'
import { getCardTitleLevel } from '@/src/components/cards/getCardTitleLevel'
import HorizontalDivider from '@/src/components/common/Divider/HorizontalDivider'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import DocumentsAll from '@/src/components/sections/DocumentsSection/DocumentsAll'
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

  const { title, text, documents, showAll, titleLevelDocumentsSection: titleLevel } = section

  if (showAll) {
    return (
      <SectionContainer>
        <DocumentsAll />
      </SectionContainer>
    )
  }

  const filteredDocuments = documents.filter(isDefined)

  return (
    <SectionContainer>
      <div className="flex flex-col gap-4 lg:gap-6">
        <SectionHeader title={title} titleLevel={titleLevel} text={text} />

        <ul className="flex flex-col rounded-lg border py-2">
          {filteredDocuments
            .map((document, index) => {
              const {
                title: documentTitle,
                files,
                documentCategory,
                slug,
                updatedAt,
                documentId,
              } = document

              const filteredFiles = files.filter(isDefined)
              const isSingleFile = filteredFiles.length === 1

              const { size, url, ext } = filteredFiles[0]

              return (
                <Fragment key={documentId}>
                  {index > 0 ? <HorizontalDivider asListItem className="mx-4 lg:mx-6" /> : null}
                  <li className="w-full">
                    <DocumentRowCard
                      linkHref={isSingleFile ? (url ?? '#') : `/dokumenty/${slug}`}
                      title={documentTitle}
                      cardTitleLevel={getCardTitleLevel(titleLevel)}
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
                              documentCategory?.title,
                              formatFileExtension(ext),
                              formatFileSize(size, locale),
                            ].filter(isDefined)
                          : [
                              formatDate(updatedAt),
                              documentCategory?.title,
                              t('DocumentPageContent.numberOfFiles', {
                                count: filteredFiles.length,
                              }),
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
    </SectionContainer>
  )
}

export default DocumentsSection

import { Typography } from '@bratislava/component-library'
import { useTranslation } from 'next-i18next'
import * as React from 'react'
import { Fragment, useMemo } from 'react'

import FileRowCard from '@/src/components/cards/FileRowCard'
import Breadcrumbs, { Breadcrumb } from '@/src/components/common/Breadcrumbs/Breadcrumbs'
import HorizontalDivider from '@/src/components/common/Divider/HorizontalDivider'
import DocumentPageHeader from '@/src/components/common/PageHeader/DocumentPageHeader'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import { useGeneralContext } from '@/src/components/providers/GeneralContextProvider'
import { DocumentEntityFragment } from '@/src/services/graphql'
import { formatDate } from '@/src/utils/formatDate'
import { formatFileExtension } from '@/src/utils/formatFileExtension'
import { formatFileSize } from '@/src/utils/formatFileSize'
import { isDefined } from '@/src/utils/isDefined'
import { getPageBreadcrumbs } from '@/src/utils/pageUtils_Deprecated'

type Props = {
  document: DocumentEntityFragment
}

/**
 * Figma OLO: https://www.figma.com/design/2qF09hDT9QNcpdztVMNAY4/OLO-Web?node-id=1748-28960&t=U7rn1Il95Xd9GkCS-0
 */
const DocumentPageContent = ({ document }: Props) => {
  const { t, i18n } = useTranslation()

  const { general } = useGeneralContext()
  const documentsPage = general?.documentsPage

  const breadcrumbs = useMemo(() => {
    return [
      ...(documentsPage ? getPageBreadcrumbs(documentsPage) : []),
      { title: document.title ?? '', path: null } as Breadcrumb,
    ]
  }, [document.title, documentsPage])

  const { description, files, documentCategory, publishedAt, updatedAt } = document

  const detailItems = [
    {
      label: t('DocumentPageContent.documentCategory'),
      value: documentCategory?.title,
    },
    {
      label: t('DocumentPageContent.publishedAt'),
      value: formatDate(publishedAt),
    },
    {
      label: t('DocumentPageContent.updatedAt'),
      value: formatDate(updatedAt),
    },
  ].filter((item) => !!item.value)

  const filteredFiles = files.filter(isDefined) ?? []

  return (
    <>
      <div className="bg-grey-100">
        <SectionContainer>
          <Breadcrumbs breadcrumbs={breadcrumbs} />
        </SectionContainer>
      </div>

      <DocumentPageHeader document={document} />

      <SectionContainer className="py-6 lg:py-12">
        <div className="flex max-w-200 flex-col gap-4 lg:gap-8">
          {filteredFiles.length > 1 ? (
            <ul className="flex flex-col rounded-lg border py-2">
              {filteredFiles.map((file, index) => (
                <Fragment key={file.documentId}>
                  {index > 0 ? <HorizontalDivider asListItem className="mx-4 lg:mx-6" /> : null}
                  <li className="w-full">
                    <FileRowCard
                      title={file.name}
                      downloadLink={file.url}
                      format={formatFileExtension(file.ext) ?? undefined}
                      size={formatFileSize(file.size, i18n.language)}
                      uploadDate={formatDate(file.createdAt)}
                      // ariaLabel={getDownloadAriaLabel(fileItemInner)}
                    />
                  </li>
                </Fragment>
              ))}
            </ul>
          ) : null}
          <div className="flex flex-col gap-8 lg:gap-10">
            <div className="flex flex-col gap-4">
              <Typography variant="h2">{t('DocumentPageContent.detailsTitle')}</Typography>
              <div className="flex flex-col gap-4">
                {detailItems.map(({ label, value }, index) => (
                  <div className="flex flex-col flex-wrap sm:flex-row sm:gap-x-6" key={index}>
                    <Typography className="basis-1/3">{`${label}:`}</Typography>
                    <Typography>{value}</Typography>
                  </div>
                ))}
              </div>
            </div>
            {description ? (
              <>
                <HorizontalDivider />
                <div className="flex flex-col gap-4">
                  <Typography variant="h2">{t('DocumentPageContent.descriptionTitle')}</Typography>
                  <Typography>{description}</Typography>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </SectionContainer>
    </>
  )
}

export default DocumentPageContent

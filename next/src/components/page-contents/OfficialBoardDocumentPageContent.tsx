import { Typography } from '@bratislava/component-library'
import React, { Fragment, ReactNode } from 'react'

import FileRowCard from '@/src/components/cards/FileRowCard'
import HorizontalDivider from '@/src/components/common/Divider/HorizontalDivider'
import PageHeader from '@/src/components/common/PageHeader/PageHeader'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import { ParsedOfficialBoardDocumentDetail } from '@/src/services/ginis/types'
import { formatDate } from '@/src/utils/formatDate'
import { useLocale } from '@/src/utils/useLocale'
import { useTranslation } from '@/src/utils/useTranslation'

type OfficialBoardDocumentPageContentProps = {
  document: ParsedOfficialBoardDocumentDetail
}

const OfficialBoardDocumentPageContent = ({ document }: OfficialBoardDocumentPageContentProps) => {
  const { t } = useTranslation()
  const locale = useLocale()

  const breadcrumbs = [
    {
      title: t('OfficialBoard.officialBoard'),
      path:
        locale === 'en'
          ? '/city-of-bratislava/transparent-city/official-noticeboard'
          : '/mesto-bratislava/transparentne-mesto/uradna-tabula',
    },
    { title: document.title, path: null },
  ]

  const dlData: { key: string; title: string; description: ReactNode }[] = [
    {
      key: 'description',
      title: t('OfficialBoard.description'),
      description: document.description,
    },
    {
      key: 'category',
      title: t('OfficialBoard.category'),
      description: document.categoryName,
    },
    {
      key: 'publishedFrom',
      title: t('OfficialBoard.publishedFrom'),
      description: formatDate(document.publishedFrom),
    },
    {
      key: 'publishedTo',
      title: t('OfficialBoard.publishedTo'),
      description: formatDate(document.publishedTo),
    },
  ]

  return (
    <>
      <PageHeader
        title={document.title}
        subtext={formatDate(document.publishedFrom)}
        breadcrumbs={breadcrumbs}
      />
      <SectionContainer className="my-8">
        <div className="mb-8 flex flex-col gap-y-12">
          <div className="flex flex-col gap-6">
            <Typography variant="h4" as="h2">
              {t('OfficialBoard.attachments')}
            </Typography>
            <ul className="flex flex-col rounded-lg border">
              {document.files.length > 0 ? (
                document.files.map((file, index) => (
                  <Fragment key={file.id}>
                    {index > 0 ? <HorizontalDivider asListItem className="mx-4 lg:mx-6" /> : null}
                    <li>
                      <FileRowCard
                        title={file.title}
                        size={file.size}
                        format="PDF"
                        downloadLink={file.generatedUrl}
                      />
                    </li>
                  </Fragment>
                ))
              ) : (
                <Typography variant="p-default">
                  {t('OfficialBoard.noAttachmentsMessage')}
                </Typography>
              )}
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <Typography variant="h4" as="h2">
              {t('OfficialBoard.details')}
            </Typography>
            <dl className="-mt-1 lg:-mt-3">
              {dlData.map((dItem) => (
                <Fragment key={dItem.key}>
                  <dt className="mt-1 font-semibold after:content-[':'] lg:float-left lg:clear-left lg:mt-3 lg:w-40">
                    {dItem.title}
                  </dt>
                  <dd className="mt-1 lg:mt-3 lg:ml-44">{dItem.description}</dd>
                </Fragment>
              ))}
            </dl>
          </div>
        </div>
      </SectionContainer>
    </>
  )
}

export default OfficialBoardDocumentPageContent

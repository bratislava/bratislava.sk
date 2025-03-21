import { Typography } from '@bratislava/component-library'
import React, { Fragment, ReactNode } from 'react'
import cn from '@/src/utils/cn'

import FileRowCard from '@/src/components/cards/FileRowCard'
import PageHeader from '@/src/components/common/PageHeader/PageHeader'
import SectionContainer from '@/src/components/common/SectionContainer/SectionContainer'
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
            <Typography type="h2" size="h4">
              {t('OfficialBoard.attachments')}
            </Typography>
            <div className="flex flex-col rounded-lg border-2 px-4">
              {document.files.length > 0 ? (
                document.files.map((file, index) => (
                  <FileRowCard
                    key={file.id}
                    title={file.title}
                    size={file.size}
                    format="PDF"
                    downloadLink={file.generatedUrl}
                    className={cn('-mx-4 px-4', {
                      '[&>*]:border-b-0': index === document.files.length - 1,
                    })}
                  />
                ))
              ) : (
                <Typography type="p">{t('OfficialBoard.noAttachmentsMessage')}</Typography>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <Typography type="h2" size="h4">
              {t('OfficialBoard.details')}
            </Typography>
            <dl className="-mt-1 lg:-mt-3">
              {dlData.map((dItem) => (
                <Fragment key={dItem.key}>
                  <dt className="mt-1 font-semibold after:content-[':'] lg:float-left lg:clear-left lg:mt-3 lg:w-40">
                    {dItem.title}
                  </dt>
                  <dd className="mt-1 lg:ml-44 lg:mt-3">{dItem.description}</dd>
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

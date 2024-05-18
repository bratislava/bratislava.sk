import { Typography } from '@bratislava/component-library'
import classNames from 'classnames'
import { useLocale, useTranslations } from 'next-intl'
import React, { Fragment, ReactNode } from 'react'

import FileRowCard from '@/components/molecules/presentation/FileRowCard'
import PageHeader from '@/components/ui/PageHeader/PageHeader'
import SectionContainer from '@/components/ui/SectionContainer/SectionContainer'
import { ParsedOfficialBoardDocumentDetail } from '@/services/ginis/types'
import { formatDate } from '@/utils/formatDate'

type OfficialBoardDocumentPageContentProps = {
  document: ParsedOfficialBoardDocumentDetail
}

const OfficialBoardDocumentPageContent = ({ document }: OfficialBoardDocumentPageContentProps) => {
  const t = useTranslations('OfficialBoard')
  const locale = useLocale()

  const breadcrumbs = [
    {
      title: t('officialBoard'),
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
      title: t('description'),
      description: document.description,
    },
    {
      key: 'category',
      title: t('category'),
      description: document.categoryName,
    },
    {
      key: 'publishedFrom',
      title: t('publishedFrom'),
      description: formatDate(document.publishedFrom),
    },
    {
      key: 'publishedTo',
      title: t('publishedTo'),
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
              {t('attachments')}
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
                    className={classNames(
                      '-mx-4 px-4',
                      index === document.files.length - 1 ? '[&>*]:border-b-0' : '',
                    )}
                  />
                ))
              ) : (
                <Typography type="p">{t('noAttachmentsMessage')}</Typography>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <Typography type="h2" size="h4">
              {t('details')}
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

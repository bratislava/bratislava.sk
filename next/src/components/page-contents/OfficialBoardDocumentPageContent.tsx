import { Typography } from '@bratislava/component-library'
import { Fragment, useMemo } from 'react'

import FileRowCard from '@/src/components/cards/FileRowCard'
import { Breadcrumb } from '@/src/components/common/Breadcrumbs/Breadcrumbs'
import { getPageBreadcrumbs } from '@/src/components/common/Breadcrumbs/getPageBreadcrumbs'
import DescriptionList, {
  DescriptionListItem,
} from '@/src/components/common/DescriptionList/DescriptionList'
import HorizontalDivider from '@/src/components/common/Divider/HorizontalDivider'
import PageHeader from '@/src/components/common/PageHeader/PageHeader'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import { useGeneralContext } from '@/src/components/providers/GeneralContextProvider'
import { ParsedOfficialBoardDocumentDetail } from '@/src/services/ginis/types'
import { formatDate } from '@/src/utils/formatDate'
import { useTranslation } from '@/src/utils/useTranslation'

type OfficialBoardDocumentPageContentProps = {
  document: ParsedOfficialBoardDocumentDetail
}

const OfficialBoardDocumentPageContent = ({ document }: OfficialBoardDocumentPageContentProps) => {
  const { t } = useTranslation()

  const { general } = useGeneralContext()
  const officialBoardPage = general?.officialBoardPage

  const breadcrumbs = useMemo(() => {
    return [
      ...(officialBoardPage ? getPageBreadcrumbs(officialBoardPage) : []),
      { title: document.title, path: null } as Breadcrumb,
    ]
  }, [document.title, officialBoardPage])

  const dlData: DescriptionListItem[] = [
    {
      key: 'description',
      label: t('OfficialBoard.description'),
      value: document.description,
    },
    {
      key: 'category',
      label: t('OfficialBoard.category'),
      value: document.categoryName,
    },
    {
      key: 'publishedFrom',
      label: t('OfficialBoard.publishedFrom'),
      value: formatDate(document.publishedFrom),
    },
    {
      key: 'publishedTo',
      label: t('OfficialBoard.publishedTo'),
      value: formatDate(document.publishedTo),
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
            <ul className="flex flex-col rounded-lg border py-2">
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
            <DescriptionList items={dlData} />
          </div>
        </div>
      </SectionContainer>
    </>
  )
}

export default OfficialBoardDocumentPageContent

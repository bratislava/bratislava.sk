import { Typography } from '@bratislava/component-library'
import React, { Fragment } from 'react'

import FileRowCard from '@/src/components/cards/FileRowCard'
import RegulationRowCard from '@/src/components/cards/RegulationRowCard'
import HorizontalDivider from '@/src/components/common/Divider/HorizontalDivider'
import MLink from '@/src/components/common/MLink/MLink'
import PageHeader from '@/src/components/common/PageHeader/PageHeader'
import RegulationDetailMessage from '@/src/components/common/Regulations/RegulationDetailMessage'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import { RegulationEntityFragment } from '@/src/services/graphql'
import { formatDate } from '@/src/utils/formatDate'
import { formatFileExtension } from '@/src/utils/formatFileExtension'
import { formatFileSize } from '@/src/utils/formatFileSize'
import { isDefined } from '@/src/utils/isDefined'
import { useLocale } from '@/src/utils/useLocale'
import { useRegulationCategoryTranslationMap } from '@/src/utils/useRegulationCategoryTranslationMap'
import { useTranslation } from '@/src/utils/useTranslation'

type RegulationPageContentProps = {
  regulation: RegulationEntityFragment
}

const RegulationPageContent = ({ regulation }: RegulationPageContentProps) => {
  const regulationShortTitle = `VZN ${regulation.regNumber}`

  const { t } = useTranslation()
  const locale = useLocale()

  const translationMap = useRegulationCategoryTranslationMap()

  const { mainDocument, attachments, regNumber, category, titleText } = regulation

  const amendments = regulation.amendments
    .filter((amendment) => isDefined(amendment))
    .sort(() => {
      return -1 // TODO now we are just reversing the order of items in strapi, but we could sort by regulation year and number
    })
  const amending = regulation.amending?.filter(isDefined)
  const cancelling = regulation.cancelling?.filter(isDefined)

  const attachmentFiles =
    attachments?.filter(isDefined).map((attachment) => {
      return {
        title: attachment.name ?? 'Príloha',
        media: attachment,
      }
    }) ?? []

  const breadcrumbs = [
    {
      title: t('Regulation.regulations'),
      path:
        locale === 'en'
          ? '/city-of-bratislava/city-administration/legislation/generally-binding-ordinances'
          : '/mesto-bratislava/sprava-mesta/legislativa-mesta/vseobecne-zavazne-nariadenia',
    },
    { title: `VZN ${regNumber}`, path: null },
  ]

  return (
    <>
      <PageHeader
        title={regulationShortTitle}
        tag={translationMap[category ?? 'ostatne']}
        subtext={titleText}
        breadcrumbs={breadcrumbs}
      />
      <SectionContainer className="my-8">
        <div className="mb-8 flex flex-col gap-y-8">
          <RegulationDetailMessage regulation={regulation} />
          <div className="flex flex-row flex-wrap gap-6">
            <div className="flex grow basis-full flex-col gap-4">
              <Typography variant="h3" as="h2">
                {t('Regulation.mainDocument')}
              </Typography>

              {/* TODO refactor to use standard component */}
              <div className="rounded-lg border py-2">
                {mainDocument ? (
                  <FileRowCard
                    key={mainDocument.documentId}
                    title={`VZN ${regNumber}`}
                    size={formatFileSize(mainDocument.size, locale)}
                    format={formatFileExtension(mainDocument.ext) ?? undefined}
                    downloadLink={mainDocument.url}
                  />
                ) : (
                  <Typography variant="p-default">
                    {t('Regulation.noAttachmentsMessage')}
                  </Typography>
                )}
              </div>
            </div>

            <div className="flex grow basis-full flex-col gap-4">
              <Typography variant="h3" as="h2">
                {t('Regulation.attachments')}
              </Typography>

              {/* TODO refactor to use standard component */}
              {attachmentFiles?.length ? (
                <ul className="rounded-lg border py-2">
                  {attachmentFiles
                    .map(({ media: attachmentMedia, title: attachmentTitle }, index) => {
                      return (
                        <Fragment key={attachmentMedia.documentId}>
                          {index > 0 ? (
                            <HorizontalDivider asListItem className="mx-4 lg:mx-6" />
                          ) : null}
                          <li>
                            <FileRowCard
                              title={attachmentTitle ?? attachmentMedia.name}
                              size={formatFileSize(attachmentMedia.size, locale)}
                              format={formatFileExtension(attachmentMedia.ext) ?? undefined}
                              downloadLink={attachmentMedia.url}
                            />
                          </li>
                        </Fragment>
                      )
                    })
                    .filter(isDefined)}
                </ul>
              ) : (
                <Typography variant="p-default">{t('Regulation.noAttachmentsMessage')}</Typography>
              )}
            </div>
          </div>
          <div className="flex w-full flex-col gap-y-4">
            <Typography variant="h3" as="h2">
              {t('Regulation.amendments')}
            </Typography>
            {amendments?.length ? (
              <ul className="flex flex-col rounded-lg border py-2">
                {amendments?.filter(isDefined).map((amendment, index) => (
                  <Fragment key={amendment.documentId}>
                    {index > 0 ? <HorizontalDivider asListItem className="mx-4 lg:mx-6" /> : null}
                    <li className="w-full">
                      <RegulationRowCard
                        title={`VZN ${amendment.regNumber}`}
                        isFullTextRegulation={amendment.isFullTextRegulation}
                        metadata={[
                          formatDate(amendment.effectiveFrom),
                          amendment.attachments.length > 0
                            ? t('Regulation.numberOfAttachments', {
                                count: amendment.attachments.length,
                              })
                            : null,
                        ].filter(isDefined)}
                        path={`/vzn/${amendment.slug}`}
                        className="px-4 lg:px-6"
                      />
                    </li>
                  </Fragment>
                ))}
              </ul>
            ) : (
              <Typography variant="p-default">{t('Regulation.noAmendmentsMessage')}</Typography>
            )}
          </div>
          <div className="flex flex-col gap-y-4">
            <Typography variant="h4" as="h2">
              {t('Regulation.influenceOnOtherRegulations')}
            </Typography>
            <div className="flex flex-col gap-2">
              <Typography variant="p-default">
                {amending?.length ? (
                  <>
                    {t('Regulation.thisRegulationAmends')}{' '}
                    {amending.map((amendedRegulation, index) => (
                      <Fragment key={amendedRegulation.documentId}>
                        <MLink href={`/vzn/${amendedRegulation.slug}`} variant="underlined-medium">
                          {`VZN ${amendedRegulation.regNumber}`}
                        </MLink>
                        {index < amending.length - 1 ? ', ' : '.'}
                      </Fragment>
                    ))}
                  </>
                ) : (
                  <>{t('Regulation.thisRegulationDoesntAmend')}</>
                )}
              </Typography>
              <Typography variant="p-default">
                {cancelling?.length ? (
                  <>
                    {t('Regulation.thisRegulationCancells')}{' '}
                    {cancelling.map((cancelledRegulation, index) => (
                      <Fragment key={cancelledRegulation.documentId}>
                        <MLink
                          href={`/vzn/${cancelledRegulation.slug}`}
                          variant="underlined-medium"
                        >
                          {`VZN ${cancelledRegulation.regNumber}`}
                        </MLink>
                        {index < cancelling.length - 1 ? ', ' : '.'}
                      </Fragment>
                    ))}
                  </>
                ) : (
                  <>{t('Regulation.thisRegulationDoesntCancell')}</>
                )}
              </Typography>
            </div>
          </div>
        </div>
      </SectionContainer>
    </>
  )
}

export default RegulationPageContent

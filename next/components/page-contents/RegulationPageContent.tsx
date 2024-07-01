import { Typography } from '@bratislava/component-library'
import React, { Fragment } from 'react'

import FileRowCard from '@/components/cards/FileRowCard'
import RegulationCard from '@/components/cards/RegulationCard/RegulationCard'
import RegulationDetailMessage from '@/components/cards/RegulationCard/RegulationDetailMessage'
import MLink from '@/components/common/MLink/MLink'
import PageHeader from '@/components/common/PageHeader/PageHeader'
import SectionContainer from '@/components/common/SectionContainer/SectionContainer'
import { RegulationEntityFragment } from '@/services/graphql'
import { formatFileExtension } from '@/utils/formatFileExtension'
import { formatFileSize } from '@/utils/formatFileSize'
import { isDefined } from '@/utils/isDefined'
import { useLocale } from '@/utils/useLocale'
import { useRegulationCategoryTranslationMap } from '@/utils/useRegulationCategoryTranslationMap'
import { useTranslation } from '@/utils/useTranslation'

type RegulationPageContentProps = {
  regulation: RegulationEntityFragment
}

const RegulationPageContent = ({ regulation }: RegulationPageContentProps) => {
  const regulationShortTitle = `VZN ${regulation.attributes?.regNumber}`

  const { t } = useTranslation()
  const locale = useLocale()

  const translationMap = useRegulationCategoryTranslationMap()

  const mainDocument = regulation.attributes?.mainDocument
  const amendments = regulation.attributes?.amendments?.data
    .filter((amendment) => isDefined(amendment))
    .sort((a, b) => {
      return -1 // TODO now we are just reversing the order of items in strapi, but we could sort by regulation year and number
    })
  const amending = regulation.attributes?.amending?.data.filter(isDefined)
  const cancelling = regulation.attributes?.cancelling?.data.filter(isDefined)

  const attachmentFiles =
    regulation.attributes?.attachments?.data.map((attachment) => {
      return {
        title: attachment.attributes?.name ?? 'Príloha',
        media: { data: attachment },
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
    { title: `VZN ${regulation.attributes?.regNumber}`, path: null },
  ]

  return (
    <>
      <PageHeader
        title={regulationShortTitle}
        tag={translationMap[regulation.attributes?.category ?? 'ostatne']}
        subtext={regulation.attributes?.titleText}
        breadcrumbs={breadcrumbs}
      />
      <SectionContainer className="my-8">
        <div className="mb-8 flex flex-col gap-y-8">
          <RegulationDetailMessage regulation={regulation} />
          <div className="flex flex-row flex-wrap gap-6">
            <div className="flex grow basis-full flex-col gap-4">
              <Typography type="h2" size="h3">
                {t('Regulation.mainDocument')}
              </Typography>

              {/* TODO refactor to use standard component */}
              <div className="rounded-lg border-2 py-2">
                {mainDocument?.data?.attributes ? (
                  <FileRowCard
                    key={mainDocument.data.id}
                    title={`VZN ${regulation.attributes?.regNumber}`}
                    size={formatFileSize(mainDocument.data.attributes.size, locale)}
                    format={formatFileExtension(mainDocument.data.attributes.ext) ?? undefined}
                    downloadLink={mainDocument.data.attributes.url}
                    hasBottomDivider={false}
                  />
                ) : (
                  <Typography type="p">{t('Regulation.noAttachmentsMessage')}</Typography>
                )}
              </div>
            </div>

            <div className="flex grow basis-full flex-col gap-4">
              <Typography type="h2" size="h3">
                {t('Regulation.attachments')}
              </Typography>

              {/* TODO refactor to use standard component */}
              {attachmentFiles?.length ? (
                <div>
                  {attachmentFiles
                    .map(({ media: attachementMedia, title: attachmentTitle }) => {
                      if (!attachementMedia.data.attributes) return null
                      return (
                        <FileRowCard
                          key={attachementMedia.data.id}
                          title={attachmentTitle ?? attachementMedia.data.attributes.name}
                          size={formatFileSize(attachementMedia.data.attributes.size, locale)}
                          format={
                            formatFileExtension(attachementMedia.data.attributes.ext) ?? undefined
                          }
                          downloadLink={attachementMedia.data.attributes.url}
                        />
                      )
                    })
                    .filter(isDefined)}
                </div>
              ) : (
                <Typography type="p">{t('Regulation.noAttachmentsMessage')}</Typography>
              )}
            </div>
          </div>
          <div className="flex w-full flex-col gap-y-4">
            <Typography type="h2" size="h3">
              {t('Regulation.amendments')}
            </Typography>
            {amendments?.length ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {amendments?.map((amendment) => {
                  return (
                    <RegulationCard
                      title={`VZN ${amendment.attributes?.regNumber ?? ''}`}
                      className="w-full"
                      key={amendment.id}
                      isUplneZnenie={amendment.attributes?.isFullTextRegulation}
                      metadata={
                        amendment.attributes?.attachments?.data.length
                          ? t('Regulation.numberOfAttachments', {
                              count: amendment.attributes?.attachments?.data.length,
                            })
                          : null
                      }
                      path={`/vzn/${amendment.attributes?.slug ?? ''}`}
                    />
                  )
                })}
              </div>
            ) : (
              <Typography type="p">{t('Regulation.noAmendmentsMessage')}</Typography>
            )}
          </div>
          <div className="flex flex-col gap-y-4">
            <Typography type="h2" size="h4">
              {t('Regulation.influenceOnOtherRegulations')}
            </Typography>
            <div className="flex flex-col gap-2">
              <Typography type="p">
                {amending?.length ? (
                  <>
                    {t('Regulation.thisRegulationAmends')}{' '}
                    {amending.map((amendedRegulation, index) => (
                      <Fragment key={amendedRegulation.id}>
                        <MLink
                          href={`/vzn/${amendedRegulation.attributes?.slug}`}
                          variant="underlined-medium"
                        >
                          {`VZN ${amendedRegulation.attributes?.regNumber}`}
                        </MLink>
                        {index < amending.length - 1 ? ', ' : '.'}
                      </Fragment>
                    ))}
                  </>
                ) : (
                  <>{t('Regulation.thisRegulationDoesntAmend')}</>
                )}
              </Typography>
              <Typography type="p">
                {cancelling?.length ? (
                  <>
                    {t('Regulation.thisRegulationCancells')}{' '}
                    {cancelling.map((cancelledRegulation, index) => (
                      <Fragment key={cancelledRegulation.id}>
                        <MLink
                          href={`/vzn/${cancelledRegulation.attributes?.slug}`}
                          variant="underlined-medium"
                        >
                          {`VZN ${cancelledRegulation.attributes?.regNumber}`}
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

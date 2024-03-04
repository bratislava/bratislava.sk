import { Enum_Componentsectionsfilelist_Variant, RegulationEntityFragment } from '@backend/graphql'
import { Enum_Componentsectionsfilelist_Variant, RegulationEntityFragment } from '@backend/graphql'
import { Typography } from '@bratislava/component-library'
import FileList from '@bratislava/ui-bratislava/FileList/FileList'
import PageHeader from '@bratislava/ui-bratislava/PageHeader/PageHeader'
import SectionContainer from '@bratislava/ui-bratislava/SectionContainer/SectionContainer'
import MLink from '@components/forms/simple-components/MLink'
import RegulationCard from '@components/molecules/presentation/RegulationCard/RegulationCard'
import RegulationDetailMessage from '@components/molecules/presentation/RegulationCard/RegulationDetailMessage'
import { isDefined } from '@utils/isDefined'
import { useLocale, useTranslations } from 'next-intl'
import React, { Fragment } from 'react'

type RegulationPageContentProps = {
  regulation: RegulationEntityFragment
}

const RegulationPageContent = ({ regulation }: RegulationPageContentProps) => {
  const regulationShortTitle = `VZN ${regulation.attributes?.regNumber}`

  const t = useTranslations('Regulation')
  const locale = useLocale()

  const mainDocument = regulation.attributes?.mainDocument
  const consolidatedDocument = regulation.attributes?.consolidatedText
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

  if (consolidatedDocument?.data)
    attachmentFiles.unshift({
      title: `${t('consolidatedText')} - ${consolidatedDocument.data.attributes?.name}`,
      media: { data: consolidatedDocument?.data },
    })

  const breadcrumbs = [
    {
      title: t('regulations'),
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
        tag={t(`category.${regulation.attributes?.category ?? 'ostatne'}`)}
        subtext={regulation.attributes?.titleText}
        breadcrumbs={breadcrumbs}
      />
      <SectionContainer className="my-8">
        <div className="mb-8 flex flex-col gap-y-8">
          <RegulationDetailMessage regulation={regulation} />
          <div className="flex flex-row flex-wrap gap-6">
            <div className="flex grow basis-full flex-col gap-4">
              <Typography type="h2" size="h3">
                {t('mainDocument')}
              </Typography>
              {mainDocument ? (
                <FileList
                  variantFileList={Enum_Componentsectionsfilelist_Variant.Rows}
                  fileSections={[
                    {
                      category: '',
                      files: [
                        {
                          title: `VZN ${regulation.attributes?.regNumber}`,
                          media: mainDocument,
                        },
                      ],
                    },
                  ]}
                  hideCategory
                  className="-mt-10"
                />
              ) : (
                <Typography type="p">{t('noAttachmentsMessage')}</Typography>
              )}
            </div>
            <div className="flex grow basis-full flex-col gap-4">
              <Typography type="h2" size="h3">
                {t('attachments')}
              </Typography>
              {attachmentFiles?.length ? (
                <FileList
                  variantFileList={Enum_Componentsectionsfilelist_Variant.Rows}
                  fileSections={[{ category: '', files: attachmentFiles }]}
                  hideCategory
                  className="-mt-10"
                />
              ) : (
                <Typography type="p">{t('noAttachmentsMessage')}</Typography>
              )}
            </div>
          </div>
          <div className="flex w-full flex-col gap-y-4">
            <Typography type="h2" size="h3">
              {t('amendments')}
            </Typography>
            {amendments?.length ? (
              <div className="grid grid-cols-4 gap-6">
                {amendments?.map((amendment) => {
                  return (
                    <RegulationCard
                      title={`VZN ${amendment.attributes?.regNumber ?? ''}`}
                      className="w-full"
                      key={amendment.id}
                      isUplneZnenie={amendment.attributes?.isFullTextRegulation}
                      path={`/vzn/${amendment.attributes?.slug ?? ''}`}
                    />
                  )
                })}
              </div>
            ) : (
              <Typography type="p">{t('noAmendmentsMessage')}</Typography>
            )}
          </div>
          <div className="flex flex-col gap-y-4">
            <Typography type="h2" size="h4">
              {t('influenceOnOtherRegulations')}
            </Typography>
            <div className="flex flex-col gap-2">
              <Typography type="p">
                {amending?.length ? (
                  <>
                    {t('thisRegulationAmends')}{' '}
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
                  <>{t('thisRegulationDoesntAmend')}</>
                )}
              </Typography>
              <Typography type="p">
                {cancelling?.length ? (
                  <>
                    {t('thisRegulationCancells')}{' '}
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
                  <>{t('thisRegulationDoesntCancell')}</>
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

import {
  Enum_Componentsectionsfilelist_Variant,
  FileItemBlockFragment,
  RegulationEntityFragment,
} from '@backend/graphql'
import { Typography } from '@bratislava/component-library'
import FileList from '@bratislava/ui-bratislava/FileList/FileList'
import PageHeader from '@bratislava/ui-bratislava/PageHeader/PageHeader'
import SectionContainer from '@bratislava/ui-bratislava/SectionContainer/SectionContainer'
import MLink from '@components/forms/simple-components/MLink'
import FileCard from '@components/molecules/presentation/FileCard'
import RegulationCard from '@components/molecules/Regulations/RegulationCard'
import RegulationDetailMessage from '@components/molecules/Regulations/RegulationDetailMessage'
import { isDefined } from '@utils/isDefined'
import { formatDate } from '@utils/local-date'
import { useLocale } from 'next-intl'
import React, { Fragment } from 'react'

type RegulationPageContentProps = {
  regulation: RegulationEntityFragment
}

const RegulationPageContent = ({ regulation }: RegulationPageContentProps) => {
  const regulationShortTitle = `VZN ${regulation.attributes?.regNumber}`

  const locale = useLocale()

  const mainDocument = regulation.attributes?.mainDocument?.data?.attributes
  const consolidatedDocument = regulation.attributes?.consolidatedText?.data?.attributes
  const amendments = regulation.attributes?.amendments?.data
    .filter((amendment) => isDefined(amendment))
    .sort((a, b) => {
      return -1 // TODO now we are just reversing the order of items in strapi, but we could sort by regulation year and number
    })
  const amending = regulation.attributes?.amending?.data.filter(isDefined)
  const cancelling = regulation.attributes?.cancelling?.data.filter(isDefined)

  const attachmentFiles: FileItemBlockFragment[] =
    regulation.attributes?.attachments?.data.map((attachment) => {
      return {
        title: attachment.attributes?.name ?? 'Príloha',
        media: { data: attachment },
      }
    }) ?? []

  const breadcrumbs = [
    {
      title: locale === 'en' ? 'Regular binding ordinances' : 'Všoebecne záväzné nariadenia',
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
        tag={regulation.attributes?.category}
        subtext={regulation.attributes?.titleText}
        breadcrumbs={breadcrumbs}
      />
      <SectionContainer className="my-8">
        <div className="mb-8 flex flex-col gap-y-8">
          <RegulationDetailMessage regulation={regulation} />
          <div className="flex flex-row flex-wrap gap-6">
            <div className="flex shrink-0 basis-[280px] flex-col gap-y-4">
              <Typography type="h2" size="h4">
                Hlavný dokument
              </Typography>
              {mainDocument ? (
                <FileCard
                  title={`VZN ${regulation.attributes?.regNumber ?? ''}`}
                  downloadLink={mainDocument.url}
                />
              ) : null}
            </div>
            <div className="flex shrink-0 basis-[280px] flex-col gap-y-4">
              <Typography type="h2" size="h4">
                Konsolidované znenie
              </Typography>
              {consolidatedDocument ? (
                <FileCard
                  title={consolidatedDocument.name}
                  downloadLink={consolidatedDocument.url}
                />
              ) : (
                <Typography type="p">K tomuto VZN neexistuje konsolidované znenie.</Typography>
              )}
            </div>
            <div className="flex grow flex-col gap-4 md:basis-[400px]">
              <Typography type="h2" size="h4">
                Prílohy
              </Typography>
              {attachmentFiles?.length ? (
                <FileList
                  variantFileList={Enum_Componentsectionsfilelist_Variant.Rows}
                  fileSections={[{ category: '', files: attachmentFiles }]}
                  hideCategory
                  className="-mt-10"
                />
              ) : (
                <Typography type="p">Toto VZN nemá prílohy.</Typography>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-y-4">
            <Typography type="h2" size="h4">
              Dodatky
            </Typography>
            {amendments?.length ? (
              <div className="flex flex-row flex-wrap gap-6 [&>*]:basis-[280px]">
                {amendments?.map((amendment) => {
                  return (
                    <RegulationCard
                      title={`VZN ${amendment.attributes?.regNumber ?? ''}`}
                      key={amendment.id}
                      isUplneZnenie={amendment.attributes?.isFullTextRegulation}
                      path={`/vzn/${amendment.attributes?.slug ?? ''}`}
                    />
                  )
                })}
              </div>
            ) : (
              <Typography type="p">K tomuto VZN neexistujú dodatky.</Typography>
            )}
          </div>
          <div className="flex flex-col gap-y-4">
            <Typography type="h2" size="h4">
              Vplyv na iné VZN
            </Typography>
            <div className="flex flex-col gap-2">
              <Typography type="p">
                {amending?.length ? (
                  <>
                    Toto VZN je dodatkom k{' '}
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
                  <> Toto VZN nie je dodatkom k žiadnemu VZN.</>
                )}
              </Typography>
              <Typography type="p">
                {cancelling?.length ? (
                  <>
                    Toto VZN zrušuje{' '}
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
                  <>Toto VZN nezrušuje žiadne VZN.</>
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

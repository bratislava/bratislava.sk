import {
  Enum_Componentsectionsfilelist_Variant,
  FileItemBlockFragment,
  RegulationEntityFragment,
} from '@backend/graphql'
import { Typography } from '@bratislava/component-library'
import FileList from '@bratislava/ui-bratislava/FileList/FileList'
import MLink from '@components/forms/simple-components/MLink'
import FileCard from '@components/molecules/presentation/FileCard'
import RegulationCard from '@components/molecules/Regulations/RegulationCard'
import RegulationDetailMessage from '@components/molecules/Regulations/RegulationDetailMessage'
import { isDefined } from '@utils/isDefined'
import { formatDate } from '@utils/local-date'
import React, { Fragment } from 'react'

type RegulationDetailPageContentProps = {
  regulation: RegulationEntityFragment
}

const RegulationDetailPageContent = ({ regulation }: RegulationDetailPageContentProps) => {
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

  return (
    <div className="mb-8 flex flex-col gap-y-8">
      <div className="flex flex-col gap-y-2">
        <Typography type="h2" size="h4">
          Dátum účinnosti
        </Typography>
        <Typography type="p">{formatDate(regulation.attributes?.effectiveFrom)}</Typography>
      </div>
      <RegulationDetailMessage regulation={regulation} />
      <div className="flex flex-row flex-wrap gap-6">
        <div className="flex shrink-0 basis-[280px] flex-col gap-y-4">
          <Typography type="h2" size="h4">
            Hlavný dokument
          </Typography>
          {mainDocument ? (
            <FileCard
              title={`VZN ${regulation.attributes?.regNumber}`}
              downloadLink={mainDocument.url}
            />
          ) : null}
        </div>
        <div className="flex shrink-0 basis-[280px] flex-col gap-y-4">
          <Typography type="h2" size="h4">
            Konsolidované znenie
          </Typography>
          {consolidatedDocument ? (
            <FileCard title={consolidatedDocument.name} downloadLink={consolidatedDocument.url} />
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
          <span>
            <Typography type="p">
              Toto VZN
              {amending?.length ? (
                <>
                  je dodatkom k
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
                <>nie je dodatkom žiadneho VZN.</>
              )}
            </Typography>
          </span>
          <Typography type="p">
            Toto VZN
            {cancelling?.length ? (
              <>
                zrušuje
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
              <>nezrušuje žiadne VZN.</>
            )}
          </Typography>
        </div>
      </div>
    </div>
  )
}

export default RegulationDetailPageContent

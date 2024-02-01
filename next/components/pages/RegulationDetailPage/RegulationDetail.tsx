import {
  Enum_Componentsectionsfilelist_Variant,
  FileItemBlockFragment,
  RegulationTest1EntityFragment,
} from '@backend/graphql'
import { Typography } from '@bratislava/component-library'
import FileList from '@bratislava/ui-bratislava/FileList/FileList'
import Markdown from '@components/atoms/Markdown'
import Alert from '@components/forms/info-components/Alert'
import MLink from '@components/forms/simple-components/MLink'
import FileCard from '@components/molecules/presentation/FileCard'
import parseRegulationCodeFromTitle from '@components/pages/RegulationDetailPage/parseRegulationCodeFromTitle'
import RegulationCard from '@components/pages/RegulationDetailPage/RegulationCard'
import { isDefined } from '@utils/isDefined'
import { formatDate } from '@utils/local-date'
import React from 'react'

type RegulationDetailProps = {
  regulation: RegulationTest1EntityFragment
}

const RegulationDetail = ({ regulation }: RegulationDetailProps) => {
  const mainDocument = regulation.attributes?.mainDocument?.data?.attributes
  const consolidatedDocument = regulation.attributes?.consolidatedText?.data?.attributes
  const amendments = regulation.attributes?.amendments?.data.filter(
    (amendment): amendment is RegulationTest1EntityFragment => isDefined(amendment),
  )
  const amending = regulation.attributes?.amending?.data.filter(isDefined)
  const cancellation = regulation.attributes?.cancellation?.data
  const cancelling = regulation.attributes?.cancelling?.data.filter(isDefined)

  const attachmentFiles: FileItemBlockFragment[] =
    regulation.attributes?.attachments?.data.map((attachment) => {
      return {
        title: attachment.attributes?.name ?? 'Príloha',
        media: { data: attachment },
      }
    }) ?? []

  const isCancelled = isDefined(cancellation)

  const cancelledAmendees = amending?.filter((amendee) => amendee.attributes?.cancellation?.data)
  const isAmendeningCancelled = cancelledAmendees?.length

  const getPathByRegulation = (regulation: RegulationTest1EntityFragment): string => {
    if (!regulation?.id) return ''
    return `/vzn/${regulation.id}`
  }

  /* TODO As a temporary solution, we use alert incorrectly here, as its content should receive only string,
   * but we need the ability to use bold text and links in the content.
   * A new component may be designed for this purpose.
   */

  const alertProps = {
    type: isCancelled ? 'error' : isAmendeningCancelled ? 'warning' : 'success',
    message: isCancelled ? 'Zrušené' : isAmendeningCancelled ? 'Dopĺňa zrušené VZN' : 'Platné',
    content: isCancelled ? (
      <Typography type="p" className="whitespace-normal">
        Toto VZN bolo zrušené všeobecne záväzným nariadením{' '}
        <MLink
          variant="underlined-medium"
          className="whitespace-nowrap"
          href={getPathByRegulation(cancellation)}
        >
          {parseRegulationCodeFromTitle(cancellation?.attributes?.title).code}
        </MLink>{' '}
        od dňa{' '}
        <span className="font-semibold">{formatDate(cancellation?.attributes?.validFrom)}</span>.
      </Typography>
    ) : isAmendeningCancelled ? (
      <Typography type="p" className="whitespace-normal">
        Toto VZN je dodatkom k nariadeniu{' '}
        <MLink
          variant="underlined-medium"
          className="whitespace-nowrap"
          href={getPathByRegulation(cancelledAmendees[0])}
        >
          {
            parseRegulationCodeFromTitle(
              amending?.find((amended) => amended.attributes?.cancellation?.data)?.attributes
                ?.title,
            ).code
          }
        </MLink>
        , ktoré bolo zrušené nariadením{' '}
        <MLink
          variant="underlined-medium"
          className="whitespace-nowrap"
          href={getPathByRegulation(cancelledAmendees[0].attributes.cancellation.data)}
        >
          {
            parseRegulationCodeFromTitle(
              amending?.find((amended) => amended.attributes?.cancellation?.data)?.attributes
                ?.cancellation?.data?.attributes?.title,
            ).code
          }
        </MLink>{' '}
        s účinnosťou od{' '}
        <span className="font-semibold">
          {formatDate(
            amending?.find((amended) => amended.attributes?.cancellation?.data)?.attributes
              ?.cancellation?.data?.attributes?.validFrom,
          )}
        </span>
        .
      </Typography>
    ) : (
      <Typography type="p" className="whitespace-normal">
        Toto VZN je aktuálne platné, s dátumom účinnosti od{' '}
        <span className="font-semibold">{formatDate(regulation.attributes?.validFrom)}</span>.
      </Typography>
    ),
    button: isCancelled ? { title: 'Zobraziť zrušujúce VZN', handler: () => {} } : null,
  }

  return (
    <div className="mb-8 flex flex-col gap-y-8">
      {/* TODO use something else than alert */}
      <Alert
        type={alertProps.type as any}
        message={alertProps.message}
        variant="message"
        content={alertProps.content as any}
        // workaround for width, so it fits to grid
        className="lg:max-w-[584px] "
      />
      <div className="flex flex-row flex-wrap gap-6">
        <div className="flex shrink-0 basis-[280px] flex-col gap-y-4">
          <Typography type="h2" size="h4">
            Hlavný dokument
          </Typography>
          {mainDocument ? (
            <FileCard
              title={parseRegulationCodeFromTitle(mainDocument.name).code}
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
                  title={parseRegulationCodeFromTitle(amendment.attributes?.title).code}
                  path={getPathByRegulation(amendment)}
                />
              )
            })}
          </div>
        ) : (
          <Typography type="p">K tomuto VZN neexistujú dodatky.</Typography>
        )}
      </div>
      {regulation.attributes?.details ? (
        <div className="flex flex-col gap-y-4">
          <Typography type="h2" size="h4">
            Detail
          </Typography>
          <Markdown content={regulation.attributes?.details ?? ''} />
        </div>
      ) : null}
      <div className="flex flex-col gap-y-4">
        <Typography type="h2" size="h4">
          Vplyv na iné VZN
        </Typography>
        <div className="flex flex-col gap-2">
          <span>
            <Typography type="p">
              Toto VZN{' '}
              {amending?.length ? (
                <>
                  je dodatkom k{' '}
                  {amending.map((amendedRegulation, index) => (
                    <>
                      <MLink
                        href={getPathByRegulation(amendedRegulation)}
                        variant="underlined-medium"
                      >
                        {parseRegulationCodeFromTitle(amendedRegulation.attributes?.title).code}
                      </MLink>
                      {index < amending.length - 1 ? ', ' : '.'}
                    </>
                  ))}
                </>
              ) : (
                <>nie je dodatkom žiadneho VZN.</>
              )}
            </Typography>
          </span>
          <Typography type="p">
            Toto VZN{' '}
            {cancelling?.length ? (
              <>
                zrušuje{' '}
                {cancelling.map((cancelledRegulation, index) => (
                  <>
                    <MLink
                      href={getPathByRegulation(cancelledRegulation)}
                      variant="underlined-medium"
                    >
                      {parseRegulationCodeFromTitle(cancelledRegulation.attributes?.title).code}
                    </MLink>
                    {index < cancelling.length - 1 ? ', ' : '.'}
                  </>
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

export default RegulationDetail

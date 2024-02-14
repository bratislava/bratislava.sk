import {
  Enum_Componentsectionsfilelist_Variant,
  FileItemBlockFragment,
  RegulationEntityFragment,
} from '@backend/graphql'
import { Typography } from '@bratislava/component-library'
import FileList from '@bratislava/ui-bratislava/FileList/FileList'
import Alert from '@components/forms/info-components/Alert'
import MLink from '@components/forms/simple-components/MLink'
import FileCard from '@components/molecules/presentation/FileCard'
import RegulationCard from '@components/molecules/presentation/RegulationCard'
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
      // TODO now we are just reversing the order of items in strapi, but we could sort by regulation year and number
      return -1
    })
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

  /* TODO As a temporary solution, we use alert incorrectly here, as its content should receive only string,
   * but we need the ability to use bold text and links in the content.
   * A new component may be designed for this purpose.
   */

  const alertProps = {
    type: isCancelled ? 'error' : isAmendeningCancelled ? 'warning' : 'success',
    message: isCancelled ? 'Zrušené' : isAmendeningCancelled ? 'Dopĺňa neplatné VZN' : 'Platné',
    content: isCancelled ? (
      <Typography type="p" className="whitespace-normal">
        Toto VZN bolo zrušené všeobecne záväzným nariadením{' '}
        <MLink
          variant="underlined-medium"
          className="whitespace-nowrap"
          href={`/vzn/${cancellation?.attributes?.slug}`}
        >
          VZN {cancellation.attributes?.regNumber}
        </MLink>{' '}
        od dňa{' '}
        <span className="font-semibold">{formatDate(cancellation?.attributes?.effectiveFrom)}</span>
        .{' '}
      </Typography>
    ) : isAmendeningCancelled ? (
      <Typography type="p" className="whitespace-normal">
        Toto VZN je dodatkom{' '}
        {cancelledAmendees.map((cancelledAmendee, index) => {
          return (
            <Fragment key={cancelledAmendee.id}>
              {' '}
              {index === 0 ? ' k ' : index === cancelledAmendees.length - 1 ? ' a k ' : ', k '}{' '}
              <MLink
                variant="underlined-medium"
                className="whitespace-nowrap"
                href={`/vzn/${cancelledAmendee.attributes?.slug}`}
              >
                {' '}
                VZN {cancelledAmendee.attributes?.regNumber}
              </MLink>
              , ktoré bolo zrušené nariadením{' '}
              <MLink
                variant="underlined-medium"
                className="whitespace-nowrap"
                href={`/vzn/${cancelledAmendee.attributes?.cancellation?.data?.attributes?.slug}`}
              >
                {' '}
                VZN {cancelledAmendee.attributes?.cancellation?.data?.attributes?.regNumber ?? ''}
              </MLink>{' '}
              s účinnosťou od{' '}
              <span className="font-semibold">
                {' '}
                {formatDate(
                  amending?.find((amended) => amended.attributes?.cancellation?.data)?.attributes
                    ?.cancellation?.data?.attributes?.effectiveFrom,
                )}
              </span>
            </Fragment>
          )
        })}
        .{' '}
      </Typography>
    ) : (
      <Typography type="p" className="whitespace-normal">
        Toto VZN je aktuálne platné, s dátumom účinnosti od{' '}
        <span className="font-semibold">{formatDate(regulation.attributes?.effectiveFrom)}</span>.{' '}
      </Typography>
    ),
    button: isCancelled ? { title: 'Zobraziť zrušujúce VZN', handler: () => {} } : null,
  }

  return (
    <div className="mb-8 flex flex-col gap-y-8">
      {/* TODO use something else than alert */}{' '}
      <div className="flex flex-col gap-y-2">
        {' '}
        <Typography type="h2" size="h4">
          Dátum účinnosti{' '}
        </Typography>
        <Typography type="p">{formatDate(regulation.attributes?.effectiveFrom)}</Typography>{' '}
      </div>{' '}
      {isCancelled || isAmendeningCancelled ? (
        <Alert
          type={alertProps.type as any}
          message={alertProps.message}
          variant="message"
          content={alertProps.content as any} // workaround for width, so it fits to implied grid
          className="lg:max-w-[584px] "
        />
      ) : null}{' '}
      <div className="flex flex-row flex-wrap gap-6">
        {' '}
        <div className="flex shrink-0 basis-[280px] flex-col gap-y-4">
          {' '}
          <Typography type="h2" size="h4">
            Hlavný dokument{' '}
          </Typography>{' '}
          {mainDocument ? (
            <FileCard
              title={`VZN ${regulation.attributes?.regNumber}`}
              downloadLink={mainDocument.url}
            />
          ) : null}{' '}
        </div>{' '}
        <div className="flex shrink-0 basis-[280px] flex-col gap-y-4">
          {' '}
          <Typography type="h2" size="h4">
            Konsolidované znenie{' '}
          </Typography>{' '}
          {consolidatedDocument ? (
            <FileCard title={consolidatedDocument.name} downloadLink={consolidatedDocument.url} />
          ) : (
            <Typography type="p">K tomuto VZN neexistuje konsolidované znenie.</Typography>
          )}{' '}
        </div>{' '}
        <div className="flex grow flex-col gap-4 md:basis-[400px]">
          {' '}
          <Typography type="h2" size="h4">
            Prílohy{' '}
          </Typography>{' '}
          {attachmentFiles?.length ? (
            <FileList
              variantFileList={Enum_Componentsectionsfilelist_Variant.Rows}
              fileSections={[{ category: '', files: attachmentFiles }]}
              hideCategory
              className="-mt-10"
            />
          ) : (
            <Typography type="p">Toto VZN nemá prílohy.</Typography>
          )}{' '}
        </div>{' '}
      </div>{' '}
      <div className="flex flex-col gap-y-4">
        {' '}
        <Typography type="h2" size="h4">
          Dodatky{' '}
        </Typography>{' '}
        {amendments?.length ? (
          <div className="flex flex-row flex-wrap gap-6 [&>*]:basis-[280px]">
            {' '}
            {amendments?.map((amendment) => {
              return (
                <RegulationCard
                  title={`VZN ${amendment.attributes?.regNumber}`}
                  key={amendment.id} // TODO simplify by isUplneZnenie field in Strapi
                  isUplneZnenie={amendment.attributes?.isFullTextRegulation}
                  path={`/vzn/${amendment.attributes?.slug}`}
                />
              )
            })}{' '}
          </div>
        ) : (
          <Typography type="p">K tomuto VZN neexistujú dodatky.</Typography>
        )}{' '}
      </div>{' '}
      <div className="flex flex-col gap-y-4">
        {' '}
        <Typography type="h2" size="h4">
          Vplyv na iné VZN{' '}
        </Typography>{' '}
        <div className="flex flex-col gap-2">
          {' '}
          <span>
            {' '}
            <Typography type="p">
              Toto VZN{' '}
              {amending?.length ? (
                <>
                  je dodatkom k{' '}
                  {amending.map((amendedRegulation, index) => (
                    <Fragment key={amendedRegulation.id}>
                      {' '}
                      <MLink
                        href={`/vzn/${amendedRegulation.attributes?.slug}`}
                        variant="underlined-medium"
                      >
                        {' '}
                        {`VZN ${amendedRegulation.attributes?.regNumber}`}
                      </MLink>
                      {index < amending.length - 1 ? ', ' : '.'}{' '}
                    </Fragment>
                  ))}{' '}
                </>
              ) : (
                <>nie je dodatkom žiadneho VZN.</>
              )}{' '}
            </Typography>{' '}
          </span>{' '}
          <Typography type="p">
            Toto VZN{' '}
            {cancelling?.length ? (
              <>
                zrušuje{' '}
                {cancelling.map((cancelledRegulation, index) => (
                  <Fragment key={cancelledRegulation.id}>
                    {' '}
                    <MLink
                      href={`/vzn/${cancelledRegulation.attributes?.slug}`}
                      variant="underlined-medium"
                    >
                      {' '}
                      {`VZN ${cancelledRegulation.attributes?.regNumber}`}
                    </MLink>
                    {index < cancelling.length - 1 ? ', ' : '.'}{' '}
                  </Fragment>
                ))}{' '}
              </>
            ) : (
              <>nezrušuje žiadne VZN.</>
            )}{' '}
          </Typography>{' '}
        </div>{' '}
      </div>{' '}
    </div>
  )
}

export default RegulationDetailPageContent

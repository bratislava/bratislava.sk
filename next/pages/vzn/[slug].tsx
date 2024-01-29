/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { ParsedUrlQuery } from 'node:querystring'

import { RegulationTest1EntityFragment } from '@backend/graphql'
import { client } from '@backend/graphql/gql'
import BasePageLayout from '@components/layouts/PageLayout'
import FileCard from '@components/molecules/presentation/FileCard'
import PageHeader from '@components/ui/PageHeader/PageHeader'
import { SectionContainer } from '@components/ui/SectionContainer/SectionContainer'
import { getNumericLocalDate } from '@utils/local-date'
import { isPresent } from '@utils/utils'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useTranslations } from 'next-intl'
import * as React from 'react'
import ReactMarkdown from 'react-markdown'

export const getStaticPaths: GetStaticPaths<StaticParams> = async () => {
  let paths: { params: { slug: string } }[] = []
  // if (shouldSkipStaticPaths()) return { paths, fallback: 'blocking' }

  let defaultStart = 0
  // Fetch all pages to prerender
  const allRegulations: RegulationTest1EntityFragment[] = []

  while (defaultStart !== 0) {
    // eslint-disable-next-line no-await-in-loop
    const { regulationtest1S: regulations } = await client.allRegulationTest1s()
    if (regulations) {
      allRegulations.push(...regulations.data)
    }
    if (regulations?.data.length === 0) {
      defaultStart = 0
      break
    }
    defaultStart += 1
  }

  if (allRegulations) {
    paths = allRegulations
      .map(({ id }) => {
        if (id)
          return {
            params: {
              slug: id,
            },
          }
        return null
      })
      .filter(isPresent)
  }

  console.log(`GENERATED STATIC PATHS FOR ${paths.length} SLUGS`)
  return { paths, fallback: 'blocking' }
}

interface StaticParams extends ParsedUrlQuery {
  slug: string
}

export const getStaticProps: GetStaticProps<RegulationPageProps, StaticParams> = async (ctx) => {
  console.log(`Revalidating ${ctx}`)
  const locale = ctx.locale ?? 'sk'
  const slug = ctx.params?.slug ?? ''

  const { regulationtest1 } = await client.RegulationById({ id: slug })

  if (!regulationtest1?.data) {
    return {
      notFound: true,
    } as const
  }

  return {
    props: {
      id: slug,
      regulationtest1: regulationtest1.data,
    },
    revalidate: 14_400, // revalidate after 4 hours
  }
}

type RegulationDocument = any

const DocumentSection = ({
  title,
  documents,
}: {
  title: string
  documents: ({ titleToDisplay: string } & RegulationDocument)[]
}) => {
  return (
    <div className="">
      <h2 className="pb-4 font-semibold">{title}</h2>
      <div className="flex flex-row flex-wrap gap-5">
        {documents.map((doc) => {
          return (
            <FileCard
              key={doc.id}
              className="w-80"
              downloadLink={doc.attributes?.url}
              size={`${doc.attributes?.ext?.toUpperCase()} ${doc.attributes?.size} KB`}
              title={doc.titleToDisplay}
              // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
              uploadDate={new Date(doc.attributes?.createdAt).toLocaleDateString()}
            />
          )
        })}
      </div>
    </div>
  )
}

type RegulationPageProps = any

const VznPage = ({ vzn, footer, mainMenu }: RegulationPageProps) => {
  const t = useTranslations()

  if (!vzn || !vzn.id || !vzn.attributes) {
    // TODO redirect to 404
    return null
  }

  const {
    title,
    details,
    mainDocument,
    validFrom,
    consolidatedText,
    // The name from Strapi is wrongly in singular and with typo
    amedmentDocument: amendmentDocuments,
    // The name from Strapi is wrongly in singular - it should actually be single component,
    // but it is set to be repeatable component now, so we should use plural name
    cancellationDocument: cancellationDocuments,
  } = vzn.attributes

  return (
    <BasePageLayout>
      {/* Header */}
      <SectionContainer>
        <div className="relative pb-8 pt-14 lg:pb-12 lg:pt-24">
          <h1 className="text-h1 whitespace-pre-wrap">{title}</h1>
          <div className="flex gap-12 pt-8">
            {mainDocument && (
              <div className="flex flex-col">
                <div>{t('vzn.validFrom')}:</div>
                <div className="font-semibold">
                  {/* TODO fix ugly tmp fix
                   * validFrom is just date, not datetime, but getNumericLocalDate takes datetime,
                   * so ISO string missing part was added manually
                   */}
                  {getNumericLocalDate(`${validFrom}T12:00Z`)}
                </div>
              </div>
            )}
            {cancellationDocuments?.length ? (
              <div className="flex flex-col">
                <div>{t('vzn.validUntil')}:</div>
                <div className="font-semibold">
                  {/* TODO fix ugly tmp fix */}
                  {getNumericLocalDate(`${cancellationDocuments[0]?.validFrom}T12:00Z`)}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </SectionContainer>

      <SectionContainer>
        <div className="flex w-full flex-col gap-y-14 pt-14 md:pt-18 lg:gap-y-20">
          {details && (
            <div className="pt-5">
              <ReactMarkdown>{details}</ReactMarkdown>
            </div>
          )}

          {/*  Main Document  */}
          {mainDocument?.data && title && (
            <DocumentSection
              title={t('vzn.mainDocument')}
              documents={[{ titleToDisplay: title, ...mainDocument.data }]}
            />
            // <div className="max-w-xs pt-5">
          )}
          {consolidatedText?.data && title && (
            <DocumentSection
              title={t('vzn.consolidatedText')}
              documents={[{ titleToDisplay: title, ...consolidatedText.data }]}
            />
          )}
          {!!amendmentDocuments?.length && (
            <DocumentSection
              title={t('vzn.amendments')}
              documents={amendmentDocuments
                .map(
                  (doc) =>
                    doc?.document?.data && {
                      titleToDisplay: doc.title || doc.document.data.attributes?.name || '',
                      ...doc?.document?.data,
                    },
                )
                .filter(isPresent)}
            />
          )}
          {!!cancellationDocuments?.length && (
            <DocumentSection
              title={t('vzn.cancellationDocument')}
              documents={cancellationDocuments
                .map(
                  (doc) =>
                    doc?.document?.data && {
                      titleToDisplay: doc.title || doc.document.data.attributes?.name || '',
                      ...doc?.document?.data,
                    },
                )
                .filter(isPresent)}
            />
          )}
        </div>
      </SectionContainer>
    </BasePageLayout>
  )
}

export default VznPage

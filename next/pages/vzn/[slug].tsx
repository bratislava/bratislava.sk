/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import {
  MainMenuItemFragment,
  VznByIdQuery,
  VznDocumentEntityFragment,
  VznEntityFragment,
} from '@bratislava/strapi-sdk-homepage'
import { FileCard, PageHeader, SectionContainer } from '@bratislava/ui-bratislava'
import { paginationObj } from '@utils/constants'
import { client } from '@utils/gql'
import { getNumericLocalDate } from '@utils/local-date'
import { pageStyle, parseFooter, parseMainMenu } from '@utils/page'
import { isPresent, shouldSkipStaticPaths } from '@utils/utils'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ParsedUrlQuery } from 'node:querystring'
import * as React from 'react'
import ReactMarkdown from 'react-markdown'

import BasePageLayout from '../../components/layouts/BasePageLayout'
import PageWrapper from '../../components/layouts/PageWrapper'

export const getStaticPaths: GetStaticPaths<StaticParams> = async () => {
  let paths: { params: { slug: string } }[] = []
  if (shouldSkipStaticPaths()) return { paths, fallback: 'blocking' }

  let defaultStart: number = paginationObj.defaultPage
  // Fetch all pages to prerender
  const allVzns = []

  while (defaultStart !== 0) {
    // eslint-disable-next-line no-await-in-loop
    const { vzns } = await client.VznStaticPaths({
      page: defaultStart,
      limit: paginationObj.maxLimit,
    })
    if (vzns) {
      allVzns.push(...vzns.data)
    }
    if (vzns?.data.length === 0) {
      defaultStart = 0
      break
    }
    defaultStart += 1
  }

  if (allVzns) {
    paths = allVzns
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

export const getStaticProps: GetStaticProps<VznPageProps, StaticParams> = async (ctx) => {
  console.log(`Revalidating ${ctx}`)
  const locale = ctx.locale ?? 'sk'
  const slug = ctx.params?.slug ?? ''

  const { vzn, footer, mainMenu } = await client.VznById({ id: slug, locale })

  if (!vzn?.data) {
    return {
      notFound: true,
    } as const
  }

  return {
    props: {
      id: slug,
      vzn: vzn.data,
      footer,
      mainMenu,
      ...(await serverSideTranslations(locale, ['common'])),
    },
    revalidate: 14_400, // revalidate after 4 hours
  }
}

const DocumentSection = ({
  title,
  documents,
}: {
  title: string
  documents: ({ titleToDisplay: string } & VznDocumentEntityFragment)[]
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
              fileDetail={`${doc.attributes?.ext?.toUpperCase()} ${doc.attributes?.size} KB`}
              fileTitle={doc.titleToDisplay}
              // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
              uploadDate={new Date(doc.attributes?.createdAt).toLocaleDateString()}
            />
          )
        })}
      </div>
    </div>
  )
}

interface VznPageProps {
  id: string
  vzn: VznEntityFragment
  footer: VznByIdQuery['footer']
  mainMenu: MainMenuItemFragment | null | undefined
}

const VznPage = ({ vzn, footer, mainMenu }: VznPageProps) => {
  const { t, i18n } = useTranslation()

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
    <PageWrapper locale={i18n.language} slug={vzn.id}>
      <BasePageLayout
        footer={(footer && parseFooter(footer)) ?? undefined}
        menuItems={(mainMenu && parseMainMenu(mainMenu)) ?? undefined}
      >
        <style
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: pageStyle('main'),
          }}
        />
        {/* Header */}
        <PageHeader
          color="var(--category-color-200)"
          transparentColor="var(--category-color-200--transparent)"
          imageSrc=""
          // eslint-disable-next-line tailwindcss/no-custom-classname
          className="header-main-bg bg-cover"
        >
          <SectionContainer>
            <div className="relative pt-14 lg:pt-24 pb-8 lg:pb-12">
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
        </PageHeader>

        <SectionContainer>
          <div className="md:pt-18 flex w-full flex-col gap-y-14 pt-14 lg:gap-y-20">
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
    </PageWrapper>
  )
}

export default VznPage

import { ParsedUrlQuery } from 'node:querystring'

import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import * as React from 'react'

import PageLayout from '@/src/components/layouts/PageLayout'
import RegulationPageContent from '@/src/components/page-contents/RegulationPageContent'
import { GeneralContextProvider } from '@/src/components/providers/GeneralContextProvider'
import { GeneralQuery, RegulationEntityFragment } from '@/src/services/graphql'
import { client } from '@/src/services/graphql/gql'
import { NOT_FOUND } from '@/src/utils/consts'

type StaticParams = ParsedUrlQuery & {
  slug: string
}

type RegulationPageProps = {
  general: GeneralQuery
  regulation: RegulationEntityFragment
}

export const getStaticPaths: GetStaticPaths<StaticParams> = async () => {
  const { regulations } = await client.RegulationsStaticPaths()

  const paths = regulations
    .filter((regulation) => regulation?.slug)
    .map((regulation) => ({
      params: {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion,@typescript-eslint/no-non-null-assertion
        slug: regulation!.slug!,
      },
    }))

  // eslint-disable-next-line no-console
  console.log(`GENERATED STATIC PATHS FOR ${paths.length} SLUGS - REGULATIONS`)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<RegulationPageProps, StaticParams> = async ({
  locale,
  params,
}) => {
  const slug = params?.slug

  // eslint-disable-next-line no-console
  console.log(`Revalidating regulation ${locale === 'en' ? '/en' : ''}/${slug}`)

  if (!slug || !locale) {
    return NOT_FOUND
  }

  const [{ regulations }, general, translations] = await Promise.all([
    client.RegulationBySlug({ slug }),
    client.General({ locale }),
    serverSideTranslations(locale),
  ])

  const regulation = regulations[0]
  if (!regulation) {
    return NOT_FOUND
  }

  return {
    props: {
      general,
      regulation,
      ...translations,
    },
    revalidate: 10,
  }
}

const RegulationPage = ({ general, regulation }: RegulationPageProps) => {
  if (!regulation) {
    return null
  }

  return (
    <GeneralContextProvider general={general}>
      <Head>
        <title>{`VZN ${regulation.regNumber}`}</title>
        <meta name="description" content={`Všeobecné záväzné nariadenie ${regulation.fullTitle}`} />
      </Head>
      <PageLayout>
        <RegulationPageContent regulation={regulation} />
      </PageLayout>
    </GeneralContextProvider>
  )
}

export default RegulationPage

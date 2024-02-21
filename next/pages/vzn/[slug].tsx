import { ParsedUrlQuery } from 'node:querystring'

import { GeneralQuery, RegulationEntityFragment } from '@backend/graphql'
import { client } from '@backend/graphql/gql'
import PageLayout from '@components/layouts/PageLayout'
import RegulationPageContent from '@components/pages/RegulationPageContent'
import { GeneralContextProvider } from '@utils/generalContext'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import * as React from 'react'

interface StaticParams extends ParsedUrlQuery {
  slug: string
}

type RegulationPageProps = {
  general: GeneralQuery
  regulation: RegulationEntityFragment
}

export const getStaticPaths: GetStaticPaths<StaticParams> = async () => {
  // const { regulations } = await client.allRegulations()
  //
  // const paths = (regulations?.data ?? [])
  //   .filter((regulation) => regulation?.attributes?.slug)
  //   .map((regulation) => ({
  //     params: {
  //       // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  //       slug: regulation.attributes!.slug!,
  //     },
  //   }))

  const paths = []

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

  if (!slug || !locale) return { notFound: true }

  const [{ regulations }, general, messages] = await Promise.all([
    client.RegulationBySlug({ slug }),
    client.General({ locale }),
    import(`../../messages/${locale}.json`),
  ])

  const regulation = regulations?.data?.[0]
  if (!regulation) {
    return { notFound: true }
  }

  return {
    props: {
      general,
      regulation,
      messages: messages.default,
    },
    revalidate: 10,
  }
}

const RegulationPage = ({ general, regulation }: RegulationPageProps) => {
  if (!regulation || !regulation.attributes) {
    return null
  }

  return (
    <GeneralContextProvider general={general}>
      <Head>
        <title>{`VZN ${regulation.attributes.regNumber}`}</title>
      </Head>
      <PageLayout>
        <RegulationPageContent regulation={regulation} />
      </PageLayout>
    </GeneralContextProvider>
  )
}

export default RegulationPage

import { ParsedUrlQuery } from 'node:querystring'

import { GeneralQuery, RegulationEntityFragment } from '@backend/graphql'
import { client } from '@backend/graphql/gql'
import PageLayout from '@components/layouts/PageLayout'
import RegulationDetailPageContent from '@components/pages/RegulationDetailPageContent'
import { LocalizationsProvider } from '@components/providers/LocalizationsProvider'
import PageHeader from '@components/ui/PageHeader/PageHeader'
import { SectionContainer } from '@components/ui/SectionContainer/SectionContainer'
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
  const { regulations } = await client.allRegulations()

  const paths = (regulations?.data ?? [])
    .filter((regulation) => regulation?.attributes?.slug)
    .map((regulation) => ({
      params: {
        slug: regulation?.attributes?.slug ?? '',
      },
    }))

  console.log(`GENERATED STATIC PATHS FOR ${paths.length} SLUGS - REGULATIONS`)
  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<RegulationPageProps, StaticParams> = async (ctx) => {
  console.log(`Revalidating ${ctx}`)
  const locale = ctx.locale ?? 'sk'
  const slug = ctx.params?.slug ?? ''

  const [{ regulations }, general, messages] = await Promise.all([
    client.RegulationBySlug({ slug }),
    client.General({ locale }),
    import(`../../messages/${locale}.json`),
  ])

  if (!regulations || !regulations?.data?.length) {
    return {
      notFound: true,
    } as const
  }

  return {
    props: {
      general,
      regulation: regulations.data[0],
      messages: messages.default,
    },
    revalidate: 14_400, // revalidate after 4 hours
  }
}

const VznPage = ({ general, regulation }: RegulationPageProps) => {
  if (!regulation || !regulation.attributes || !regulation.attributes.slug) {
    return null
  }

  const { regNumber, category, fullTitle } = regulation.attributes

  const breadcrumbs = [{ title: `Všeobecne záväzné nariadenie č. ${regNumber}`, path: null }]

  return (
    <GeneralContextProvider general={general}>
      <LocalizationsProvider localizations={{ sk: '/vzn', en: '/vzn' }}>
        <Head>
          <title>{`VZN ${regNumber}`}</title>
        </Head>
        <PageLayout>
          <PageHeader
            title={`VZN ${regNumber}`}
            tag={category}
            subtext={fullTitle}
            breadcrumbs={breadcrumbs}
          />
          <SectionContainer className="my-8">
            <RegulationDetailPageContent regulation={regulation} />
          </SectionContainer>
        </PageLayout>
      </LocalizationsProvider>
    </GeneralContextProvider>
  )
}

export default VznPage

/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { ParsedUrlQuery } from 'node:querystring'

import { GeneralQuery, RegulationTest1EntityFragment } from '@backend/graphql'
import { client } from '@backend/graphql/gql'
import PageLayout from '@components/layouts/PageLayout'
import parseRegulationCodeFromTitle from '@components/pages/RegulationDetailPage/parseRegulationCodeFromTitle'
import RegulationDetail from '@components/pages/RegulationDetailPage/RegulationDetail'
import { LocalizationsProvider } from '@components/providers/LocalizationsProvider'
import PageHeader from '@components/ui/PageHeader/PageHeader'
import { SectionContainer } from '@components/ui/SectionContainer/SectionContainer'
import { GeneralContextProvider } from '@utils/generalContext'
import { isPresent } from '@utils/utils'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import * as React from 'react'

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

  const [{ regulationtest1 }, general, messages] = await Promise.all([
    client.RegulationById({ id: slug }),
    client.General({ locale }),
    import(`../../messages/${locale}.json`),
  ])

  if (!regulationtest1?.data) {
    return {
      notFound: true,
    } as const
  }

  return {
    props: {
      general,
      id: slug,
      regulation: regulationtest1.data,
      vzn: regulationtest1.data,
      messages: messages.default,
    },
    revalidate: 14_400, // revalidate after 4 hours
  }
}

type RegulationPageProps = {
  general: GeneralQuery
  regulation: RegulationTest1EntityFragment
}

const VznPage = ({ general, regulation }: RegulationPageProps) => {
  if (!regulation || !regulation.id || !regulation.attributes) {
    return null
  }

  const {
    code: regulationCode,
    year,
    number,
  } = parseRegulationCodeFromTitle(regulation.attributes.title)

  const expandedTitleExcerpt = regulation.attributes.title.split(' ').slice(2).join(' ') ?? ''

  return (
    <GeneralContextProvider general={general}>
      <LocalizationsProvider localizations={{ sk: '/vzn', en: '/vzn' }}>
        <Head>
          <title>{regulation.attributes.title}</title>
        </Head>
        <PageLayout>
          <PageHeader
            title={regulationCode}
            tag={regulation.attributes.category}
            subtext={
              regulation.attributes.fullTitle.split(' ').slice(2).join(' ') ?? expandedTitleExcerpt
            }
            breadcrumbs={[
              { title: `Všeobecne záväzné nariadenie č. ${number}/${year}`, path: null },
            ]}
          />
          <SectionContainer className="my-8">
            <RegulationDetail regulation={regulation} />
          </SectionContainer>
        </PageLayout>
      </LocalizationsProvider>
    </GeneralContextProvider>
  )
}

export default VznPage

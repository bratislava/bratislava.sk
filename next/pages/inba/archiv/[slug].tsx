import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import * as React from 'react'

import PageLayout from '@/components/layouts/PageLayout'
import InbaReleasePageContent from '@/components/page-contents/InbaReleasePageContent'
import { GeneralContextProvider } from '@/components/providers/GeneralContextProvider'
import { GeneralQuery, InbaReleaseEntityFragment } from '@/services/graphql'
import { client } from '@/services/graphql/gql'
import { useTitle } from '@/utils/useTitle'

type PageProps = {
  general: GeneralQuery
  inbaRelease: InbaReleaseEntityFragment
}

type StaticParams = {
  slug: string
}

export const getStaticPaths: GetStaticPaths<StaticParams> = async () => {
  const { inbaReleases } = await client.InbaReleasesStaticPaths()

  const paths = (inbaReleases?.data ?? [])
    .filter((inbaRelease) => inbaRelease?.attributes?.slug)
    .map((inbaRelease) => ({
      params: {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion,@typescript-eslint/no-non-null-assertion
        slug: inbaRelease.attributes!.slug!,
      },
    }))

  // eslint-disable-next-line no-console
  console.log(`GENERATED STATIC PATHS FOR ${paths.length} SLUGS - INBA RELEASES`)
  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<PageProps, StaticParams> = async ({
  locale,
  params,
}) => {
  const slug = params?.slug

  // eslint-disable-next-line no-console
  console.log(`Revalidating inba release ${locale === 'en' ? '/en' : ''}/inba/archiv/${slug}`)

  if (!slug || !locale) return { notFound: true }

  const [{ inbaReleases }, general, translations] = await Promise.all([
    client.InbaReleaseBySlug({ slug }),
    client.General({ locale }),
    serverSideTranslations(locale),
  ])

  const inbaRelease = inbaReleases?.data[0]
  if (!inbaRelease) return { notFound: true }

  return {
    props: {
      general,
      slug,
      inbaRelease,
      ...translations,
    },
    revalidate: 10,
  }
}

const Page = ({ general, inbaRelease }: PageProps) => {
  const { title: inbaReleaseTitle, perex } = inbaRelease.attributes ?? {}

  const title = useTitle(inbaReleaseTitle)

  return (
    <GeneralContextProvider general={general}>
      <Head>
        <title>{title}</title>
        {perex && <meta name="description" content={perex} />}
      </Head>
      <PageLayout>
        <InbaReleasePageContent inbaRelease={inbaRelease} />
      </PageLayout>
    </GeneralContextProvider>
  )
}

export default Page

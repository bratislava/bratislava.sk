import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import * as React from 'react'

import PageLayout from '@/src/components/layouts/PageLayout'
import InbaReleasePageContent from '@/src/components/page-contents/InbaReleasePageContent'
import { GeneralContextProvider } from '@/src/components/providers/GeneralContextProvider'
import { GeneralQuery, InbaReleaseEntityFragment } from '@/src/services/graphql'
import { client } from '@/src/services/graphql/gql'
import { NOT_FOUND } from '@/src/utils/consts'
import { useTitle } from '@/src/utils/useTitle'

type PageProps = {
  general: GeneralQuery
  inbaRelease: InbaReleaseEntityFragment
}

type StaticParams = {
  slug: string
}

export const getStaticPaths: GetStaticPaths<StaticParams> = async () => {
  const { inbaReleases } = await client.InbaReleasesStaticPaths()

  const paths = inbaReleases
    .filter((inbaRelease) => inbaRelease?.slug)
    .map((inbaRelease) => ({
      params: {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion,@typescript-eslint/no-non-null-assertion
        slug: inbaRelease!.slug!,
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
  console.log(`Revalidating inba release ${locale === 'en' ? '/en' : ''}/inba/vydania/${slug}`)

  if (!slug || !locale) {
    return NOT_FOUND
  }

  const [{ inbaReleases }, general, translations] = await Promise.all([
    client.InbaReleaseBySlug({ slug }),
    client.General({ locale }),
    serverSideTranslations(locale),
  ])

  const inbaRelease = inbaReleases[0]
  if (!inbaRelease) {
    return NOT_FOUND
  }

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
  const { title: inbaReleaseTitle, perex } = inbaRelease

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

import { dehydrate, DehydratedState, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import * as React from 'react'

import SeoHead from '@/src/components/common/SeoHead/SeoHead'
import PageLayout from '@/src/components/layouts/PageLayout'
import InbaReleasePageContent from '@/src/components/page-contents/InbaReleasePageContent'
import { AdminGroupsContextProvider } from '@/src/components/providers/AdminGroupsContextProvider'
import { GeneralContextProvider } from '@/src/components/providers/GeneralContextProvider'
import { GeneralQuery, InbaReleaseEntityFragment } from '@/src/services/graphql'
import { client } from '@/src/services/graphql/gql'
import {
  getInbaArticlesQueryKey,
  inbaArticlesDefaultFilters,
  inbaArticlesFetcher,
} from '@/src/services/meili/fetchers/inbaArticlesFetcher'
import { NOT_FOUND } from '@/src/utils/consts'

type PageProps = {
  general: GeneralQuery
  inbaRelease: InbaReleaseEntityFragment
  dehydratedState: DehydratedState
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
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
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

  // Prefetch data
  const queryClient = new QueryClient()

  const filters = {
    ...inbaArticlesDefaultFilters,
    releaseDocumentIds: [inbaRelease.documentId],
  }

  await queryClient.prefetchQuery({
    queryKey: getInbaArticlesQueryKey(filters, locale),
    queryFn: () => inbaArticlesFetcher(filters, locale),
  })

  const dehydratedState = dehydrate(queryClient)

  return {
    props: {
      general,
      slug,
      inbaRelease,
      ...translations,
      dehydratedState,
    },
    revalidate: 10,
  }
}

const Page = ({ general, inbaRelease, dehydratedState }: PageProps) => {
  const { title, perex } = inbaRelease

  return (
    <HydrationBoundary state={dehydratedState}>
      <GeneralContextProvider general={general}>
        <AdminGroupsContextProvider adminGroups={[]}>
          <SeoHead title={title} description={perex} />

          <PageLayout>
            <InbaReleasePageContent inbaRelease={inbaRelease} />
          </PageLayout>
        </AdminGroupsContextProvider>
      </GeneralContextProvider>
    </HydrationBoundary>
  )
}

export default Page

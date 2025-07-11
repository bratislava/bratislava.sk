import { dehydrate, DehydratedState, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'

import PageLayout from '@/src/components/layouts/PageLayout'
import HomepageContent from '@/src/components/page-contents/HomepageContent'
import { GeneralContextProvider } from '@/src/components/providers/GeneralContextProvider'
import { HomepageContextProvider } from '@/src/components/providers/HomepageContextProvider'
import type { HomepageContext } from '@/src/services/fetchers/homepageContextFetcher'
import { homepageContextFetcher } from '@/src/services/fetchers/homepageContextFetcher'
import { GeneralQuery } from '@/src/services/graphql'
import { client } from '@/src/services/graphql/gql'
import {
  getTootootEvents,
  getTootootEventsQueryKey,
} from '@/src/services/tootoot/tootootEvents.fetcher'
import { NOT_FOUND } from '@/src/utils/consts'
import { useTitle } from '@/src/utils/useTitle'

type PageProps = {
  homepageContext: HomepageContext
  general: GeneralQuery
  dehydratedState: DehydratedState
}

export const getStaticProps: GetStaticProps<PageProps> = async ({ locale }) => {
  // eslint-disable-next-line no-console
  console.log(`Revalidating homepage ${locale}.`)

  if (!locale) {
    return NOT_FOUND
  }

  const [homepageContext, general, translations] = await Promise.all([
    homepageContextFetcher(locale),
    client.General({ locale }),
    serverSideTranslations(locale),
  ])

  // Prefetch data
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: getTootootEventsQueryKey(),
    queryFn: () => getTootootEvents(),
  })

  const dehydratedState = dehydrate(queryClient)

  return {
    props: {
      homepageContext,
      general,
      ...translations,
      dehydratedState,
    },
    revalidate: 10,
  }
}

const Homepage = ({ homepageContext, general, dehydratedState }: PageProps) => {
  const title = useTitle()

  return (
    <HydrationBoundary state={dehydratedState}>
      <GeneralContextProvider general={general}>
        <HomepageContextProvider homepageContext={homepageContext}>
          <Head>
            <title>{title}</title>
            {homepageContext.homepage?.metaDescription && (
              <meta
                name="description"
                content={homepageContext.homepage?.metaDescription ?? undefined}
              />
            )}
          </Head>

          <PageLayout>
            <HomepageContent />
          </PageLayout>
        </HomepageContextProvider>
      </GeneralContextProvider>
    </HydrationBoundary>
  )
}

export default Homepage

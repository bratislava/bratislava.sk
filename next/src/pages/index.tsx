import { dehydrate, DehydratedState, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'

import SeoHead from '@/src/components/common/SeoHead/SeoHead'
import PageLayout from '@/src/components/layouts/PageLayout'
import HomepageContent from '@/src/components/page-contents/HomepageContent'
import { AdminGroupsContextProvider } from '@/src/components/providers/AdminGroupsContextProvider'
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
  const { t } = useTranslation()

  return (
    <HydrationBoundary state={dehydratedState}>
      <GeneralContextProvider general={general}>
        <AdminGroupsContextProvider adminGroups={[]}>
          <HomepageContextProvider homepageContext={homepageContext}>
            <SeoHead
              title={t('Homepage.title')}
              description={homepageContext.homepage?.metaDescription}
            />

            <PageLayout>
              <HomepageContent />
            </PageLayout>
          </HomepageContextProvider>
        </AdminGroupsContextProvider>
      </GeneralContextProvider>
    </HydrationBoundary>
  )
}

export default Homepage

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
import { useTitle } from '@/src/utils/useTitle'

type PageProps = {
  homepageContext: HomepageContext
  general: GeneralQuery
}

export const getStaticProps: GetStaticProps<PageProps> = async ({ locale }) => {
  // eslint-disable-next-line no-console
  console.log(`Revalidating homepage ${locale}.`)

  if (!locale) return { notFound: true }

  const [homepageContext, general, translations] = await Promise.all([
    homepageContextFetcher(locale),
    client.General({ locale }),
    serverSideTranslations(locale),
  ])

  return {
    props: {
      homepageContext,
      general,
      ...translations,
    },
    revalidate: 10,
  }
}

const Homepage = ({ homepageContext, general }: PageProps) => {
  const title = useTitle()

  return (
    <GeneralContextProvider general={general}>
      <HomepageContextProvider homepageContext={homepageContext}>
        <Head>
          <title>{title}</title>
          {homepageContext.homepage?.attributes?.metaDescription && (
            <meta
              name="description"
              content={homepageContext.homepage?.attributes?.metaDescription ?? undefined}
            />
          )}
        </Head>

        <PageLayout>
          <HomepageContent />
        </PageLayout>
      </HomepageContextProvider>
    </GeneralContextProvider>
  )
}

export default Homepage

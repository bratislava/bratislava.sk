import { GetStaticProps } from 'next'
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'

import PageLayout from '@/components/layouts/PageLayout'
import HomepageContent from '@/components/page-contents/HomepageContent'
import { GeneralContextProvider } from '@/components/providers/GeneralContextProvider'
import { HomepageContextProvider } from '@/components/providers/HomepageContextProvider'
import type { HomepageContext } from '@/services/fetchers/homepageContextFetcher'
import { homepageContextFetcher } from '@/services/fetchers/homepageContextFetcher'
import { GeneralQuery } from '@/services/graphql'
import { client } from '@/services/graphql/gql'
import { useTitle } from '@/utils/useTitle'

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
          <div className="flex items-center justify-center bg-environment-300 font-bold text-category-500">
            <p>Test</p>
          </div>
          <HomepageContent />
        </PageLayout>
      </HomepageContextProvider>
    </GeneralContextProvider>
  )
}

export default Homepage

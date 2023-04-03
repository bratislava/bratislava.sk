import { GeneralContextProvider } from '@utils/generalContext'
import { client } from '@utils/gql'
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'

import PageContextProvider from '../components/layouts/PageContextProvider'
import PageLayout from '../components/layouts/PageLayout'
import { GetStaticProps } from 'next'
import HomepageContent from '@components/pages/HomepageContent'
import { HomepageContextProvider } from '@utils/homepageContext'
import type { HomepageContext } from '@backend/fetchers/homepageContextFetcher'
import { homepageContextFetcher } from '@backend/fetchers/homepageContextFetcher'
import { GeneralQuery } from '@bratislava/strapi-sdk-homepage'

type PageProps = {
  homepageContext: HomepageContext
  general: GeneralQuery
}

export const getStaticProps: GetStaticProps<PageProps> = async ({ locale }) => {
  // eslint-disable-next-line no-console
  console.log(`Revalidating homepage.`)

  if (!locale) return { notFound: true }

  const [homepageContext, general, translations] = await Promise.all([
    homepageContextFetcher(locale),
    client.General({ locale }),
    serverSideTranslations(locale, ['common']),
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
  return (
    <GeneralContextProvider general={general}>
      <PageContextProvider>
        <HomepageContextProvider homepageContext={homepageContext}>
          <Head>
            <title>{homepageContext.homepage?.attributes?.title}</title>
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
      </PageContextProvider>
    </GeneralContextProvider>
  )
}

export default Homepage

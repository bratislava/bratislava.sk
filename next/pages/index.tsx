import type { HomepageContext } from '@backend/fetchers/homepageContextFetcher'
import { homepageContextFetcher } from '@backend/fetchers/homepageContextFetcher'
import { GeneralQuery } from '@backend/graphql'
import HomepageContent from '@components/pages/HomepageContent'
import { GeneralContextProvider } from '@utils/generalContext'
import { client } from '@utils/gql'
import { HomepageContextProvider } from '@utils/homepageContext'
import { useTitle } from '@utils/useTitle'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'

import PageLayout from '../components/layouts/PageLayout'

type PageProps = {
  homepageContext: HomepageContext
  general: GeneralQuery
}

export const getStaticProps: GetStaticProps<PageProps> = async ({ locale }) => {
  // eslint-disable-next-line no-console
  console.log(`Revalidating homepage.`)

  if (!locale) return { notFound: true }

  const [homepageContext, general, messages] = await Promise.all([
    homepageContextFetcher(locale),
    client.General({ locale }),
    import(`../messages/${locale}.json`),
  ])

  return {
    props: {
      homepageContext,
      general,
      messages: messages.default,
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

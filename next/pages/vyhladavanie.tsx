import { GeneralQuery } from '@bratislava/strapi-sdk-homepage'
import SearchPageContent from '@components/pages/searchPageContent'
import { LocalizationsProvider } from '@components/providers/LocalizationsProvider'
import { GeneralContextProvider } from '@utils/generalContext'
import { client } from '@utils/gql'
import { useTitle } from '@utils/useTitle'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { useTranslations } from 'next-intl';


import * as React from 'react'

import PageLayout from '../components/layouts/PageLayout'

type PageProps = {
  general: GeneralQuery
}

export const getStaticProps: GetStaticProps<PageProps> = async (ctx) => {
  const locale = ctx.locale ?? 'sk'

  const [general, messages] = await Promise.all([
    client.General({ locale }),
    import(`../messages/${locale}.json`)
  ])

  return {
    props: {
      general,
      messages: messages.default,
    },
    revalidate: 10,
  }
}

const Page = ({ general }: PageProps) => {
  const t = useTranslations();
  const title = useTitle(t('searching'))

  return (
    <GeneralContextProvider general={general}>
      <LocalizationsProvider localizations={{ sk: '/vyhladavanie', en: '/search' }}>
        <Head>
          <title>{title}</title>
        </Head>
        <PageLayout>
          <SearchPageContent />
        </PageLayout>
      </LocalizationsProvider>
    </GeneralContextProvider>
  )
}

export default Page

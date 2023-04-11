import { GeneralQuery } from '@bratislava/strapi-sdk-homepage'
import SearchPageContent from '@components/pages/searchPageContent'
import { LocalizationsProvider } from '@components/providers/LocalizationsProvider'
import { GeneralContextProvider } from '@utils/generalContext'
import { client } from '@utils/gql'
import { useTitle } from '@utils/useTitle'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import * as React from 'react'

import PageLayout from '../components/layouts/PageLayout'

type PageProps = {
  general: GeneralQuery
}

export const getStaticProps: GetStaticProps<PageProps> = async (ctx) => {
  const locale = ctx.locale ?? 'sk'

  const [general, translations] = await Promise.all([
    client.General({ locale }),
    serverSideTranslations(locale, ['common']),
  ])

  return {
    props: {
      general,
      ...translations,
    },
    revalidate: 10,
  }
}

const Page = ({ general }: PageProps) => {
  const { t } = useTranslation('common')
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

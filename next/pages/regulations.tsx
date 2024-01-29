import { GeneralQuery } from '@backend/graphql'
import { client } from '@backend/graphql/gql'
import PageHeader from '@bratislava/ui-bratislava/PageHeader/PageHeader'
import RegulationsPageContent from '@components/pages/regulationsPageContent'
import SearchPageContent from '@components/pages/searchPageContent'
import SearchPageContentNew from '@components/pages/searchPageContentNew'
import { LocalizationsProvider } from '@components/providers/LocalizationsProvider'
import { GeneralContextProvider } from '@utils/generalContext'
import { useTitle } from '@utils/useTitle'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { useTranslations } from 'next-intl'
import * as React from 'react'

import PageLayout from '../components/layouts/PageLayout'

type PageProps = {
  general: GeneralQuery
}

export const getStaticProps: GetStaticProps<PageProps> = async ({ locale }) => {
  // eslint-disable-next-line no-console
  // console.log(`Revalidating search ${locale}.`)

  if (!locale) return { notFound: true }

  const [general, messages] = await Promise.all([
    client.General({ locale }),
    import(`../messages/${locale}.json`),
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
  const t = useTranslations()
  const title = useTitle('Regulations')

  return (
    <GeneralContextProvider general={general}>
      <LocalizationsProvider
        localizations={{ sk: '/vseobecne-zavazne-nariadenia', en: '/regulations' }}
      >
        <Head>
          <title>{title}</title>
        </Head>
        <PageLayout>
          <PageHeader breadcrumbs={[{ title: 'regulations', path: null }]} />
          <RegulationsPageContent />
        </PageLayout>
      </LocalizationsProvider>
    </GeneralContextProvider>
  )
}

export default Page

import { GetStaticProps } from 'next'
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import * as React from 'react'

import PageHeader from '@/components/common/PageHeader/PageHeader'
import SectionContainer from '@/components/common/SectionContainer/SectionContainer'
import PageLayout from '@/components/layouts/PageLayout'
import { GeneralContextProvider } from '@/components/providers/GeneralContextProvider'
import { LocalizationsProvider } from '@/components/providers/LocalizationsProvider'
import GlobalSearchSectionContent from '@/components/sections/SearchSection/GlobalSearchSectionContent'
import { GeneralQuery } from '@/services/graphql'
import { client } from '@/services/graphql/gql'
import { useTitle } from '@/utils/useTitle'
import { useTranslation } from '@/utils/useTranslation'

type PageProps = {
  general: GeneralQuery
}

export const getStaticProps: GetStaticProps<PageProps> = async ({ locale }) => {
  // eslint-disable-next-line no-console
  console.log(`Revalidating search ${locale}.`)

  if (!locale) return { notFound: true }

  const [general, translations] = await Promise.all([
    client.General({ locale }),
    serverSideTranslations(locale),
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
  const { t } = useTranslation()
  const title = useTitle(t('SearchPage.searching'))

  return (
    <GeneralContextProvider general={general}>
      <LocalizationsProvider localizations={{ sk: '/vyhladavanie', en: '/search' }}>
        <Head>
          <title>{title}</title>
        </Head>
        <PageLayout>
          <PageHeader
            title={t('SearchPage.searching')}
            breadcrumbs={[{ title: t('SearchPage.searching'), path: null }]}
          />
          <SectionContainer className="mb-8 mt-12">
            <GlobalSearchSectionContent variant="general" />
          </SectionContainer>
        </PageLayout>
      </LocalizationsProvider>
    </GeneralContextProvider>
  )
}

export default Page

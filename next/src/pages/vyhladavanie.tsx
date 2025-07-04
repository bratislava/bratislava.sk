import { GetStaticProps } from 'next'
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import * as React from 'react'

import PageHeader from '@/src/components/common/PageHeader/PageHeader'
import PageLayout from '@/src/components/layouts/PageLayout'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import { GeneralContextProvider } from '@/src/components/providers/GeneralContextProvider'
import { LocalizationsProvider } from '@/src/components/providers/LocalizationsProvider'
import GlobalSearchSectionContent from '@/src/components/sections/SearchSection/GlobalSearchSectionContent'
import { GeneralQuery } from '@/src/services/graphql'
import { client } from '@/src/services/graphql/gql'
import { NOT_FOUND } from '@/src/utils/consts'
import { useTitle } from '@/src/utils/useTitle'
import { useTranslation } from '@/src/utils/useTranslation'

type PageProps = {
  general: GeneralQuery
}

export const getStaticProps: GetStaticProps<PageProps> = async ({ locale }) => {
  // eslint-disable-next-line no-console
  console.log(`Revalidating search ${locale}.`)

  if (!locale) {
    return NOT_FOUND
  }

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
          <SectionContainer className="mt-12 mb-8">
            <GlobalSearchSectionContent variant="general" />
          </SectionContainer>
        </PageLayout>
      </LocalizationsProvider>
    </GeneralContextProvider>
  )
}

export default Page

import { GeneralQuery } from '@backend/graphql'
import { client } from '@backend/graphql/gql'
import PageHeader from '@bratislava/ui-bratislava/PageHeader/PageHeader'
import GlobalSearchSectionContent from '@components/organisms/SearchSection/GlobalSearchSectionContent'
import { LocalizationsProvider } from '@components/providers/LocalizationsProvider'
import SectionContainer from '@components/ui/SectionContainer/SectionContainer'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { useTranslations } from 'next-intl'
import * as React from 'react'

import { GeneralContextProvider } from '@/utils/generalContext'
import { useTitle } from '@/utils/useTitle'

import PageLayout from '../components/layouts/PageLayout'

type PageProps = {
  general: GeneralQuery
}

export const getStaticProps: GetStaticProps<PageProps> = async ({ locale }) => {
  // eslint-disable-next-line no-console
  console.log(`Revalidating search ${locale}.`)

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
  const title = useTitle(t('searching'))

  return (
    <GeneralContextProvider general={general}>
      <LocalizationsProvider localizations={{ sk: '/vyhladavanie', en: '/search' }}>
        <Head>
          <title>{title}</title>
        </Head>
        <PageLayout>
          <PageHeader
            title={t('searching')}
            breadcrumbs={[{ title: t('searching'), path: null }]}
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

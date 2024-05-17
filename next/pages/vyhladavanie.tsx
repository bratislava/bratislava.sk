import { GetStaticProps } from 'next'
import Head from 'next/head'
import { useTranslations } from 'next-intl'
import * as React from 'react'

import PageLayout from '@/components/layouts/PageLayout'
import GlobalSearchSectionContent from '@/components/molecules/sections/general/SearchSection/GlobalSearchSectionContent'
import { LocalizationsProvider } from '@/components/providers/LocalizationsProvider'
import PageHeader from '@/components/ui/PageHeader/PageHeader'
import SectionContainer from '@/components/ui/SectionContainer/SectionContainer'
import { GeneralQuery } from '@/services/graphql'
import { client } from '@/services/graphql/gql'
import { GeneralContextProvider } from '@/utils/generalContext'
import { useTitle } from '@/utils/useTitle'

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

import { Enum_Pagecategory_Color, GeneralQuery } from '@backend/graphql'
import { client } from '@backend/graphql/gql'
import ProjectDetailPageContent from '@components/pages/projects/projectDetailPageContent'
import { LocalizationsProvider } from '@components/providers/LocalizationsProvider'
import { GlobalCategoryColorProvider } from '@utils/colors'
import { GeneralContextProvider } from '@utils/generalContext'
import { useTitle } from '@utils/useTitle'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useTranslations } from 'next-intl'
import * as React from 'react'

import PageLayout from '../../components/layouts/PageLayout'

type PageProps = {
  general: GeneralQuery
}

export const getServerSideProps: GetServerSideProps<PageProps> = async ({ params, locale }) => {
  // eslint-disable-next-line no-console
  console.log(`Revalidating search ${locale}.`)

  console.log(params)

  if (!locale) return { notFound: true }

  const [general, messages] = await Promise.all([
    client.General({ locale }),
    import(`../../messages/${locale}.json`),
  ])

  return {
    props: {
      general,
      messages: messages.default,
    },
  }
}

const Page = ({ general }: PageProps) => {
  const t = useTranslations()
  const title = useTitle(t('projects'))

  return (
    <GeneralContextProvider general={general}>
      <LocalizationsProvider localizations={{ sk: '/projekty', en: '/projects' }}>
        <Head>
          <title>{title}</title>
        </Head>

        <GlobalCategoryColorProvider color={Enum_Pagecategory_Color.Green} />
        <PageLayout>
          <ProjectDetailPageContent />
        </PageLayout>
      </LocalizationsProvider>
    </GeneralContextProvider>
  )
}

export default Page

import { IProjectDetail } from '@backend/dtos/projectDto'
import { Enum_Pagecategory_Color, GeneralQuery } from '@backend/graphql'
import { client } from '@backend/graphql/gql'
import { fetchProject } from '@backend/utils/temporary'
import ProjectDetailPageContent from '@components/pages/projects/projectDetailPageContent'
import { LocalizationsProvider } from '@components/providers/LocalizationsProvider'
import {
  GetSSRCurrentAuth,
  getSSRCurrentAuth,
  ServerSideAuthStoreHOC,
} from '@components/providers/ServerSideAuthStore'
import { GlobalCategoryColorProvider } from '@utils/colors'
import { GeneralContextProvider } from '@utils/generalContext'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import Head from 'next/head'
import { useTranslations } from 'next-intl'
import * as React from 'react'

import PageLayout from '../../components/layouts/PageLayout'

type PageProps = {
  general: GeneralQuery
  project: IProjectDetail
  ssrCurrentAuthProps: GetSSRCurrentAuth
}

export const getServerSideProps = async ({ req, params, locale }: GetServerSidePropsContext) => {
  // eslint-disable-next-line no-console
  console.log(`Revalidating search ${locale}.`)

  if (!(locale && params.id)) return { notFound: true }

  const [general, messages, projectQuery] = await Promise.all([
    client.General({ locale }),
    import(`../../messages/${locale}.json`),
    fetchProject(params.id as string),
  ])

  return {
    props: {
      ssrCurrentAuthProps: await getSSRCurrentAuth(req),
      general,
      project: projectQuery?.data,
      messages: messages.default,
    },
  }
}

const Page = ({ general, project }): GetServerSidePropsResult<PageProps> => {
  const t = useTranslations()

  return (
    <GeneralContextProvider general={general}>
      <LocalizationsProvider localizations={{ sk: '/projekty', en: '/projects' }}>
        <Head>
          <title>{project.name}</title>
        </Head>

        <GlobalCategoryColorProvider color={Enum_Pagecategory_Color.Green} />
        <PageLayout>
          <ProjectDetailPageContent {...project} />
        </PageLayout>
      </LocalizationsProvider>
    </GeneralContextProvider>
  )
}

export default ServerSideAuthStoreHOC<PageProps>(Page as React.ComponentType<PageProps>)

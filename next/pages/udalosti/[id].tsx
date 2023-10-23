import { IEventDetail } from '@backend/dtos/eventDto'
import { Enum_Pagecategory_Color, GeneralQuery } from '@backend/graphql'
import { client } from '@backend/graphql/gql'
import { fetchEvent } from '@backend/utils/temporary'
import EventDetailPageContent from '@components/pages/events/eventDetailPageContent'
import { LocalizationsProvider } from '@components/providers/LocalizationsProvider'
import {
  GetSSRCurrentAuth,
  getSSRCurrentAuth,
  ServerSideAuthProviderHOC,
} from '@components/providers/ServerSideAuthProvider'
import { GlobalCategoryColorProvider } from '@utils/colors'
import { GeneralContextProvider } from '@utils/generalContext'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import Head from 'next/head'
import { useTranslations } from 'next-intl'
import * as React from 'react'

import PageLayout from '../../components/layouts/PageLayout'

type PageProps = {
  general: GeneralQuery
  event: IEventDetail
  ssrCurrentAuthProps: GetSSRCurrentAuth
}

export const getServerSideProps = async ({ req, params, locale }: GetServerSidePropsContext) => {
  // eslint-disable-next-line no-console
  console.log(`Revalidating search ${locale}.`)

  if (!(locale && params.id)) return { notFound: true }

  const [general, messages, eventQuery] = await Promise.all([
    client.General({ locale }),
    import(`../../messages/${locale}.json`),
    fetchEvent(params.id as string),
  ])

  return {
    props: {
      ssrCurrentAuthProps: await getSSRCurrentAuth(req),
      general,
      event: eventQuery?.data,
      messages: messages.default,
    },
  }
}

const Page = ({ general, event }): GetServerSidePropsResult<PageProps> => {
  const t = useTranslations()

  return (
    <GeneralContextProvider general={general}>
      <LocalizationsProvider localizations={{ sk: '/projekty', en: '/events' }}>
        <Head>
          <title>{event.name}</title>
        </Head>

        <GlobalCategoryColorProvider color={Enum_Pagecategory_Color.Yellow} />
        <PageLayout>
          <EventDetailPageContent {...event} />
        </PageLayout>
      </LocalizationsProvider>
    </GeneralContextProvider>
  )
}

export default ServerSideAuthProviderHOC<PageProps>(Page as React.ComponentType<PageProps>)

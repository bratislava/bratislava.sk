import { IEventsQueryData } from '@backend/dtos/eventDto'
import { Enum_Pagecategory_Color, GeneralQuery } from '@backend/graphql'
import { client } from '@backend/graphql/gql'
import { fetchEvents } from '@backend/utils/temporary'
import PageLayout from '@components/layouts/PageLayout'
import EventsPageContent from '@components/pages/events/eventsPageContent'
import { LocalizationsProvider } from '@components/providers/LocalizationsProvider'
import { GlobalCategoryColorProvider } from '@utils/colors'
import { GeneralContextProvider } from '@utils/generalContext'
import { useTitle } from '@utils/useTitle'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useTranslations } from 'next-intl'
import * as React from 'react'

export const getServerSideProps: GetServerSideProps<PageProps, { page: string }> = async ({
  locale,
  query,
}) => {
  // eslint-disable-next-line no-console
  console.log(`Revalidating search ${locale}.`)

  if (!locale) return { notFound: true }

  const [general, messages, eventsResponse] = await Promise.all([
    client.General({ locale }),
    import(`../messages/${locale}.json`),
    fetchEvents(query?.page ? +query?.page : 1),
  ])

  return {
    props: {
      general,
      data: eventsResponse.data,
      messages: messages.default,
    },
  }
}

export type PageProps = {
  general: GeneralQuery
  data: IEventsQueryData
}

const Page = ({ general, data }: PageProps) => {
  const t = useTranslations()
  const title = useTitle(t('events'))

  return (
    <GeneralContextProvider general={general}>
      <LocalizationsProvider localizations={{ sk: '/udalosti', en: '/events' }}>
        <Head>
          <title>{title}</title>
        </Head>
        <GlobalCategoryColorProvider color={Enum_Pagecategory_Color.Yellow} />

        <PageLayout>
          <EventsPageContent data={data} />
        </PageLayout>
      </LocalizationsProvider>
    </GeneralContextProvider>
  )
}

export default Page

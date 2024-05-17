import { ParsedUrlQuery } from 'node:querystring'

import { GetServerSideProps } from 'next'
import Head from 'next/head'
import * as React from 'react'

import PageLayout from '@/components/layouts/PageLayout'
import OfficialBoardDocumentPageContent from '@/components/pages/OfficialBoardDocumentPageContent'
import { mockedParsedDocumentDetail } from '@/services/ginis/mocks'
import { getOfficialBoardParsedDocument } from '@/services/ginis/server/getOfficialBoardParsedDocument'
import { ParsedOfficialBoardDocumentDetail } from '@/services/ginis/types'
import { shouldMockGinis } from '@/services/ginis/utils/shouldMockGinis'
import { GeneralQuery } from '@/services/graphql'
import { client } from '@/services/graphql/gql'
import { base64Decode } from '@/utils/base64'
import { GeneralContextProvider } from '@/utils/generalContext'

type StaticParams = ParsedUrlQuery & {
  slug: string
}

type OfficialBoardDocumentPageProps = {
  general: GeneralQuery
  document: ParsedOfficialBoardDocumentDetail
}

export const getServerSideProps: GetServerSideProps<
  OfficialBoardDocumentPageProps,
  StaticParams
> = async ({ locale, params }) => {
  const encodedDocumentId = params?.slug

  // eslint-disable-next-line no-console
  console.log(
    `Revalidating official board document ${locale === 'en' ? '/en' : ''}/${encodedDocumentId}`,
  )

  if (!encodedDocumentId || !locale) return { notFound: true }

  const documentId = base64Decode(encodedDocumentId)

  const [document, general, messages] = await Promise.all([
    getOfficialBoardParsedDocument(documentId),
    client.General({ locale }),
    import(`../../messages/${locale}.json`),
  ])

  if (shouldMockGinis()) {
    return {
      props: {
        general,
        document: mockedParsedDocumentDetail,
        messages: messages.default,
      },
    }
  }

  if (!document) {
    return { notFound: true }
  }

  return {
    props: {
      general,
      document,
      messages: messages.default,
    },
  }
}

const OfficialBoardPage = ({ general, document }: OfficialBoardDocumentPageProps) => {
  if (!document) {
    return null
  }

  return (
    <GeneralContextProvider general={general}>
      <Head>
        <title>{document.title}</title>
        <meta name="description" content={document.description} />
      </Head>
      <PageLayout>
        <OfficialBoardDocumentPageContent document={document} />
      </PageLayout>
    </GeneralContextProvider>
  )
}

export default OfficialBoardPage

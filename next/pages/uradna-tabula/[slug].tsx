import { ParsedUrlQuery } from 'node:querystring'

import { mockedParsedDocumentDetail } from '@backend/ginis/mocks'
import { getOfficialBoardParsedDocument } from '@backend/ginis/server/getOfficialBoardParsedDocument'
import { ParsedOfficialBoardDocumentDetail } from '@backend/ginis/types'
import { shouldMockGinis } from '@backend/ginis/utils/shouldMockGinis'
import { GeneralQuery } from '@backend/graphql'
import { client } from '@backend/graphql/gql'
import PageLayout from '@components/layouts/PageLayout'
import OfficialBoardDocumentPageContent from '@components/pages/OfficialBoardDocumentPageContent'
import { base64Decode } from '@utils/base64'
import { GeneralContextProvider } from '@utils/generalContext'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import * as React from 'react'

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

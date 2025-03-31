import { ParsedUrlQuery } from 'node:querystring'

import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import PageLayout from '@/src/components/layouts/PageLayout'
import OfficialBoardDocumentPageContent from '@/src/components/page-contents/OfficialBoardDocumentPageContent'
import { GeneralContextProvider } from '@/src/components/providers/GeneralContextProvider'
import { mockedParsedDocumentDetail } from '@/src/services/ginis/mocks'
import { getOfficialBoardParsedDocument } from '@/src/services/ginis/server/getOfficialBoardParsedDocument'
import { ParsedOfficialBoardDocumentDetail } from '@/src/services/ginis/types'
import { shouldMockGinis } from '@/src/services/ginis/utils/shouldMockGinis'
import { GeneralQuery } from '@/src/services/graphql'
import { client } from '@/src/services/graphql/gql'
import { base64Decode } from '@/src/utils/base64'

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

  const documentIdRegex = /.*#\d+/ // requires # with at least one digit following
  if (!documentIdRegex.test(documentId)) {
    console.log(
      `Invalid document ID for GINIS detailDokumentu. Encoded: ${encodedDocumentId} Decoded: ${documentId}`,
    )

    return { notFound: true }
  }

  const [document, general, translations] = await Promise.all([
    getOfficialBoardParsedDocument(documentId),
    client.General({ locale }),
    serverSideTranslations(locale),
  ])

  if (shouldMockGinis()) {
    return {
      props: {
        general,
        document: mockedParsedDocumentDetail,
        ...translations,
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
      ...translations,
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

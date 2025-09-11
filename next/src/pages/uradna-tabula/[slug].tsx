import { ParsedUrlQuery } from 'node:querystring'

import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import * as React from 'react'

import SeoHead from '@/src/components/common/SeoHead/SeoHead'
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
import { NOT_FOUND } from '@/src/utils/consts'

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

  if (!encodedDocumentId || !locale) {
    return NOT_FOUND
  }

  const documentId = base64Decode(encodedDocumentId)

  const documentIdRegex = /.*#\d+/ // requires # with at least one digit following
  if (!documentIdRegex.test(documentId)) {
    console.log(
      `Invalid document ID for GINIS detailDokumentu. Encoded: ${encodedDocumentId} Decoded: ${documentId}`,
    )

    return NOT_FOUND
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
    return NOT_FOUND
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
      <SeoHead title={document.title} description={document.description} />

      <PageLayout>
        <OfficialBoardDocumentPageContent document={document} />
      </PageLayout>
    </GeneralContextProvider>
  )
}

export default OfficialBoardPage

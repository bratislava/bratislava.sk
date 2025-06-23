import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import * as React from 'react'

import PageLayout from '@/src/components/layouts/PageLayout'
import DocumentPageContent from '@/src/components/page-contents/DocumentPageContent'
import { GeneralContextProvider } from '@/src/components/providers/GeneralContextProvider'
import { DocumentEntityFragment, GeneralQuery } from '@/src/services/graphql'
import { client } from '@/src/services/graphql/gql'
import { NOT_FOUND } from '@/src/utils/consts'
import { useTitle } from '@/src/utils/useTitle'

type PageProps = {
  general: GeneralQuery
  document: DocumentEntityFragment
}

type StaticParams = {
  slug: string
}

// TODO
export const getStaticPaths: GetStaticPaths<StaticParams> = async () => {
  // const { articles } = await client.ArticlesStaticPaths({ limit: 30 })
  //
  // const paths = (articles?.data ?? [])
  //   .filter((article) => article?.attributes?.slug && article?.attributes?.locale)
  //   .map((article) => ({
  //     params: {
  //       // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion,@typescript-eslint/no-non-null-assertion
  //       slug: article.attributes!.slug!,
  //     },
  //     // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion,@typescript-eslint/no-non-null-assertion
  //     locale: article.attributes!.locale!,
  //   }))

  // // eslint-disable-next-line no-console
  // console.log(`GENERATED STATIC PATHS FOR ${paths.length} SLUGS - ARTICLES`)

  return { paths: [], fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<PageProps, StaticParams> = async ({
  locale,
  params,
}) => {
  const slug = params?.slug

  // eslint-disable-next-line no-console
  console.log(`Revalidating document ${locale === 'en' ? '/en' : ''}/dokumenty/${slug}`)

  if (!slug || !locale) {
    return NOT_FOUND
  }

  const [{ documents }, general, translations] = await Promise.all([
    client.DocumentBySlug({ slug }),
    client.General({ locale }),
    serverSideTranslations(locale),
  ])

  const document = documents?.data[0]
  if (!document) {
    return NOT_FOUND
  }

  return {
    props: {
      general,
      document,
      ...translations,
    },
    revalidate: 10,
  }
}

const Page = ({ general, document }: PageProps) => {
  const { title: documentTitle } = document.attributes ?? {}

  const title = useTitle(documentTitle)

  return (
    <GeneralContextProvider general={general}>
      <Head>
        <title>{title}</title>
      </Head>
      <PageLayout>
        <DocumentPageContent document={document} />
      </PageLayout>
    </GeneralContextProvider>
  )
}

export default Page

import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import * as React from 'react'

import PageLayout from '@/src/components/layouts/PageLayout'
import InbaArticlePageContent from '@/src/components/page-contents/InbaArticlePageContent'
import { GeneralContextProvider } from '@/src/components/providers/GeneralContextProvider'
import { GeneralQuery, InbaArticleEntityFragment } from '@/src/services/graphql'
import { client } from '@/src/services/graphql/gql'
import { NOT_FOUND } from '@/src/utils/consts'
import { useTitle } from '@/src/utils/useTitle'

type PageProps = {
  general: GeneralQuery
  inbaArticle: InbaArticleEntityFragment
}

type StaticParams = {
  slug: string
}

export const getStaticPaths: GetStaticPaths<StaticParams> = async () => {
  const { inbaArticles } = await client.InbaArticlesStaticPaths()

  const paths = inbaArticles
    .filter((inbaArticle) => inbaArticle?.slug && inbaArticle?.locale)
    .map((inbaArticle) => ({
      params: {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion,@typescript-eslint/no-non-null-assertion
        slug: inbaArticle!.slug!,
      },
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion,@typescript-eslint/no-non-null-assertion
      locale: inbaArticle!.locale!,
    }))

  // eslint-disable-next-line no-console
  console.log(`GENERATED STATIC PATHS FOR ${paths.length} SLUGS - INBA ARTICLES`)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<PageProps, StaticParams> = async ({
  locale,
  params,
}) => {
  const slug = params?.slug

  // eslint-disable-next-line no-console
  console.log(`Revalidating inba article ${locale === 'en' ? '/en' : ''}/inba/clanky/${slug}`)

  if (!slug || !locale) {
    return NOT_FOUND
  }

  const [{ inbaArticles }, general, translations] = await Promise.all([
    client.InbaArticleBySlug({
      slug,
      locale,
    }),
    client.General({ locale }),
    serverSideTranslations(locale),
  ])

  const inbaArticle = inbaArticles[0]
  if (!inbaArticle) {
    return NOT_FOUND
  }

  return {
    props: {
      general,
      slug,
      inbaArticle,
      ...translations,
    },
    revalidate: 10,
  }
}

const Page = ({ general, inbaArticle }: PageProps) => {
  const { title: inbaArticleTitle, perex } = inbaArticle ?? {}

  const title = useTitle(inbaArticleTitle)

  return (
    <GeneralContextProvider general={general}>
      <Head>
        <title>{title}</title>
        {perex && <meta name="description" content={perex} />}
      </Head>
      <PageLayout>
        <InbaArticlePageContent inbaArticle={inbaArticle} />
      </PageLayout>
    </GeneralContextProvider>
  )
}

export default Page

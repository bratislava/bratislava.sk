import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import * as React from 'react'

import PageLayout from '@/src/components/layouts/PageLayout'
import ArticlePageContent from '@/src/components/page-contents/ArticlePageContent'
import { GeneralContextProvider } from '@/src/components/providers/GeneralContextProvider'
import { ArticleEntityFragment, GeneralQuery } from '@/src/services/graphql'
import { client } from '@/src/services/graphql/gql'
import { GlobalCategoryColorProvider } from '@/src/utils/colors'
import { NOT_FOUND } from '@/src/utils/consts'
import { useTitle } from '@/src/utils/useTitle'

type PageProps = {
  general: GeneralQuery
  article: ArticleEntityFragment
}

type StaticParams = {
  slug: string
}

export const getStaticPaths: GetStaticPaths<StaticParams> = async () => {
  const { articles } = await client.ArticlesStaticPaths({ limit: 30 })

  const paths = (articles?.data ?? [])
    .filter((article) => article?.attributes?.slug && article?.attributes?.locale)
    .map((article) => ({
      params: {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion,@typescript-eslint/no-non-null-assertion
        slug: article.attributes!.slug!,
      },
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion,@typescript-eslint/no-non-null-assertion
      locale: article.attributes!.locale!,
    }))

  // eslint-disable-next-line no-console
  console.log(`GENERATED STATIC PATHS FOR ${paths.length} SLUGS - ARTICLES`)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<PageProps, StaticParams> = async ({
  locale,
  params,
}) => {
  const slug = params?.slug

  // eslint-disable-next-line no-console
  console.log(`Revalidating article ${locale === 'en' ? '/en' : ''}/spravy/${slug}`)

  if (!slug || !locale) {
    return NOT_FOUND
  }

  const [{ articles }, general, translations] = await Promise.all([
    client.ArticleBySlug({ slug, locale }),
    client.General({ locale }),
    serverSideTranslations(locale),
  ])

  const article = articles?.data[0]
  if (!article) {
    return NOT_FOUND
  }

  return {
    props: {
      general,
      slug,
      article,
      ...translations,
    },
    revalidate: 10,
  }
}

const Page = ({ general, article }: PageProps) => {
  const { title: articleTitle, perex } = article.attributes ?? {}

  const title = useTitle(articleTitle)

  return (
    <GeneralContextProvider general={general}>
      <Head>
        <title>{title}</title>
        {perex && <meta name="description" content={perex} />}
      </Head>
      <GlobalCategoryColorProvider
        color={article?.attributes?.tag?.data?.attributes?.pageCategory?.data?.attributes?.color}
      />
      <PageLayout>
        <ArticlePageContent article={article} />
      </PageLayout>
    </GeneralContextProvider>
  )
}

export default Page

import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import * as React from 'react'

import PageLayout from '@/components/layouts/PageLayout'
import InbaArticlePageContent from '@/components/pages/InbaArticlePageContent'
import { GeneralQuery, InbaArticleEntityFragment } from '@/services/graphql'
import { client } from '@/services/graphql/gql'
import { GeneralContextProvider } from '@/utils/generalContext'
import { useTitle } from '@/utils/useTitle'

type PageProps = {
  general: GeneralQuery
  inbaArticle: InbaArticleEntityFragment
}

type StaticParams = {
  slug: string
}

export const getStaticPaths: GetStaticPaths<StaticParams> = async () => {
  const { inbaArticles } = await client.InbaArticlesStaticPaths()

  const paths = (inbaArticles?.data ?? [])
    .filter((inbaArticle) => inbaArticle?.attributes?.slug && inbaArticle?.attributes?.locale)
    .map((inbaArticle) => ({
      params: {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion,@typescript-eslint/no-non-null-assertion
        slug: inbaArticle.attributes!.slug!,
      },
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion,@typescript-eslint/no-non-null-assertion
      locale: inbaArticle.attributes!.locale!,
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

  if (!slug || !locale) return { notFound: true }

  const [{ inbaArticles }, general, messages] = await Promise.all([
    client.InbaArticleBySlug({
      slug,
      locale,
    }),
    client.General({ locale }),
    import(`../../../messages/${locale}.json`),
  ])

  const inbaArticle = inbaArticles?.data[0]
  if (!inbaArticle) return { notFound: true }

  return {
    props: {
      general,
      slug,
      inbaArticle,
      messages: messages.default,
    },
    revalidate: 10,
  }
}

const Page = ({ general, inbaArticle }: PageProps) => {
  const { title: inbaArticleTitle, perex } = inbaArticle.attributes ?? {}

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

import { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import * as React from 'react'

import SeoHead from '@/src/components/common/SeoHead/SeoHead'
import PageLayout from '@/src/components/layouts/PageLayout'
import ArticlePageContent from '@/src/components/page-contents/ArticlePageContent'
import { AdminGroupsContextProvider } from '@/src/components/providers/AdminGroupsContextProvider'
import { GeneralContextProvider } from '@/src/components/providers/GeneralContextProvider'
import { ArticleEntityFragment, GeneralQuery } from '@/src/services/graphql'
import { client } from '@/src/services/graphql/gql'
import { NOT_FOUND } from '@/src/utils/consts'

type PageProps = {
  general: GeneralQuery
  article: ArticleEntityFragment
}

type StaticParams = {
  slug: string
}

export const getStaticPaths: GetStaticPaths<StaticParams> = async () => {
  const { articles } = await client.ArticlesStaticPaths({ limit: 30, locale: 'sk' })

  const paths = articles
    .filter((article) => article?.slug && article?.locale)
    .map((article) => ({
      params: {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        slug: article!.slug!,
      },

      locale: article!.locale!,
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

  const article = articles[0]
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
  const { title, perex } = article ?? {}

  return (
    <GeneralContextProvider general={general}>
      <AdminGroupsContextProvider adminGroups={[]}>
        <SeoHead title={title} description={perex} />

        <PageLayout>
          <ArticlePageContent article={article} />
        </PageLayout>
      </AdminGroupsContextProvider>
    </GeneralContextProvider>
  )
}

export default Page

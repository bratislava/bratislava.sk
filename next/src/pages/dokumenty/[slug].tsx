import { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import * as React from 'react'

import SeoHead from '@/src/components/common/SeoHead/SeoHead'
import PageLayout from '@/src/components/layouts/PageLayout'
import AssetPageContent from '@/src/components/page-contents/AssetPageContent'
import { AdminGroupsContextProvider } from '@/src/components/providers/AdminGroupsContextProvider'
import { GeneralContextProvider } from '@/src/components/providers/GeneralContextProvider'
import { AssetEntityFragment, GeneralQuery } from '@/src/services/graphql'
import { client } from '@/src/services/graphql/gql'
import { NOT_FOUND } from '@/src/utils/consts'

type PageProps = {
  general: GeneralQuery
  asset: AssetEntityFragment
}

type StaticParams = {
  slug: string
}

// TODO
export const getStaticPaths: GetStaticPaths<StaticParams> = async () => {
  // const { articles } = await client.ArticlesStaticPaths({ limit: 30 })

  // const paths = articles
  //   .filter((article) => article?.slug && article?.locale)
  //   .map((article) => ({
  //     params: {
  //       // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion,@typescript-eslint/no-non-null-assertion
  //       slug: article!.slug!,
  //     },
  //     // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion,@typescript-eslint/no-non-null-assertion
  //     locale: article!.locale!,
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
  console.log(`Revalidating asset ${locale === 'en' ? '/en' : ''}/dokumenty/${slug}`)

  if (!slug || !locale) {
    return NOT_FOUND
  }

  const [{ assets }, general, translations] = await Promise.all([
    client.AssetBySlug({ slug }),
    client.General({ locale }),
    serverSideTranslations(locale),
  ])

  const asset = assets[0]
  if (!asset) {
    return NOT_FOUND
  }

  return {
    props: {
      general,
      asset,
      ...translations,
    },
    revalidate: 10,
  }
}

const Page = ({ general, asset }: PageProps) => {
  const { title } = asset ?? {}

  return (
    <GeneralContextProvider general={general}>
      <AdminGroupsContextProvider adminGroups={[]}>
        <SeoHead title={title} />

        <PageLayout>
          <AssetPageContent asset={asset} />
        </PageLayout>
      </AdminGroupsContextProvider>
    </GeneralContextProvider>
  )
}

export default Page

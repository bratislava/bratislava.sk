import { GeneralQuery, PageEntityFragment } from '@bratislava/strapi-sdk-homepage'
import PageLayout from '@components/layouts/PageLayout'
import GeneralPageContent from '@components/pages/generalPageContent'
import { GeneralContextProvider } from '@utils/generalContext'
import { client } from '@utils/gql'
import { hasAttributes } from '@utils/isDefined'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import * as React from 'react'

import PageContextProvider from '../components/layouts/PageContextProvider'

type PageProps = {
  general: GeneralQuery
  page: PageEntityFragment
}

type StaticParams = {
  slug: string[]
}

export const getStaticPaths: GetStaticPaths<StaticParams> = async () => {
  // English pages are not generated.
  const { pages } = await client.PagesStaticPaths()

  const paths = (pages?.data ?? [])
    .filter((page) => page?.attributes?.slug)
    .map((page) => ({
      params: {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion,@typescript-eslint/no-non-null-assertion
        slug: page.attributes!.slug!.split('/'),
      },
    }))

  console.log(`GENERATED STATIC PATHS FOR ${paths.length} SLUGS - PAGES`)
  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<PageProps, StaticParams> = async ({
  locale,
  params,
}) => {
  const slug = params?.slug

  // eslint-disable-next-line no-console
  console.log(`Revalidating page ${slug}`)

  if (!slug || !locale) return { notFound: true }

  const [{ pages }, general, translations] = await Promise.all([
    client.PageBySlug({
      slug: slug.join('/'),
      locale,
    }),
    client.General({ locale }),
    serverSideTranslations(locale, ['common', 'minimum-calculator', 'newsletter']),
  ])

  const page = pages?.data?.[0]
  if (!page) return { notFound: true }

  return {
    props: {
      general,
      page,
      ...translations,
    },
    revalidate: 10,
  }
}

const Page = ({ general, page }: PageProps) => {
  const localizations = page?.attributes?.localizations?.data
    .filter(hasAttributes)
    .map((locale) => {
      return {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        locale: locale.attributes.locale!,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        slug: locale.attributes.slug!,
      }
    })

  const { slug, title, metaDiscription } = page?.attributes ?? {}

  return (
    <GeneralContextProvider general={general}>
      <PageContextProvider slug={slug ?? ''} localizations={localizations}>
        <Head>
          {/* TODO: Use translation. */}
          {title && <title>{title} – Bratislava.sk</title>}
          {metaDiscription && <meta name="description" content={metaDiscription} />}
        </Head>
        <PageLayout>
          <GeneralPageContent page={page} />
        </PageLayout>
      </PageContextProvider>
    </GeneralContextProvider>
  )
}

export default Page

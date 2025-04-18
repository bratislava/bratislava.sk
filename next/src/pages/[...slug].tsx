import { DehydratedState, HydrationBoundary } from '@tanstack/react-query'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'

import PageLayout from '@/src/components/layouts/PageLayout'
import GeneralPageContent from '@/src/components/page-contents/GeneralPageContent'
import { GeneralContextProvider } from '@/src/components/providers/GeneralContextProvider'
import {
  LanguageCode,
  Localizations,
  LocalizationsProvider,
} from '@/src/components/providers/LocalizationsProvider'
import { GeneralQuery, PageEntityFragment } from '@/src/services/graphql'
import { client } from '@/src/services/graphql/gql'
import { GlobalCategoryColorProvider } from '@/src/utils/colors'
import { isDefined } from '@/src/utils/isDefined'
import { prefetchPageSections } from '@/src/utils/prefetchPageSections'
import { useTitle } from '@/src/utils/useTitle'

type PageProps = {
  general: GeneralQuery
  page: PageEntityFragment
  dehydratedState: DehydratedState
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

  // eslint-disable-next-line no-console
  console.log(`GENERATED STATIC PATHS FOR ${paths.length} SLUGS - PAGES`)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<PageProps, StaticParams> = async ({
  locale,
  params,
}) => {
  const slug = params?.slug

  // eslint-disable-next-line no-console
  console.log(`Revalidating page ${locale === 'en' ? '/en' : ''}/${slug?.join('/')}`)

  if (!slug || !locale) return { notFound: true }

  const [{ pages }, general, translations] = await Promise.all([
    client.PageBySlug({
      slug: slug.join('/'),
      locale,
    }),
    client.General({ locale }),
    serverSideTranslations(locale),
  ])

  const page = pages?.data?.[0]
  if (!page) return { notFound: true }

  const dehydratedState = await prefetchPageSections(page, locale)

  return {
    props: {
      general,
      page,
      ...translations,
      dehydratedState,
    },
    revalidate: 10,
  }
}

const Page = ({ general, page, dehydratedState }: PageProps) => {
  const {
    slug,
    title: pageTitle,
    metaDiscription,
    subtext,
    keywords,
    locale,
  } = page?.attributes ?? {}

  const localization = page?.attributes?.localizations?.data?.[0]
  const localizations = Object.fromEntries(
    [
      [locale as LanguageCode, `/${slug}`] as const,
      localization
        ? ([
            localization?.attributes?.locale as LanguageCode,
            `/${localization?.attributes?.slug}`,
          ] as const)
        : null,
    ].filter(isDefined),
  ) as Localizations

  const title = useTitle(pageTitle)

  return (
    <HydrationBoundary state={dehydratedState}>
      <GeneralContextProvider general={general}>
        <LocalizationsProvider localizations={localizations}>
          <Head>
            <title>{title}</title>
            <meta name="description" content={metaDiscription ?? subtext ?? ''} />
            <meta name="keywords" content={keywords ?? ''} />
          </Head>
          <GlobalCategoryColorProvider
            color={page?.attributes?.pageCategory?.data?.attributes?.color}
          />
          <PageLayout>
            <GeneralPageContent page={page} />
          </PageLayout>
        </LocalizationsProvider>
      </GeneralContextProvider>
    </HydrationBoundary>
  )
}

export default Page

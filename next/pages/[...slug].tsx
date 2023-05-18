import { GeneralQuery, PageEntityFragment } from '@backend/graphql'
import { client } from '@backend/graphql/gql'
import PageLayout from '@components/layouts/PageLayout'
import GeneralPageContent from '@components/pages/generalPageContent'
import {
  LanguageCode,
  Localizations,
  LocalizationsProvider,
} from '@components/providers/LocalizationsProvider'
import { DehydratedState, Hydrate } from '@tanstack/react-query'
import { GlobalCategoryColorProvider } from '@utils/colors'
import { GeneralContextProvider } from '@utils/generalContext'
import { isDefined } from '@utils/isDefined'
import { prefetchPageSections } from '@utils/prefetchPageSections'
import { useTitle } from '@utils/useTitle'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'

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

  console.log(`GENERATED STATIC PATHS FOR ${paths.length} SLUGS - PAGES`)
  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<PageProps, StaticParams> = async ({
  locale,
  params,
}) => {
  const slug = params?.slug

  // eslint-disable-next-line no-console
  console.log(`Revalidating ${locale} page ${slug?.join('/')}`)

  if (!slug || !locale) return { notFound: true }

  const [{ pages }, general, messages] = await Promise.all([
    client.PageBySlug({
      slug: slug.join('/'),
      locale,
    }),
    client.General({ locale }),
    import(`../messages/${locale}.json`),
  ])

  const page = pages?.data?.[0]
  if (!page) return { notFound: true }

  const dehydratedState = await prefetchPageSections(page, locale)

  return {
    props: {
      general,
      page,
      messages: messages.default,
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
    <Hydrate state={dehydratedState}>
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
    </Hydrate>
  )
}

export default Page

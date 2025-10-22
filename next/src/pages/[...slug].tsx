import { DehydratedState, HydrationBoundary } from '@tanstack/react-query'
import { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'

import SeoHead from '@/src/components/common/SeoHead/SeoHead'
import PageLayout from '@/src/components/layouts/PageLayout'
import GeneralPageContent from '@/src/components/page-contents/GeneralPageContent'
import { AdminGroupsContextProvider } from '@/src/components/providers/AdminGroupsContextProvider'
import { GeneralContextProvider } from '@/src/components/providers/GeneralContextProvider'
import {
  LanguageCode,
  Localizations,
  LocalizationsProvider,
} from '@/src/components/providers/LocalizationsProvider'
import { GeneralQuery, PageEntityFragment } from '@/src/services/graphql'
import { client } from '@/src/services/graphql/gql'
import { GlobalCategoryColorProvider } from '@/src/utils/colors'
import { NOT_FOUND } from '@/src/utils/consts'
import { isDefined } from '@/src/utils/isDefined'
import { prefetchPageSections } from '@/src/utils/prefetchPageSections'

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

  const paths = pages
    .filter((page) => page?.slug)
    .map((page) => ({
      params: {
         
        slug: page!.slug!.split('/'),
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
  const slugJoined = slug?.join('/')

  // eslint-disable-next-line no-console
  console.log(`Revalidating page ${locale === 'en' ? '/en' : ''}/${slugJoined}`)

  if (!slug || !slugJoined || !locale) {
    return NOT_FOUND
  }

  const [{ pages }, { pages: aliasPages, articles: aliasArticles }, general, translations] =
    await Promise.all([
      client.PageBySlug({ slug: slugJoined, locale }),
      client.PageRedirectByAlias({ alias: slugJoined, locale }),
      client.General({ locale }),
      serverSideTranslations(locale),
    ])

  let redirectPath = ''

  // Check if an Article with this alias exists
  const aliasArticleSlug = aliasArticles[0]?.slug
  if (aliasArticleSlug) {
    // Get the full path for the article
    redirectPath = `/spravy/${aliasArticleSlug}`
  }

  // Check if a Page with this alias exists
  const aliasPageSlug = aliasPages[0]?.slug
  if (aliasPageSlug) {
    // Get the full path for the page by its slug
    redirectPath = `/${aliasPageSlug}`
  }

  // Note that alias in pages and articles are unique only within their own content type
  // If there are both a page and an article with the same alias, the page will override the `redirectPath` as it's checked as last
  if (redirectPath) {
    return {
      redirect: {
        // For SK locale, prevent unnecessary redirects from `/sk/[redirectPath]` to `/[redirectPath]` - maybe it's not needed, but it's fewer redirects
        // Other locales: /en/[alias] -> /en/[redirectPath]
        destination: locale === 'sk' ? redirectPath : `/${locale}/${redirectPath}`,
        permanent: false,
      },
    }
  }

  const page = pages[0]
  if (!page) {
    return NOT_FOUND
  }

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
  const { slug, title, metaDiscription, subtext, keywords, locale, pageColor, adminGroups } = page

  const localization = page.localizations[0]
  const localizations = Object.fromEntries(
    [
      [locale as LanguageCode, `/${slug}`] as const,
      localization
        ? ([localization.locale as LanguageCode, `/${localization.slug}`] as const)
        : null,
    ].filter(isDefined),
  ) as Localizations

  return (
    <HydrationBoundary state={dehydratedState}>
      <GeneralContextProvider general={general}>
        <AdminGroupsContextProvider adminGroups={adminGroups.filter(isDefined)}>
          <LocalizationsProvider localizations={localizations}>
            <SeoHead title={title} description={metaDiscription ?? subtext} keywords={keywords} />
            <GlobalCategoryColorProvider color={pageColor} />
            <PageLayout>
              <GeneralPageContent page={page} />
            </PageLayout>
          </LocalizationsProvider>
        </AdminGroupsContextProvider>
      </GeneralContextProvider>
    </HydrationBoundary>
  )
}

export default Page

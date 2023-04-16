import { GeneralQuery, PageEntityFragment } from '@bratislava/strapi-sdk-homepage'
import PageLayout from '@components/layouts/PageLayout'
import GeneralPageContent from '@components/pages/generalPageContent'
import {
  LanguageCode,
  Localizations,
  LocalizationsProvider,
} from '@components/providers/LocalizationsProvider'
import { GlobalCategoryColorProvider } from '@utils/colors'
import { GeneralContextProvider } from '@utils/generalContext'
import { client } from '@utils/gql'
import { isDefined } from '@utils/isDefined'
import { useTitle } from '@utils/useTitle'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'

import * as React from 'react'

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

  const [{ pages }, general, messages] = await Promise.all([
    client.PageBySlug({
      slug: slug.join('/'),
      locale,
    }),
    client.General({ locale }),
    import(`../messages/${locale}.json`)
  ])

  const page = pages?.data?.[0]
  if (!page) return { notFound: true }

  console.log(messages)

  return {
    props: {
      general,
      page,
      messages: messages.default    },
    revalidate: 10,
  }
}

const Page = ({ general, page }: PageProps) => {
  const { slug, title: pageTitle, metaDiscription, locale } = page?.attributes ?? {}

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
    <GeneralContextProvider general={general}>
      <LocalizationsProvider localizations={localizations}>
        <Head>
          <title>{title}</title>
          {metaDiscription && <meta name="description" content={metaDiscription} />}
        </Head>
        <GlobalCategoryColorProvider
          color={page?.attributes?.pageCategory?.data?.attributes?.color}
        />
        <PageLayout>
          <GeneralPageContent page={page} />
        </PageLayout>
      </LocalizationsProvider>
    </GeneralContextProvider>
  )
}

export default Page

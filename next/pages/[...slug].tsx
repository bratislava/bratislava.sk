// @ts-strict-ignore
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { GeneralPageFragment, GeneralQuery, PageBySlugQuery } from '@bratislava/strapi-sdk-homepage'
import { GeneralContextProvider } from '@utils/generalContext'
import { client } from '@utils/gql'
import { parseFooter } from '@utils/page'
import { arrayify, isPresent } from '@utils/utils'
import { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import PageContextProvider from '../components/layouts/PageContextProvider'
import GeneralPage from '../components/pages/generalPage'

export const getStaticPaths: GetStaticPaths = async () => {
  // TODO localizations
  const { pages } = await client.PagesStaticPaths()
  const paths = (pages?.data ?? []).map(({ attributes }) => ({
    params: {
      slug: attributes?.slug?.split('/'),
    },
  }))

  console.log(`GENERATED STATIC PATHS FOR ${paths.length} SLUGS`)
  return { paths, fallback: 'blocking' }
}
export const getStaticProps: GetStaticProps = async (ctx) => {
  console.log(`Revalidating ${ctx.params?.slug}`)
  const locale = ctx.locale ?? 'sk'
  const slug = arrayify(ctx.params.slug).join('/')

  const { pages, footer } = await client.PageBySlug({
    slug,
    locale,
  })

  if (!pages?.data?.[0]) return { notFound: true } as { notFound: true }

  const pageTranslations = ['common']

  if (
    pages?.data[0]?.attributes?.sections
      ?.filter(isPresent)
      .find((section) => section.__typename === 'ComponentSectionsCalculator')
  ) {
    pageTranslations.push('minimum-calculator')
  }
  if (
    pages?.data[0]?.attributes?.sections
      ?.filter(isPresent)
      .find((section) => section.__typename === 'ComponentSectionsNewsletter')
  ) {
    pageTranslations.push('newsletter')
  }

  const general = await client.General({ locale })

  return {
    props: {
      general,
      slug,
      page: pages,
      footer,
      ...(await serverSideTranslations(locale, pageTranslations)),
    },
    revalidate: 10,
  }
}

interface GenericPageProps {
  general: GeneralQuery
  slug: string
  page: GeneralPageFragment
  footer: PageBySlugQuery['footer']
}

const Page = ({ general, page, footer }: GenericPageProps) => {
  const parsedFooter = parseFooter(footer?.data?.attributes)
  const localizations = page?.data?.[0]?.attributes?.localizations.data.map((locale) => {
    return {
      locale: locale.attributes.locale,
      slug: locale.attributes.slug,
    }
  })

  return (
    <GeneralContextProvider general={general}>
      <PageContextProvider
        locale={page?.data?.[0].attributes?.locale ?? 'sk'}
        slug={page?.data?.[0]?.attributes.slug ?? ''}
        localizations={localizations}
      >
        <GeneralPage pages={page} footer={parsedFooter} />
      </PageContextProvider>
    </GeneralContextProvider>
  )
}

export default Page

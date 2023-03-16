// @ts-strict-ignore
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  GeneralPageFragment,
  MainMenuItemFragment,
  PageBySlugQuery,
} from '@bratislava/strapi-sdk-homepage'
import { client } from '@utils/gql'
import { parseFooter, parseMainMenu } from '@utils/page'
import { arrayify, isPresent } from '@utils/utils'
import { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import PageWrapper from '../components/layouts/PageWrapper'
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

  const { pages, footer, mainMenu } = await client.PageBySlug({
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

  return {
    props: {
      slug,
      page: pages,
      footer,
      mainMenu,
      ...(await serverSideTranslations(locale, pageTranslations)),
    },
    revalidate: 10,
  }
}

interface GenericPageProps {
  slug: string
  page: GeneralPageFragment
  footer: PageBySlugQuery['footer']
  mainMenu: MainMenuItemFragment
}

const Page = ({ page, footer, mainMenu }: GenericPageProps) => {
  const parsedFooter = parseFooter(footer?.data?.attributes)
  const menuItems = parseMainMenu(mainMenu)
  const localizations = page?.data?.[0]?.attributes?.localizations.data.map((locale) => {
    return {
      locale: locale.attributes.locale,
      slug: locale.attributes.slug,
    }
  })

  return (
    <PageWrapper
      locale={page?.data?.[0].attributes?.locale ?? 'sk'}
      slug={page?.data?.[0]?.attributes.slug ?? ''}
      localizations={localizations}
    >
      <GeneralPage pages={page} footer={parsedFooter} menuItems={menuItems} />
    </PageWrapper>
  )
}

export default Page

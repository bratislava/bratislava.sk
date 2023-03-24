// @ts-strict-ignore
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  GeneralPageFragment,
  GeneralQuery,
  MainMenuItemFragment,
  MenuQuery,
  PageBySlugQuery,
} from '@bratislava/strapi-sdk-homepage'
import { getParsedMenus } from '@bratislava/ui-bratislava/NavMenu/getParsedMenus'
import { GeneralContextProvider } from '@utils/generalContext'
import { client } from '@utils/gql'
import { parseFooter, parseMainMenu } from '@utils/page'
import { arrayify, isPresent } from '@utils/utils'
import { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useMemo } from 'react'

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

  const { menu } = await client.Menu({ locale })

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
      mainMenu,
      menu,
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
  mainMenu: MainMenuItemFragment
  menu: MenuQuery['menu']
}

const Page = ({ general, page, footer, mainMenu, menu }: GenericPageProps) => {
  const parsedFooter = parseFooter(footer?.data?.attributes)
  const menuItems = parseMainMenu(mainMenu)
  const localizations = page?.data?.[0]?.attributes?.localizations.data.map((locale) => {
    return {
      locale: locale.attributes.locale,
      slug: locale.attributes.slug,
    }
  })

  const menusParsed = useMemo(() => {
    return getParsedMenus(menu)
  }, [menu])

  return (
    <GeneralContextProvider general={general}>
      <PageWrapper
        locale={page?.data?.[0].attributes?.locale ?? 'sk'}
        slug={page?.data?.[0]?.attributes.slug ?? ''}
        localizations={localizations}
      >
        <GeneralPage pages={page} footer={parsedFooter} menuItems={menuItems} menus={menusParsed} />
      </PageWrapper>
    </GeneralContextProvider>
  )
}

export default Page

import BusinessIcon from '@assets/images/account/business-icon.svg'
import HelpIcon from '@assets/images/account/help-icon.svg'
import HomeIcon from '@assets/images/account/home-icon.svg'
import PaymentIcon from '@assets/images/account/payment-icon.svg'
import { arrayify, forceString, shouldSkipStaticPaths } from '@utils/utils'
import HelpSection from 'components/forms/segments/AccountSections/HelpSection/HelpSection'
import IntroSection from 'components/forms/segments/AccountSections/IntroSection/IntroSection'
import PaymentSection from 'components/forms/segments/AccountSections/PaymentSection/PaymentSection'
import ServicesSection from 'components/forms/segments/AccountSections/ServicesSection/ServicesSection'
import { SectionItemBase } from 'components/forms/types/AccountTypes'
import AccountPageLayout from 'components/layouts/AccountPageLayout'
import PageWrapper from 'components/layouts/PageWrapper'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ReactNode } from 'react'

// TODO getStaticPaths
export const getStaticPaths: GetStaticPaths = async (ctx) => {
  let paths: { params: { menu: string } }[] = []
  if (shouldSkipStaticPaths()) return { paths, fallback: 'blocking' }

  // const { blogPosts: blogPostSk } = await client.BlogPostsStaticPaths({
  //   locale: ctx.locales[0],
  // })
  // const { blogPosts: blogPostEn } = await client.BlogPostsStaticPaths({
  //   locale: ctx.locales[1],
  // })

  // const blogPosts = blogPostEn?.data.concat(blogPostSk?.data ?? [])
  const blogPosts = ['test', 'payment']
  if (blogPosts) {
    paths = blogPosts.map((blogPost) => ({
      params: {
        menu: blogPost,
      },
    }))
  }

  console.log(`GENERATED STATIC PATHS FOR ${paths.length} SLUGS - BLOGS`)
  return { paths, fallback: 'blocking' }
}

// TODO getStaticProps
export const getStaticProps: GetStaticProps = async (ctx) => {
  console.log(`Revalidating ${ctx.params?.menu}`)
  const { locale } = ctx
  const slug = arrayify(ctx.params?.menu)[0]

  if (!slug) return { notFound: true }

  // const { blogPosts } = await client.BlogPostBySlug({
  //   slug,
  //   locale,
  // })

  // const { pageCategories: mainMenu } = await client.MainMenu({
  //   locale,
  // })

  // const { footer } = await client.Footer({
  //   locale,
  // })

  // const blogPostBySlug = blogPosts?.data[0]

  // if (!blogPostBySlug) return { notFound: true }

  const pageTranslations = ['common', 'account']

  return {
    props: {
      slug,
      // post: blogPosts,
      // footer,
      // mainMenu,
      locale,
      ...(await serverSideTranslations(locale, pageTranslations)),
    },
    revalidate: 14_400, // revalidate after 4 hours
  }
}

const SECTION_INTRO_LINK = 'uvod'
const SECTION_SERVICES_LINK = 'mestske-sluzby'
const SECTION_PAYMENT_LINK = 'dane-a-poplatky'
const SECTION_HELP_LINK = 'mam-problem'

const sectionsHandler = (link: string): ReactNode => {
  switch (link) {
    case SECTION_INTRO_LINK:
      return <IntroSection />
    case SECTION_SERVICES_LINK:
      return <ServicesSection />
    case SECTION_PAYMENT_LINK:
      return <PaymentSection />
    case SECTION_HELP_LINK:
      return <HelpSection />

    default:
      return <IntroSection />
  }
}

const AccountPage = ({ locale }) => {
  const { t } = useTranslation('account', { useSuspense: false })
  const router = useRouter()

  const sectionsList: SectionItemBase[] = [
    { id: 0, title: t('account_section_intro'), icon: <HomeIcon />, link: SECTION_INTRO_LINK },
    {
      id: 1,
      title: t('account_section_services'),
      icon: <BusinessIcon />,
      link: SECTION_SERVICES_LINK,
    },
    {
      id: 2,
      title: t('account_section_payment'),
      icon: <PaymentIcon />,
      link: SECTION_PAYMENT_LINK,
    },
    { id: 3, title: t('account_section_help'), icon: <HelpIcon />, link: SECTION_HELP_LINK },
  ]

  let escapedSlug = ''
  const formSlug = forceString(router.query.menu)

  // Using string.match because CodeQL tools ignore regex.test as SSRF prevention.
  // eslint-disable-next-line unicorn/prefer-regexp-test
  if (formSlug.match(/^[\da-z-]+$/)) {
    escapedSlug = formSlug
  }

  const pageSlug = `account/${escapedSlug}`

  return (
    <PageWrapper
      locale={locale}
      localizations={[
        { locale: 'sk', slug: pageSlug },
        { locale: 'en', slug: pageSlug },
      ]}
    >
      <AccountPageLayout sectionsList={sectionsList}>
        {sectionsHandler(escapedSlug)}
      </AccountPageLayout>
    </PageWrapper>
  )
}

export default AccountPage

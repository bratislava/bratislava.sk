import { EFormValue } from '@backend/forms'
import { getEform } from '@backend/utils/forms'
import { PageHeader } from '@bratislava/ui-bratislava/index'
import { client } from '@utils/gql'
import { pageStyle, parseFooter, parseMainMenu } from '@utils/page'
import { AsyncServerProps } from '@utils/types'
import { arrayify, forceString, isProductionDeployment, shouldSkipStaticPaths } from '@utils/utils'
import AccountPageLayout from 'components/layouts/AccountPageLayout'
import BasePageLayout from 'components/layouts/BasePageLayout'
import PageWrapper from 'components/layouts/PageWrapper'
import { GetServerSidePropsContext, GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  let paths: { params: { slug: string } }[] = []
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
        slug: blogPost,
      },
    }))
  }

  console.log(`GENERATED STATIC PATHS FOR ${paths.length} SLUGS - BLOGS`)
  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  console.log(`Revalidating ${ctx.params?.menu}`)
  const { locale } = ctx
  const slug = arrayify(ctx.params?.menu)[0]

  console.log('slug', slug)
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

  const pageTranslations = ['common']

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

const AccountPage = ({ footer, mainMenu, locale }) => {
  const router = useRouter()

  const menuItems = mainMenu ? parseMainMenu(mainMenu) : []
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
      <AccountPageLayout>TODO</AccountPageLayout>
    </PageWrapper>
  )
}

export default AccountPage

// @ts-strict-ignore
/* eslint-disable unicorn/consistent-destructuring */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import {
  BlogPostBySlugQuery,
  FooterQuery,
  MainMenuQuery,
  MenuQuery,
} from '@bratislava/strapi-sdk-homepage'
import { getParsedMenus } from '@bratislava/ui-bratislava/NavMenu/getParsedMenus'
import { client } from '@utils/gql'
import { parseFooter, parseMainMenu } from '@utils/page'
import { arrayify } from '@utils/utils'
import { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useMemo } from 'react'

import PageWrapper from '../../components/layouts/PageWrapper'
import BlogPostPage from '../../components/pages/blogPostPage'

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  let paths: { params: { slug: string } }[] = []

  const { blogPosts: blogPostSk } = await client.BlogPostsStaticPaths({
    locale: ctx.locales[0],
  })
  const { blogPosts: blogPostEn } = await client.BlogPostsStaticPaths({
    locale: ctx.locales[1],
  })

  const blogPosts = blogPostEn?.data.concat(blogPostSk?.data ?? [])
  if (blogPosts) {
    paths = blogPosts.map((blogPost) => ({
      params: {
        slug: blogPost.attributes.slug,
      },
    }))
  }

  console.log(`GENERATED STATIC PATHS FOR ${paths.length} SLUGS - BLOGS`)
  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<BlogPostPageProps> = async (ctx) => {
  console.log(`Revalidating ${ctx.params?.slug}`)
  const { locale } = ctx
  const slug = arrayify(ctx.params?.slug)[0]

  if (!slug) return { notFound: true }

  const { blogPosts } = await client.BlogPostBySlug({
    slug,
    locale,
  })

  const { pageCategories: mainMenu } = await client.MainMenu({ locale })

  const { menu } = await client.Menu({ locale })

  console.log('MENU', menu)

  const { footer } = await client.Footer({ locale })

  const blogPostBySlug = blogPosts?.data[0]

  if (!blogPostBySlug) return { notFound: true }

  const pageTranslations = ['common']

  return {
    props: {
      slug,
      post: blogPosts,
      footer,
      mainMenu,
      menu: menu ?? null,
      locale,
      ...(await serverSideTranslations(locale, pageTranslations)),
    },
    revalidate: 10,
  }
}

interface BlogPostPageProps {
  slug: string
  locale: string
  post: NonNullable<BlogPostBySlugQuery['blogPosts']>
  footer: FooterQuery['footer']
  mainMenu: MainMenuQuery['pageCategories']
  menu: MenuQuery['menu']
}

const Page = ({ post, footer, mainMenu, menu, locale }: BlogPostPageProps) => {
  const parsedFooter = parseFooter(footer?.data?.attributes ?? {})
  const menuItems = parseMainMenu(mainMenu)

  const menusParsed = useMemo(() => {
    return getParsedMenus(menu)
  }, [menu])

  // TODO change if multilingual blogs
  return (
    <PageWrapper locale={locale} slug={post.data[0].attributes?.slug ?? ''}>
      <BlogPostPage
        post={post}
        footer={parsedFooter}
        menuItemsOld={menuItems}
        menus={menusParsed}
      />
    </PageWrapper>
  )
}

export default Page

/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable unicorn/consistent-destructuring */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { BlogPostBySlugQuery, FooterQuery, MainMenuQuery } from '@bratislava/strapi-sdk-homepage'
import { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import PageWrapper from '../../components/layouts/PageWrapper'
import BlogPostPage from '../../components/pages/blogPostPage'
import { client } from '../../utils/gql'
import { parseFooter, parseMainMenu } from '../../utils/page'
import { arrayify, shouldSkipStaticPaths } from '../../utils/utils'

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  let paths: { params: { slug: string } }[] = []
  if (shouldSkipStaticPaths()) return { paths, fallback: 'blocking' }

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

  const { pageCategories: mainMenu } = await client.MainMenu({
    locale,
  })

  const { footer } = await client.Footer({
    locale,
  })

  const blogPostBySlug = blogPosts?.data[0]

  if (!blogPostBySlug) return { notFound: true }

  const pageTranslations = ['common']
  
  return {
    props: { slug, post: blogPosts, footer, mainMenu, locale, ...(await serverSideTranslations(locale, pageTranslations)), },
    revalidate: 14_400, // revalidate after 4 hours
  }
}

interface BlogPostPageProps {
  slug: string
  locale: string
  post: NonNullable<BlogPostBySlugQuery['blogPosts']>
  footer: FooterQuery['footer']
  mainMenu: MainMenuQuery['pageCategories']
}

const Page = ({ post, footer, mainMenu, locale }: BlogPostPageProps) => {
  const parsedFooter = parseFooter(footer ?? {})
  const menuItems = parseMainMenu(mainMenu)

  // TODO change if multilingual blogs
  return (
    <PageWrapper locale={locale} slug={post.data[0].attributes?.slug ?? ''}>
      <BlogPostPage post={post} footer={parsedFooter} menuItems={menuItems} />
    </PageWrapper>
  )
}

export default Page

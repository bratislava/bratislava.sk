import { BlogPostBySlugQuery } from '@bratislava/strapi-sdk-homepage'
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next'
import PageWrapper from '../../components/layouts/PageWrapper'
import BlogPostPage from '../../components/pages/blogPostPage'
import { client } from '../../utils/gql'
import { parseFooter, parseMainMenu } from '../../utils/page'
import { arrayify, isPresent, shouldSkipStaticPaths } from '../../utils/utils'

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  let paths = []
  if (shouldSkipStaticPaths()) return { paths, fallback: 'blocking' }

  const { blogPosts: blogPostSk } = await client.BlogPostsStaticPaths({
    locale: ctx.locales[0],
  })
  const { blogPosts: blogPostEn } = await client.BlogPostsStaticPaths({
    locale: ctx.locales[1],
  })
  const blogPosts = blogPostEn.concat(blogPostSk)
  if (blogPosts) {
    paths = blogPosts.map(({ slug }) => ({
      params: {
        slug,
      },
    }))
  }

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<BlogPostPageProps> = async (ctx) => {
  const locale = ctx.locale
  const slug = arrayify(ctx.params.slug)[0]

  if (!slug) return { notFound: true }

  const { blogPostBySlug, footer, mainMenu } = await client.BlogPostBySlug({
    slug,
    locale,
  })

  if (!blogPostBySlug) return { notFound: true }

  return {
    props: { slug, post: blogPostBySlug, footer, mainMenu, locale },
    revalidate: 120, // every two minutes TODO change
  }
}

interface BlogPostPageProps {
  slug: string
  locale: string
  post: NonNullable<BlogPostBySlugQuery['blogPostBySlug']>
  footer: BlogPostBySlugQuery['footer']
  mainMenu: BlogPostBySlugQuery['mainMenu']
}

const Page = ({ post, footer, mainMenu, locale }: BlogPostPageProps) => {
  const parsedFooter = parseFooter(footer ?? {})
  const menuItems = parseMainMenu(mainMenu?.filter(isPresent) ?? [])

  // TODO change if multilingual blogs
  return (
    <PageWrapper locale={locale} slug={post.slug ?? ''}>
      <BlogPostPage blogPost={post} footer={parsedFooter} menuItems={menuItems} />
    </PageWrapper>
  )
}

export default Page

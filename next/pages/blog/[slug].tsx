import { BlogPostBySlugQuery, FooterQuery, MainMenuQuery } from '@bratislava/strapi-sdk-homepage'
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next'
import PageWrapper from '../../components/layouts/PageWrapper'
import BlogPostPage from '../../components/pages/blogPostPage'
import { client } from '../../utils/gql'
import { parseFooter, parseMainMenu } from '../../utils/page'
import { arrayify, isPresent, shouldSkipStaticPaths } from '../../utils/utils'

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  let paths: { params: { slug: string } }[] = []
  if (shouldSkipStaticPaths()) return { paths, fallback: 'blocking' }

  const { blogPosts: blogPostSk } = await client.BlogPostsStaticPaths({
    locale: ctx.locales[0],
  })
  const { blogPosts: blogPostEn } = await client.BlogPostsStaticPaths({
    locale: ctx.locales[1],
  })
  const blogPosts = blogPostEn.data.concat(blogPostSk.data)
  if (blogPosts) {
    paths = blogPosts.map((blogPost) => ({
      params: {
        slug: blogPost.attributes.slug,
      },
    }))
  }

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<BlogPostPageProps> = async (ctx) => {
  const locale = ctx.locale
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

  return {
    props: { slug, post: blogPostBySlug, footer, mainMenu, locale },
    revalidate: 120, // every two minutes TODO change
  }
}

interface BlogPostPageProps {
  slug: string
  locale: string
  // post: NonNullable<BlogPostBySlugQuery['blogPostBySlug']>
  // footer: BlogPostBySlugQuery['footer']
  //mainMenu: BlogPostBySlugQuery['mainMenu']
  post: NonNullable<BlogPostBySlugQuery>
  footer: FooterQuery
  mainMenu: MainMenuQuery
}

const Page = ({ post, footer, mainMenu, locale }: BlogPostPageProps) => {
  const parsedFooter = parseFooter(footer ?? {})
  const menuItems = parseMainMenu((mainMenu as any)?.filter(isPresent) ?? [])

  // TODO change if multilingual blogs
  return (
    <PageWrapper locale={locale} slug={post.blogPosts?.data[0].attributes?.slug ?? ''}>
      <BlogPostPage blogPost={post?.blogPosts?.data[0].attributes} footer={parsedFooter} menuItems={menuItems} />
    </PageWrapper>
  )
}

export default Page

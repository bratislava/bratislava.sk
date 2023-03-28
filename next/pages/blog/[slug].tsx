// @ts-strict-ignore
/* eslint-disable unicorn/consistent-destructuring */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { BlogPostBySlugQuery, FooterQuery, GeneralQuery } from '@bratislava/strapi-sdk-homepage'
import { GeneralContextProvider } from '@utils/generalContext'
import { client } from '@utils/gql'
import { parseFooter } from '@utils/page'
import { arrayify } from '@utils/utils'
import { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import PageContextProvider from '../../components/layouts/PageContextProvider'
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

  const { footer } = await client.Footer({ locale })

  const general = await client.General({ locale })

  const blogPostBySlug = blogPosts?.data[0]

  if (!blogPostBySlug) return { notFound: true }

  const pageTranslations = ['common']

  return {
    props: {
      general,
      slug,
      post: blogPosts,
      footer,
      locale,
      ...(await serverSideTranslations(locale, pageTranslations)),
    },
    revalidate: 10,
  }
}

interface BlogPostPageProps {
  general: GeneralQuery
  slug: string
  locale: string
  post: NonNullable<BlogPostBySlugQuery['blogPosts']>
  footer: FooterQuery['footer']
}

const Page = ({ general, post, footer, locale }: BlogPostPageProps) => {
  const parsedFooter = parseFooter(footer?.data?.attributes ?? {})

  // TODO change if multilingual blogs
  return (
    <GeneralContextProvider general={general}>
      <PageContextProvider locale={locale} slug={post.data[0].attributes?.slug ?? ''}>
        <BlogPostPage post={post} footer={parsedFooter} />
      </PageContextProvider>
    </GeneralContextProvider>
  )
}

export default Page

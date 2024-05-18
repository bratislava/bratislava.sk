import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import * as React from 'react'

import PageLayout from '@/components/layouts/PageLayout'
import BlogPostPageContent from '@/components/page-contents/BlogPostPageContent'
import { GeneralContextProvider } from '@/components/providers/GeneralContextProvider'
import { BlogPostEntityFragment, GeneralQuery } from '@/services/graphql'
import { client } from '@/services/graphql/gql'
import { GlobalCategoryColorProvider } from '@/utils/colors'
import { useTitle } from '@/utils/useTitle'

type PageProps = {
  general: GeneralQuery
  blogPost: BlogPostEntityFragment
}

type StaticParams = {
  slug: string
}

export const getStaticPaths: GetStaticPaths<StaticParams> = async () => {
  const { blogPosts } = await client.BlogPostsStaticPaths()

  const paths = (blogPosts?.data ?? [])
    .filter((blogPost) => blogPost?.attributes?.slug && blogPost?.attributes?.locale)
    .map((blogPost) => ({
      params: {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion,@typescript-eslint/no-non-null-assertion
        slug: blogPost.attributes!.slug!,
      },
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion,@typescript-eslint/no-non-null-assertion
      locale: blogPost.attributes!.locale!,
    }))

  // eslint-disable-next-line no-console
  console.log(`GENERATED STATIC PATHS FOR ${paths.length} SLUGS - BLOGS`)
  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<PageProps, StaticParams> = async ({
  locale,
  params,
}) => {
  const slug = params?.slug

  // eslint-disable-next-line no-console
  console.log(`Revalidating blog ${locale === 'en' ? '/en' : ''}/blog/${slug}`)

  if (!slug || !locale) return { notFound: true }

  const [{ blogPosts }, general, messages] = await Promise.all([
    client.BlogPostBySlug({ slug, locale }),
    client.General({ locale }),
    import(`../../messages/${locale}.json`),
  ])

  const blogPost = blogPosts?.data[0]
  if (!blogPost) {
    return { notFound: true }
  }

  return {
    props: {
      general,
      slug,
      blogPost,
      messages: messages.default,
    },
    revalidate: 10,
  }
}

const Page = ({ general, blogPost }: PageProps) => {
  const { title: blogPostTitle, excerpt } = blogPost.attributes ?? {}

  const title = useTitle(blogPostTitle)

  return (
    <GeneralContextProvider general={general}>
      <Head>
        <title>{title}</title>
        {excerpt && <meta name="description" content={excerpt} />}
      </Head>
      <GlobalCategoryColorProvider
        color={blogPost?.attributes?.tag?.data?.attributes?.pageCategory?.data?.attributes?.color}
      />
      <PageLayout>
        <BlogPostPageContent blogPost={blogPost} />
      </PageLayout>
    </GeneralContextProvider>
  )
}

export default Page

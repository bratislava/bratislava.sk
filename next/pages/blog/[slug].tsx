import { BlogPostEntityFragment, GeneralQuery } from '@bratislava/strapi-sdk-homepage'
import PageLayout from '@components/layouts/PageLayout'
import BlogPostPageContent from '@components/pages/blogPostPageContent'
import { GeneralContextProvider } from '@utils/generalContext'
import { client } from '@utils/gql'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import * as React from 'react'

import PageContextProvider from '../../components/layouts/PageContextProvider'

interface PageProps {
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
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion,@typescript-eslint/no-non-null-assertion
        locale: blogPost.attributes!.locale!,
      },
    }))

  console.log(`GENERATED STATIC PATHS FOR ${paths.length} SLUGS - BLOGS`)
  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<PageProps, StaticParams> = async ({
  locale,
  params,
}) => {
  const slug = params?.slug

  // eslint-disable-next-line no-console
  console.log(`Revalidating blog ${slug}`)

  if (!slug || !locale) return { notFound: true }

  const [{ blogPosts }, general, translations] = await Promise.all([
    client.BlogPostBySlug({
      slug,
      locale,
    }),
    client.General({ locale }),
    serverSideTranslations(locale, ['common']),
  ])

  const blogPost = blogPosts?.data[0]
  if (!blogPost) return { notFound: true }

  return {
    props: {
      general,
      slug,
      blogPost,
      ...translations,
    },
    revalidate: 10,
  }
}

const Page = ({ general, blogPost }: PageProps) => {
  const { title, excerpt, slug } = blogPost.attributes ?? {}

  return (
    <GeneralContextProvider general={general}>
      <PageContextProvider slug={slug ?? ''}>
        <Head>
          {/* TODO: Use translation. */}
          {title && <title>{title} – Bratislava.sk</title>}
          {excerpt && <meta name="description" content={excerpt} />}
        </Head>
        <PageLayout>
          <BlogPostPageContent blogPost={blogPost} />
        </PageLayout>
      </PageContextProvider>
    </GeneralContextProvider>
  )
}

export default Page

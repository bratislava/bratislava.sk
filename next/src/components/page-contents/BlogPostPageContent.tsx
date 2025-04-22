import * as React from 'react'
import { useMemo } from 'react'

import { Breadcrumb } from '@/src/components/common/Breadcrumbs/Breadcrumbs'
import PageHeader from '@/src/components/common/PageHeader/PageHeader'
import Sections from '@/src/components/layouts/Sections'
import { useGeneralContext } from '@/src/components/providers/GeneralContextProvider'
import ShareButtonsSection from '@/src/components/sections/ShareButtonsSection'
import { BlogPostEntityFragment } from '@/src/services/graphql'
import { getNumericLocalDate } from '@/src/utils/formatDate'
import { getPageBreadcrumbs } from '@/src/utils/pageUtils_Deprecated'

export type BlogPostPageContentProps = {
  blogPost: BlogPostEntityFragment
}

const BlogPostPageContent = ({ blogPost }: BlogPostPageContentProps) => {
  const tag = blogPost.attributes?.tag?.data?.attributes

  const { general } = useGeneralContext()
  const newsPage = general?.data?.attributes?.newsPage?.data

  const breadcrumbs = useMemo(() => {
    return [
      ...(newsPage ? getPageBreadcrumbs(newsPage) : []),
      { title: blogPost.attributes?.title ?? '', path: null } as Breadcrumb,
    ]
  }, [blogPost.attributes?.title, newsPage])

  return (
    <>
      {/* Header */}
      <PageHeader
        title={blogPost.attributes?.title}
        breadcrumbs={breadcrumbs}
        subtext={getNumericLocalDate(blogPost.attributes?.addedAt)}
        tag={tag?.title}
        imageSrc={blogPost.attributes?.coverImage?.data?.attributes?.url}
      />

      {/* Page - Common Sections */}
      {blogPost.attributes?.sections && <Sections sections={blogPost.attributes?.sections} />}

      <ShareButtonsSection twitterTitle={blogPost.attributes?.title} />
    </>
  )
}

export default BlogPostPageContent

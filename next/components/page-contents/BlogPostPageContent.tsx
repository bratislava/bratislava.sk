import * as React from 'react'
import { PropsWithChildren, useMemo } from 'react'

import { Breadcrumb } from '@/components/common/Breadcrumbs/Breadcrumbs'
import Button from '@/components/common/Button/Button'
import PageHeader from '@/components/common/PageHeader/PageHeader'
import Sections from '@/components/layouts/Sections'
import { useGeneralContext } from '@/components/providers/GeneralContextProvider'
import ShareButtonsSection from '@/components/sections/ShareButtonsSection'
import { BlogPostEntityFragment } from '@/services/graphql'
import { getNumericLocalDate } from '@/utils/formatDate'
import { getPageBreadcrumbs } from '@/utils/pageUtils_Deprecated'
import { useTranslation } from '@/utils/useTranslation'

// TODO split this into separate file
export const SocialMediaButton = ({
  getLink,
  children,
}: PropsWithChildren<{ getLink: (link: string) => string }>) => {
  const openSharePage = () => {
    const w = 600
    const h = 400
    const l = screen.width / 2 - w / 2
    const t = screen.height / 2 - h / 2

    window.open(
      getLink(window.location.href),
      'pop',
      `width=${w},height=${h},top=${t},left=${l},scrollbars=0`,
    )
  }

  return <Button onPress={openSharePage}>{children}</Button>
}

export type BlogPostPageContentProps = {
  blogPost: BlogPostEntityFragment
}

const BlogPostPageContent = ({ blogPost }: BlogPostPageContentProps) => {
  const tag = blogPost.attributes?.tag?.data?.attributes

  const { t } = useTranslation()

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
        subtext={
          blogPost &&
          getNumericLocalDate(
            blogPost.attributes?.date_added ||
              blogPost.attributes?.publishedAt ||
              blogPost.attributes?.createdAt,
          )
        }
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

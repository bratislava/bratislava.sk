import { BlogPostEntityFragment } from '@backend/graphql'
import PageHeader from '@bratislava/ui-bratislava/PageHeader/PageHeader'
import ShareButtons from '@components/molecules/ShareButtons'
import { Breadcrumb } from '@components/ui/Breadcrumbs/Breadcrumbs'
import { useGeneralContext } from '@utils/generalContext'
import { getNumericLocalDate } from '@utils/local-date'
import { getPageBreadcrumbs } from '@utils/page'
import { useTranslations } from 'next-intl'
import * as React from 'react'
import { PropsWithChildren, useMemo } from 'react'

import Sections from '../molecules/Sections'

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

  return <button onClick={openSharePage}>{children}</button>
}

export type BlogPostPageContentProps = {
  blogPost: BlogPostEntityFragment
}

const BlogPostPageContent = ({ blogPost }: BlogPostPageContentProps) => {
  const tag = blogPost.attributes?.tag?.data?.attributes

  const t = useTranslations()

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

      <ShareButtons twitterTitle={blogPost.attributes?.title} />
    </>
  )
}

export default BlogPostPageContent

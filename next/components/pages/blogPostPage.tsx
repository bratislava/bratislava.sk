import { FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from '@assets/images'
import { BlogPostFragment } from '@bratislava/strapi-sdk-homepage'
import { FooterProps, MenuMainItem, PageHeader, SectionContainer } from '@bratislava/ui-bratislava'
import Head from 'next/head'
import * as React from 'react'

import { getNumericLocalDate } from '../../utils/local-date'
import { pageStyle } from '../../utils/page'
import BasePageLayout from '../layouts/BasePageLayout'
import Sections from '../molecules/Sections'

export interface GeneralPageProps {
  post: BlogPostFragment
  footer: FooterProps
  children?: React.ReactNode
  menuItems?: MenuMainItem[]
}

const BlogPostPage = ({ post, footer, children, menuItems }: GeneralPageProps) => {
  const [socialLink, setSocialLink] = React.useState('')
  React.useEffect(() => setSocialLink(window.location.href), [])
  const blogPost = post.data[0].attributes
  const tag = blogPost?.tag?.data?.attributes
  const pageCategory = tag?.pageCategory?.data?.attributes

  return (
    <BasePageLayout footer={footer} menuItems={menuItems} activeMenuItem={tag?.pageCategory?.data?.id ?? '1'}>
      {pageCategory?.color && (
        <style
          dangerouslySetInnerHTML={{
            __html: pageStyle(pageCategory.color),
          }}
        />
      )}
      {/* Header */}
      <PageHeader
        className="header-main-bg bg-cover"
        color="var(--secondary-color)"
        transparentColor="var(--secondary-color--transparent)"
        imageSrc={blogPost?.coverImage?.data?.attributes?.url || ''}
      >
        {/* meta description (Excerpt) */}
        {blogPost?.excerpt && blogPost?.title && (
          <Head>
            <title> {blogPost?.title} </title>
            <meta name="description" content={blogPost?.excerpt} />
          </Head>
        )}
        {/* Header - Breadcrumbs */}
        <SectionContainer>
          <div className="min-h-[220px]">
            {blogPost?.tag && <div className="pt-30 text-default font-semibold text-red-brick">{tag?.title}</div>}
            <h1 className="whitespace-pre-wrap pt-4 text-md font-bold md:text-2xl">{blogPost?.title}</h1>
            {blogPost?.createdAt && <div className="pt-2 pb-14">{getNumericLocalDate(blogPost?.createdAt)}</div>}
          </div>
        </SectionContainer>
      </PageHeader>

      {/* Page - Common Sections */}
      {blogPost?.sections && <Sections sections={blogPost.sections} />}

      {/* Page - Social media buttons for sharing */}
      {/* These might not behave correctly in development. Try changing socialLink to some publicly accessible url for testing. */}
      <SectionContainer>
        <div className="mt-14 flex flex-col">
          <span className="text-default font-semibold">Zdieľať</span>
          <div className="flex space-x-10 pt-5">
            <SocialMediaButton href={`https://www.facebook.com/sharer/sharer.php?u=${socialLink}`}>
              <FacebookIcon />
            </SocialMediaButton>

            <SocialMediaButton href={`https://www.linkedin.com/sharing/share-offsite/?url=${socialLink}`}>
              <LinkedinIcon />
            </SocialMediaButton>

            <SocialMediaButton href="https://www.instagram.com/bratislava.sk/">
              <InstagramIcon />
            </SocialMediaButton>

            <SocialMediaButton href={`https://twitter.com/intent/tweet?url=${socialLink}&text=${blogPost?.title}`}>
              <TwitterIcon />
            </SocialMediaButton>
          </div>
        </div>
      </SectionContainer>
    </BasePageLayout>
  )
}

const SocialMediaButton = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const openSharePage = () => {
    const w = 600
    const h = 400
    const l = screen.width / 2 - w / 2
    const t = screen.height / 2 - h / 2

    window.open(href, 'pop', `width=${w},height=${h},top=${t},left=${l},scrollbars=0`)
  }

  return <button onClick={openSharePage}>{children}</button>
}

export default BlogPostPage

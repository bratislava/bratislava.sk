import { BlogPostFragment } from '@bratislava/strapi-sdk-homepage'
import { FooterProps, MenuMainItem, PageHeader, SectionContainer } from '@bratislava/ui-bratislava'
import { FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from '@assets/images'
import * as React from 'react'
import { getNumericLocalDate } from '../../utils/local-date'
import { pageStyle } from '../../utils/page'
import BasePageLayout from '../layouts/BasePageLayout'
import Sections from '../molecules/Sections'
import Head from 'next/head'

export interface GeneralPageProps {
  blogPost: BlogPostFragment
  footer: FooterProps
  children?: React.ReactNode
  menuItems?: MenuMainItem[]
}

const BlogPostPage = ({ blogPost, footer, children, menuItems }: GeneralPageProps) => {
  const [socialLink, setSocialLink] = React.useState('')
  React.useEffect(() => setSocialLink(window.location.href), [])

  return (
    <BasePageLayout footer={footer} menuItems={menuItems} activeMenuItem={blogPost.tag?.pageCategory?.id}>
      {blogPost.tag?.pageCategory?.color && (
        <style
          dangerouslySetInnerHTML={{
            __html: pageStyle(blogPost.tag.pageCategory.color),
          }}
        />
      )}
      {/* Header */}
      <PageHeader
        color="var(--secondary-color)"
        transparentColor="var(--secondary-color--transparent)"
        imageSrc={blogPost.coverImage?.url || ''}
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
            {blogPost.tag && (
              <div className="pt-30 font-semibold text-default text-red-brick">{blogPost.tag.title}</div>
            )}
            <h1 className="pt-4 text-md md:text-2xl font-bold whitespace-pre-wrap">{blogPost.title}</h1>
            <div className="pt-2 pb-14">{getNumericLocalDate(blogPost.created_at)}</div>
          </div>
        </SectionContainer>
      </PageHeader>

      {/* Page - Common Sections*/}
      {blogPost?.sections && <Sections sections={blogPost.sections} />}

      {/* Page - Social media buttons for sharing*/}
      {/* These might not behave correctly in development. Try changing socialLink to some publicly accessible url for testing. */}
      <SectionContainer>
        <div className="flex flex-col mt-14">
          <span className="font-semibold text-default">Zdieľať</span>
          <div className="flex pt-5 space-x-10">
            <SocialMediaButton href={`https://www.facebook.com/sharer/sharer.php?u=${socialLink}`}>
              <FacebookIcon />
            </SocialMediaButton>

            <SocialMediaButton href={`https://www.linkedin.com/sharing/share-offsite/?url=${socialLink}`}>
              <LinkedinIcon />
            </SocialMediaButton>

            <SocialMediaButton href="https://www.instagram.com/bratislava.sk/">
              <InstagramIcon />
            </SocialMediaButton>

            <SocialMediaButton href={`https://twitter.com/intent/tweet?url=${socialLink}&text=${blogPost.title}`}>
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

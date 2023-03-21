/* eslint-disable react/button-has-type */
/* eslint-disable security/detect-non-literal-fs-filename */
/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable react/no-danger */
import { FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from '@assets/images'
import { BlogPostFragment } from '@bratislava/strapi-sdk-homepage'
import { FooterProps, MenuMainItem, PageHeader, SectionContainer } from '@bratislava/ui-bratislava'
import { MenuItem } from '@bratislava/ui-bratislava/NavMenu/NavMenu'
import { getNumericLocalDate } from '@utils/local-date'
import { pageStyle } from '@utils/page'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import * as React from 'react'

import BasePageLayout from '../layouts/BasePageLayout'
import Sections from '../molecules/Sections'

export interface GeneralPageProps {
  post: BlogPostFragment
  footer: FooterProps
  children?: React.ReactNode
  menuItemsOld?: MenuMainItem[]
  menus: MenuItem[]
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

const BlogPostPage = ({ post, footer, menuItemsOld, menus }: GeneralPageProps) => {
  const [socialLink, setSocialLink] = React.useState('')
  React.useEffect(() => setSocialLink(window.location.href), [])
  const blogPost = post.data[0].attributes
  const tag = blogPost?.tag?.data?.attributes
  const pageCategory = tag?.pageCategory?.data?.attributes

  const { t } = useTranslation()

  return (
    <BasePageLayout footer={footer} menuItemsOld={menuItemsOld} menus={menus}>
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
        color="var(--category-color-200)"
        transparentColor="var(--category-color-200--transparent)"
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
          <div className="min-h-56 pt-32">
            {blogPost?.tag && (
              <span className="text-p2-medium inline-block rounded bg-category-600 px-3 py-1 text-white">
                {tag?.title}
              </span>
            )}
            <h1 className="text-h1 max-w-[900px] whitespace-pre-wrap pt-4">{blogPost?.title}</h1>
            {blogPost && (
              <div className="pt-2 pb-14">
                {getNumericLocalDate(
                  blogPost.date_added || blogPost.publishedAt || blogPost.createdAt,
                )}
              </div>
            )}
          </div>
        </SectionContainer>
      </PageHeader>

      {/* Page - Common Sections */}
      {blogPost?.sections && <Sections sections={blogPost.sections} />}

      {/* Page - Social media buttons for sharing */}
      {/* These might not behave correctly in development. Try changing socialLink to some publicly accessible url for testing. */}
      <SectionContainer>
        <div className="mt-14 flex flex-col">
          <span className="text-h5">{t('share')}</span>
          <div className="flex space-x-10 pt-5">
            <SocialMediaButton href={`https://www.facebook.com/sharer/sharer.php?u=${socialLink}`}>
              <FacebookIcon />
            </SocialMediaButton>

            <SocialMediaButton
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${socialLink}`}
            >
              <LinkedinIcon />
            </SocialMediaButton>

            <SocialMediaButton href="https://www.instagram.com/bratislava.sk/">
              <InstagramIcon />
            </SocialMediaButton>

            <SocialMediaButton
              href={`https://twitter.com/intent/tweet?url=${socialLink}&text=${blogPost?.title}`}
            >
              <TwitterIcon />
            </SocialMediaButton>
          </div>
        </div>
      </SectionContainer>
    </BasePageLayout>
  )
}

export default BlogPostPage

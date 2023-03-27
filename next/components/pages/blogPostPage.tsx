/* eslint-disable react/button-has-type */
/* eslint-disable security/detect-non-literal-fs-filename */
/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable react/no-danger */
import { FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from '@assets/images'
import { BlogPostFragment } from '@bratislava/strapi-sdk-homepage'
import { FooterProps, MenuMainItem, SectionContainer } from '@bratislava/ui-bratislava'
import PageHeader from '@bratislava/ui-bratislava/PageHeader/PageHeader'
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

const BlogPostPage = ({ post, footer, menuItemsOld }: GeneralPageProps) => {
  const [socialLink, setSocialLink] = React.useState('')
  React.useEffect(() => setSocialLink(window.location.href), [])
  const blogPost = post.data[0].attributes
  const tag = blogPost?.tag?.data?.attributes
  const pageCategory = tag?.pageCategory?.data?.attributes

  const { t } = useTranslation()

  return (
    <>
      {blogPost?.excerpt && blogPost?.title && (
        <Head>
          <title>{blogPost?.title} – Bratislava</title>
          <meta name="description" content={blogPost?.excerpt} />
        </Head>
      )}
      <BasePageLayout footer={footer} menuItemsOld={menuItemsOld}>
        {pageCategory?.color && (
          <style
            dangerouslySetInnerHTML={{
              __html: pageStyle(pageCategory.color),
            }}
          />
        )}
        {/* Header */}
        <PageHeader
          title={blogPost?.title}
          // TODO: Fix breadcrumbs after Navikronos.
          breadcrumbs={[]}
          subtext={
            blogPost &&
            getNumericLocalDate(blogPost.date_added || blogPost.publishedAt || blogPost.createdAt)
          }
          tag={tag?.title}
          imageSrc={blogPost?.coverImage?.data?.attributes?.url}
        />

        {/* Page - Common Sections */}
        {blogPost?.sections && <Sections sections={blogPost.sections} />}

        {/* Page - Social media buttons for sharing */}
        {/* These might not behave correctly in development. Try changing socialLink to some publicly accessible url for testing. */}
        <SectionContainer>
          <div className="mt-14 flex flex-col">
            <span className="text-h5">{t('share')}</span>
            <div className="flex space-x-10 pt-5">
              <SocialMediaButton
                href={`https://www.facebook.com/sharer/sharer.php?u=${socialLink}`}
              >
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
    </>
  )
}

export default BlogPostPage

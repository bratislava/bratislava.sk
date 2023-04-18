import { FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from '@assets/images'
import { BlogPostEntityFragment } from '@bratislava/strapi-sdk-homepage'
import { SectionContainer } from '@bratislava/ui-bratislava'
import PageHeader from '@bratislava/ui-bratislava/PageHeader/PageHeader'
import { Breadcrumb } from '@components/ui/Breadcrumbs/Breadcrumbs'
import { useGeneralContext } from '@utils/generalContext'
import { getNumericLocalDate } from '@utils/local-date'
import { getPageBreadcrumbs } from '@utils/page'
import { useTranslations } from 'next-intl'
import * as React from 'react'
import { PropsWithChildren, useMemo } from 'react'

import Sections from '../molecules/Sections'

const SocialMediaButton = ({
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
  const breadcrumbs = useMemo(() => {
    return [
      ...(general?.data?.attributes?.newsPage?.data
        ? getPageBreadcrumbs(general.data.attributes.newsPage.data)
        : []),
      { title: blogPost.attributes?.title ?? '', path: null } as Breadcrumb,
    ]
  }, [blogPost, general?.data?.attributes?.newsPage])

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

      {/* Page - Social media buttons for sharing */}
      <SectionContainer className="mb-8">
        <div className="mt-14 flex flex-col">
          <span className="text-h5">{t('share')}</span>
          <div className="flex gap-x-10 pt-5">
            <SocialMediaButton
              getLink={(socialLink) => `https://www.facebook.com/sharer/sharer.php?u=${socialLink}`}
            >
              <FacebookIcon className="h-8 w-8" />
            </SocialMediaButton>

            <SocialMediaButton
              getLink={(socialLink) =>
                `https://www.linkedin.com/sharing/share-offsite/?url=${socialLink}`
              }
            >
              <LinkedinIcon className="h-8 w-8" />
            </SocialMediaButton>

            <SocialMediaButton getLink={() => 'https://www.instagram.com/bratislava.sk/'}>
              <InstagramIcon className="h-8 w-8" />
            </SocialMediaButton>

            <SocialMediaButton
              getLink={(socialLink) =>
                `https://twitter.com/intent/tweet?url=${socialLink}&text=${blogPost.attributes?.title}`
              }
            >
              <TwitterIcon className="h-8 w-8" />
            </SocialMediaButton>
          </div>
        </div>
      </SectionContainer>
    </>
  )
}

export default BlogPostPageContent

import { FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from '@assets/images'
import { InbaArticleEntityFragment } from '@backend/graphql'
import PageHeader from '@bratislava/ui-bratislava/PageHeader/PageHeader'
import { SectionContainer } from '@bratislava/ui-bratislava/SectionContainer/SectionContainer'
import Markdown from '@components/atoms/Markdown'
import { SocialMediaButton } from '@components/pages/blogPostPageContent'
import { Breadcrumb } from '@components/ui/Breadcrumbs/Breadcrumbs'
import NarrowText from '@components/ui/NarrowText/NarrowText'
import { useGeneralContext } from '@utils/generalContext'
import { getNumericLocalDate } from '@utils/local-date'
import { getPageBreadcrumbs } from '@utils/page'
import cx from 'classnames'
import { useTranslations } from 'next-intl'
import * as React from 'react'
import { useMemo } from 'react'

export type InbaArticlePageContentProps = {
  inbaArticle: InbaArticleEntityFragment
}

// TODO may need refactor, it was just copied from BlogPostPageContent that didn't undergo any refactoring

const InbaArticlePageContent = ({ inbaArticle }: InbaArticlePageContentProps) => {
  // const tag = inbaArticle.attributes?.tags?.data?.attributes

  const t = useTranslations()

  const { general } = useGeneralContext()
  const breadcrumbs = useMemo(() => {
    // TODO change newsPage to inbaPage - inbaPage is not yet in Strapi
    return [
      ...(general?.data?.attributes?.newsPage?.data
        ? getPageBreadcrumbs(general.data.attributes.newsPage.data)
        : []),
      { title: inbaArticle.attributes?.title ?? '', path: null } as Breadcrumb,
    ]
  }, [inbaArticle, general?.data?.attributes?.newsPage])

  return (
    <>
      {/* Header */}
      <PageHeader
        title={inbaArticle.attributes?.title}
        breadcrumbs={breadcrumbs}
        subtext={inbaArticle && getNumericLocalDate(inbaArticle.attributes?.publishedAt)}
        // tag={tag?.title}
        imageSrc={inbaArticle.attributes?.coverImage?.data?.attributes?.url}
      />

      <SectionContainer className={cx('pt-10 md:pt-18')}>
        <NarrowText align="left" width="wide">
          <Markdown content={inbaArticle.attributes?.content} />
        </NarrowText>
      </SectionContainer>

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
                `https://twitter.com/intent/tweet?url=${socialLink}&text=${inbaArticle.attributes?.title}`
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

export default InbaArticlePageContent

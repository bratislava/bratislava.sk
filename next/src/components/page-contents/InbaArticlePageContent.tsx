import * as React from 'react'
import { useMemo } from 'react'

import { Breadcrumb } from '@/src/components/common/Breadcrumbs/Breadcrumbs'
import MLink from '@/src/components/common/MLink/MLink'
import NarrowText from '@/src/components/common/NarrowText/NarrowText'
import PageHeader from '@/src/components/common/PageHeader/PageHeader'
import Markdown from '@/src/components/formatting/Markdown/Markdown'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import { useGeneralContext } from '@/src/components/providers/GeneralContextProvider'
import ShareButtons from '@/src/components/sections/ShareButtons_Deprecated'
import { InbaArticleEntityFragment } from '@/src/services/graphql'
import { formatDate } from '@/src/utils/formatDate'
import { getPageBreadcrumbs } from '@/src/utils/pageUtils_Deprecated'
import { useTranslation } from '@/src/utils/useTranslation'

export type InbaArticlePageContentProps = {
  inbaArticle: InbaArticleEntityFragment
}

// TODO may need refactor, it was just copied from legacy BlogPostPageContent that didn't undergo any refactoring

const InbaArticlePageContent = ({ inbaArticle }: InbaArticlePageContentProps) => {
  const { t } = useTranslation()

  const { general } = useGeneralContext()
  const inbaPage = general?.inbaPage

  const breadcrumbs = useMemo(() => {
    return [
      ...(inbaPage ? getPageBreadcrumbs(inbaPage) : []),
      { title: inbaArticle.title ?? '', path: null } as Breadcrumb,
    ]
  }, [inbaArticle, inbaPage])

  const inbaTagTitle = inbaArticle.inbaTag?.title

  const { inbaRelease, title, publishedAt, coverImage, perex, content } = inbaArticle
  const inbaReleaseLink = `/inba/vydania/${inbaRelease?.slug}`

  return (
    <>
      <PageHeader
        title={title}
        breadcrumbs={breadcrumbs}
        subtext={publishedAt ? formatDate(publishedAt) : null}
        tag={inbaTagTitle}
        imageSrc={coverImage?.url}
      />
      {perex ? (
        <SectionContainer className="pt-10 md:pt-18">
          <NarrowText width="wide">
            {/* Perex comes as plain text from Strapi, so we manually add bold style and use Markdown to format it */}
            {/* TODO it may want to be styled and implemented more nicely */}
            <Markdown content={`**${perex}**`} />
          </NarrowText>
        </SectionContainer>
      ) : null}
      <SectionContainer className="pt-10 md:pt-18">
        <NarrowText width="wide">
          <Markdown content={content} />
          {inbaRelease ? (
            <div className="pt-4">
              {/* TODO Typography */}
              <MLink href={inbaReleaseLink} variant="underlined">
                <Markdown
                  content={t('InbaArticle.publishedInThisRelease', {
                    releaseTitle: inbaRelease.title,
                    releaseDate: formatDate(inbaRelease.releaseDate),
                  })}
                />
              </MLink>
            </div>
          ) : null}
        </NarrowText>
      </SectionContainer>
      <SectionContainer className="pt-10 pb-8 md:pt-18">
        <ShareButtons twitterTitle={title} />
      </SectionContainer>
    </>
  )
}

export default InbaArticlePageContent

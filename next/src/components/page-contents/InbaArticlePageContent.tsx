import * as React from 'react'
import { useMemo } from 'react'

import { Breadcrumb } from '@/src/components/common/Breadcrumbs/Breadcrumbs'
import MLink from '@/src/components/common/MLink/MLink'
import NarrowText from '@/src/components/common/NarrowText/NarrowText'
import PageHeader from '@/src/components/common/PageHeader/PageHeader'
import SectionContainer from '@/src/components/common/SectionContainer/SectionContainer'
import Markdown from '@/src/components/formatting/Markdown/Markdown'
import { useGeneralContext } from '@/src/components/providers/GeneralContextProvider'
import ShareButtonsSection from '@/src/components/sections/ShareButtonsSection'
import { InbaArticleEntityFragment } from '@/src/services/graphql'
import { formatDate, getNumericLocalDate } from '@/src/utils/formatDate'
import { getPageBreadcrumbs } from '@/src/utils/pageUtils_Deprecated'
import { useTranslation } from '@/src/utils/useTranslation'

export type InbaArticlePageContentProps = {
  inbaArticle: InbaArticleEntityFragment
}

// TODO may need refactor, it was just copied from BlogPostPageContent that didn't undergo any refactoring

const InbaArticlePageContent = ({ inbaArticle }: InbaArticlePageContentProps) => {
  const { t } = useTranslation()

  const { general } = useGeneralContext()
  const inbaPage = general?.data?.attributes?.inbaPage?.data

  const breadcrumbs = useMemo(() => {
    return [
      ...(inbaPage ? getPageBreadcrumbs(inbaPage) : []),
      { title: inbaArticle.attributes?.title ?? '', path: null } as Breadcrumb,
    ]
  }, [inbaArticle, inbaPage])

  const inbaTagTitle = inbaArticle.attributes?.inbaTag?.data?.attributes?.title

  const inbaRelease = inbaArticle.attributes?.inbaRelease?.data?.attributes
  const inbaReleaseLink = `/inba/archiv/${inbaRelease?.slug}`

  return (
    <>
      {/* Header */}
      <PageHeader
        title={inbaArticle.attributes?.title}
        breadcrumbs={breadcrumbs}
        subtext={inbaArticle && getNumericLocalDate(inbaArticle.attributes?.publishedAt)}
        tag={inbaTagTitle}
        imageSrc={inbaArticle.attributes?.coverImage?.data?.attributes?.url}
      />
      {inbaArticle.attributes?.perex ? (
        <SectionContainer className="pt-10 md:pt-18">
          <NarrowText align="left" width="wide">
            {/* Perex comes as plain text from Strapi, so we manually add bold style and use Markdown to format it */}
            {/* TODO it may want to be styled and implemented more nicely */}
            <Markdown content={`**${inbaArticle.attributes.perex}**`} />
          </NarrowText>
        </SectionContainer>
      ) : null}
      <SectionContainer className="pt-10 md:pt-18">
        <NarrowText align="left" width="wide">
          <Markdown content={inbaArticle.attributes?.content} />
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
      <ShareButtonsSection twitterTitle={inbaArticle.attributes?.title} />
    </>
  )
}

export default InbaArticlePageContent

import { useTranslations } from 'next-intl'
import * as React from 'react'
import { useMemo } from 'react'

import { Breadcrumb } from '@/components/common/Breadcrumbs/Breadcrumbs'
import NarrowText from '@/components/common/NarrowText/NarrowText'
import PageHeader from '@/components/common/PageHeader/PageHeader'
import SectionContainer from '@/components/common/SectionContainer/SectionContainer'
import Markdown from '@/components/formatting/Markdown/Markdown'
import MLink from '@/components/forms/simple-components/MLink'
import ShareButtons from '@/components/molecules/ShareButtons'
import { useGeneralContext } from '@/components/providers/GeneralContextProvider'
import { InbaArticleEntityFragment } from '@/services/graphql'
import { formatDate, getNumericLocalDate } from '@/utils/formatDate'
import { getPageBreadcrumbs } from '@/utils/pageUtils_Deprecated'

export type InbaArticlePageContentProps = {
  inbaArticle: InbaArticleEntityFragment
}

// TODO may need refactor, it was just copied from BlogPostPageContent that didn't undergo any refactoring

const InbaArticlePageContent = ({ inbaArticle }: InbaArticlePageContentProps) => {
  const t = useTranslations()

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
      <ShareButtons twitterTitle={inbaArticle.attributes?.title} />
    </>
  )
}

export default InbaArticlePageContent

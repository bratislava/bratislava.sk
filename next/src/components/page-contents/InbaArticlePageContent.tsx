import * as React from 'react'
import { useMemo } from 'react'

import { Breadcrumb } from '@/src/components/common/Breadcrumbs/Breadcrumbs'
import MLink from '@/src/components/common/MLink/MLink'
import PageHeader from '@/src/components/common/PageHeader/PageHeader'
import Markdown from '@/src/components/formatting/Markdown/Markdown'
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
      <div
        // TODO some of these classes are duplicated in SectionContainer - ponder what to do with it
        className="mx-auto flex max-w-(--breakpoint-xl) gap-8 px-4 py-6 lg:px-8 lg:py-12"
      >
        <div className="flex w-200 flex-col gap-4">
          <div className="flex flex-col gap-18">
            <div className="flex flex-col gap-6 lg:gap-8">
              {/* Perex comes as plain text from Strapi, so we manually add bold style and use Markdown to format it */}
              {/* TODO it may want to be styled and implemented more nicely */}
              {perex ? <Markdown content={`**${perex}**`} /> : null}
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
            </div>
          </div>

          <ShareButtons twitterTitle={title} />
        </div>

        {/* Empty sidebar */}
        <div aria-hidden className="grow basis-60 max-lg:hidden" />
      </div>
    </>
  )
}

export default InbaArticlePageContent

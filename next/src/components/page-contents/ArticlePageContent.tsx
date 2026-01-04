import { Typography } from '@bratislava/component-library'
import Image from 'next/image'
import * as React from 'react'
import { Fragment, useMemo } from 'react'

import AliasInfoMessage from '@/src/components/common/AliasInfoMessage/AliasInfoMessage'
import Breadcrumbs, { Breadcrumb } from '@/src/components/common/Breadcrumbs/Breadcrumbs'
import HorizontalDivider from '@/src/components/common/Divider/HorizontalDivider'
import FileList from '@/src/components/common/FileList/FileList'
import Gallery from '@/src/components/common/Gallery/Gallery'
import ShareBlock from '@/src/components/common/ShareBlock/ShareBlock'
import Markdown from '@/src/components/formatting/Markdown/Markdown'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import ArticleSidebar from '@/src/components/page-contents/ArticleSidebar'
import { useGeneralContext } from '@/src/components/providers/GeneralContextProvider'
import { ArticleEntityFragment } from '@/src/services/graphql'
import { formatDate } from '@/src/utils/formatDate'
import { isDefined } from '@/src/utils/isDefined'
import { getPageBreadcrumbs } from '@/src/utils/pageUtils_Deprecated'
import { useTranslation } from '@/src/utils/useTranslation'

type Props = {
  article: ArticleEntityFragment
}

const ArticlePageContent = ({ article }: Props) => {
  const { t } = useTranslation()

  const { general } = useGeneralContext()
  const newsPage = general?.newsPage

  const breadcrumbs = useMemo(() => {
    return [
      ...(newsPage ? getPageBreadcrumbs(newsPage) : []),
      { title: article.title ?? '', path: null } as Breadcrumb,
    ]
  }, [article.title, newsPage])

  const { title, perex, content, files, gallery, alias, addedAt, coverMedia } = article

  const filteredFiles = files?.filter(isDefined) ?? []
  const filteredGalleryImages = gallery.filter(isDefined) ?? []

  const readingTimeMessage = useMemo(() => {
    // Average reading speed moves between 200-250 wpm
    const WORDS_PER_MINUTE = 200
    const wordCount = (content ?? '').trim().split(/\s+/).length
    const readingTimeInMinutes = Math.ceil(wordCount / WORDS_PER_MINUTE)

    return t('ArticlePageContent.readingTime', { count: readingTimeInMinutes })
  }, [content, t])

  return (
    <>
      <SectionContainer className="bg-background-passive-primary">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </SectionContainer>

      <SectionContainer className="py-8 lg:py-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-18">
          <div className="flex flex-col gap-6 lg:gap-8">
            <div className="flex flex-col gap-4 lg:gap-6">
              <Typography variant="h1" data-cy="page-heading">
                {title}
              </Typography>
              <div className="flex flex-wrap gap-x-3 empty:hidden">
                {[formatDate(addedAt), readingTimeMessage].filter(isDefined).map((item, index) => {
                  return (
                    <Fragment key={item}>
                      {index > 0 && (
                        <Typography variant="p-tiny" aria-hidden>
                          •
                        </Typography>
                      )}
                      <Typography variant="p-tiny" className="whitespace-normal">
                        {item}
                      </Typography>
                    </Fragment>
                  )
                })}
              </div>
            </div>

            <HorizontalDivider />

            {perex ? (
              <Typography variant="p-large" className="font-medium">
                {perex}
              </Typography>
            ) : null}

            {coverMedia?.url ? (
              <figure className="flex flex-col gap-4">
                <Image
                  {...coverMedia}
                  src={coverMedia.url ?? ''}
                  width="0"
                  height="0"
                  sizes="100vw"
                  alt={coverMedia.alternativeText ?? ''}
                  className="h-auto w-full overflow-hidden rounded-xl"
                />
                {coverMedia.caption ? (
                  <figcaption
                    aria-hidden={coverMedia.caption === coverMedia.alternativeText}
                    className="text-size-p-small text-content-passive-tertiary italic"
                  >
                    {coverMedia.caption}
                  </figcaption>
                ) : null}
              </figure>
            ) : null}

            <Markdown content={content} />

            {filteredGalleryImages.length > 0 ? <Gallery images={filteredGalleryImages} /> : null}

            {filteredFiles.length > 0 ? <FileList files={filteredFiles} /> : null}

            <ShareBlock
              text={t('ArticlePageContent.shareBlock.text')}
              buttonText={t('ArticlePageContent.shareBlock.buttonText')}
            />

            {alias ? <AliasInfoMessage alias={alias} variant="article" /> : null}
          </div>
          <ArticleSidebar article={article} className="w-full shrink-0 lg:w-86" />
        </div>
      </SectionContainer>
    </>
  )
}

export default ArticlePageContent

import { Typography } from '@bratislava/component-library'
import * as React from 'react'
import { useMemo } from 'react'

import AliasInfoMessage from '@/src/components/common/AliasInfoMessage/AliasInfoMessage'
import { Breadcrumb } from '@/src/components/common/Breadcrumbs/Breadcrumbs'
import FileList from '@/src/components/common/FileList/FileList'
import Gallery from '@/src/components/common/Gallery/Gallery'
import PageHeader from '@/src/components/common/PageHeader/PageHeader'
import SectionContainer from '@/src/components/common/SectionContainer/SectionContainer'
import Markdown from '@/src/components/formatting/Markdown/Markdown'
import { useGeneralContext } from '@/src/components/providers/GeneralContextProvider'
import ShareButtonsSection from '@/src/components/sections/ShareButtonsSection'
import { ArticleEntityFragment } from '@/src/services/graphql'
import { formatDate } from '@/src/utils/formatDate'
import { isDefined } from '@/src/utils/isDefined'
import { getPageBreadcrumbs } from '@/src/utils/pageUtils_Deprecated'

type Props = {
  article: ArticleEntityFragment
}

const ArticlePageContent = ({ article }: Props) => {
  const { general } = useGeneralContext()
  const newsPage = general?.data?.attributes?.newsPage?.data

  const breadcrumbs = useMemo(() => {
    return [
      ...(newsPage ? getPageBreadcrumbs(newsPage) : []),
      { title: article.attributes?.title ?? '', path: null } as Breadcrumb,
    ]
  }, [article.attributes?.title, newsPage])

  if (!article.attributes) {
    return null
  }

  const { title, perex, tag, content, files, gallery, alias, addedAt, coverMedia } =
    article.attributes

  const filteredFiles = files?.filter(isDefined) ?? []
  const filteredGalleryImages = gallery?.data.filter(isDefined) ?? []

  return (
    <>
      <PageHeader
        title={title}
        breadcrumbs={breadcrumbs}
        subtext={formatDate(addedAt)}
        tag={tag?.data?.attributes?.title}
        imageSrc={coverMedia?.data?.attributes?.url}
      />

      <SectionContainer className="pt-10 md:pt-18">
        <div className="flex flex-col gap-6 lg:gap-8">
          {perex ? (
            <Typography type="p" size="p-large">
              {perex}
            </Typography>
          ) : null}
          <Markdown content={content} />
          {filteredFiles.length > 0 ? <FileList files={filteredFiles} /> : null}
          {filteredGalleryImages.length > 0 ? <Gallery images={filteredGalleryImages} /> : null}
        </div>
      </SectionContainer>

      <ShareButtonsSection twitterTitle={title} />

      {alias ? (
        <SectionContainer>
          <AliasInfoMessage alias={alias} variant="article" />{' '}
        </SectionContainer>
      ) : null}
    </>
  )
}

export default ArticlePageContent

import { Typography } from '@bratislava/component-library'
import * as React from 'react'
import { useMemo } from 'react'

import AliasInfoMessage from '@/src/components/common/AliasInfoMessage/AliasInfoMessage'
import { Breadcrumb } from '@/src/components/common/Breadcrumbs/Breadcrumbs'
import FileList from '@/src/components/common/FileList/FileList'
import Gallery from '@/src/components/common/Gallery/Gallery'
import PageHeader from '@/src/components/common/PageHeader/PageHeader'
import Markdown from '@/src/components/formatting/Markdown/Markdown'
import { useGeneralContext } from '@/src/components/providers/GeneralContextProvider'
import ShareButtons from '@/src/components/sections/ShareButtons'
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

      <div
        // TODO some of these classes are duplicated in SectionContainer - ponder what to do with it
        className="mx-auto flex max-w-screen-xl gap-8 px-4 py-6 lg:px-8 lg:py-12"
      >
        <div className="flex w-200 flex-col gap-18">
          <div className="flex flex-col gap-6 lg:gap-8">
            {perex ? (
              <Typography type="p" size="p-large" className="font-semibold">
                {perex}
              </Typography>
            ) : null}
            <Markdown content={content} />
          </div>

          {filteredGalleryImages.length > 0 ? <Gallery images={filteredGalleryImages} /> : null}

          {filteredFiles.length > 0 ? <FileList files={filteredFiles} /> : null}

          <ShareButtons twitterTitle={title} />

          {alias ? <AliasInfoMessage alias={alias} variant="article" /> : null}
        </div>

        {/* Empty sidebar */}
        <div aria-hidden className="grow basis-60 max-lg:hidden" />
      </div>
    </>
  )
}

export default ArticlePageContent

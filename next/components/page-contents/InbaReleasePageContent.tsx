import { Typography } from '@bratislava/component-library'
import cx from 'classnames'
import * as React from 'react'
import { useMemo } from 'react'

import FileRowCard from '@/components/cards/FileRowCard'
import { Breadcrumb } from '@/components/common/Breadcrumbs/Breadcrumbs'
import ImagePlaceholder from '@/components/common/Image/ImagePlaceholder'
import StrapiImage from '@/components/common/Image/StrapiImage'
import NarrowText from '@/components/common/NarrowText/NarrowText'
import PageHeader from '@/components/common/PageHeader/PageHeader'
import SectionContainer from '@/components/common/SectionContainer/SectionContainer'
import Markdown from '@/components/formatting/Markdown/Markdown'
import { useGeneralContext } from '@/components/providers/GeneralContextProvider'
import ShareButtonsSection from '@/components/sections/ShareButtonsSection'
import { InbaReleaseEntityFragment } from '@/services/graphql'
import { formatDate } from '@/utils/formatDate'
import { formatFileExtension } from '@/utils/formatFileExtension'
import { formatFileSize } from '@/utils/formatFileSize'
import { isDefined } from '@/utils/isDefined'
import { getPageBreadcrumbs } from '@/utils/pageUtils_Deprecated'
import { useLocale } from '@/utils/useLocale'
import { useTranslation } from '@/utils/useTranslation'

export type InbaReleasePageContentProps = {
  inbaRelease: InbaReleaseEntityFragment
}

// TODO may need refactor, it was just copied from BlogPostPageContent that didn't undergo any refactoring

const InbaReleasePageContent = ({ inbaRelease }: InbaReleasePageContentProps) => {
  const { t } = useTranslation()
  const locale = useLocale()

  const { title, coverImage, perex, releaseDate, files } = inbaRelease.attributes ?? {}
  const coverImageAttr = coverImage?.data?.attributes

  const { general } = useGeneralContext()
  const parentBreadcrumbPageEntity = general?.data?.attributes?.inbaReleasesPage?.data

  const breadcrumbs = useMemo(() => {
    return [
      ...(parentBreadcrumbPageEntity ? getPageBreadcrumbs(parentBreadcrumbPageEntity) : []),
      { title: title ?? '', path: null } as Breadcrumb,
    ]
  }, [parentBreadcrumbPageEntity, title])

  return (
    <>
      {/* Header */}
      <PageHeader
        title={title}
        breadcrumbs={breadcrumbs}
        subtext={releaseDate && t('InbaRelease.releasedOn', { date: formatDate(releaseDate) })}
      />

      <SectionContainer className="pt-10 md:pt-18">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_2fr]">
          <div
            className={cx('overflow-hidden rounded-xl shadow-lg', {
              'aspect-inba': !coverImageAttr,
            })}
          >
            {coverImageAttr ? <StrapiImage alt="" image={coverImageAttr} /> : <ImagePlaceholder />}
          </div>
          <div className="flex w-full flex-col gap-8">
            {perex ? (
              <NarrowText align="left" width="full">
                <Typography type="h2" size="h3" className="pb-4">
                  {t('InbaRelease.inThisRelease')}
                </Typography>
                {/* Perex comes as plain text from Strapi, but we format it using Markdown component */}
                <Markdown content={perex} />
              </NarrowText>
            ) : null}

            <div className="flex flex-col">
              <Typography type="h2" size="h3" className="pb-4">
                {t('InbaRelease.toDownload')}
              </Typography>

              {/* TODO refactor, use FileList */}
              {files?.filter(isDefined).map((file) => (
                <FileRowCard
                  key={file.media.data?.id}
                  title={file.title ?? file.media.data?.attributes?.name ?? ''}
                  downloadLink={file.media.data?.attributes?.url}
                  format={formatFileExtension(file.media.data?.attributes?.ext) ?? undefined}
                  size={
                    file.media.data?.attributes?.size
                      ? formatFileSize(file.media.data?.attributes?.size, locale)
                      : undefined
                  }
                  // TODO download aria label
                  // ariaLabel={getDownloadAriaLabel(file.media.data?.attributes)}
                />
              ))}
            </div>
          </div>
        </div>
      </SectionContainer>

      <ShareButtonsSection twitterTitle={title} />
    </>
  )
}

export default InbaReleasePageContent

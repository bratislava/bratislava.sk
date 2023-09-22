import { InbaReleaseEntityFragment } from '@backend/graphql'
import PageHeader from '@bratislava/ui-bratislava/PageHeader/PageHeader'
import { SectionContainer } from '@bratislava/ui-bratislava/SectionContainer/SectionContainer'
import ImagePlaceholder from '@components/atoms/ImagePlaceholder'
import Markdown from '@components/atoms/Markdown'
import StrapiImage from '@components/atoms/StrapiImage'
import FileRowCard from '@components/molecules/presentation/FileRowCard'
import ShareButtons from '@components/molecules/ShareButtons'
import { Breadcrumb } from '@components/ui/Breadcrumbs/Breadcrumbs'
import NarrowText from '@components/ui/NarrowText/NarrowText'
import { formatFileSize } from '@utils/formatFileSize'
import { useGeneralContext } from '@utils/generalContext'
import { isDefined } from '@utils/isDefined'
import { formatDate } from '@utils/local-date'
import { getPageBreadcrumbs } from '@utils/page'
import cx from 'classnames'
import { useLocale, useTranslations } from 'next-intl'
import * as React from 'react'
import { useMemo } from 'react'

export type InbaReleasePageContentProps = {
  inbaRelease: InbaReleaseEntityFragment
}

// TODO may need refactor, it was just copied from BlogPostPageContent that didn't undergo any refactoring

const InbaReleasePageContent = ({ inbaRelease }: InbaReleasePageContentProps) => {
  const t = useTranslations('InbaRelease')
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
        subtext={releaseDate && t('releasedOn', { date: formatDate(releaseDate) })}
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
                <h2 className="text-h3 pb-4">{t('inThisRelease')}</h2>
                {/* Perex comes as plain text from Strapi, but we format it using Markdown component */}
                <Markdown content={perex} />
              </NarrowText>
            ) : null}

            <div className="flex flex-col">
              <h2 className="text-h3 pb-4">{t('toDownload')}</h2>
              {/* TODO refactor, use FileList */}
              {files?.filter(isDefined).map((file) => (
                <FileRowCard
                  key={file.media.data?.id}
                  title={file.title ?? file.media.data?.attributes?.name ?? ''}
                  downloadLink={file.media.data?.attributes?.url}
                  format={file.media.data?.attributes?.ext?.replace(/^\./, '').toUpperCase()}
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

      <ShareButtons twitterTitle={title} />
    </>
  )
}

export default InbaReleasePageContent

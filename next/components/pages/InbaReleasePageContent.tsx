import { InbaReleaseEntityFragment } from '@backend/graphql'
import PageHeader from '@bratislava/ui-bratislava/PageHeader/PageHeader'
import { SectionContainer } from '@bratislava/ui-bratislava/SectionContainer/SectionContainer'
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

      <SectionContainer className={cx('pt-10 md:pt-18')}>
        <div className="flex gap-16 max-md:flex-col">
          {coverImage?.data?.attributes ? (
            <div>
              <StrapiImage className="rounded-xl shadow-lg" image={coverImage.data.attributes} />
            </div>
          ) : null}
          <div className="flex w-full flex-col gap-8">
            {perex ? (
              <NarrowText align="left" width="full">
                {/* Perex comes as plain text from Strapi, but we format it using Markdown component */}
                <Markdown content={perex} />
              </NarrowText>
            ) : null}

            {/* TODO add some title */}
            <div className="flex flex-col">
              {/* TODO refactor */}
              {files?.filter(isDefined).map((file) => (
                <FileRowCard
                  title={file.title ?? undefined}
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

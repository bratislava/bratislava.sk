import { Typography } from '@bratislava/component-library'
import * as React from 'react'
import { Fragment, useMemo } from 'react'

import FileRowCard from '@/src/components/cards/FileRowCard'
import { Breadcrumb } from '@/src/components/common/Breadcrumbs/Breadcrumbs'
import HorizontalDivider from '@/src/components/common/Divider/HorizontalDivider'
import ImagePlaceholder from '@/src/components/common/Image/ImagePlaceholder'
import StrapiImage from '@/src/components/common/Image/StrapiImage'
import NarrowText from '@/src/components/common/NarrowText/NarrowText'
import PageHeader from '@/src/components/common/PageHeader/PageHeader'
import SectionContainer from '@/src/components/common/SectionContainer/SectionContainer'
import Markdown from '@/src/components/formatting/Markdown/Markdown'
import { useGeneralContext } from '@/src/components/providers/GeneralContextProvider'
import ShareButtons from '@/src/components/sections/ShareButtons'
import { InbaReleaseEntityFragment } from '@/src/services/graphql'
import cn from '@/src/utils/cn'
import { formatDate } from '@/src/utils/formatDate'
import { formatFileExtension } from '@/src/utils/formatFileExtension'
import { formatFileSize } from '@/src/utils/formatFileSize'
import { isDefined } from '@/src/utils/isDefined'
import { getPageBreadcrumbs } from '@/src/utils/pageUtils_Deprecated'
import { useLocale } from '@/src/utils/useLocale'
import { useTranslation } from '@/src/utils/useTranslation'

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
            className={cn('overflow-hidden rounded-xl border-2', {
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

              <ul className="flex flex-col rounded-lg border-2 py-2">
                {files?.filter(isDefined).map((file, index) => (
                  <Fragment key={file.media.data?.id}>
                    {index > 0 ? <HorizontalDivider asListItem className="mx-4 lg:mx-6" /> : null}
                    <li>
                      <FileRowCard
                        title={file.title ?? file.media.data?.attributes?.name ?? ''}
                        downloadLink={file.media.data?.attributes?.url}
                        format={formatFileExtension(file.media.data?.attributes?.ext) ?? undefined}
                        size={
                          file.media.data?.attributes?.size
                            ? formatFileSize(file.media.data?.attributes?.size, locale)
                            : undefined
                        }
                      />
                    </li>
                  </Fragment>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </SectionContainer>

      <SectionContainer className="pt-10 md:pt-18">
        <ShareButtons twitterTitle={title} />
      </SectionContainer>
    </>
  )
}

export default InbaReleasePageContent

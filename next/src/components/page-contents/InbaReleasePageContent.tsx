import { Typography } from '@bratislava/component-library'
import * as React from 'react'
import { Fragment, useMemo } from 'react'

import { Breadcrumb } from '@/src/components/common/Breadcrumbs/Breadcrumbs'
import HorizontalDivider from '@/src/components/common/Divider/HorizontalDivider'
import FileList from '@/src/components/common/FileList/FileList'
import ImagePlaceholder from '@/src/components/common/Image/ImagePlaceholder'
import StrapiImage from '@/src/components/common/Image/StrapiImage'
import NarrowText from '@/src/components/common/NarrowText/NarrowText'
import PageHeader from '@/src/components/common/PageHeader/PageHeader'
import Markdown from '@/src/components/formatting/Markdown/Markdown'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import { useGeneralContext } from '@/src/components/providers/GeneralContextProvider'
import SearchResultCard from '@/src/components/sections/SearchSection/SearchResultCard'
import { SearchResult } from '@/src/components/sections/SearchSection/useQueryBySearchOption'
import ShareButtons from '@/src/components/sections/ShareButtons_Deprecated'
import { InbaReleaseEntityFragment } from '@/src/services/graphql'
import cn from '@/src/utils/cn'
import { formatDate } from '@/src/utils/formatDate'
import { isDefined } from '@/src/utils/isDefined'
import { getPageBreadcrumbs } from '@/src/utils/pageUtils_Deprecated'
import { useTranslation } from '@/src/utils/useTranslation'

export type InbaReleasePageContentProps = {
  inbaRelease: InbaReleaseEntityFragment
}

// TODO may need refactor, it was just copied from legacy BlogPostPageContent that didn't undergo any refactoring

const InbaReleasePageContent = ({ inbaRelease }: InbaReleasePageContentProps) => {
  const { t } = useTranslation()

  const { title, coverImage, perex, releaseDate, files, inbaArticles } = inbaRelease
  const coverImageAttr = coverImage

  const filteredInbaArticles = inbaArticles.filter(isDefined) ?? []

  const { general } = useGeneralContext()
  const parentBreadcrumbPageEntity = general?.inbaReleasesPage

  const breadcrumbs = useMemo(() => {
    return [
      ...(parentBreadcrumbPageEntity ? getPageBreadcrumbs(parentBreadcrumbPageEntity) : []),
      { title: title ?? '', path: null } as Breadcrumb,
    ]
  }, [parentBreadcrumbPageEntity, title])

  return (
    <>
      <PageHeader
        title={title}
        breadcrumbs={breadcrumbs}
        subtext={releaseDate && t('InbaRelease.releasedOn', { date: formatDate(releaseDate) })}
      />

      {/* TODO redesign according to figma */}
      <SectionContainer className="pt-10 md:pt-18">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_2fr]">
          <div
            className={cn('overflow-hidden rounded-xl border-2', {
              'aspect-5/8': !coverImageAttr,
            })}
          >
            {coverImageAttr ? <StrapiImage alt="" image={coverImageAttr} /> : <ImagePlaceholder />}
          </div>
          <div className="flex w-full flex-col gap-8">
            {perex ? (
              <NarrowText width="full">
                <Typography variant="h3" as="h2" className="pb-4">
                  {t('InbaRelease.inThisRelease')}
                </Typography>
                {/* Perex comes as plain text from Strapi, but we format it using Markdown component */}
                <Markdown content={perex} />
              </NarrowText>
            ) : null}

            <div className="flex flex-col">
              <Typography variant="h3" as="h2" className="pb-4">
                {t('InbaRelease.toDownload')}
              </Typography>

              <FileList files={files?.filter(isDefined) ?? []} />
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* TODO pagination - replace by meilisearch fetcher + useQuery and prefetch? */}
      {filteredInbaArticles.length > 0 ? (
        <SectionContainer className="pt-10 md:pt-18">
          <div className="flex flex-col gap-3 lg:gap-4">
            <Typography variant="h3" as="h2" className="pb-4">
              {t('InbaRelease.articlesInThisRelease')}
            </Typography>

            <ul className="flex flex-col rounded-lg border-2">
              {filteredInbaArticles.map((article, index) => {
                const cardData: SearchResult = {
                  title: article.title,
                  uniqueId: article.slug,
                  linkHref: `/inba/clanky/${article.slug}`,
                  coverImageSrc: article.coverImage?.url,
                  metadata: [article.inbaTag?.title].filter(isDefined),
                }

                return (
                  <Fragment key={article.slug}>
                    {index > 0 ? <HorizontalDivider asListItem className="mx-4 lg:mx-5" /> : null}
                    <li>
                      <SearchResultCard data={cardData} />
                    </li>
                  </Fragment>
                )
              })}
            </ul>
          </div>
        </SectionContainer>
      ) : null}

      <SectionContainer className="pt-10 pb-8 md:pt-18">
        <ShareButtons twitterTitle={title} />
      </SectionContainer>
    </>
  )
}

export default InbaReleasePageContent

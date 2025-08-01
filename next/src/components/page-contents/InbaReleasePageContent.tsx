import { Typography } from '@bratislava/component-library'
import * as React from 'react'
import { Fragment, useMemo } from 'react'

import { Breadcrumb } from '@/src/components/common/Breadcrumbs/Breadcrumbs'
import Button from '@/src/components/common/Button/Button'
import HorizontalDivider from '@/src/components/common/Divider/HorizontalDivider'
import FileList from '@/src/components/common/FileList/FileList'
import ImagePlaceholder from '@/src/components/common/Image/ImagePlaceholder'
import StrapiImage from '@/src/components/common/Image/StrapiImage'
import PageHeader from '@/src/components/common/PageHeader/PageHeader'
import Markdown from '@/src/components/formatting/Markdown/Markdown'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import { useGeneralContext } from '@/src/components/providers/GeneralContextProvider'
import SearchResultCard from '@/src/components/sections/SearchSection/SearchResultCard'
import { SearchResult } from '@/src/components/sections/SearchSection/useQueryBySearchOption'
import ShareButtons from '@/src/components/sections/ShareButtons_Deprecated'
import { InbaReleaseEntityFragment } from '@/src/services/graphql'
import { formatDate } from '@/src/utils/formatDate'
import { isDefined } from '@/src/utils/isDefined'
import { getPageBreadcrumbs } from '@/src/utils/pageUtils_Deprecated'
import { useTranslation } from '@/src/utils/useTranslation'

type Props = {
  inbaRelease: InbaReleaseEntityFragment
}

/**
 * Figma: https://www.figma.com/design/A9aoQH2FGhR1D14wvvk6FW/Mestsk%C3%BD-web--bratislava.sk-?node-id=2452-2134&m=dev
 */

const InbaReleasePageContent = ({ inbaRelease }: Props) => {
  const { t } = useTranslation()

  const { title, coverImage, perex, releaseDate, files, inbaArticles } = inbaRelease

  const filteredInbaArticles = inbaArticles.filter(isDefined) ?? []

  const { general } = useGeneralContext()
  const parentBreadcrumbPageEntity = general?.inbaReleasesPage

  const breadcrumbs = useMemo(() => {
    return [
      ...(parentBreadcrumbPageEntity ? getPageBreadcrumbs(parentBreadcrumbPageEntity) : []),
      { title, path: null } as Breadcrumb,
    ]
  }, [parentBreadcrumbPageEntity, title])

  return (
    <>
      <PageHeader
        title={title}
        breadcrumbs={breadcrumbs}
        subtext={releaseDate && t('InbaRelease.releasedOn', { date: formatDate(releaseDate) })}
        hasWaves={false}
      />

      <SectionContainer className="pt-10 md:pt-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[592fr_488fr] lg:gap-34">
          <div className="flex w-full flex-col gap-12">
            <div className="flex w-full flex-col gap-8">
              {perex ? (
                <div className="flex flex-col gap-4">
                  <Typography variant="h3" as="h2">
                    {t('InbaRelease.inThisRelease')}
                  </Typography>
                  {/* Perex comes as plain text from Strapi, but we format it using Markdown component */}
                  <Markdown content={perex} />
                </div>
              ) : null}

              <Button href="#clanky-v-tomto-cisle" variant="link">
                {t('InbaRelease.articlesInThisRelease')}
              </Button>
            </div>

            <div className="flex flex-col gap-4">
              <Typography variant="h3" as="h2">
                {t('InbaRelease.toDownload')}
              </Typography>

              <FileList files={files?.filter(isDefined) ?? []} />
            </div>
          </div>

          <div
            // Negative top margin was set so its top edge is aligned with title's top edge
            className="aspect-inba overflow-hidden rounded-xl border lg:-mt-45"
          >
            {coverImage ? <StrapiImage alt="" image={coverImage} /> : <ImagePlaceholder />}
          </div>
        </div>
      </SectionContainer>

      {/* TODO pagination - replace by meilisearch fetcher + useQuery and prefetch? */}
      {filteredInbaArticles.length > 0 ? (
        <SectionContainer className="pt-10 md:pt-18">
          <div className="flex flex-col gap-5 lg:gap-6">
            <Typography variant="h3" as="h2" id="clanky-v-tomto-cisle">
              {t('InbaRelease.articlesInThisRelease')}
            </Typography>

            <ul className="flex flex-col rounded-lg border">
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

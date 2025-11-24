import { Typography } from '@bratislava/component-library'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import React, { Fragment } from 'react'

import ArticleRowCard from '@/src/components/cards/ArticleRowCard'
import Button from '@/src/components/common/Button/Button'
import HorizontalDivider from '@/src/components/common/Divider/HorizontalDivider'
import CardImage from '@/src/components/common/Image/CardImage'
import LoadingSpinner from '@/src/components/common/LoadingSpinner/LoadingSpinner'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import { useGeneralContext } from '@/src/components/providers/GeneralContextProvider'
import { InbaLatestReleaseSectionFragment } from '@/src/services/graphql'
import { client } from '@/src/services/graphql/gql'
import { formatDate } from '@/src/utils/formatDate'
import { generateImageSizes } from '@/src/utils/generateImageSizes'
import { getLinkProps } from '@/src/utils/getLinkProps'
import { isDefined } from '@/src/utils/isDefined'

export const latestInbaReleaseQueryOptions = {
  queryKey: ['LatestInbaRelease'],
  queryFn: () => client.LatestInbaRelease(),
  placeholderData: keepPreviousData,
}

const imageSizes = generateImageSizes({ default: '100vw', lg: '33vw' })

type Props = { section: InbaLatestReleaseSectionFragment }

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=18311-26160&t=vxeRfz8aJUl4a6MT-4
 */

const InbaLatestReleaseSection = ({ section }: Props) => {
  const { t } = useTranslation()

  const { general } = useGeneralContext()

  const { articles: articlesFromSection } = section

  const { data, isPending, isError, error } = useQuery(latestInbaReleaseQueryOptions)

  if (isPending) {
    return <LoadingSpinner />
  }

  if (isError) {
    return <Typography variant="p-default">{error?.message}</Typography>
  }

  const latestInbaRelease = data.inbaReleases[0]

  if (!latestInbaRelease)
    return <Typography variant="p-default">{t('InbaLatestReleaseSection.notFound')}</Typography>

  const articlesToShow = [
    ...articlesFromSection,
    ...latestInbaRelease.articles.filter(
      (articleFromRelease) =>
        // Don't show same article twice
        !articlesFromSection.some(
          (articleFromSection) => articleFromSection?.documentId === articleFromRelease?.documentId,
        ),
    ),
  ]
    .filter(isDefined)
    .slice(0, 3)

  return (
    <SectionContainer>
      <div className="flex flex-col py-6 lg:py-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-34">
          <CardImage
            imgSrc={latestInbaRelease.coverImage?.url}
            sizes={imageSizes}
            className="0 aspect-inba w-full max-w-140 rounded-md border lg:w-[22rem] lg:rounded-lg"
          />
          <div className="flex w-full flex-col gap-4 lg:gap-8">
            <SectionHeader title={t('InbaLatestReleaseSection.latestRelease')} />
            <div className="flex flex-col gap-4 lg:gap-6">
              <ul className="flex flex-col rounded-lg border px-4 lg:px-6">
                {articlesToShow.map((article, index) => {
                  return (
                    <Fragment key={article.documentId}>
                      {index > 0 && <HorizontalDivider asListItem />}
                      <li className="py-4">
                        <ArticleRowCard
                          title={article.title}
                          imgSrc={article.coverMedia?.url}
                          imgSizes={imageSizes}
                          metadata={[
                            formatDate(article.addedAt),
                            article.articleCategory?.title,
                          ].filter(isDefined)}
                          linkProps={getLinkProps({ article })}
                        />
                      </li>
                    </Fragment>
                  )
                })}
              </ul>
              <div className="flex flex-col gap-4 lg:flex-row">
                <Button
                  variant="solid"
                  href={`${getLinkProps({ page: general?.inbaReleasesPage }).href}/${latestInbaRelease.slug}`}
                  fullWidthMobile
                >
                  {t('InbaLatestReleaseSection.readRelease')}
                </Button>
                <Button
                  variant="outline"
                  {...getLinkProps({ page: general?.inbaReleasesPage })}
                  fullWidthMobile
                >
                  {t('InbaLatestReleaseSection.allReleases')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  )
}

export default InbaLatestReleaseSection

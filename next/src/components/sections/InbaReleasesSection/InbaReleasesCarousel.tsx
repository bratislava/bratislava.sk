import { Typography } from '@bratislava/component-library'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

import InbaReleaseCard from '@/src/components/cards/InbaReleaseCard'
import ResponsiveCarousel from '@/src/components/common/Carousel/ResponsiveCarousel'
import LoadingSpinner from '@/src/components/common/LoadingSpinner/LoadingSpinner'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import { InbaReleasesSectionFragment } from '@/src/services/graphql'
import {
  getInbaReleasesQueryKey,
  inbaReleasesDefaultFilters,
  inbaReleasesFetcher,
} from '@/src/services/meili/fetchers/inbaReleasesFetcher'
import { formatDate } from '@/src/utils/formatDate'
import { generateImageSizes } from '@/src/utils/generateImageSizes'
import { isDefined } from '@/src/utils/isDefined'

type Props = { section: InbaReleasesSectionFragment }

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=17826-20475&t=oiip1Wu4BbgLXqBp-4
 */

const InbaReleasesCarousel = ({ section }: Props) => {
  const { title, text, showMoreLink } = section

  const { data, isPending, isError, error } = useQuery({
    queryKey: getInbaReleasesQueryKey(inbaReleasesDefaultFilters),
    queryFn: () => inbaReleasesFetcher(inbaReleasesDefaultFilters),
    placeholderData: keepPreviousData,
  })

  return (
    <div className="flex flex-col gap-8">
      <SectionHeader title={title} text={text} showMoreLink={showMoreLink} />
      {isError ? (
        <Typography variant="p-default">{error?.message}</Typography>
      ) : isPending ? (
        <LoadingSpinner />
      ) : (
        <ResponsiveCarousel
          items={data.hits
            .map((inbaRelease) => {
              if (!inbaRelease) return null

              const { title: inbaReleaseTitle, slug, coverImage, releaseDate, perex } = inbaRelease

              return (
                <InbaReleaseCard
                  key={slug}
                  date={formatDate(releaseDate)}
                  title={inbaReleaseTitle}
                  text={perex}
                  linkHref={`/inba/vydania/${slug}`}
                  imgSrc={coverImage?.url}
                  imgSizes={generateImageSizes({ default: '100vw', md: '50vw', lg: '25vw' })}
                />
              )
            })
            .filter(isDefined)}
          desktop={4}
          hasVerticalPadding={false}
        />
      )}
    </div>
  )
}

export default InbaReleasesCarousel

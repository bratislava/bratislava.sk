import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { Fragment } from 'react'

import DocumentRowCard from '@/src/components/cards/DocumentRowCard'
import { getCardTitleLevel } from '@/src/components/cards/getCardTitleLevel'
import HorizontalDivider from '@/src/components/common/Divider/HorizontalDivider'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import UrbanStudiesAll from '@/src/components/sections/UrbanStudiesSection/UrbanStudiesAll'
import { UrbanStudiesSectionFragment } from '@/src/services/graphql'
import { getUrbanStudiesQueryKey, urbanStudiesDefaultFilters, urbanStudiesFetcher, UrbanStudiesFilters } from '@/src/services/meili/fetchers/urbanStudiesFetcher'
import { isDefined } from '@/src/utils/isDefined'
import { useRoutePreservedState } from '@/src/utils/useRoutePreservedState'

type Props = {
  section: UrbanStudiesSectionFragment
}

/**
 * Renders a list of related urban studies (or a searchable list of all of them when showAll is set).
 * Mirrors AssetsSection (ComponentSectionsAssets).
 *
 * TODO Implement FE component or variant for urban studies, now using DocumentRowCard
 */
const UrbanStudiesSection = ({ section }: Props) => {
  const {
    title,
    text,
    urbanStudies: urbanStudiesFromStrapi,
    showAll,
    titleLevelUrbanStudiesSection: titleLevel,
    categoryUrbanStudiesSection: category,
    stateUrbanStudiesSection: state,
  } = section

  const [filters, setFilters] = useRoutePreservedState<UrbanStudiesFilters>({
      ...urbanStudiesDefaultFilters,
      state: state ? [state.slug] : [],
      categories: category ? [category.slug] : [],
    })

    const { data } = useQuery({
      queryKey: getUrbanStudiesQueryKey(filters),
      queryFn: () => urbanStudiesFetcher(filters),
      placeholderData: keepPreviousData,
      enabled:
      // don't fetch if section contains only manually selected urban studies and no other filters
      !(
        urbanStudiesFromStrapi.length > 0 &&
        [...[category], state].filter(isDefined).length === 0
      ),
    })

    if (showAll) {
      return (
        <SectionContainer>
          <UrbanStudiesAll section={section} />
        </SectionContainer>
      )

    }
  const urbanStudiesToShow = [
    ...urbanStudiesFromStrapi.filter(isDefined),
    ...(data?.hits.filter((urbanStudyFromMeili) => urbanStudiesFromStrapi.every((urbanStudyFromStrapi) => urbanStudyFromStrapi?.documentId !== urbanStudyFromMeili.documentId)) ?? [])]

  return (
    <SectionContainer>
      <div className="flex flex-col gap-4 lg:gap-6">
        <SectionHeader title={title} titleLevel={titleLevel} text={text} />

        <ul className="flex flex-col rounded-lg border py-2">
          {urbanStudiesToShow.map((urbanStudy, index) => {
            const { documentId, slug, title: urbanStudyTitle, urbanStudyCategory, year } = urbanStudy

            return (
              <Fragment key={documentId}>
                {index > 0 ? <HorizontalDivider asListItem className="mx-4 lg:mx-6" /> : null}
                <li className="w-full">
                  {/* TODO Implement FE component or variant for urban studies, now using DocumentRowCard */}
                  <DocumentRowCard
                    variant="urban-study"
                    title={urbanStudyTitle}
                    cardTitleLevel={getCardTitleLevel(titleLevel)}
                    linkHref={`/uzemne-studie/${slug}`}
                    className="px-4 lg:px-6"
                    metadata={[urbanStudyCategory?.title, year].filter(
                      isDefined,
                    )}
                  />
                </li>
              </Fragment>
            )
          })}
        </ul>
      </div>
    </SectionContainer>
  )
}

export default UrbanStudiesSection

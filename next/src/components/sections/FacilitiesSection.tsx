import React from 'react'

import FacilityCard from '@/src/components/cards/FacilityCard'
import { getCardTitleLevel } from '@/src/components/cards/getCardTitleLevel'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import { FacilitiesSectionFragment } from '@/src/services/graphql'
import cn from '@/src/utils/cn'
import { getLinkProps } from '@/src/utils/getLinkProps'
import { isDefined } from '@/src/utils/isDefined'

type FacilitiesSectionProps = {
  section: FacilitiesSectionFragment
}

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=17952-15668&m=dev
 */

const FacilitiesSection = ({ section }: FacilitiesSectionProps) => {
  const { title, text, facilityPages, titleLevelFacilitiesSection: titleLevel } = section

  const filteredFacilityPages = facilityPages.filter(isDefined)

  return (
    <SectionContainer className="py-6 lg:py-16">
      <div className="flex flex-col gap-6 lg:gap-12">
        <SectionHeader title={title} text={text} titleLevel={titleLevel} />
        <ul
          className={cn(
            'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-8 lg:@page-wide:grid-cols-3',
            {
              'lg:@page-wide:grid-cols-2': filteredFacilityPages.length < 3,
            },
          )}
        >
          {filteredFacilityPages.map((facilityPage) => {
            return (
              <li key={facilityPage.documentId} className="*:h-full">
                <FacilityCard
                  cardTitleLevel={getCardTitleLevel(titleLevel)}
                  image={facilityPage.pageBackgroundImage}
                  linkProps={getLinkProps({ page: facilityPage })}
                />
              </li>
            )
          })}
        </ul>
      </div>
    </SectionContainer>
  )
}

export default FacilitiesSection

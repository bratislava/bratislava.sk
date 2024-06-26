import { Typography } from '@bratislava/component-library'
import React from 'react'

import SectionContainer from '@/components/common/SectionContainer/SectionContainer'
import TopServices from '@/components/common/TopServices/TopServices'
import { useHomepageContext } from '@/components/providers/HomepageContextProvider'
import { isDefined } from '@/utils/isDefined'

const TopServicesHomepageSection = () => {
  const { homepage } = useHomepageContext()
  const { topServices } = homepage?.attributes ?? {}

  if (!topServices) {
    return null
  }

  const topServicesFiltered = topServices?.services?.filter(isDefined)

  return (
    <SectionContainer className="bg-main-200 py-6 lg:py-18">
      <Typography type="h2" className="pb-6 text-center lg:pb-12">
        {topServices.title}
      </Typography>
      <TopServices items={topServicesFiltered} />
    </SectionContainer>
  )
}

export default TopServicesHomepageSection

import { Typography } from '@bratislava/component-library'
import React from 'react'

import TopServices from '@/src/components/common/TopServices/TopServices'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import { useHomepageContext } from '@/src/components/providers/HomepageContextProvider'
import { isDefined } from '@/src/utils/isDefined'

const TopServicesHomepageSection = () => {
  const { homepage } = useHomepageContext()
  const { topServices } = homepage ?? {}

  if (!topServices) {
    return null
  }

  const topServicesFiltered = topServices?.services?.filter(isDefined)

  return (
    <SectionContainer className="bg-main-200 py-6 lg:py-18">
      <Typography variant="h2" className="pb-6 text-center lg:pb-12">
        {topServices.title}
      </Typography>
      <TopServices items={topServicesFiltered} />
    </SectionContainer>
  )
}

export default TopServicesHomepageSection

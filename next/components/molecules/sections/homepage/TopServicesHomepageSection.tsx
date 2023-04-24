import { SectionContainer } from '@components/ui/SectionContainer/SectionContainer'
import { TopServices } from '@components/ui/TopServices/TopServices'
import { useHomepageContext } from '@utils/homepageContext'
import { isDefined } from '@utils/isDefined'
import React from 'react'

const TopServicesHomepageSection = () => {
  const { homepage } = useHomepageContext()
  const { topServices } = homepage?.attributes ?? {}

  if (!topServices) {
    return null
  }

  const topServicesFiltered = topServices?.services?.filter(isDefined)

  return (
    <SectionContainer className="relative bg-main-200 py-6 lg:py-18">
      <h2 className="text-h2 pb-6 text-center lg:pb-12">{topServices.title}</h2>
      <TopServices items={topServicesFiltered} />
    </SectionContainer>
  )
}

export default TopServicesHomepageSection

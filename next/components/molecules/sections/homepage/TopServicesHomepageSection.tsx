import { SectionContainer, TopServices } from '@components/ui'
import { useHomepageContext } from '@utils/homepageContext'
import { isDefined } from '@utils/isDefined'
import React from 'react'

const TopServicesHomepageSection = () => {
  const { homepage } = useHomepageContext()
  const { topServices } = homepage?.attributes ?? {}

  const topServicesFiltered = topServices?.services?.filter(isDefined)
  console.log(homepage)

  if (!topServices) {
    return null
  }

  return (
    <SectionContainer className="relative bg-category-200 py-6 lg:py-18">
      <h2 className="text-h1 pb-6 text-center lg:pb-12">{topServices.title}</h2>
      <TopServices items={topServicesFiltered} />
    </SectionContainer>
  )
}

export default TopServicesHomepageSection

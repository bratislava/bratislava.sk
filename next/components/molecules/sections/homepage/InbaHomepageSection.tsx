import { InBaCard } from '@components/ui/InBaCard/InBaCard'
import { SectionContainer } from '@components/ui/SectionContainer/SectionContainer'
import { useHomepageContext } from '@utils/homepageContext'
import React from 'react'

const InbaHomepageSection = () => {
  const { homepage } = useHomepageContext()

  const frontImage = homepage?.attributes?.inbaFrontImage?.data?.attributes?.url
  const rearImage = homepage?.attributes?.inbaRearImage?.data?.attributes?.url
  const inba = {
    title: homepage?.attributes?.inba?.title,
    content: homepage?.attributes?.inba?.content,
    link: homepage?.attributes?.inbaUrl,
    images: [frontImage, rearImage],
  }

  return (
    <SectionContainer className="mb-8">
      <InBaCard className="mx-auto mt-40 min-h-[200px] max-w-3xl md:mt-28" {...inba} />
      <div className="hidden md:block md:h-20" />
    </SectionContainer>
  )
}

export default InbaHomepageSection

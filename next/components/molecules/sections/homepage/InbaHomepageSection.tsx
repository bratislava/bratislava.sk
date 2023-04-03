import React from 'react'
import { InBaCard, SectionContainer } from '@components/ui'
import { useHomepageContext } from '@utils/homepageContext'

const InbaHomepageSection = () => {
  const { homepage } = useHomepageContext()

  const frontImage = homepage?.attributes?.inba?.images?.frontImage?.data?.attributes?.url
  const rearImage = homepage?.attributes?.inba?.images?.rearImage?.data?.attributes?.url
  const inba = {
    title: homepage?.attributes?.inba?.title,
    content: homepage?.attributes?.inba?.content,
    link: homepage?.attributes?.inba?.link,
    images: [frontImage, rearImage],
  }

  return (
    <SectionContainer>
      <InBaCard className="mx-auto mt-40 min-h-[200px] max-w-3xl md:mt-28" {...inba} />
      <div className="hidden md:block md:h-20" />
    </SectionContainer>
  )
}

export default InbaHomepageSection

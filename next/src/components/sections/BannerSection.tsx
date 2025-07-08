import React from 'react'

import Banner from '@/src/components/common/Banner/Banner'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import { BannerSectionFragment } from '@/src/services/graphql'

type BannerSectionProps = { section: BannerSectionFragment }

const BannerSection = ({ section }: BannerSectionProps) => {
  return (
    <SectionContainer>
      <Banner
        title={section.bannerTitle}
        content={section.content}
        contentPosition={section.contentPosition}
        variant={section.bannerVariant}
        imagePath={section.media.data?.attributes?.url}
        primaryLink={section.primaryLink}
        secondaryLink={section.secondaryLink}
        tertiaryLink={section.tertiaryLink}
      />
    </SectionContainer>
  )
}

export default BannerSection

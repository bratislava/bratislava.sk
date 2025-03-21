import React from 'react'

import Banner from '@/src/components/common/Banner/Banner'
import { BannerSectionFragment } from '@/src/services/graphql'

type BannerSectionProps = { section: BannerSectionFragment }

const BannerSection = ({ section }: BannerSectionProps) => {
  return (
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
  )
}

export default BannerSection

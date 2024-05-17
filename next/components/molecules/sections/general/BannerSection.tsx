import Banner from '@components/ui/Banner/Banner'
import React from 'react'

import { BannerSectionFragment } from '@/backend/graphql'

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

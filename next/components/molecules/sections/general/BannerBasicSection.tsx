import { BannerBasicSectionFragment } from '@bratislava/strapi-sdk-homepage'
import BannerBasic from 'components/forms/simple-components/BannerBasic'
import { useRouter } from 'next/router'

import React from 'react'

type BannerBasicSectionProps = { section: BannerBasicSectionFragment }

const BannerBasicSection = ({ section }: BannerBasicSectionProps) => {
  const router = useRouter()

  return (
    <BannerBasic
      imagePath={section.media.data?.attributes?.url}
      content={section.content}
      onPressPrimary={
        section.primaryLink?.url
          ? () => {
              // weird but inside conditional (ternary) operator condition is not passed so this is required, feel free upgrade it if it's possible
              section.primaryLink?.url ? router.push(section.primaryLink.url) : null
            }
          : undefined
      }
      buttonPrimaryText={section.primaryLink?.linkText ?? undefined}
      onPressSecondary={
        section.secondaryLink?.url
          ? () => {
              // weird but inside conditional (ternary) operator condition is not passed so this is required, feel free upgrade it if it's possible
              section.secondaryLink?.url ? router.push(section.secondaryLink.url) : null
            }
          : undefined
      }
      buttonSecondaryText={section.secondaryLink?.linkText ?? undefined}
      linkTertiary={section.tertiaryLink?.url ?? undefined}
      buttonTertiaryText={section.tertiaryLink?.linkText ?? undefined}
      {...section}
    />
  )
}

export default BannerBasicSection

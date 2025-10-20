import React from 'react'

import LinkCard from '@/src/components/cards/LinkCard'
import Banner from '@/src/components/common/Banner/Banner'
import ResponsiveCarousel from '@/src/components/common/Carousel/ResponsiveCarousel'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import { StarzLandingPageSectionFragment } from '@/src/services/graphql'
import { generateImageSizes } from '@/src/utils/generateImageSizes'
import { getLinkProps } from '@/src/utils/getLinkProps'
import { isDefined } from '@/src/utils/isDefined'

type StarzLandingPageSectionProps = { section: StarzLandingPageSectionFragment }

const StarzLandingPageSection = ({ section }: StarzLandingPageSectionProps) => {
  const { media, ...restBannerProps } = section.banner

  const filteredCardLinks = section.cardLinks?.filter(isDefined) ?? []

  return (
    <SectionContainer className="py-6 lg:py-12">
      <div className="flex flex-col gap-6 lg:gap-8">
        <Banner imagePath={media.url} {...restBannerProps} />
        {filteredCardLinks.length > 0 ? (
          <ResponsiveCarousel
            items={filteredCardLinks
              .map((card, index) => {
                const cardImage =
                  card.media ??
                  // If more links are filled in strapi (e.g. both page and article), choose the first non-empty field
                  (card.page ? card.page?.pageBackgroundImage : card.article?.coverMedia)

                const imageSizes = generateImageSizes({ default: '100vw', md: '50vw', lg: '33vw' })

                return card ? (
                  <LinkCard
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    title={getLinkProps(card).children}
                    text={card.subtext}
                    image={cardImage}
                    imageSizes={imageSizes}
                    linkProps={getLinkProps(card)}
                  />
                ) : null
              })
              .filter(isDefined)}
            hasVerticalPadding={false}
            hideControls
          />
        ) : null}
      </div>
    </SectionContainer>
  )
}

export default StarzLandingPageSection

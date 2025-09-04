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
        <Banner imagePath={media.url} {...restBannerProps} className="flex-col-reverse" />
        {filteredCardLinks.length > 0 ? (
          <ResponsiveCarousel
            items={filteredCardLinks
              .map((card, index) => {
                const cardLinkProps = card.page
                  ? getLinkProps({ page: card.page })
                  : getLinkProps({ url: card.url })

                const cardTitle = card.label ?? cardLinkProps.children

                const cardImage = card.page ? card.page.pageBackgroundImage : card.media

                const imageSizes = generateImageSizes({ default: '100vw', md: '50vw', lg: '33vw' })

                return card ? (
                  <LinkCard
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    title={cardTitle}
                    text={card.subtext}
                    image={cardImage}
                    imageSizes={imageSizes}
                    linkProps={cardLinkProps}
                  />
                ) : null
              })
              .filter(isDefined)}
            desktop={3}
            hasVerticalPadding={false}
            hideControls
          />
        ) : null}
      </div>
    </SectionContainer>
  )
}

export default StarzLandingPageSection

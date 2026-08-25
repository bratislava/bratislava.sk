import Image from 'next/image'

import LinkCard from '@/src/components/cards/LinkCard'
import Banner from '@/src/components/common/Banner/Banner'
import ResponsiveCarousel from '@/src/components/common/Carousel/ResponsiveCarousel'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import { CityServiceLandingPageSectionFragment } from '@/src/services/graphql'
import { generateImageSizes } from '@/src/utils/generateImageSizes'
import { getLinkProps } from '@/src/utils/getLinkProps'
import { isDefined } from '@/src/utils/isDefined'

type CityServiceLandingPageSectionProps = { section: CityServiceLandingPageSectionFragment }

const CityServiceLandingPageSection = ({ section }: CityServiceLandingPageSectionProps) => {
  const { media, variant, bannerVariant, ...restBannerProps } = section.cityServiceLandingPageBanner

  const filteredCardLinks = section.cardLinks?.filter(isDefined) ?? []

  return (
    <SectionContainer className="py-6 lg:py-12">
      <div className="flex flex-col gap-6 lg:gap-8">
        {bannerVariant === 'banner' ? (
          <Banner imagePath={media.url} variant={variant} {...restBannerProps} />
        ) : (
          <div className="relative h-147 w-full overflow-hidden rounded-xl">
            <Image
              src={media.url}
              className="object-cover"
              alt=""
              fill
              sizes={generateImageSizes({ default: '100vw', lg: '50vw' })}
            />
          </div>
        )}

        {filteredCardLinks.length > 0 && (
          <ResponsiveCarousel
            items={filteredCardLinks
              .map((card, index) => {
                const cardImage =
                  card.media ??
                  // If more links are filled in strapi (e.g. both page and article), choose the first non-empty field
                  (card.page ? card.page.pageBackgroundImage : card.article?.coverMedia)

                const imageSizes = generateImageSizes({ default: '100vw', md: '50vw', lg: '33vw' })

                return (
                  <LinkCard
                    key={index}
                    text={card.subtext}
                    image={cardImage}
                    imageSizes={imageSizes}
                    linkProps={getLinkProps(card)}
                  />
                )
              })
              .filter(isDefined)}
            hasVerticalPadding={false}
            hideControls
          />
        )}
      </div>
    </SectionContainer>
  )
}

export default CityServiceLandingPageSection

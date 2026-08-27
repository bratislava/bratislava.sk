import LinkCard from '@/src/components/cards/LinkCard'
import Banner from '@/src/components/common/Banner/Banner'
import ResponsiveCarousel from '@/src/components/common/Carousel/ResponsiveCarousel'
import StrapiImage from '@/src/components/common/Image/StrapiImage'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import { LandingPageSectionFragment } from '@/src/services/graphql'
import { generateImageSizes } from '@/src/utils/generateImageSizes'
import { getLinkProps } from '@/src/utils/getLinkProps'
import { isDefined } from '@/src/utils/isDefined'

type Props = { section: LandingPageSectionFragment }

const LandingPageSection = ({ section }: Props) => {
  const { landingPageBanner, landingPageVariant, landingPageImage } = section
  const bannerColorVariant = landingPageBanner?.variant

  const filteredCardLinks = section.cardLinks?.filter(isDefined) ?? []

  return (
    <SectionContainer className="py-6 lg:py-12">
      <div className="flex flex-col gap-6 lg:gap-8">
        {landingPageVariant === 'banner' && landingPageBanner ? (
          <Banner
            {...landingPageBanner}
            imagePath={landingPageBanner.media.url}
            variant={bannerColorVariant}
          />
        ) : landingPageImage ? (
          <div className="relative aspect-272/162 w-full overflow-hidden rounded-2xl lg:aspect-384/158">
            <StrapiImage image={landingPageImage} sizes="100vw" className="object-cover" fill />
          </div>
        ) : null}

        {filteredCardLinks.length > 0 ? (
          <ResponsiveCarousel
            items={filteredCardLinks.map((card, index) => {
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
            })}
            hasVerticalPadding={false}
            hideControls
          />
        ) : null}
      </div>
    </SectionContainer>
  )
}

export default LandingPageSection

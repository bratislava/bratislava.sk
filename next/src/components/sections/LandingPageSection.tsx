import LinkCard from '@/src/components/cards/LinkCard'
import Banner from '@/src/components/common/Banner/Banner'
import ResponsiveCarousel from '@/src/components/common/Carousel/ResponsiveCarousel'
import StrapiImage from '@/src/components/common/Image/StrapiImage'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import {
  Enum_Componentsectionsbanner_Variant,
  Enum_Componentsectionslandingpage_Cardlinkslayout,
  LandingPageSectionFragment,
} from '@/src/services/graphql'
import { generateImageSizes } from '@/src/utils/generateImageSizes'
import { getLinkProps } from '@/src/utils/getLinkProps'
import { isDefined } from '@/src/utils/isDefined'

type Props = { section: LandingPageSectionFragment }

const cardImageSizes = generateImageSizes({ default: '100vw', md: '50vw', lg: '33vw' })

const LandingPageSection = ({ section }: Props) => {
  const { landingPageBanner, landingPageVariant, landingPageImage, cardLinksLayout } = section
  const bannerColorVariant = landingPageBanner?.variant

  const filteredCardLinks = section.cardLinks?.filter(isDefined) ?? []

  const cardProps = filteredCardLinks.map((card) => {
    const cardImage =
      card.media ??
      // If more links are filled in strapi (e.g. both page and article), choose the first non-empty field
      (card.page ? card.page.pageBackgroundImage : card.article?.coverMedia)

    return {
      text: card.subtext,
      image: cardImage,
      imageSizes: cardImageSizes,
      linkProps: getLinkProps(card),
    }
  })

  return (
    <SectionContainer className="py-6 lg:py-12">
      <div className="flex flex-col gap-6 lg:gap-8">
        {landingPageVariant === 'banner' && landingPageBanner ? (
          <Banner
            {...landingPageBanner}
            imagePath={landingPageBanner.media.url}
            variant={bannerColorVariant ?? Enum_Componentsectionsbanner_Variant.Color}
          />
        ) : landingPageImage ? (
          <div className="relative aspect-272/162 w-full overflow-hidden rounded-2xl">
            <StrapiImage image={landingPageImage} sizes="100vw" className="object-cover" fill />
          </div>
        ) : null}

        {cardProps.length > 0 && (
          <>
            {cardLinksLayout ===
            Enum_Componentsectionslandingpage_Cardlinkslayout.LandingPageSectionCardLinksLayoutWrap ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {cardProps.map((props, index) => (
                  <LinkCard key={index} {...props} />
                ))}
              </div>
            ) : (
              <ResponsiveCarousel
                items={cardProps.map((props, index) => (
                  <LinkCard key={index} {...props} />
                ))}
                hasVerticalPadding={false}
                hideControls
              />
            )}
          </>
        )}
      </div>
    </SectionContainer>
  )
}

export default LandingPageSection

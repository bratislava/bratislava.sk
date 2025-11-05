import SectionContainer from '@/src/components/layouts/SectionContainer'
import InbaReleasesCarousel from '@/src/components/sections/InbaReleasesSection/InbaReleasesCarousel'
import InbaReleasesGrid from '@/src/components/sections/InbaReleasesSection/InbaReleasesGrid'
import {
  Enum_Componentsectionsinbareleases_Variant,
  InbaReleasesSectionFragment,
} from '@/src/services/graphql'

type Props = { section: InbaReleasesSectionFragment }

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=17826-20475&t=oiip1Wu4BbgLXqBp-4
 */

const InbaReleasesSection = ({ section }: Props) => {
  if (section.variantInbaReleasesSection === Enum_Componentsectionsinbareleases_Variant.Carousel) {
    return (
      <SectionContainer>
        <InbaReleasesCarousel section={section} />
      </SectionContainer>
    )
  }

  // TODO make variant required and implement correct check
  return (
    <SectionContainer>
      <InbaReleasesGrid section={section} />
    </SectionContainer>
  )
}

export default InbaReleasesSection

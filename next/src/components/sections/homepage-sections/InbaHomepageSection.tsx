import InBaCard from '@/src/components/cards/InBaCard'
import SectionContainer from '@/src/components/common/SectionContainer/SectionContainer'
import { useHomepageContext } from '@/src/components/providers/HomepageContextProvider'
import { getLinkProps } from '@/src/utils/getLinkProps'

const InbaHomepageSection = () => {
  const { homepage } = useHomepageContext()

  const { title, text, inbaFrontImage, inbaRearImage, showMoreLink } =
    homepage?.attributes?.inbaSection ?? {}

  return (
    <SectionContainer className="mb-8">
      <InBaCard
        className="mx-auto mt-40 min-h-[200px] max-w-3xl md:mt-28"
        title={title}
        content={text}
        linkProps={getLinkProps(showMoreLink)}
        frontImageUrl={inbaFrontImage?.data?.attributes?.url}
        rearImageUrl={inbaRearImage?.data?.attributes?.url}
      />
      <div aria-hidden className="hidden md:block md:h-20" />
    </SectionContainer>
  )
}

export default InbaHomepageSection

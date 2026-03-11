import { getCardTitleLevel } from '@/src/components/cards/getCardTitleLevel'
import FaqsAll from '@/src/components/common/FaqsAll/FaqsAll'
import FaqsGroup from '@/src/components/common/FaqsGroup/FaqsGroup'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import { FaqsSectionFragment } from '@/src/services/graphql'
import { isDefined } from '@/src/utils/isDefined'

type Props = {
  section: FaqsSectionFragment
}

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=16846-52391&m=dev
 */

const FaqsSection = ({ section }: Props) => {
  const { title, text, faqs, faqCategories, titleLevelFaqsSection: titleLevel, showAll } = section

  // If no section title is provided, accordions act as h2, otherwise they accommodate to section titleLevel
  const accordionTitleLevel = title ? getCardTitleLevel(titleLevel) : 'h2'

  return (
    <SectionContainer>
      <div className="flex flex-col gap-6 lg:gap-12">
        <SectionHeader title={title} titleLevel={titleLevel} text={text} />
        {showAll ? (
          <FaqsAll />
        ) : (
          <FaqsGroup
            faqs={faqs.filter(isDefined) ?? []}
            faqCategories={faqCategories.filter(isDefined) ?? []}
            accordionTitleLevel={accordionTitleLevel}
          />
        )}
      </div>
    </SectionContainer>
  )
}

export default FaqsSection

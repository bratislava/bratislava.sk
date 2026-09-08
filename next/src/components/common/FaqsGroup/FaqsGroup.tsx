import { AccordionTitleLevel } from '@/src/components/cards/getCardTitleLevel'
import DisclosureGroup from '@/src/components/common/Disclosure/DisclosureGroup'
import FaqDisclosure from '@/src/components/common/FaqDisclosure/FaqDisclosure'
import { FaqCategoryEntityFragment, FaqEntityFragment } from '@/src/services/graphql'
import { isDefined } from '@/src/utils/isDefined'

export type FaqsGroupProps = {
  faqs?: FaqEntityFragment[]
  accordionTitleLevel?: AccordionTitleLevel
  faqCategories?: FaqCategoryEntityFragment[]
}

const FaqsGroup = ({ faqs, accordionTitleLevel = 'h2', faqCategories }: FaqsGroupProps) => {
  const faqList = faqCategories?.length ? faqCategories.flatMap((category) => category.faqs) : faqs

  return (
    <DisclosureGroup>
      {faqList?.filter(isDefined).map((faq) => (
        <FaqDisclosure key={faq.documentId} faq={faq} accordionTitleLevel={accordionTitleLevel} />
      ))}
    </DisclosureGroup>
  )
}

export default FaqsGroup

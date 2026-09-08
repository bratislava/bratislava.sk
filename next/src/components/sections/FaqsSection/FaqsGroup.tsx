import { DisclosureTitleLevel } from '@/src/components/cards/getCardTitleLevel'
import DisclosureGroup from '@/src/components/common/Disclosure/DisclosureGroup'
import FaqDisclosure from '@/src/components/sections/FaqsSection/FaqDisclosure'
import { FaqCategoryEntityFragment, FaqEntityFragment } from '@/src/services/graphql'
import { isDefined } from '@/src/utils/isDefined'

export type FaqsGroupProps = {
  faqs?: FaqEntityFragment[]
  disclosureTitleLevel?: DisclosureTitleLevel
  faqCategories?: FaqCategoryEntityFragment[]
}

const FaqsGroup = ({ faqs, disclosureTitleLevel = 'h2', faqCategories }: FaqsGroupProps) => {
  const faqList = faqCategories?.length ? faqCategories.flatMap((category) => category.faqs) : faqs

  return (
    <DisclosureGroup>
      {faqList?.filter(isDefined).map((faq) => (
        <FaqDisclosure key={faq.documentId} faq={faq} disclosureTitleLevel={disclosureTitleLevel} />
      ))}
    </DisclosureGroup>
  )
}

export default FaqsGroup

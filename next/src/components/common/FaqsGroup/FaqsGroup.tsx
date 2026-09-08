import { Typography } from '@bratislava/component-library'

import { AccordionTitleLevel } from '@/src/components/cards/getCardTitleLevel'
import Badge from '@/src/components/common/Badge/Badge'
import Disclosure from '@/src/components/common/Disclosure/Disclosure'
import DisclosureGroup from '@/src/components/common/Disclosure/DisclosureGroup'
import DisclosureHeader from '@/src/components/common/Disclosure/DisclosureHeader'
import DisclosurePanel from '@/src/components/common/Disclosure/DisclosurePanel'
import Markdown from '@/src/components/formatting/Markdown/Markdown'
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
        <Disclosure key={faq.documentId} id={`disclosure-faq-${faq.documentId}`}>
          <DisclosureHeader>
            {faq.faqCategory?.title ? <Badge label={faq.faqCategory.title} /> : null}
            <Typography variant="h4" as={accordionTitleLevel}>
              {faq.title}
            </Typography>
          </DisclosureHeader>
          <DisclosurePanel>
            <Markdown content={faq.body} variant="accordion" />
          </DisclosurePanel>
        </Disclosure>
      ))}
    </DisclosureGroup>
  )
}

export default FaqsGroup

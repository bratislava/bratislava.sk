import { Typography } from '@bratislava/component-library'
import { Fragment } from 'react'

import { AccordionTitleLevel } from '@/src/components/cards/getCardTitleLevel'
import Badge from '@/src/components/common/Badge/Badge'
import Disclosure from '@/src/components/common/Disclosure/Disclosure'
import DisclosureGroup from '@/src/components/common/Disclosure/DisclosureGroup'
import DisclosureHeader from '@/src/components/common/Disclosure/DisclosureHeader'
import DisclosurePanel from '@/src/components/common/Disclosure/DisclosurePanel'
import HorizontalDivider from '@/src/components/common/Divider/HorizontalDivider'
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
    <DisclosureGroup className="rounded-xl border border-border-active-default bg-background-passive-base py-2">
      {faqList?.filter(isDefined).map((faq, index) => (
        <Fragment key={faq.documentId}>
          {index > 0 ? <HorizontalDivider className="mx-4 lg:mx-6" /> : null}
          <Disclosure id={`disclosure-faq-${faq.documentId}`}>
            <DisclosureHeader className="p-4 ring-inset lg:px-6">
              {faq.faqCategory?.title ? <Badge label={faq.faqCategory.title} /> : null}
              <Typography variant="h4" as={accordionTitleLevel}>
                {faq.title}
              </Typography>
            </DisclosureHeader>
            <DisclosurePanel className="px-4 lg:px-6">
              <Markdown content={faq.body} variant="accordion" />
            </DisclosurePanel>
          </Disclosure>
        </Fragment>
      ))}
    </DisclosureGroup>
  )
}

export default FaqsGroup

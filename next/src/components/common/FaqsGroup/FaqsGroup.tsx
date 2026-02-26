import { Typography } from '@bratislava/component-library'
import React from 'react'

import { AccordionTitleLevel } from '@/src/components/cards/getCardTitleLevel'
import Disclosure from '@/src/components/common/Disclosure/Disclosure'
import DisclosureHeader from '@/src/components/common/Disclosure/DisclosureHeader'
import DisclosurePanel from '@/src/components/common/Disclosure/DisclosurePanel'
import Markdown from '@/src/components/formatting/Markdown/Markdown'
import { FaqEntityFragment } from '@/src/services/graphql'
import { isDefined } from '@/src/utils/isDefined'

export type FaqsGroupProps = {
  faqs: FaqEntityFragment[]
  accordionTitleLevel?: AccordionTitleLevel
}

const FaqsGroup = ({ faqs, accordionTitleLevel }: FaqsGroupProps) => {
  return (
    <div className="flex flex-col gap-4">
      {faqs.filter(isDefined).map((faq) => (
        <Disclosure
          id={`disclosure-faq-${faq.documentId}`}
          key={faq.documentId}
          className="rounded-xl border border-border-active-default bg-background-passive-base py-2"
        >
          <DisclosureHeader className="p-4 lg:px-6">
            <Typography variant="h4" as={accordionTitleLevel}>
              {faq.title}
            </Typography>
          </DisclosureHeader>
          <DisclosurePanel className="px-4 lg:px-6">
            <Markdown content={faq.body} variant="small" />
          </DisclosurePanel>
        </Disclosure>
      ))}
    </div>
  )
}

export default FaqsGroup

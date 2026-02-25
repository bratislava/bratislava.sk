import { Typography } from '@bratislava/component-library'
import React from 'react'

import { AccordionTitleLevel } from '@/src/components/cards/getCardTitleLevel'
import {
  Disclosure,
  DisclosureGroup,
  DisclosureHeader,
  DisclosurePanel,
} from '@/src/components/common/Disclosure'
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
      {faqs.filter(isDefined).map((faq, index) => (
        <DisclosureGroup allowsMultipleExpanded key={index}>
          <Disclosure id={`disclosure-faq-${index}`}>
            <DisclosureHeader>
              <Typography variant="h4" as={accordionTitleLevel}>
                {faq.title}
              </Typography>
            </DisclosureHeader>
            <DisclosurePanel>
              <Markdown content={faq.body} variant="small" />
            </DisclosurePanel>
          </Disclosure>
        </DisclosureGroup>
      ))}
    </div>
  )
}

export default FaqsGroup

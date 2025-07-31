import React from 'react'

import { AccordionTitleLevel } from '@/src/components/cards/getCardTitleLevel'
import Accordion from '@/src/components/common/Accordion/Accordion'
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
        // eslint-disable-next-line react/no-array-index-key
        <Accordion key={index} title={faq.title} accordionTitleLevel={accordionTitleLevel}>
          <Markdown content={faq.body} variant="small" />
        </Accordion>
      ))}
    </div>
  )
}

export default FaqsGroup

import React from 'react'

import Accordion from '@/components/common/Accordion/Accordion'
import Markdown from '@/components/formatting/Markdown/Markdown'
import { FaqEntityFragment } from '@/services/graphql'
import { isDefined } from '@/utils/isDefined'

export type FaqsGroupProps = {
  faqs: FaqEntityFragment[]
}

const FaqsGroup = ({ faqs }: FaqsGroupProps) => {
  return (
    <div className="flex flex-col gap-4">
      {faqs
        .map((faq, index) => {
          if (!faq.attributes) return null

          return (
            // eslint-disable-next-line react/no-array-index-key
            <Accordion key={index} title={faq.attributes.title}>
              <Markdown content={faq.attributes.body} variant="small-no-respo" />
            </Accordion>
          )
        })
        .filter(isDefined)}
    </div>
  )
}

export default FaqsGroup

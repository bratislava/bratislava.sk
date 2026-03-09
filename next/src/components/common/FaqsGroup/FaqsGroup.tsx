import { Typography } from '@bratislava/component-library'
import { Fragment } from 'react'

import { AccordionTitleLevel } from '@/src/components/cards/getCardTitleLevel'
import Badge from '@/src/components/common/Badge/Badge'
import Disclosure from '@/src/components/common/Disclosure/Disclosure'
import DisclosureHeader from '@/src/components/common/Disclosure/DisclosureHeader'
import DisclosurePanel from '@/src/components/common/Disclosure/DisclosurePanel'
import HorizontalDivider from '@/src/components/common/Divider/HorizontalDivider'
import Markdown from '@/src/components/formatting/Markdown/Markdown'
import { FaqEntityFragment } from '@/src/services/graphql'
import { isDefined } from '@/src/utils/isDefined'

export type FaqsGroupProps = {
  faqs: FaqEntityFragment[]
  accordionTitleLevel?: AccordionTitleLevel
  category?: string
}

const FaqsGroup = ({ faqs, accordionTitleLevel, category }: FaqsGroupProps) => {
  return (
    <Fragment>
      {faqs.filter(isDefined).map((faq, index) => (
        <Fragment key={faq.documentId}>
          {index > 0 ? <HorizontalDivider className="mx-4 lg:mx-6" /> : null}
          <Disclosure id={`disclosure-faq-${faq.documentId}`}>
            <DisclosureHeader className="p-4 ring-inset lg:px-6">
              {category ? <Badge label={category} /> : null}
              <Typography variant="h4" as={accordionTitleLevel}>
                {faq.title}
              </Typography>
            </DisclosureHeader>
            <DisclosurePanel className="px-4 lg:px-6">
              <Markdown content={faq.body} variant="small" />
            </DisclosurePanel>
          </Disclosure>
        </Fragment>
      ))}
    </Fragment>
  )
}

export default FaqsGroup

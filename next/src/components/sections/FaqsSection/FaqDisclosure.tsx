import { Typography } from '@bratislava/component-library'

import { DisclosureTitleLevel } from '@/src/components/cards/getCardTitleLevel'
import Badge from '@/src/components/common/Badge/Badge'
import Disclosure from '@/src/components/common/Disclosure/Disclosure'
import DisclosureHeader from '@/src/components/common/Disclosure/DisclosureHeader'
import DisclosurePanel from '@/src/components/common/Disclosure/DisclosurePanel'
import Markdown from '@/src/components/formatting/Markdown/Markdown'
import { FaqEntityFragment } from '@/src/services/graphql'

export type FaqDisclosureProps = {
  faq: FaqEntityFragment
  disclosureTitleLevel?: DisclosureTitleLevel
}

/**
 * Single faq accordion item, used both in FaqsGroup and FaqsAll.
 */

const FaqDisclosure = ({ faq, disclosureTitleLevel = 'h2' }: FaqDisclosureProps) => {
  return (
    <Disclosure id={`disclosure-faq-${faq.documentId}`}>
      <DisclosureHeader>
        <div className="flex flex-col gap-2">
          {faq.faqCategory?.title ? <Badge label={faq.faqCategory.title} /> : null}
          <Typography variant="h5" as={disclosureTitleLevel}>
            {faq.title}
          </Typography>
        </div>
      </DisclosureHeader>
      <DisclosurePanel>
        <Markdown content={faq.body} variant="accordion" />
      </DisclosurePanel>
    </Disclosure>
  )
}

export default FaqDisclosure

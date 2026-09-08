/* eslint-disable i18next/no-literal-string */
import { Typography } from '@bratislava/component-library'

import Disclosure from '@/src/components/common/Disclosure/Disclosure'
import DisclosureGroup from '@/src/components/common/Disclosure/DisclosureGroup'
import DisclosureHeader from '@/src/components/common/Disclosure/DisclosureHeader'
import DisclosurePanel from '@/src/components/common/Disclosure/DisclosurePanel'
import FaqDisclosure from '@/src/components/sections/FaqsSection/FaqDisclosure'
import Wrapper from '@/src/components/styleguide/Wrapper'
import { FaqEntityFragment } from '@/src/services/graphql'

const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

const faqs: FaqEntityFragment[] = [
  {
    documentId: 'showcase-faq-1',
    title: 'Faq with a category badge',
    body: LOREM,
    faqCategory: { title: 'Category' },
  },
  {
    documentId: 'showcase-faq-2',
    title: 'Faq without a category badge',
    body: LOREM,
  },
]

const DisclosureShowcase = () => {
  return (
    <Wrapper direction="column" title="Disclosure">
      <Typography variant="h5">Standalone Disclosure (variant boxed - default)</Typography>
      <Disclosure>
        <DisclosureHeader>
          <Typography variant="h5" as="h3" className="text-left">
            Single Disclosure
          </Typography>
        </DisclosureHeader>
        <DisclosurePanel>{LOREM}</DisclosurePanel>
      </Disclosure>

      <Typography variant="h5">DisclosureGroup (variant boxed, single expanded)</Typography>
      <DisclosureGroup allowsMultipleExpanded={false}>
        <Disclosure id="boxed1">
          <DisclosureHeader>
            <Typography variant="h5" as="h3" className="text-left">
              Disclosure Header 1
            </Typography>
          </DisclosureHeader>
          <DisclosurePanel>{LOREM}</DisclosurePanel>
        </Disclosure>
        <Disclosure id="boxed2">
          <DisclosureHeader>
            <Typography variant="h5" as="h3" className="text-left">
              Disclosure Header 2
            </Typography>
          </DisclosureHeader>
          <DisclosurePanel>{LOREM}</DisclosurePanel>
        </Disclosure>
      </DisclosureGroup>

      <Typography variant="h5">Standalone Disclosure (variant unstyled)</Typography>
      <Disclosure variant="unstyled">
        <DisclosureHeader>
          <Typography variant="h5" as="h3" className="text-left">
            Unstyled Disclosure
          </Typography>
        </DisclosureHeader>
        <DisclosurePanel>{LOREM}</DisclosurePanel>
      </Disclosure>

      <Typography variant="h5">FaqDisclosure</Typography>
      <DisclosureGroup>
        {faqs.map((faq) => (
          <FaqDisclosure key={faq.documentId} faq={faq} accordionTitleLevel="h3" />
        ))}
      </DisclosureGroup>
    </Wrapper>
  )
}
export default DisclosureShowcase

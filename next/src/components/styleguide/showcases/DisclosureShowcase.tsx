import { Typography } from '@bratislava/component-library'
import React from 'react'

import Badge from '@/src/components/common/Badge/Badge'
import Disclosure from '@/src/components/common/Disclosure/Disclosure'
import DisclosureGroup from '@/src/components/common/Disclosure/DisclosureGroup'
import DisclosureHeader from '@/src/components/common/Disclosure/DisclosureHeader'
import DisclosurePanel from '@/src/components/common/Disclosure/DisclosurePanel'
import HorizontalDivider from '@/src/components/common/Divider/HorizontalDivider'
import Wrapper from '@/src/components/styleguide/Wrapper'

const DisclosureShowcase = () => {
  return (
    <Wrapper direction="column" title="Disclosure">
      <DisclosureGroup allowsMultipleExpanded={false}>
        <Disclosure id="disclosure1">
          <DisclosureHeader>
            <Badge label="Badge" backgroundColor={'#FFDCC3'} />
            <Typography variant="h5" as="h3" className="text-left">
              Disclosure Header 1
            </Typography>
          </DisclosureHeader>
          <DisclosurePanel>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </DisclosurePanel>
        </Disclosure>
        <HorizontalDivider aria-hidden className="mx-4 lg:mx-6" />
        <Disclosure id="disclosure2">
          <DisclosureHeader>
            <Badge label="Badge" backgroundColor={'#FFDCC3'} />
            <Typography variant="h5" as="h3" className="text-left">
              Disclosure Header 2
            </Typography>
          </DisclosureHeader>
          <DisclosurePanel>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </DisclosurePanel>
        </Disclosure>
      </DisclosureGroup>
    </Wrapper>
  )
}
export default DisclosureShowcase

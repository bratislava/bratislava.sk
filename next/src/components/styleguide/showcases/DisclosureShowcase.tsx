/* eslint-disable i18next/no-literal-string */
import { Typography } from '@bratislava/component-library'

import Badge from '@/src/components/common/Badge/Badge'
import Disclosure from '@/src/components/common/Disclosure/Disclosure'
import DisclosureGroup from '@/src/components/common/Disclosure/DisclosureGroup'
import DisclosureHeader from '@/src/components/common/Disclosure/DisclosureHeader'
import DisclosurePanel from '@/src/components/common/Disclosure/DisclosurePanel'
import Wrapper from '@/src/components/styleguide/Wrapper'

const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

const DisclosureShowcase = () => {
  return (
    <Wrapper direction="column" title="Disclosure">
      <Typography variant="h5">Standalone Disclosure (variant boxed - default)</Typography>
      <Disclosure>
        <DisclosureHeader>
          <Badge label="Badge" />
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
            <Badge label="Badge" />
            <Typography variant="h5" as="h3" className="text-left">
              Disclosure Header 1
            </Typography>
          </DisclosureHeader>
          <DisclosurePanel>{LOREM}</DisclosurePanel>
        </Disclosure>
        <Disclosure id="boxed2">
          <DisclosureHeader>
            <Badge label="Badge" />
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
    </Wrapper>
  )
}
export default DisclosureShowcase

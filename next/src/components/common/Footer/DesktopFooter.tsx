import { Typography } from '@bratislava/component-library'
import * as React from 'react'

import EULogo from '@/src/assets/images/EULogo.svg'
import Brand from '@/src/components/common/Brand/Brand'
import HorizontalDivider from '@/src/components/common/Divider/HorizontalDivider'
import {
  FooterAccessibilityLink,
  FooterColumnLinks,
  FooterContacts,
  FooterCopyright,
  FooterLanguageSwitcher,
  FooterSocialLinks,
} from '@/src/components/common/Footer/FooterShared'
import SectionContainer from '@/src/components/common/SectionContainer/SectionContainer'
import { useGeneralContext } from '@/src/components/providers/GeneralContextProvider'
import { isDefined } from '@/src/utils/isDefined'

/**
 * Figma: https://www.figma.com/file/17wbd0MDQcMW9NbXl6UPs8/DS-ESBS%3A-Component-library?node-id=7683-20624&t=bWqVCwkV1Gv1qULG-0
 */
const DesktopFooter = () => {
  const { footer } = useGeneralContext()

  const attributes = footer?.data?.attributes
  if (!attributes) {
    return null
  }

  return (
    <SectionContainer>
      <HorizontalDivider />
      <footer className="flex flex-col gap-6 py-6 lg:gap-8 lg:py-8">
        <div className="flex justify-between py-2 lg:py-0">
          <Brand className="group" url="/" withTitle />
          <div className="flex items-center gap-16">
            <div className="flex gap-2">
              <FooterSocialLinks {...attributes} />
            </div>
            <EULogo />
          </div>
        </div>
        <HorizontalDivider />
        {/* there is no design in figma for middle screens, so this is chosen by devs */}
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-[1.3fr_1fr_1fr] lg:gap-8 xl:grid-cols-[488px_332px_332px]">
          <div className="col-span-2 flex flex-col gap-6 lg:col-span-1">
            <FooterContacts {...attributes} />
          </div>
          <HorizontalDivider className="col-span-2 lg:hidden" />
          {attributes.columns?.filter(isDefined).map((column, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div className="flex flex-col gap-3 lg:gap-4" key={index}>
              <Typography type="p" size="p-large" className="text-grey-800">
                {column.title}
              </Typography>
              <div className="flex flex-col gap-3">
                <FooterColumnLinks {...column} />
              </div>
            </div>
          ))}
        </div>
        <HorizontalDivider />
        <div className="flex flex-col gap-y-6 lg:flex-row lg:justify-between">
          <div className="flex justify-center gap-6 lg:justify-normal">
            <FooterAccessibilityLink {...attributes} />
          </div>
          <div className="flex justify-center gap-4 lg:justify-normal">
            <FooterLanguageSwitcher />
          </div>
        </div>
        <HorizontalDivider />
        <div className="text-default text-center">
          <FooterCopyright {...attributes} />
        </div>
      </footer>
    </SectionContainer>
  )
}

export default DesktopFooter

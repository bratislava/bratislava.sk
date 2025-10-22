import React, { Fragment } from 'react'

import { EuFlagSvg } from '@/src/assets/images'
import Accordion from '@/src/components/common/Accordion/Accordion'
import HorizontalDivider from '@/src/components/common/Divider/HorizontalDivider'
import {
  FooterAccessibilityLink,
  FooterColumnLinks,
  FooterContacts,
  FooterCopyright,
  FooterLanguageSwitcher,
  FooterSocialLinks,
} from '@/src/components/common/Footer/FooterShared'
import Brand from '@/src/components/common/Logos/Brand'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import { useGeneralContext } from '@/src/components/providers/GeneralContextProvider'
import { isDefined } from '@/src/utils/isDefined'

/**
 * Figma: https://www.figma.com/file/17wbd0MDQcMW9NbXl6UPs8/DS-ESBS%3A-Component-library?node-id=7558-20338&t=bWqVCwkV1Gv1qULG-0
 */
const MobileFooter = () => {
  const { footer } = useGeneralContext()

  if (!footer) {
    return null
  }

  return (
    <SectionContainer>
      <HorizontalDivider />
      <footer className="flex flex-col gap-6 py-6">
        <div className="flex justify-center py-2 md:justify-start">
          <Brand withTitle />
        </div>
        <div className="flex flex-col gap-6">
          <FooterContacts {...footer} />
        </div>
        <div>
          <HorizontalDivider />
          {footer.columns?.filter(isDefined).map((column, index) => (
             
            <Fragment key={index}>
              <Accordion variant="footer" title={column.title}>
                <div className="flex flex-col gap-3">
                  <FooterColumnLinks {...column} />
                </div>
              </Accordion>
              <HorizontalDivider />
            </Fragment>
          ))}
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="-my-2 flex gap-2">
            <FooterSocialLinks {...footer} />
          </div>
          <EuFlagSvg />
        </div>
        <div className="flex gap-4">
          <FooterLanguageSwitcher />
        </div>
        <HorizontalDivider />
        <div className="flex gap-4">
          <FooterAccessibilityLink {...footer} />
        </div>
        <HorizontalDivider />
        <div className="text-center text-size-p-default">
          <FooterCopyright {...footer} />
        </div>
      </footer>
    </SectionContainer>
  )
}

export default MobileFooter

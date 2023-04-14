import EULogo from '@assets/images/EULogo.svg'
import { Brand, SectionContainer } from '@components/ui'
import AccordionV2 from '@components/ui/AccordionV2/AccordionV2'
import HorizontalDivider from '@components/ui/Divider/HorizontalDivider'
import {
  FooterAccessibilityLink,
  FooterColumnLinks,
  FooterContacts,
  FooterCopyright,
  FooterLanguageSwitcher,
  FooterSocialLinks,
} from '@components/ui/Footer/FooterShared'
import { useGeneralContext } from '@utils/generalContext'
import { isDefined } from '@utils/isDefined'
import React, { Fragment } from 'react'

/**
 * Figma: https://www.figma.com/file/17wbd0MDQcMW9NbXl6UPs8/DS-ESBS%3A-Component-library?node-id=7558-20338&t=bWqVCwkV1Gv1qULG-0
 */
const MobileFooter = () => {
  const { footer } = useGeneralContext()

  const attributes = footer?.data?.attributes
  if (!attributes) {
    return null
  }

  return (
    <SectionContainer>
      <HorizontalDivider />
      <footer className="flex flex-col gap-6 py-6">
        <div className="flex justify-center py-2 md:justify-start">
          <Brand url="/" withTitle />
        </div>
        <div className="flex flex-col gap-6">
          <FooterContacts {...attributes} />
        </div>
        <div>
          <HorizontalDivider />
          {attributes.columns?.filter(isDefined).map((column, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Fragment key={index}>
              <AccordionV2 variant="footer" title={column.title}>
                <div className="flex flex-col gap-3">
                  <FooterColumnLinks {...column} />
                </div>
              </AccordionV2>
              <HorizontalDivider />
            </Fragment>
          ))}
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="-my-2 flex gap-2">
            <FooterSocialLinks {...attributes} />
          </div>
          <EULogo />
        </div>
        <div className="flex gap-4">
          <FooterLanguageSwitcher />
        </div>
        <HorizontalDivider />
        <div className="flex gap-4">
          <FooterAccessibilityLink {...attributes} />
        </div>
        <HorizontalDivider />
        <div className="text-default text-center">
          <FooterCopyright {...attributes} />
        </div>
      </footer>
    </SectionContainer>
  )
}

export default MobileFooter

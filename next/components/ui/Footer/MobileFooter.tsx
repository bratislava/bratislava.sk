import EULogo from '@assets/images/EULogo.svg'
import { Brand, SectionContainer } from '@components/ui'
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
import React from 'react'

const MobileFooter = () => {
  const { footer } = useGeneralContext()

  const attributes = footer?.data?.attributes
  if (!attributes) {
    return null
  }

  return (
    <SectionContainer>
      <HorizontalDivider />
      <div className="mt-6 flex flex-col">
        <div className="flex justify-center py-[9px] md:justify-start">
          <Brand url="/" withTitle />
        </div>
        <div className="flex flex-col gap-6 py-6">
          <div className="flex flex-col gap-6 ">
            <div className="flex flex-col gap-6">
              <FooterContacts {...attributes} />
            </div>
          </div>
          <HorizontalDivider />
          {attributes.columns?.filter(isDefined).map((column, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div className="flex flex-col gap-4" key={index}>
              <p className="text-h5 text-gray-800">{column.title}</p>
              <div className="flex flex-col gap-3">
                <FooterColumnLinks {...column} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <HorizontalDivider />
      <div className="flex flex-col gap-6 py-6">
        <div className="flex flex-col items-center gap-4">
          <div className="-my-2 flex gap-2">
            <FooterSocialLinks {...attributes} />
          </div>
          <FooterAccessibilityLink {...attributes} />
          <div className="flex gap-4">
            <FooterLanguageSwitcher />
          </div>
          <EULogo />
        </div>
        <div className="text-center text-p-base">
          <FooterCopyright {...attributes} />
        </div>
      </div>
    </SectionContainer>
  )
}

export default MobileFooter

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
import * as React from 'react'

const DesktopFooter = () => {
  const { footer } = useGeneralContext()

  const attributes = footer?.data?.attributes
  if (!attributes) {
    return null
  }

  return (
    <SectionContainer>
      <HorizontalDivider />
      <footer className="flex flex-col">
        <div className="flex flex-col">
          <section className="flex justify-between pt-12">
            <Brand className="group" url="/" withTitle />
            <div className="flex items-center gap-16">
              <div className="flex gap-2">
                <FooterSocialLinks {...attributes} />
              </div>
              <EULogo className="w-15" />
            </div>
          </section>
          <section className="grid grid-cols-[488px_332px_332px] gap-8 py-12">
            <div className="flex flex-col gap-6">
              <FooterContacts {...attributes} />
            </div>
            {attributes.columns?.filter(isDefined).map((column, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <div className="flex flex-col gap-4" key={index}>
                <p className="text-h5 text-gray-800">{column.title}</p>
                <div className="flex flex-col gap-3">
                  <FooterColumnLinks {...column} />
                </div>
              </div>
            ))}
          </section>
        </div>
        <HorizontalDivider />
        <section className="grid grid-cols-3 pb-6 pt-12">
          <div>
            <FooterAccessibilityLink {...attributes} />
          </div>
          <div className="text-center text-p-base">
            <FooterCopyright {...attributes} />
          </div>
          <div className="flex justify-end gap-4">
            <FooterLanguageSwitcher />
          </div>
        </section>
      </footer>
    </SectionContainer>
  )
}

export default DesktopFooter

import { Typography } from '@bratislava/component-library'

import { EuFlagSvg } from '@/src/assets/images'
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
 * Figma: https://www.figma.com/file/17wbd0MDQcMW9NbXl6UPs8/DS-ESBS%3A-Component-library?node-id=7683-20624&t=bWqVCwkV1Gv1qULG-0
 */
const DesktopFooter = () => {
  const { footer } = useGeneralContext()

  if (!footer) {
    return null
  }

  return (
    <SectionContainer>
      <HorizontalDivider />
      <footer className="flex flex-col gap-6 py-6 lg:gap-8 lg:py-8">
        <div className="flex justify-between py-2 lg:py-0">
          <Brand withTitle />
          <div className="flex items-center gap-16">
            <div className="flex gap-2">
              <FooterSocialLinks {...footer} />
            </div>
            <EuFlagSvg />
          </div>
        </div>
        <HorizontalDivider />
        <div className="flex justify-between gap-6">
          <FooterContacts {...footer} />
          <HorizontalDivider className="col-span-2 lg:hidden" />
          {footer.columns?.filter(isDefined).map((column, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div className="flex flex-col gap-3 lg:gap-4" key={index}>
              <Typography variant="h5" as="h2">
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
            <FooterAccessibilityLink {...footer} />
          </div>
          <div className="flex justify-center gap-4 lg:justify-normal">
            <FooterLanguageSwitcher />
          </div>
        </div>
        <HorizontalDivider />
        <div className="text-center text-size-p-small">
          <FooterCopyright {...footer} />
        </div>
      </footer>
    </SectionContainer>
  )
}

export default DesktopFooter

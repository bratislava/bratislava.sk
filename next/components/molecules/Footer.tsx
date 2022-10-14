import { Footer as UIFooter, FooterProps } from '@bratislava/ui-bratislava'
import { useTranslation } from 'next-i18next'
import * as React from 'react'

import { usePageWrapperContext } from '../layouts/PageWrapper'

const Footer = (props: FooterProps) => {
  const { locale: currentLocale, localizations = [] } = usePageWrapperContext()
  const [t] = useTranslation('common')

  const languageLinks = localizations.map(({ locale, slug }) => ({
    title: t(`language_long.${locale}`),
    url: locale === currentLocale ? undefined : slug,
    locale,
  }))

  return (
    <div>
      {/* Uncomment for panorama divider */}
      {/* <FooterWidth className="hidden w-full md:block" />
      <FooterWidthTablet className="hidden w-full md:hidden" />
      <FooterWidthMobile className="w-full block sm:hidden" />
      <Waves className="-mb-1" waveColor="white" wavePosition="top" /> */}

      <div className="bg-gray-100 px-7.5">
        <div className="mx-auto max-w-screen-1.5lg pt-24">
          <hr />
          <UIFooter className="pb-14" {...props} languageLinks={languageLinks} />
        </div>
      </div>
    </div>
  )
}

export default Footer

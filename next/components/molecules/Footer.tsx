import { Footer as UIFooter, FooterProps, SectionContainer } from '@bratislava/ui-bratislava'
import { useTranslation } from 'next-i18next'
import * as React from 'react'

import FooterWidth from '../../assets/images/footer-city.svg'
import FooterWidthMobile from '../../assets/images/footer-city-mobile.svg'
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
    // <SectionContainer>
    <div className='mt-24 '>
      <FooterWidth className='w-full'/>
      <div className='bg-white px-7.5'>
      <div className="mx-auto max-w-screen-1.5lg">
        <UIFooter className="pb-14" {...props} languageLinks={languageLinks} />
      </div>
      </div>
    </div>
      
    // </SectionContainer>
  )
}

export default Footer

import { Footer as UIFooter, FooterProps, SectionContainer } from '@bratislava/ui-bratislava'
import { useTranslation } from 'next-i18next'
import * as React from 'react'
import { usePageWrapperContext } from '../layouts/PageWrapper'
import FooterWidth from '../../assets/images/footer-city.svg'
import FooterWidthMobile from '../../assets/images/footer-city-mobile.svg'


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
      <div className='px-7.5 bg-white'>
      <div className="max-w-screen-1.5lg mx-auto">
        <UIFooter className="pb-14" {...props} languageLinks={languageLinks} />
      </div>
      </div>
    </div>
      
    // </SectionContainer>
  )
}

export default Footer

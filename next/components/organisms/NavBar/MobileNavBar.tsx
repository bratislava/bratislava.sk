import FocusTrap from 'focus-trap-react'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import React, { useEffect } from 'react'
import { twMerge } from 'tailwind-merge'

import { CrossIcon, HamburgerIcon, SearchIcon } from '@/assets/ui-icons'
import Button from '@/components/forms/simple-components/Button'
import MLink from '@/components/forms/simple-components/MLink'
import AlertBanner from '@/components/organisms/NavBar/AlertBanner'
import { useLocalizations } from '@/components/providers/LocalizationsProvider'
import Brand from '@/components/ui/Brand/Brand'
import { getCategoryColorLocalStyle } from '@/utils/colors'

import MobileNavMenu from './NavMenu/MobileNavMenu'
import { useNavMenuContext } from './NavMenu/navMenuContext'

const Divider = ({ className }: { className?: string }) => {
  return <div aria-hidden className={`h-6 border-r ${className}`} />
}

type MobileNavBarProps = {
  className?: string
}

const MobileNavBar = ({ className }: MobileNavBarProps) => {
  const t = useTranslations()
  const pathname = usePathname()
  const { isMobileMenuOpen, setMobileMenuOpen } = useNavMenuContext()
  const { otherLanguage } = useLocalizations()

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname, setMobileMenuOpen])

  return (
    <div className={className}>
      <FocusTrap active={isMobileMenuOpen}>
        <div style={getCategoryColorLocalStyle({ category: 'main' })}>
          <div className="fixed top-0 z-30 flex h-14 w-full items-center justify-between bg-white px-4 text-gray-700 shadow">
            <div className="flex items-center">
              <Brand url="/" className="-ml-4 px-4 py-3" />
            </div>
            <div className="flex items-center">
              {otherLanguage && (
                <MLink
                  className="p-4"
                  variant="underlined"
                  href={otherLanguage.path}
                  locale={otherLanguage.locale}
                  data-cy="mobile-change-language-button"
                >
                  {otherLanguage.shortName}
                </MLink>
              )}
              <Divider />
              <MLink data-cy="search-button-mobile" href={t('searchLink')} className="p-4">
                <SearchIcon />
              </MLink>
              <Divider />
              {isMobileMenuOpen ? (
                <Button
                  onPress={() => setMobileMenuOpen(false)}
                  className="-mr-4 p-4"
                  aria-label={t('menu.closeMenu')}
                  icon={<CrossIcon />}
                />
              ) : (
                <Button
                  onPress={() => setMobileMenuOpen(true)}
                  className="-mr-4 p-4"
                  aria-label={t('menu.openMenu')}
                  data-cy="mobile-menu-button"
                  icon={<HamburgerIcon />}
                />
              )}
            </div>
          </div>
          {isMobileMenuOpen && <MobileNavMenu />}
        </div>
      </FocusTrap>
      {/* Empty div under header */}
      <div className={twMerge('h-14', className)} />

      <AlertBanner />
    </div>
  )
}

export default MobileNavBar

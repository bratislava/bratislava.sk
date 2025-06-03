import FocusTrap from 'focus-trap-react'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'
import { CrossIcon, HamburgerIcon, SearchIcon } from 'src/assets/icons'

import Brand from '@/src/components/common/Brand/Brand'
import Button from '@/src/components/common/Button/Button'
import MLink from '@/src/components/common/MLink/MLink'
import AlertBanner from '@/src/components/common/NavBar/AlertBanner'
import { useLocalizations } from '@/src/components/providers/LocalizationsProvider'
import cn from '@/src/utils/cn'
import { getCategoryColorLocalStyle } from '@/src/utils/colors'
import { useTranslation } from '@/src/utils/useTranslation'

import MobileNavMenu from './NavMenu/MobileNavMenu'
import { useNavMenuContext } from './NavMenu/navMenuContext'

const Divider = ({ className }: { className?: string }) => {
  return <div aria-hidden className={`h-6 border-r ${className}`} />
}

type MobileNavBarProps = {
  className?: string
}

const MobileNavBar = ({ className }: MobileNavBarProps) => {
  const { t } = useTranslation()
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
          <div className="fixed top-0 z-30 flex h-14 w-full items-center justify-between border-b-2 bg-white px-4 text-grey-700">
            <Brand url="/" withTitle className="-ml-4 items-center px-4 py-3" />
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
              <MLink
                data-cy="search-button-mobile"
                href={t('links.searchLink')}
                aria-label={t('SearchBar.search')}
                className="p-4"
              >
                <SearchIcon aria-hidden />
              </MLink>
              <Divider />
              {isMobileMenuOpen ? (
                <Button
                  onPress={() => setMobileMenuOpen(false)}
                  className="-mr-4 p-4"
                  aria-label={t('MobileNavBar.closeMenu')}
                  icon={<CrossIcon />}
                />
              ) : (
                <Button
                  onPress={() => setMobileMenuOpen(true)}
                  className="-mr-4 p-4"
                  aria-label={t('MobileNavBar.openMenu')}
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
      <div className={cn('h-14', className)} />

      <AlertBanner />
    </div>
  )
}

export default MobileNavBar

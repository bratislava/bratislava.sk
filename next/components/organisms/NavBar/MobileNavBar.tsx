import { CrossIcon } from '@assets/images'
import Hamburger from '@assets/images/ba-hamburger.svg'
import SearchIcon from '@assets/images/search-icon.svg'
import { Brand } from '@bratislava/ui-bratislava/Brand/Brand'
import MLink from '@components/forms/simple-components/MLink'
import { useLocalizations } from '@components/providers/LocalizationsProvider'
import { getCategoryColorLocalStyle } from '@utils/colors'
import cx from 'classnames'
import FocusTrap from 'focus-trap-react'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import React, { useEffect } from 'react'

import MobileNavMenu from './NavMenu/MobileNavMenu'
import { useNavMenuContext } from './NavMenu/navMenuContext'

const Divider = ({ className }: { className?: string }) => {
  return <div aria-hidden className={`h-6 border-r ${className}`} />
}

interface MobileNavBarProps {
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
    <>
      <FocusTrap active={isMobileMenuOpen}>
        <div style={getCategoryColorLocalStyle({ category: 'main' })}>
          <div
            className={cx(
              'fixed top-0 z-30 flex h-14 w-full items-center justify-between bg-white px-4 text-gray-700 shadow-md',
              className,
            )}
          >
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
                >
                  {otherLanguage.shortName}
                </MLink>
              )}
              <Divider />
              <MLink href={t('searchLink')} className="p-4">
                <SearchIcon />
              </MLink>
              <Divider />
              {isMobileMenuOpen ? (
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-mr-4 p-4"
                >
                  <CrossIcon />
                </button>
              ) : (
                <button type="button" onClick={() => setMobileMenuOpen(true)} className="-mr-4 p-4">
                  <Hamburger />
                </button>
              )}
            </div>
          </div>
          {isMobileMenuOpen && <MobileNavMenu />}
        </div>
      </FocusTrap>
      {/* Empty div under header */}
      <div className={cx('h-14', className)} />
    </>
  )
}

export default MobileNavBar

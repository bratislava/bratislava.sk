import { FocusTrap } from 'focus-trap-react'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'
import { CrossIcon, HamburgerIcon, SearchIcon } from 'src/assets/icons'

import Button from '@/src/components/common/Button/Button'
import Brand from '@/src/components/common/Logos/Brand'
import StarzLogo from '@/src/components/common/Logos/StarzLogo'
import MLink from '@/src/components/common/MLink/MLink'
import AlertBanner from '@/src/components/common/NavBar/AlertBanner'
import { useAdminGroupsContext } from '@/src/components/providers/AdminGroupsContextProvider'
import { useLocalizations } from '@/src/components/providers/LocalizationsProvider'
import { isStarzAdminGroup } from '@/src/utils/adminGroupUtils'
import cn from '@/src/utils/cn'
import { getCategoryColorLocalStyle } from '@/src/utils/colors'
import { getLinkProps } from '@/src/utils/getLinkProps'
import { useGetLocalisedPage } from '@/src/utils/useGetLocalisedPage'
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
  const { adminGroups } = useAdminGroupsContext()
  const { otherLanguage } = useLocalizations()

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname, setMobileMenuOpen])

  // TODO refactor when more adminGroups will be implemented
  const starzAdminGroup = adminGroups.find((adminGroup) => isStarzAdminGroup(adminGroup))

  const localisedStarzLandingPage = useGetLocalisedPage(starzAdminGroup?.landingPage)

  return (
    <div className={className}>
      <FocusTrap active={isMobileMenuOpen}>
        <div style={getCategoryColorLocalStyle({ category: 'main' })}>
          <div className="fixed top-0 z-30 flex h-14 w-full items-center justify-between border-b bg-white px-4 text-grey-700">
            <div className="flex gap-4 divide-x py-3">
              <Brand className="-ml-4 px-4" />
              {starzAdminGroup ? (
                <StarzLogo
                  variant="dark-blue"
                  linkProps={getLinkProps({ page: localisedStarzLandingPage })}
                  className="-m-2 h-5.5 shrink-0 p-2"
                />
              ) : null}
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

import { CrossIcon } from '@assets/images'
import Hamburger from '@assets/images/ba-hamburger.svg'
import SearchIcon from '@assets/images/search-icon.svg'
import { Brand } from '@bratislava/ui-bratislava'
import { getLanguageKey } from '@utils/utils'
import cx from 'classnames'
import FocusTrap from 'focus-trap-react'
import { useTranslation } from 'next-i18next'
import React from 'react'

import Button from '../../forms/simple-components/Button'
import MLink from '../../forms/simple-components/MLink'
import MobileNavMenu from './NavMenu/MobileNavMenu'
import { useNavMenuContext } from './NavMenu/navMenuContext'

const Divider = ({ className }: { className?: string }) => {
  return <div aria-hidden className={`border-r h-6 ${className}`} />
}

interface MobileNavBarProps extends LanguageSelectProps {
  className?: string
}

export const MobileNavBar = ({ className, ...languageSelectProps }: MobileNavBarProps) => {
  const { t } = useTranslation(['common'])
  const { isMobileMenuOpen, setMobileMenuOpen } = useNavMenuContext()

  const languageKey = getLanguageKey(languageSelectProps.currentLanguage)
  const otherLanguage = languageSelectProps.languages?.find((l) => l.key !== languageKey)

  return (
    <>
      <FocusTrap active={isMobileMenuOpen}>
        <div>
          <div
            className={cx(
              'h-14 flex text-gray-700 items-center justify-between px-4 shadow-md fixed top-0 w-full bg-white z-30',
              className,
            )}
          >
            <div className="flex items-center">
              <Brand url="/" className="py-3 px-4 -ml-4" />
            </div>
            <div className="flex items-center">
              {otherLanguage && (
                <Button
                  size="sm"
                  className="underline underline-offset-2 p-4"
                  variant="link-black"
                  onPress={() => languageSelectProps.onLanguageChange?.(otherLanguage)}
                  text={otherLanguage?.title}
                />
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

interface LanguageSelectProps {
  className?: string
  languages?: LanguageOption[]
  currentLanguage?: string
  onLanguageChange?: (language: LanguageOption) => void
}

interface LanguageOption {
  key: string
  title: string
}

export default MobileNavBar

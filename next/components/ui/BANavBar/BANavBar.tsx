// @ts-strict-ignore
/* eslint-disable scanjs-rules/identifier_localStorage */
/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-danger */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable unicorn/prefer-dom-node-text-content */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Hamburger from '@assets/images/ba-hamburger.svg'
import HamburgerClose from '@assets/images/hamburger-close.svg'
import SearchIcon from '@assets/images/search-icon.svg'
import { getLanguageKey } from '@utils/utils'
import cx from 'classnames'
import { useTranslation } from 'next-i18next'
import React, { useState } from 'react'

import Button from '../../forms/simple-components/Button'
import MLink from '../../forms/simple-components/MLink'
import { Brand } from '../Brand/Brand'
import { HamburgerMenu } from '../HamburgerMenu/HamburgerMenu'
import { MenuMainItem } from '../HomepageMenu/HomepageMenu'

interface IProps extends LanguageSelectProps {
  className?: string
  menuItems?: MenuMainItem[]
  pageColor?: string
}

export const BANavBar = ({ className, menuItems, pageColor, ...languageSelectProps }: IProps) => {
  const [burgerOpen, setBurgerOpen] = useState(false)

  const languageKey = getLanguageKey(languageSelectProps.currentLanguage)

  const { t } = useTranslation(['common'])

  const otherLanguage = languageSelectProps.languages?.find((l) => l.key !== languageKey)

  return (
    <>
      {/* Mobile */}
      <div
        className={cx(
          'h-16 flex items-center justify-between py-5 px-8 shadow-md drop-shadow-md fixed top-0 w-full bg-white z-50',
          className,
        )}
      >
        <Brand url="/" />
        <div className="flex items-center gap-x-5">
          <div className="text-h4 text-font/50 relative flex cursor-pointer items-center bg-transparent">
            <MLink href={t('searchLink')} className="p-4">
              <SearchIcon />
            </MLink>
            {otherLanguage && (
              <Button
                size="sm"
                className="underline underline-offset-2"
                variant="link-black"
                onPress={() => languageSelectProps.onLanguageChange?.(otherLanguage)}
                text={otherLanguage?.title}
              />
            )}
          </div>
        </div>

        <button onClick={() => setBurgerOpen(!burgerOpen)} className="-mr-4 px-4 py-5">
          <div className="flex w-6 items-center justify-center">
            {burgerOpen ? <HamburgerClose /> : <Hamburger />}
          </div>
        </button>

        {burgerOpen && (
          <HamburgerMenu
            hamburgerMenuItems={menuItems}
            lang={languageKey}
            closeMenu={() => setBurgerOpen(false)}
          />
        )}
      </div>

      {/* Empty div under header */}
      <div className={cx('h-16', className)} />
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

export default BANavBar

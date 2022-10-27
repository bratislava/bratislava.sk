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
import ChevronDownSmall from '@assets/images/chevron-down-small.svg'
import CloseIcon from '@assets/images/close.svg'
import HamburgerClose from '@assets/images/hamburger-close.svg'
import SearchIcon from '@assets/images/search-icon.svg'
import { useUIContext } from '@bratislava/common-frontend-ui-context'
import { covidUrls, eServicesData, minKeywordLength } from '@utils/constants'
import cx from 'classnames'
import CookieConsent from 'components/organisms/CookieConsent'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import React, { useCallback, useState } from 'react'

import { Brand } from '../Brand/Brand'
import Button from '../Button/Button'
import { HamburgerMenu } from '../HamburgerMenu/HamburgerMenu'
import { MenuMainItem } from '../HomepageMenu/HomepageMenu'
import { Link } from '../Link/Link'

interface IProps extends LanguageSelectProps {
  className?: string
  menuItems?: MenuMainItem[]
  handleSearch?: (searchOpen: boolean) => void
  pageColor?: string
}

export const BANavBar = ({ className, menuItems, handleSearch, pageColor, ...languageSelectProps }: IProps) => {
  const router = useRouter()
  const [burgerOpen, setBurgerOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  const languageKey = languageSelectProps.currentLanguage === 'sk' ? 'sk' : 'en'

  const handleMobileSearchClick = () => {
    handleSearch && handleSearch(!searchOpen)
    setSearchOpen(!searchOpen)
  }
  const { t } = useTranslation(['common'])

  const [input, setInput] = useState('')
  const handleChange = (event) => {
    setInput(event.target.value)
  }
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && input.length > minKeywordLength) {
      router.push(`${t('searchLink')}?keyword=${input}`)
    }
  }

  const { Link: UILink } = useUIContext()

  return (
    <>
      {/* Desktop */}
      <div
        id="desktop-navbar"
        className={cx(className, 'items-center text-base ', 'fixed top-0 left-0 w-full bg-white z-50')}
      >
        <div className="m-auto hidden w-full max-w-screen-1.5lg justify-between border-b border-gray-universal-200 py-4 lg:flex">
          <Brand
            className="group flex-1"
            url="/"
            title={
              <p className="text-sm text-font group-hover:text-red-universal-300">
                {languageKey === 'en' && <span className="font-semibold">Bratislava </span>}
                {t('capitalCity')}
                {languageKey !== 'en' && <span className="font-semibold"> Bratislava</span>}
              </p>
            }
          />

          <nav
            className={cx(
              'flex items-end text-gray-dark font-semibold',
              { 'gap-x-8': !searchOpen },
              { 'gap-x-4': searchOpen }
            )}
          >
            <div className="hover:cursor-pointer" onClick={() => setSearchOpen(!searchOpen)}>
              {searchOpen ? <CloseIcon className="-ml-px mr-px" /> : <SearchIcon />}
            </div>
            {searchOpen ? (
              <div className="flex">
                <input
                  id="name"
                  type="text"
                  className="h-6 w-96 rounded-l-lg border-2 border-r-0 pl-6 text-sm text-font outline-none"
                  value={input}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                />
                <Link href={input.length > minKeywordLength ? `${t('searchLink')}?keyword=${input}` : '#'}>
                  <Button
                    icon={<SearchIcon className="scale-75" />}
                    hoverIcon={<SearchIcon className="scale-75" />}
                    className={cx(
                      'h-6 rounded-l-none text-sm px-6 shadow-none font-medium',
                      { 'hover:bg-primary hover:text-white hover:color-white': input.length > minKeywordLength },
                      { 'cursor-default': input.length <= minKeywordLength }
                    )}
                    variant="secondary-dark-text"
                  >
                    {t('search')}
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex gap-x-8 font-semibold text-gray-dark">
                <Link href={covidUrls[languageKey]} variant="plain" className="whitespace-nowrap">
                  {t('covid')}
                </Link>

                {
                  /* This UILink set here just to prefetch EN version of page, this link is hidden */
                  <UILink href="/en" className="hidden">
                    hidden
                  </UILink>
                }
                <Link href={eServicesData.url} variant="plain" className="whitespace-nowrap">
                  {t('eservices')}
                </Link>
                <div className="relative flex cursor-pointer items-center bg-transparent text-gray-dark">
                  <LanguageSelect
                    className="cursor-pointer appearance-none bg-transparent pr-6 font-semibold focus:outline-none active:outline-none"
                    {...languageSelectProps}
                  />
                </div>
                {/*
                <Link href="#" variant="plain">
                  {t('login')}
                </Link>
                <Link
                  href="#"
                  variant="plain"
                  // need to set bgcolor to bg-red-light or bg-light-red perhaps
                  className="text-font px-6 h-12 inline-flex font-medium rounded shadow-md bg-[#F8D7D4]"
                >
                  {t('register')}
                </Link>
                 <Button
                  className="text-base px-6 py-4 shadow-none font-medium"
                  variant="secondary-dark-text"
                >
                  {t('register')}
                </Button> */}
              </div>
            )}
          </nav>
        </div>
      </div>
      {/* Mobile */}
      <div
        id="mobile-navbar"
        className={cx(
          className,
          'h-16 flex items-center justify-between py-5 px-7.5 -mx-7.5 shadow-md drop-shadow-md',
          'lg:hidden fixed top-0 w-full bg-white z-50'
        )}
      >
        <Brand url="/" />
        <div className={cx('flex items-center gap-x-5', { 'gap-x-2': searchOpen })}>
          <div className="hover:cursor-pointer" onClick={handleMobileSearchClick}>
            {searchOpen ? <CloseIcon className="-ml-3 mr-px" /> : <SearchIcon className="text-gray-universal-500" />}
          </div>
          <div className="text-h4 relative flex cursor-pointer items-center bg-transparent text-gray-light">
            <LanguageSelect
              className="text-p3 cursor-pointer appearance-none bg-transparent font-semibold focus:outline-none active:outline-none"
              {...languageSelectProps}
            />
          </div>
        </div>

        <button onClick={() => setBurgerOpen(!burgerOpen)} className="w-6 cursor-pointer">
          {burgerOpen && !searchOpen ? <HamburgerClose /> : <Hamburger />}
        </button>

        {burgerOpen && !searchOpen && (
          <HamburgerMenu hamburgerMenuItems={menuItems} lang={languageKey} closeMenu={() => setBurgerOpen(false)} />
        )}
      </div>

      <CookieConsent />
      {/* Cookie advanced options, kept in case they need resurrecting */}
      {/* {showModal ? (
        <div className="fixed inset-0 z-50 bg-transperentBG px-6">
          <div className="relative top-1/2 mx-auto max-w-[1110px] -translate-y-1/2 rounded-lg bg-white shadow">
            <div
              className="absolute inset-x-0 -bottom-6 mx-auto flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-primary text-white md:bottom-auto md:left-auto md:-top-6 md:-right-6 md:mx-0 md:h-72 md:w-72"
              onClick={() => setShowModal(false)}
            >
              <HamburgerCloseWhite />
            </div>
            <div className="max-h-90Vh overflow-y-scroll overscroll-y-auto rounded-lg py-8 px-5 md:py-12 md:px-16">
              <div className="mb-6 md:mb-10">
                <h5 className="cursor-pointer text-default font-semibold md:text-md">
                  {' '}
                  {t('cookie_consent_modal_title')}{' '}
                </h5>
              </div>
              <div className="mb-10">
                <h6 className="mb-4 text-xxs font-semibold md:text-default">
                  {' '}
                  {t('cookie_consent_modal_content_title')}{' '}
                </h6>
                <p
                  className="mb-8 text-xxs md:text-sm"
                  dangerouslySetInnerHTML={{ __html: t('cookie_consent_modal_conent_body') }}
                />
                <AccordionItemSmall
                  className="mb-3 py-4 px-6"
                  key="0"
                  title={t('cookie_consent_security_essential_titile')}
                  secondaryTitle=""
                  value={securityCookies}
                  onValueChange={() => null}
                  isDisabled
                >
                  <div className="flex flex-col space-y-4">
                    <NarrowText
                      className="text-sm"
                      key="0"
                      align="left"
                      width="full"
                      size="small"
                      content={t('cookie_consent_security_essential_content')}
                    />
                  </div>
                </AccordionItemSmall>
                <AccordionItemSmall
                  className="mb-3 py-4 px-6"
                  key="0"
                  title={t('cookie_consent_performance_title')}
                  secondaryTitle=""
                  value={performanceCookies}
                  onValueChange={setPerformanceCookies}
                >
                  <div className="flex flex-col space-y-4">
                    <NarrowText
                      className="text-sm"
                      key="0"
                      align="left"
                      width="full"
                      size="small"
                      content={t('cookie_consent_performance_content')}
                    />
                  </div>
                </AccordionItemSmall>
                <AccordionItemSmall
                  className="mb-3 py-4 px-6"
                  key="0"
                  title={t('cookie_consent_advertising_targeting_title')}
                  secondaryTitle=""
                  value={advertisingCookies}
                  onValueChange={setAdvertisingCookies}
                >
                  <div className="flex flex-col space-y-4">
                    <NarrowText
                      className="text-sm"
                      key="0"
                      align="left"
                      width="full"
                      size="small"
                      content={t('cookie_consent_advertising_targeting_content')}
                    />
                  </div>
                </AccordionItemSmall>
              </div>
              <div className="block items-center justify-between md:flex">
                <Button
                  className="mx-auto mb-3 h-12 bg-primary px-6 text-sm font-medium md:my-0 md:mr-6 md:ml-0"
                  onClick={saveSettings}
                >
                  {' '}
                  {t('saveChanges')}{' '}
                </Button>
                <div className="block md:flex">
                  <Button
                    className="box-none mx-auto mt-0 h-12 px-6 text-sm font-medium md:mr-6 md:ml-0"
                    variant={pageColor === 'yellow' || pageColor === 'brown' ? 'tertiary-dark-text' : 'tertiary'}
                    onClick={acceptAllCookies}
                  >
                    {t('acceptAll')}
                  </Button>
                  <Button
                    className="box-none mx-auto mt-0 h-12 px-6 text-sm font-medium md:mx-0"
                    variant="secondary"
                    onClick={declineCookies}
                  >
                    {t('denyAll')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )} */}
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

const useComponentVisible = (initialIsVisible, setIsSelectClicked) => {
  const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible)
  const ref = React.useRef(null)

  const handleClickOutside = useCallback(
    (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsComponentVisible(false)
        setIsSelectClicked(false)
      } else {
        setIsComponentVisible(true)
      }
    },
    [setIsSelectClicked]
  )

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [handleClickOutside])

  return { ref, isComponentVisible, setIsComponentVisible }
}

const LanguageSelect = ({
  languages: options,
  currentLanguage: current,
  onLanguageChange: onChange,
}: LanguageSelectProps) => {
  const [isSelectClicked, setIsSelectClicked] = React.useState(false)
  const { ref, isComponentVisible } = useComponentVisible(false, setIsSelectClicked)
  const dropDownOptions = options.filter((option) => option.key != current)
  const handleChange: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!onChange) return

    const selectedKey = e.currentTarget.innerText.toLowerCase()
    const selectedOption = options?.find((opt) => opt.key === selectedKey)

    if (selectedOption) {
      onChange(selectedOption)
      setIsSelectClicked(false)
    }
  }

  if (!options) return null

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    setIsSelectClicked(!isSelectClicked)
  }

  return (
    <div className="relative flex w-[50px] items-center" ref={ref} onClick={handleClick}>
      <div className="font-light lg:font-semibold">{current.toUpperCase()} </div>
      <ChevronDownSmall
        className={`ml-3 hidden mix-blend-normal lg:flex ${
          isSelectClicked && isComponentVisible && 'mb-1 -rotate-180'
        }`}
      />
      {isSelectClicked && isComponentVisible && (
        <div className="absolute top-6 -left-3 z-20 mt-1 flex h-auto w-[46px] flex-col items-center justify-center lg:left-0">
          <div className="z-10 h-0 w-4 border-x-8 border-b-4 border-solid border-transparent border-b-[#F8D7D4]" />
          <div className="flex h-auto min-h-[60px] w-full flex-col items-center rounded-lg bg-[#F8D7D4] pt-1 pb-3 shadow-[0_8px_24px_rgba(0,0,0,0.16)]">
            {dropDownOptions?.map((option) => (
              <div
                className="text-p3 hover:text-p3 mt-3 h-6 w-[22px] text-[#333333] hover:font-semibold"
                key={option.key}
                onClick={handleChange}
              >
                {option.title}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default BANavBar

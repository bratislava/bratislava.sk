import { minKeywordLength } from '@utils/constants'
import cx from 'classnames'
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import Hamburger from '@assets/images/ba-hamburger.svg'
import ChevronDownSmall from '@assets/images/chevron-down-small.svg'
import CloseIcon from '@assets/images/close.svg'
import HamburgerClose from '@assets/images/hamburger-close.svg'
import HamburgerCloseWhite from '@assets/images/hamburger-close-white.svg'
import SearchIcon from '@assets/images/search-icon.svg'
import { Brand } from '../Brand/Brand'
import Button from '../Button/Button'
import { HamburgerMenu } from '../HamburgerMenu/HamburgerMenu'
import { MenuMainItem } from '../HomepageMenu/HomepageMenu'
import { Link } from '../Link/Link'
import NarrowText from '../NarrowText/NarrowText'
import AccordionItemSmall from '../AccordionItemSmall/AccordionItemSmall'
import { Cookies } from 'react-cookie-consent'
import * as ReactGA from 'react-ga'
import { useRouter } from 'next/router'
import { useUIContext } from '@bratislava/common-frontend-ui-context'

interface IProps extends LanguageSelectProps {
  className?: string
  menuItems?: MenuMainItem[]
  handleSearch?: (searchOpen: boolean) => void
}

const navBarTexts = {
  en: {
    capitalCity: 'the Capital City of Slovakia',
    covid: 'Covid-19',
    eservices: 'eServices',
    login: 'Login',
    register: 'Register',
  },
  sk: {
    capitalCity: 'Hlavné mesto SR',
    covid: 'Covid-19',
    eservices: 'E-služby',
    login: 'Prihlásenie',
    register: 'Registrácia',
  },
}

const navBarUrls = {
  en: {
    eservices: 'https://esluzby.bratislava.sk/',
  },
  sk: {
    eservices: 'https://esluzby.bratislava.sk/',
  },
}

export const BANavBar = ({ className, menuItems, handleSearch, ...languageSelectProps }: IProps) => {
  const router = useRouter()
  const [burgerOpen, setBurgerOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [showModal, setShowModal] = React.useState(false)
  const [isConsentSubmitted, setConsent] = React.useState(true)
  const [securityCookies] = React.useState<boolean>(false)
  const [performanceCookies, setPerformanceCookies] = React.useState<boolean>(false)
  const [advertisingCookies, setAdvertisingCookies] = React.useState<boolean>(false)
  ReactGA.initialize(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ?? '')

  const languageKey = languageSelectProps.currentLanguage === 'sk' ? 'sk' : 'en'

  const handleMobileSearchClick = () => {
    handleSearch && handleSearch(!searchOpen)
    setSearchOpen(!searchOpen)
  }
  const { t } = useTranslation(['common'])

  const setConsentActually = (value) => {
    localStorage.setItem('isConsentSubmitted', value)
    setConsent(value)
  }

  const saveSettings = () => {
    Cookies.set(
      'bratislava-homepage-gdpr',
      {
        security_cookies: true,
        performance_cookies: performanceCookies,
        advertising_and_targeting_cookies: advertisingCookies,
      },
      { path: '/', expires: 365 }
    )
    ReactGA.set({
      security_cookies: true,
      performance_cookies: performanceCookies,
      advertising_and_targeting_cookies: advertisingCookies,
    })
    setShowModal(false)
    setConsentActually(true)
  }
  const acceptAllCookies = () => {
    Cookies.set(
      'bratislava-homepage-gdpr',
      {
        security_cookies: true,
        performance_cookies: true,
        advertising_and_targeting_cookies: true,
      },
      { path: '/', expires: 365 }
    )
    ReactGA.set({
      security_cookies: true,
      performance_cookies: true,
      advertising_and_targeting_cookies: true,
    })
    setShowModal(false)
    setConsentActually(true)
  }

  const declineCookies = () => {
    setPerformanceCookies(false)
    setAdvertisingCookies(false)
    Cookies.set(
      'bratislava-homepage-gdpr',
      {
        security_cookies: true,
        performance_cookies: false,
        advertising_and_targeting_cookies: false,
      },
      { path: '/', expires: 365 }
    )
    ReactGA.set({
      security_cookies: true,
      performance_cookies: false,
      advertising_and_targeting_cookies: false,
    })
    setTimeout(() => {
      setShowModal(false)
      setConsentActually(true)
    }, 300)
  }

  useEffect(() => {
    const isConsentSubmittedLocal = localStorage.getItem('isConsentSubmitted')
    setConsent(JSON.parse(isConsentSubmittedLocal))
  }, [])

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
                {navBarTexts[languageKey].capitalCity}
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
                    variant="secondaryDarkText"
                  >
                    {t('search')}
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex gap-x-8 font-semibold text-gray-dark">
                <Link
                  href="informacie-a-odporucania-k-ochoreniu-covid-19"
                  variant="plain"
                  className="whitespace-nowrap"
                >
                  {navBarTexts[languageKey].covid}
                </Link>
                {
                  /* This UILink set here just to prefetch EN version of page, this link is hidden */
                  <UILink href="/en" className="hidden">
                    hidden
                  </UILink>
                }
                <Link href={navBarUrls[languageKey].eservices} variant="plain" className="whitespace-nowrap">
                  {navBarTexts[languageKey].eservices}
                </Link>
                <div className="relative flex cursor-pointer items-center bg-transparent text-gray-dark">
                  <LanguageSelect
                    className="cursor-pointer appearance-none bg-transparent pr-6 font-semibold focus:outline-none active:outline-none"
                    {...languageSelectProps}
                  />
                </div>
                {/*
                <Link href="#" variant="plain">
                  {navBarTexts[languageKey].login}
                </Link>
                <Link
                  href="#"
                  variant="plain"
                  // need to set bgcolor to bg-red-light or bg-light-red perhaps
                  className="text-font px-6 h-12 inline-flex font-medium rounded shadow-md bg-[#F8D7D4]"
                >
                  {navBarTexts[languageKey].register}
                </Link>
                 <Button
                  className="text-base px-6 py-4 shadow-none font-medium"
                  variant="secondaryDarkText"
                >
                  {navBarTexts[languageKey].register}
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
        <Brand />
        <div className={cx('flex items-center gap-x-5', { 'gap-x-2': searchOpen })}>
          <div className="hover:cursor-pointer" onClick={handleMobileSearchClick}>
            {searchOpen ? <CloseIcon className="-ml-3 mr-px" /> : <SearchIcon className="text-gray-universal-500" />}
          </div>
          <div className="relative flex cursor-pointer items-center bg-transparent text-md text-gray-light">
            <LanguageSelect
              className="typography-highlight-sm cursor-pointer appearance-none bg-transparent focus:outline-none active:outline-none"
              {...languageSelectProps}
            />
          </div>
        </div>

        <button onClick={() => setBurgerOpen(!burgerOpen)} className="w-6 cursor-pointer">
          {burgerOpen ? <HamburgerClose /> : <Hamburger />}
        </button>

        {burgerOpen && <HamburgerMenu hamburgerMenuItems={menuItems} />}
      </div>

      {!isConsentSubmitted ? (
        <div className="fixed bottom-6 z-50 px-6 left-0 right-0">
          <div className="bg-white rounded-lg py-8 px-6 md:px-10 shadow max-w-[1110px] mx-auto">
            <h6 className="text-default mb-4 font-semibold"> {t('cookie_consent_modal_content_title')} </h6>
            <p className="text-xxs sm:text-sm mb-8">
              {' '}
              {t('cookie_consent_body')}{' '}
              <span className="font-semibold underline cursor-pointer" onClick={() => setShowModal(true)}>
                {' '}
                {t('cookie_consent_setting')}{' '}
              </span>
            </p>
            <div className="block sm:flex">
              <Button
                className="mb-3 sm:mb-0 sm:mt-0 sm:mr-6 px-6 h-12 text-sm font-medium"
                variant="primary"
                onClick={acceptAllCookies}
              >
                {' '}
                {t('acceptAll')}{' '}
              </Button>
              <Button className="mt-0 px-6 h-12 text-sm font-medium" variant="secondary" onClick={declineCookies}>
                {' '}
                {t('denyAll')}{' '}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
      {showModal ? (
        <div className="fixed z-50 px-6 left-0 right-0 top-0 bottom-0 bg-transperentBG">
          <div className="bg-white rounded-lg shadow max-w-[1110px] mx-auto relative top-1/2 -translate-y-1/2">
            <div
              className="cursor-pointer h-16 w-16 md:h-72 md:w-72 rounded-full bg-primary flex justify-center items-center text-white absolute mx-auto md:mx-0 -bottom-6 left-0 right-0 md:bottom-auto md:left-auto md:-top-6 md:-right-6"
              onClick={() => setShowModal(false)}
            >
              <HamburgerCloseWhite />
            </div>
            <div className="max-h-90Vh overflow-y-scroll overscroll-y-auto rounded-lg py-8 px-5 md:py-12 md:px-16">
              <div className="mb-6 md:mb-10">
                <h5 className="text-default md:text-md font-semibold cursor-pointer">
                  {' '}
                  {t('cookie_consent_modal_title')}{' '}
                </h5>
              </div>
              <div className="mb-10">
                <h6 className="text-xxs md:text-default mb-4 font-semibold">
                  {' '}
                  {t('cookie_consent_modal_content_title')}{' '}
                </h6>
                <p
                  className="text-xxs md:text-sm mb-8"
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
                  className="mx-auto mb-3 md:mb-0 md:mt-0 md:mr-6 md:ml-0 px-6 h-12 text-sm font-medium bg-primary"
                  onClick={saveSettings}
                >
                  {' '}
                  {t('saveChanges')}{' '}
                </Button>
                <div className="block md:flex">
                  <Button
                    className=" mt-0 px-6 h-12 text-sm font-medium mx-auto md:mr-6 md:ml-0 box-none"
                    variant="secondary"
                    onClick={acceptAllCookies}
                  >
                    {' '}
                    {t('acceptAll')}{' '}
                  </Button>
                  <Button
                    className="mt-0 px-6 h-12 text-sm font-medium mx-auto md:mr-0 md:ml-0 box-none"
                    variant="secondary"
                    onClick={declineCookies}
                  >
                    {' '}
                    {t('denyAll')}{' '}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
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
  className,
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
        className={`ml-3 hidden lg:flex mix-blend-normal ${
          isSelectClicked && isComponentVisible && '-rotate-180 mb-1'
        }`}
      />
      {isSelectClicked && isComponentVisible && (
        <div className="absolute top-6 -left-3 z-20 mt-1 flex h-auto w-[46px] flex-col items-center justify-center lg:left-0">
          <div className="z-10 w-4 h-0 border-x-8 border-solid border-transparent border-b-4 border-b-[#F8D7D4]"></div>
          <div className="w-full min-h-[60px] h-auto bg-[#F8D7D4] rounded-lg flex flex-col items-center pt-1 pb-3 shadow-[0_8px_24px_rgba(0,0,0,0.16)]">
            {dropDownOptions?.map((option) => (
              <div
                className="typography-sm hover:typography-highlight-sm mt-3 h-6 w-[22px] text-[#333333]"
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

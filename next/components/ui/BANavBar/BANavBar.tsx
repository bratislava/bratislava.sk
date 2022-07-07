import cx from 'classnames'
import React, { useCallback, useEffect, useState } from 'react'
import Hamburger from '../../../assets/images/ba-hamburger.svg'
import ChevronDownSmall from '../../../assets/images/chevron-down-small.svg'
import HamburgerClose from '../../../assets/images/hamburger-close.svg'
import HamburgerCloseWhite from '../../../assets/images/hamburger-close-white.svg'
import SearchIcon from '../../../assets/images/search-icon.svg'
import { Brand } from '../Brand/Brand'
import { HamburgerMenu } from '../HamburgerMenu/HamburgerMenu'
import { MenuMainItem } from '../HomepageMenu/HomepageMenu'
import { Link } from '../Link/Link'
import CloseIcon from '../../../assets/images/close.svg'
import SmallBlackSearchIcon from '../../../assets/images/search-icon-small-black.svg'
import SmallWhiteSearchIcon from '../../../assets/images/search-icon-small-white.svg'
import Button from '../Button/Button'
import { useTranslation } from 'next-i18next'
import NarrowText from '../NarrowText/NarrowText'
import AccordionItemSmall from '../AccordionItemSmall/AccordionItemSmall'
import { Cookies } from 'react-cookie-consent'
import * as ReactGA from 'react-ga'
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
    eservices: '/eservices',
  },
  sk: {
    eservices: '/elektronicke-sluzby',
  },
}

export const BANavBar = ({ className, menuItems, handleSearch, ...languageSelectProps }: IProps) => {
  const [burgerOpen, setBurgerOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [showModal, setShowModal] = React.useState(false)
  const [isConsentSubmitted, setConsent] = React.useState(true)
  const [securityCookies] = React.useState<boolean>(true)
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
        security_cookies: securityCookies,
        performance_cookies: performanceCookies,
        advertising_and_targeting_cookies: advertisingCookies,
      },
      { path: '/', expires: 365 }
    )
    ReactGA.set({
      security_cookies: securityCookies,
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

  return (
    <>
      {/* Desktop */}
      <div className={cx(className, 'items-center text-base ', 'fixed top-0 left-0 w-full bg-white z-50')}>
        <div className="hidden lg:flex m-auto justify-between w-full max-w-screen-1.5lg py-4 border-b border-gray-universal-200">
          <Brand
            className="flex-1"
            url="/"
            title={
              <p className="text-sm text-font">
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
                  className="h-7 pl-6 w-96 outline-none border-2 border-r-0 rounded-l-lg text-sm text-font"
                />
                <Link href={t('searchLink')}>
                  <Button
                    icon={<SmallBlackSearchIcon />}
                    hoverIcon={<SmallWhiteSearchIcon />}
                    className="h-7 rounded-l-none text-sm px-6 shadow-none bg-[#F8D7D4] hover:bg-[#E46054] hover:text-white hover:color-white font-medium bg-secondary"
                  >
                    Hľadať
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex gap-x-8 text-gray-dark font-semibold">
                <Link
                  href="informacie-a-odporucania-k-ochoreniu-covid-19"
                  variant="plain"
                  className="whitespace-nowrap"
                >
                  {navBarTexts[languageKey].covid}
                </Link>
                <Link href={navBarUrls[languageKey].eservices} variant="plain" className="whitespace-nowrap">
                  {navBarTexts[languageKey].eservices}
                </Link>
                <div className="relative flex items-center text-gray-dark bg-transparent cursor-pointer">
                  <LanguageSelect
                    className="appearance-none font-semibold pr-6 cursor-pointer bg-transparent active:outline-none focus:outline-none"
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
        className={cx(
          className,
          'h-20 flex items-center justify-between py-5 px-7.5 -mx-7.5 shadow-md drop-shadow-md',
          'lg:hidden fixed top-0 w-full bg-white z-50'
        )}
      >
        <Brand />
        <div className={cx('flex items-center gap-x-5', { 'gap-x-2': searchOpen })}>
          <div className="hover:cursor-pointer" onClick={handleMobileSearchClick}>
            {searchOpen ? <CloseIcon className="-ml-3 mr-px" /> : <SearchIcon />}
          </div>
          <div className="relative flex items-center text-md text-gray-light bg-transparent cursor-pointer">
            <LanguageSelect
              className="appearance-none typography-highlight-sm cursor-pointer bg-transparent active:outline-none focus:outline-none"
              {...languageSelectProps}
            />
          </div>
        </div>

        <button onClick={() => setBurgerOpen(!burgerOpen)} className="cursor-pointer w-4">
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
            <div className="py-8 md:py-12 px-5 md:px-16 rounded-lg max-h-90Vh overflow-y-scroll overscroll-y-auto">
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
                  className="py-4 px-6 mb-3"
                  key="0"
                  title={t('cookie_consent_security_essential_titile')}
                  secondaryTitle=""
                  value={securityCookies}
                  onValueChange={() => null}
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
                  className="py-4 px-6 mb-3"
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
                  className="py-4 px-6 mb-3"
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
              <div className="block md:flex justify-between items-center">
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
                className="w-[22px] h-6 mt-3 typography-sm text-[#333333] hover:typography-highlight-sm"
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

import cx from 'classnames'
import React, { useCallback, useState } from 'react'
import Hamburger from '../../../assets/images/ba-hamburger.svg'
import ChevronDownSmall from '../../../assets/images/chevron-down-small.svg'
import HamburgerClose from '../../../assets/images/hamburger-close.svg'
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

  const languageKey = languageSelectProps.currentLanguage === 'sk' ? 'sk' : 'en'

  const handleMobileSearchClick = () => {
    handleSearch && handleSearch(!searchOpen)
    setSearchOpen(!searchOpen)
  }
  const { t } = useTranslation('common')

  return (
    <>
      {/* Desktop */}
      <div
        className={cx(
          className,
          'items-center text-base py-4 border-b border-gray-universal-200',
          'fixed top-0 left-0 w-full bg-white z-50'
        )}
      >
        <div className="hidden lg:flex m-auto justify-between w-full max-w-screen-1.5lg">
          <Brand
            className="flex-1"
            url="/"
            title={
              <p className="text-red-universal-300">
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
                  className="h-12 pl-6 w-96 outline-none border-2 border-r-0 rounded-l-lg text-base text-font"
                />
                <Link href={t('searchLink')}>
                  <Button
                    icon={<SmallBlackSearchIcon />}
                    hoverIcon={<SmallWhiteSearchIcon />}
                    className="h-12 rounded-l-none text-base px-6 shadow-none bg-[#F8D7D4] hover:bg-[#E46054] hover:text-white hover:color-white font-medium"
                    variant="secondaryDarkText"
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
              className="appearance-none font-light text-md cursor-pointer bg-transparent active:outline-none focus:outline-none"
              {...languageSelectProps}
            />
          </div>
        </div>

        <button onClick={() => setBurgerOpen(!burgerOpen)} className="cursor-pointer w-4">
          {burgerOpen ? <HamburgerClose /> : <Hamburger />}
        </button>

        {burgerOpen && <HamburgerMenu hamburgerMenuItems={menuItems} />}
      </div>
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
    <div className="relative flex items-center w-[46px]" ref={ref} onClick={handleClick}>
      <div className="font-light lg:font-semibold">{current.toUpperCase()} </div>
      <ChevronDownSmall
        className={`ml-3 hidden lg:flex mix-blend-normal ${
          isSelectClicked && isComponentVisible && '-rotate-180 mb-1'
        }`}
      />
      {isSelectClicked && isComponentVisible && (
        <div className="absolute top-6 -left-3 lg:left-0 z-20 mt-1 flex flex-col items-center justify-center w-[46px] h-auto">
          <div className="z-10 w-4 h-0 border-x-8 border-solid border-transparent border-b-4 border-b-[#F8D7D4]"></div>
          <div className="w-full min-h-[60px] h-auto bg-[#F8D7D4] rounded-lg flex flex-col items-center pt-1 pb-3 shadow-[0_8px_24px_rgba(0,0,0,0.16)]">
            {dropDownOptions?.map((option) => (
              <div
                className="w-[22px] h-6 mt-3 font-normal text-[#333333] hover:font-semibold"
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

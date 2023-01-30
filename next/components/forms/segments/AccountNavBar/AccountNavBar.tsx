import { ArrowLeft } from '@assets/images'
import Hamburger from '@assets/images/ba-hamburger.svg'
import ChevronDownSmall from '@assets/images/chevron-down-small.svg'
import HamburgerClose from '@assets/images/hamburger-close.svg'
import SearchIcon from '@assets/images/search-icon.svg'
import { useUIContext } from '@bratislava/common-frontend-ui-context'
import Brand from '@bratislava/ui-bratislava/Brand/Brand'
import Link from '@bratislava/ui-bratislava/Link/Link'
import cx from 'classnames'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'

interface IProps extends LanguageSelectProps {
  className?: string
  menuHidden?: boolean
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
  const ref = useRef(null)

  const handleClickOutside = useCallback(
    (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsComponentVisible(false)
        setIsSelectClicked(false)
      } else {
        setIsComponentVisible(true)
      }
    },
    [setIsSelectClicked],
  )

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [handleClickOutside])

  return { ref, isComponentVisible, setIsComponentVisible }
}

const BackButton = () => {
  const router = useRouter()

  return (
    <>
      <ArrowLeft className="cursor-pointer" onClick={() => router.back()} />
      <div className="border-b-solid border-r-2 h-6 ml-7 mr-6" />
    </>
  )
}

export const AccountNavBar = ({ className, menuHidden, ...languageSelectProps }: IProps) => {
  const [burgerOpen, setBurgerOpen] = useState(false)

  const languageKey = languageSelectProps.currentLanguage === 'sk' ? 'sk' : 'en'
  const { Link: UILink } = useUIContext()

  const { t } = useTranslation(['common'])
  return (
    <>
      {/* Desktop */}
      <div
        id="desktop-navbar"
        className={cx(
          className,
          'text-p2 items-center ',
          'fixed top-0 left-0 w-full bg-white z-50',
        )}
      >
        <div className="max-w-screen-1.5lg m-auto hidden h-[57px] w-full items-center border-b border-gray-200 lg:flex">
          <BackButton />
          <Brand
            className="group grow"
            url="/"
            title={
              <p className="text-p2 text-font group-hover:text-gray-600">
                {languageKey === 'en' && <span className="font-semibold">Bratislava </span>}
                {t('capitalCity')}
                {languageKey !== 'en' && <span className="font-semibold"> Bratislava</span>}
              </p>
            }
          />
          {!menuHidden && (
            <nav className="text-font/75 flex gap-x-8 font-semibold">
              <div className="text-font/75 flex items-center gap-x-8 font-semibold">
                <Link href={t('searchLink')} variant="plain" className="-mr-4 p-4">
                  <SearchIcon />
                </Link>

                {/* <Link
                href={contactUrls[languageKey]}
                variant="plain"
                className="whitespace-nowrap py-4"
              >
                {t('contacts')}
              </Link> */}

                {/* This UILink set here just to prefetch EN version of page, this link is hidden */}
                <UILink href="/en" className="hidden">
                  hidden
                </UILink>

                {/* <Link href={eServicesData.url} variant="plain" className="whitespace-nowrap py-4">
                {t('eservices')}
              </Link> */}
                <div className="text-font/75 relative flex items-center bg-transparent">
                  <LanguageSelect
                    className="appearance-none bg-transparent pr-6 font-semibold focus:outline-none active:outline-none"
                    {...languageSelectProps}
                  />
                </div>
              </div>
            </nav>
          )}
        </div>
      </div>
      {/* Mobile */}
      <div
        id="mobile-navbar"
        className={cx(
          className,
          'h-16 flex items-center py-5 px-8 -mx-8 shadow-md drop-shadow-md',
          'lg:hidden fixed top-0 w-full bg-white z-50',
        )}
      >
        <BackButton />
        <Brand url="/" className="grow" />
        {!menuHidden && (
          <>
            <div className={cx('flex items-center gap-x-5')}>
              <div className="text-h4 text-font/50 relative flex cursor-pointer items-center bg-transparent">
                <Link href={t('searchLink')} variant="plain" className="p-4">
                  <SearchIcon />
                </Link>
                <LanguageSelect
                  className="text-p3-semibold cursor-pointer appearance-none bg-transparent focus:outline-none active:outline-none"
                  {...languageSelectProps}
                />
              </div>
            </div>

            <button onClick={() => setBurgerOpen(!burgerOpen)} className="-mr-4 px-4 py-5">
              <div className="flex w-6 items-center justify-center">
                {burgerOpen ? <HamburgerClose /> : <Hamburger />}
              </div>
            </button>
          </>
        )}
      </div>
    </>
  )
}

const LanguageSelect = ({
  languages: options,
  currentLanguage: current,
  onLanguageChange: onChange,
}: LanguageSelectProps) => {
  const [isSelectClicked, setIsSelectClicked] = useState(false)
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
    <div className="relative flex w-12 cursor-pointer items-center" ref={ref} onClick={handleClick}>
      <div className="font-light lg:font-semibold">{current.toUpperCase()} </div>
      <ChevronDownSmall
        className={`ml-3 hidden mix-blend-normal lg:flex ${
          isSelectClicked && isComponentVisible && 'mb-1 -rotate-180'
        }`}
      />
      {isSelectClicked && isComponentVisible && (
        <div className="absolute top-6 -left-3 z-20 mt-1 flex h-auto w-11 cursor-default flex-col items-center justify-center lg:left-0">
          <div className="z-10 h-0 w-4 border-x-8 border-b-4 border-solid border-transparent border-b-[#F8D7D4]" />
          <div className="flex h-auto min-h-[60px] w-full flex-col items-center rounded-lg bg-[#F8D7D4] pt-1 pb-3 shadow-[0_8px_24px_rgba(0,0,0,0.16)]">
            {dropDownOptions?.map((option) => (
              <div
                className="text-p3 hover:text-p3-semibold cursor-pointer text-font mt-3 h-6 w-6"
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

export default AccountNavBar

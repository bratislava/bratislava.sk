import ProfileOutlinedIcon from '@assets/images/account/profile-outlined.svg'
import VolumeIcon from '@assets/images/account/volume.svg'
import Hamburger from '@assets/images/ba-hamburger.svg'
import ChevronDownSmall from '@assets/images/chevron-down-small.svg'
import HamburgerClose from '@assets/images/hamburger-close.svg'
import SearchIcon from '@assets/images/search-icon.svg'
import { useUIContext } from '@bratislava/common-frontend-ui-context'
import Brand from '@bratislava/ui-bratislava/Brand/Brand'
import Link from '@bratislava/ui-bratislava/Link/Link'
import useAccount, { UserData } from '@utils/useAccount'
import cx from 'classnames'
import HamburgerMenu from 'components/forms/segments/HambergerMenu/HamburgerMenu'
import Button from 'components/forms/simple-components/Button'
import { useTranslation } from 'next-i18next'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react'

interface IProps extends LanguageSelectProps {
  className?: string
  navHidden?: boolean
  sectionsList?: MenuItem[]
  menuItems: MenuItem[]
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

const useComponentVisible = (
  initialIsVisible: boolean,
  setIsSelectClicked: (value: boolean) => void,
) => {
  const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible)
  const ref = useRef<HTMLDivElement>(null)

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as HTMLDivElement)) {
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

const Divider = ({ className }: { className?: string }) => {
  return <div className={`border-b-solid border-r-2 h-6 ${className}`} />
}

export interface MenuItem {
  id: number
  title: string
  icon: ReactNode
  link: string
}

export const AccountNavBar = ({
  className,
  sectionsList,
  menuItems,
  navHidden,
  ...languageSelectProps
}: IProps) => {
  const [burgerOpen, setBurgerOpen] = useState(false)
  const { isAuth, logout, userData } = useAccount()

  const languageKey = languageSelectProps.currentLanguage === 'sk' ? 'sk' : 'en'
  const { Link: UILink } = useUIContext()

  const { t } = useTranslation(['common', 'account'])
  const router = useRouter()

  const onRouteChange = (selectedMenuItem: MenuItem) => {
    if (selectedMenuItem.link === '/logout') {
      logout()
      router.push('/login')
    } else {
      router.push(selectedMenuItem.link)
    }
  }

  const linkClassName = 'whitespace-nowrap py-4'

  return (
    <>
      {/* Desktop */}
      <div
        id="desktop-navbar"
        className={cx(
          className,
          'text-p2 items-center',
          'fixed top-0 left-0 w-full bg-white z-50 shadow',
        )}
      >
        <div className="max-w-screen-1.5lg m-auto hidden h-[57px] w-full items-center lg:flex gap-x-6">
          <Brand
            className="group grow"
            url="/"
            title={
              <p className="text-p2 text-font group-hover:text-gray-600">
                {languageKey === 'en' && <span className="font-semibold">Bratislava </span>}
                {t('common:capitalCity')}
                {languageKey !== 'en' && <span className="font-semibold"> Bratislava</span>}
              </p>
            }
          />
          <nav className="text-font/75 flex gap-x-8 font-semibold">
            <div className="text-font/75 flex items-center gap-x-6 font-semibold">
              {!navHidden ? (
                <>
                  <Link href="/" variant="plain">
                    <VolumeIcon />
                  </Link>
                  <Divider className="mx-2" />
                  <Link href="/" variant="plain" className={linkClassName}>
                    {t('account:menu_contacts_link')}
                  </Link>
                  {isAuth ? (
                    <>
                      <Divider />
                      <AccountSelect
                        menuItems={menuItems}
                        onChange={onRouteChange}
                        userData={userData}
                      />
                      <Divider />
                    </>
                  ) : (
                    <>
                      <Link href="/" variant="plain" className={linkClassName}>
                        {t('account:menu_account_link')}
                      </Link>
                      <Divider />
                      <Link href="/login" variant="plain" className={`${linkClassName} ml-2`}>
                        {t('account:menu_login_link')}
                      </Link>
                      <Button
                        onPress={() => router.push('/register')}
                        variant="negative"
                        text={t('account:menu_register_link')}
                        size="sm"
                      />
                    </>
                  )}

                  <Link href={t('searchLink')} variant="plain">
                    <SearchIcon />
                  </Link>

                  {/* This UILink set here just to prefetch EN version of page, this link is hidden */}
                  <UILink href="/en" className="hidden">
                    hidden
                  </UILink>

                  <div className="text-font/75 relative flex items-center bg-transparent">
                    <LanguageSelect
                      className="appearance-none bg-transparent pr-6 font-semibold focus:outline-none active:outline-none"
                      {...languageSelectProps}
                    />
                  </div>
                </>
              ) : isAuth ? (
                <AccountSelect menuItems={menuItems} onChange={onRouteChange} userData={userData} />
              ) : (
                <>
                  <Link href="/login" variant="plain" className={`${linkClassName} ml-2`}>
                    {t('account:menu_login_link')}
                  </Link>
                  <Button
                    onPress={() => router.push('/register')}
                    variant="negative"
                    text={t('account:menu_register_link')}
                    size="sm"
                  />
                </>
              )}
            </div>
          </nav>
        </div>
        {isAuth && sectionsList && (
          <div className="border-t border-gray-200 max-w-screen-1.5lg m-auto h-[57px] w-full items-center justify-between lg:flex">
            <ul className="w-full h-full flex items-center">
              {sectionsList.map((sectionItem) => (
                <li className="w-full h-full" key={sectionItem.id}>
                  <NextLink href={sectionItem.link}>
                    <div
                      className={cx(
                        'text-p2-semibold w-full h-full flex items-center justify-center cursor-pointer border-b-2 border-transparent hover:text-main-700 hover:border-main-700 transition-all',
                        {
                          'text-main-700 border-main-700': router.route.includes(sectionItem?.link),
                        },
                      )}
                    >
                      {sectionItem.icon}
                      <span className="ml-3">{t(sectionItem?.title)}</span>
                    </div>
                  </NextLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {/* Mobile */}
      <div
        id="mobile-navbar"
        className={cx(
          className,
          'h-16 flex items-center py-5 px-8 -mx-8 shadow-md drop-shadow-md',
          'lg:hidden fixed top-0 w-full bg-white z-50 gap-x-6',
        )}
      >
        <Brand url="/" className="grow" />
        {!navHidden && (
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
        )}

        <button
          onClick={() => (isAuth ? setBurgerOpen(!burgerOpen) : router.push('/login'))}
          className="-mr-4 px-4 py-5"
        >
          <div className="flex w-6 items-center justify-center">
            {burgerOpen ? (
              <HamburgerClose />
            ) : isAuth && sectionsList ? (
              <Hamburger />
            ) : (
              <Avatar userData={userData} />
            )}
          </div>
        </button>

        {burgerOpen && (
          <HamburgerMenu
            sectionsList={sectionsList}
            menuItems={menuItems}
            closeMenu={() => setBurgerOpen(false)}
            onRouteChange={onRouteChange}
          />
        )}
      </div>
    </>
  )
}

const Avatar = ({ userData }: { userData?: UserData | null }) => {
  return (
    <div className="flex relative flex-row items-start gap-2 rounded-full p-2 bg-main-100">
      <div className="flex h-6 w-6 items-center justify-center font-semibold text-main-700">
        <span className="uppercase">
          {userData && userData.given_name && userData.family_name ? (
            userData.given_name[0] + userData.family_name[0]
          ) : (
            <ProfileOutlinedIcon />
          )}
        </span>
      </div>
    </div>
  )
}

interface AccountSelectProps {
  menuItems: MenuItem[]
  onChange: (selectedItem: MenuItem) => void
  userData: UserData | null
}

const AccountSelect = ({ menuItems, onChange, userData }: AccountSelectProps) => {
  const [isSelectClicked, setIsSelectClicked] = useState(false)
  const { ref, isComponentVisible } = useComponentVisible(false, setIsSelectClicked)
  const { t } = useTranslation()

  const handleChange = (selectedKey: number) => {
    const selectedMenuItem = menuItems?.find((opt) => opt.id === selectedKey)

    if (selectedMenuItem) {
      onChange(selectedMenuItem)
      setIsSelectClicked(false)
    }
  }

  if (!menuItems) return null

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    setIsSelectClicked(!isSelectClicked)
  }

  return (
    <div className="relative flex cursor-pointer items-center" ref={ref} onClick={handleClick}>
      <Avatar userData={userData} />
      <div className="ml-3 font-light lg:font-semibold">
        {userData?.given_name || userData?.family_name}
      </div>
      <ChevronDownSmall
        className={`ml-3 hidden mix-blend-normal lg:flex ${
          isSelectClicked && isComponentVisible && 'mb-1 -rotate-180'
        }`}
      />
      {isSelectClicked && isComponentVisible && (
        <div className="absolute top-12 -left-3 z-20 mt-1 flex h-auto cursor-default flex-col items-center justify-center lg:left-0">
          <div className="flex h-auto min-h-[60px] w-full flex-col rounded-lg bg-white py-2 shadow-[0_8px_16px_rgba(0,0,0,0.12)]">
            {menuItems.map((option) => (
              <div key={option.id} className="cursor-pointer flex py-2 px-5">
                <div className="flex relative flex-row items-start gap-2 rounded-xl p-4 bg-gray-50">
                  <div className="flex h-2 w-2 items-center justify-center">
                    <span>{option.icon}</span>
                  </div>
                </div>
                <div
                  className="text-p2 hover:text-p2-semibold text-font p-2 whitespace-nowrap"
                  onClick={() => handleChange(option.id)}
                >
                  {t(option.title)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

const LanguageSelect = ({
  languages: options,
  currentLanguage: current,
  onLanguageChange: onChange,
}: LanguageSelectProps) => {
  const [isSelectClicked, setIsSelectClicked] = useState(false)
  const { ref, isComponentVisible } = useComponentVisible(false, setIsSelectClicked)
  const dropDownOptions = options?.filter((option) => option.key != current)
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
      <div className="font-light lg:font-semibold">{current?.toUpperCase()} </div>
      <ChevronDownSmall
        className={`ml-3 hidden mix-blend-normal lg:flex ${
          isSelectClicked && isComponentVisible && 'mb-1 -rotate-180'
        }`}
      />
      {isSelectClicked && isComponentVisible && (
        <div className="absolute top-6 -left-3 z-20 mt-1 flex h-auto w-11 cursor-default flex-col items-center justify-center lg:left-0">
          <div className="z-10 h-0 w-4 border-x-8 border-b-4 border-solid border-transparent border-b-main-200" />
          <div className="flex h-auto min-h-[60px] w-full flex-col items-center rounded-lg bg-main-200 pt-1 pb-3 shadow-lg">
            {dropDownOptions?.map((option) => (
              <div
                className="text-p2 hover:text-p2-semibold cursor-pointer text-font mt-3 h-6 w-6"
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

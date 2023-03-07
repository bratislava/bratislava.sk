import ProfileOutlinedIcon from '@assets/images/account/profile-outlined.svg'
import VolumeIcon from '@assets/images/account/volume.svg'
import Hamburger from '@assets/images/ba-hamburger.svg'
import HamburgerClose from '@assets/images/hamburger-close.svg'
import SearchIcon from '@assets/images/search-icon.svg'
import { useUIContext } from '@bratislava/common-frontend-ui-context'
import Brand from '@bratislava/ui-bratislava/Brand/Brand'
import Link from '@bratislava/ui-bratislava/Link/Link'
import { ROUTES } from '@utils/constants'
import useAccount, { UserData } from '@utils/useAccount'
import { getLanguageKey } from '@utils/utils'
import cx from 'classnames'
import HamburgerMenu from 'components/forms/segments/HambergerMenu/HamburgerMenu'
import Button from 'components/forms/simple-components/Button'
import Menu from 'components/forms/simple-components/Menu/Menu'
import { useTranslation } from 'next-i18next'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode, useState } from 'react'
import { Item } from 'react-stately'

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

  const languageKey = getLanguageKey(languageSelectProps.currentLanguage)
  const anotherLanguage = languageSelectProps.languages?.find((l) => l.key !== languageKey)
  const { Link: UILink } = useUIContext()

  const { t } = useTranslation(['common', 'account'])
  const router = useRouter()

  const onRouteChange = (selectedMenuItem: MenuItem) => {
    if (selectedMenuItem.link === '/logout') {
      logout()
      router.push(ROUTES.LOGIN)
    } else {
      router.push(selectedMenuItem.link)
    }
  }

  const linkClassName = 'whitespace-nowrap py-4'

  const onSelectMenuItem = (key: React.Key) => {
    const selectedMenuItem = menuItems?.find((opt) => opt.id.toString() === key)
    if (selectedMenuItem) onRouteChange(selectedMenuItem)
  }

  /**
   * Matches `/account` URL with given param sectionItem link
   * @match
   * `/account`
   * @param {MenuItem} sectionItem - Menu item object.
   */
  const isAccountPage = (sectionItem: MenuItem) =>
    router.route.endsWith('/account') && router.route.includes(sectionItem.link)

  /**
   * Matches parent URL with children url (inner pages)
   * @example
   * `account/taxes-and-fees` and `account/taxes-and-fees/[id]` where `taxes-and-fees` is parent page
   * It also excludes home page `/account` if we are on `account/taxes-and-fees`
   * @param {MenuItem} sectionItem - Menu item object.
   */
  const isActive = (sectionItem: MenuItem) =>
    sectionItem?.link.includes(router.route.split('/')[2]) || isAccountPage(sectionItem)

  return (
    <>
      {/* Desktop */}
      <div
        id="desktop-navbar"
        className={cx(
          className,
          'text-p2 items-center',
          'fixed top-0 left-0 w-full bg-white z-10 shadow',
        )}
      >
        <div className="max-w-screen-lg m-auto hidden h-[57px] w-full items-center lg:flex gap-x-6">
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
                      <Menu
                        buttonLeftEl={<Avatar userData={userData} />}
                        label={userData?.given_name || userData?.family_name || ''}
                        onAction={onSelectMenuItem}
                      >
                        {menuItems.map((option) => (
                          <Item key={option.id}>
                            <AccountMenuItem menuItem={option} />
                          </Item>
                        ))}
                      </Menu>
                      <Divider />
                    </>
                  ) : (
                    <Button
                      onPress={() => router.push(ROUTES.REGISTER)}
                      variant="negative"
                      text={t('account:menu_account_link')}
                      size="sm"
                    />
                  )}

                  <Link href={t('searchLink')} variant="plain">
                    <SearchIcon />
                  </Link>

                  {/* This UILink set here just to prefetch EN version of page, this link is hidden */}
                  <UILink href="/en" className="hidden">
                    hidden
                  </UILink>
                  <Divider />
                  {anotherLanguage && (
                    <Button
                      size="sm"
                      className="underline underline-offset-4"
                      variant="link-black"
                      onPress={() => languageSelectProps.onLanguageChange?.(anotherLanguage)}
                      text={anotherLanguage?.title}
                    />
                  )}
                </>
              ) : isAuth ? (
                <Menu
                  buttonLeftEl={<Avatar userData={userData} />}
                  label={userData?.given_name || userData?.family_name || ''}
                  onAction={onSelectMenuItem}
                >
                  {menuItems.map((option) => (
                    <Item key={option.id}>
                      <AccountMenuItem menuItem={option} />
                    </Item>
                  ))}
                </Menu>
              ) : (
                <>
                  <Link href="/login" variant="plain" className={`${linkClassName} ml-2`}>
                    {t('account:menu_login_link')}
                  </Link>
                  <Button
                    onPress={() => router.push(ROUTES.REGISTER)}
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
          <div className="border-t border-gray-200 max-w-screen-lg m-auto h-[57px] w-full items-center justify-between lg:flex">
            <ul className="w-full h-full flex items-center">
              {sectionsList.map((sectionItem) => (
                <li className="w-full h-full" key={sectionItem.id}>
                  <NextLink href={sectionItem.link}>
                    <div
                      className={cx(
                        'text-p2-semibold w-full h-full flex items-center justify-center cursor-pointer border-b-2 border-transparent hover:text-main-700 hover:border-main-700 transition-all',
                        {
                          'text-main-700 border-main-700': isActive(sectionItem),
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
          'h-16 flex items-center py-5 px-8 -mx-8 border-b-2',
          'lg:hidden fixed top-0 w-full bg-white z-10 gap-x-6',
        )}
      >
        <Brand url="/" className="grow" />
        {!navHidden && (
          <div className={cx('flex items-center gap-x-5')}>
            <div className="text-h4 text-font/50 relative flex cursor-pointer items-center bg-transparent">
              <Link href={t('searchLink')} variant="plain" className="p-4">
                <SearchIcon />
              </Link>
            </div>
          </div>
        )}

        <button
          onClick={() => (isAuth ? setBurgerOpen(!burgerOpen) : router.push(ROUTES.LOGIN))}
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

const AccountMenuItem = ({ menuItem }: { menuItem: MenuItem }) => {
  const { t } = useTranslation()

  return (
    <div className="cursor-pointer flex py-2 px-5">
      <div className="flex relative flex-row items-start gap-2 rounded-xl p-4 bg-gray-50">
        <div className="flex h-2 w-2 items-center justify-center">
          <span>{menuItem.icon}</span>
        </div>
      </div>
      <div className="text-p2 text-font p-2 whitespace-nowrap">{t(menuItem.title)}</div>
    </div>
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

export default AccountNavBar

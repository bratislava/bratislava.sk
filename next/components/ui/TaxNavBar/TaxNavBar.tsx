import cx from 'classnames'
import React, { useState } from 'react'
import { Brand } from '../Brand/Brand'
import { MenuMainItem } from '../HomepageMenu/HomepageMenu'

interface IProps extends LanguageSelectProps {
  className?: string
  menuItems?: MenuMainItem[]
}

export const TaxNavBar = ({ className, menuItems, ...languageSelectProps }: IProps) => {
  const [burgerOpen, setBurgerOpen] = useState(false)

  return (
    <>
      {/* Desktop */}
      <div
        className={cx(
          className,
          'h-20 flex items-center justify-between text-base py-5 px-7.5 shadow-md drop-shadow-md',
          'fixed top-0 w-full bg-white z-50'
        )}
      >
        <div className="hidden lg:flex m-auto justify-between w-full max-w-screen-1.5lg">
          <Brand
            className="flex-1"
            url="/"
            title={
              <p>
                Hlavné mesto SR <span className="font-semibold">Bratislava</span>
              </p>
            }
          />
          {/* <nav className="flex flex-1 items-center justify-end gap-x-8 text-gray-dark font-semibold ">
            <Link
              href="#"
              variant="plain"
              className="bg-primary px-6 inline-flex h-12 text-white text-default font-medium rounded-lg shadow-md"
            >
              Prihlásenie
            </Link>
          </nav> */}
        </div>
      </div>
      {/* Mobile */}
      <div
        className={cx(
          className,
          'h-20 flex items-center justify-between text-base py-5 px-7.5 shadow-md drop-shadow-md',
          'lg:hidden fixed top-0 w-full bg-white z-50'
        )}
      >
        <Brand url="/" />
        {/* <div className="flex items-center gap-x-5">
          <Link variant="plain" href="#">
            <SearchIcon />
          </Link>
          <div className="relative flex items-center text-gray-dark bg-transparent cursor-pointer">
            <LanguageSelect
              className="appearance-none font-light text-md cursor-pointer bg-transparent active:outline-none focus:outline-none"
              {...languageSelectProps}
            />
          </div>
        </div> */}

        {/* <button
          onClick={() => setBurgerOpen(!burgerOpen)}
          className="cursor-pointer w-4"
        >
          {burgerOpen ? <HamburgerClose /> : <Hamburger />}
        </button>

        {burgerOpen && <HamburgerMenu hamburgerMenuItems={menuItems} />} */}
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

const LanguageSelect = ({
  className,
  languages: options,
  currentLanguage: current,
  onLanguageChange: onChange,
}: LanguageSelectProps) => {
  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    if (!onChange) return

    const selectedKey = e.target.value
    const selectedOption = options?.find((opt) => opt.key === selectedKey)
    if (selectedOption) onChange(selectedOption)
  }

  if (!options) return null

  return (
    <select className={className} value={current} onChange={handleChange}>
      {options?.map((option) => (
        <option key={option.key} value={option.key}>
          {option.title}
        </option>
      ))}
    </select>
  )
}

export default TaxNavBar

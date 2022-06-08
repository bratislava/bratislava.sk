import { useUIContext } from '@bratislava/common-frontend-ui-context'
import Button from '../Button/Button'
import SearchIcon from '../../../assets/images/search-icon.svg'
import Checkbox from '../../../assets/images/checkbox.svg'
import { useState } from 'react'
import cx from 'classnames'

export interface AdvancedSearchProps {
  className?: string
  placeholder: string
  title: string
  buttonText: string
  options: string[]
}

export const AdvancedSearch = ({ className, placeholder, title, buttonText, options }: AdvancedSearchProps) => {
  const { Link: UILink } = useUIContext()
  const [checked, setChecked] = useState(options ?? [])
  const handleClick = (option: string) => {
    if (checked.includes(option)) {
      setChecked(checked.filter((o) => o != option))
    } else {
      setChecked([...checked, option])
    }
  }
  return (
    <div className={cx('flex flex-col w-full', className)}>
      <div className="text-sm lg:text-md font-medium pb-3">{title}</div>
      <div className="hidden lg:flex pb-6">
        <input
          id="name"
          type="text"
          className="h-14 pl-6 w-[574px] outline-none border-2 border-r-0 rounded-l-lg text-base text-font"
          placeholder={placeholder}
        />
        <UILink href="search">
          <Button
            icon={<SearchIcon />}
            hoverIcon={<SearchIcon />}
            className="h-14 rounded-l-none text-default px-6 shadow-none hover:bg-primary hover:text-white hover:color-white font-medium"
            variant="secondaryDarkText"
          >
            {buttonText}
          </Button>
        </UILink>
      </div>
      <div className="flex lg:hidden pb-6">
        <input
          id="name"
          type="text"
          className="h-14 pl-6 w-full max-w-[574px] outline-none border-2 border-r-0 rounded-l-lg text-sm text-font font-medium"
          placeholder="Zadajte kľúčové slovo"
        />
        <UILink href="search">
          <Button
            icon={<SearchIcon />}
            hoverIcon={<SearchIcon />}
            className="h-14 rounded-l-none text-default pr-6 shadow-none hover:bg-primary hover:text-white hover:color-white font-medium"
            variant="secondaryDarkText"
          ></Button>
        </UILink>
      </div>
      <div className="flex flex-col lg:flex-row gap-x-14 gap-y-6">
        {options?.map((option, index) => (
          <div key={index} className="flex items-center gap-x-4">
            <div onClick={() => handleClick(option)}>
              {checked.includes(option) ? (
                <Checkbox />
              ) : (
                <div className="h-6 w-6 rounded border-2 border-solid border-slate-300 mr-px"></div>
              )}
            </div>
            <label>{option}</label>
          </div>
        ))}
      </div>
    </div>
  )
}

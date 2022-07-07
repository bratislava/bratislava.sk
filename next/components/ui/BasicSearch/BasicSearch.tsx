import SearchIcon from '@assets/images/search-icon.svg'
import SearchIconSmallBlack from '@assets/images/search-icon-small-black.svg'
import SearchIconSmallWhite from '@assets/images/search-icon-small-white.svg'
import { useUIContext } from '@bratislava/common-frontend-ui-context'
import cx from 'classnames'
import { useState } from 'react'

import Button from '../Button/Button'

export interface BasicSearchProps {
  className?: string
  placeholder: string
  title: string
  buttonText: string
  collapse?: boolean
  onSubmit?: (value: string) => void
  initialValue?: string
}

export const BasicSearch = ({
  className,
  placeholder,
  title,
  buttonText,
  collapse,
  onSubmit,
  initialValue,
}: BasicSearchProps) => {
  const { Link: UILink } = useUIContext()
  const [input, setInput] = useState(initialValue || '')
  return (
    <div className={cx('flex flex-col w-full max-w-[730px]', className)}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit?.(input)
        }}
      >
        <div className="pb-2 text-sm font-medium lg:pb-3 lg:text-default">{title}</div>
        <div className={cx('lg:flex', { hidden: !collapse }, { flex: collapse })}>
          <input
            id="name"
            type="text"
            className="h-12 w-full rounded-l-lg border-2 border-r-0 pl-6 text-base text-font outline-none lg:h-14"
            placeholder={placeholder}
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <Button
            icon={<SearchIcon className="scale-75" />}
            hoverIcon={<SearchIcon className="scale-75" />}
            className="hover:color-white h-14 rounded-l-none px-6 text-default font-medium capitalize shadow-none hover:bg-primary hover:text-white"
            variant="secondaryDarkText"
            onClick={() => onSubmit(input)}
          >
            {buttonText}
          </Button>
        </div>
        <div className={cx('lg:hidden gap-y-4', { 'flex flex-col': !collapse }, { hidden: collapse })}>
          <input
            id="name"
            type="text"
            className="h-12 w-full rounded-lg border-2 pl-6 text-sm font-medium text-font outline-none lg:h-14"
            placeholder={placeholder}
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <Button
            icon={<SearchIconSmallBlack />}
            hoverIcon={<SearchIconSmallWhite />}
            className="hover:color-white h-11 px-12 text-base font-medium capitalize shadow-none hover:bg-primary hover:text-white lg:h-14"
            variant="secondaryDarkText"
            onClick={() => onSubmit(input)}
          >
            {buttonText}
          </Button>
        </div>
      </form>
    </div>
  )
}

import { useUIContext } from '@bratislava/common-frontend-ui-context'
import Button from '../Button/Button'
import SearchIcon from '../../../assets/images/search-icon.svg'
import SearchIconSmallBlack from '../../../assets/images/search-icon-small-black.svg'
import SearchIconSmallWhite from '../../../assets/images/search-icon-small-white.svg'
import cx from 'classnames'
import { useState } from 'react'

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
    <div className={cx('flex flex-col w-full', className)}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit?.(input)
        }}
      >
        <div className="text-sm lg:text-md font-medium pb-3">{title}</div>
        <div className={cx('lg:flex', { hidden: !collapse }, { flex: collapse })}>
          <input
            id="name"
            type="text"
            className="h-14 pl-6 w-full outline-none border-2 border-r-0 rounded-l-lg text-base text-font"
            placeholder={placeholder}
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <Button
            icon={<SearchIcon className="scale-75" />}
            hoverIcon={<SearchIcon className="scale-75" />}
            className="h-14 rounded-l-none text-default px-6 shadow-none hover:bg-primary hover:text-white hover:color-white font-medium"
            variant="secondaryDarkText"
            onClick={() => onSubmit(input)}
          >
            {buttonText}
          </Button>
        </div>
        <div className={cx('lg:hidden gap-y-6', { 'flex flex-col': !collapse }, { hidden: collapse })}>
          <input
            id="name"
            type="text"
            className="h-14 pl-6 w-full outline-none border-2 rounded-lg text-sm text-font font-medium"
            placeholder={placeholder}
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <Button
            icon={<SearchIconSmallBlack />}
            hoverIcon={<SearchIconSmallWhite />}
            className="h-12 text-base px-14 shadow-none hover:bg-primary hover:text-white hover:color-white font-medium"
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

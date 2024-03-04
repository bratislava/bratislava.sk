import SearchIcon from '@assets/images/search-icon.svg'
import * as React from 'react'

import Input from '../Input/Input'
import { twMerge } from 'tailwind-merge'

type SearchBarProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  className?: string
  value?: string
  placeholder?: string
}

const SearchBar = ({
  className,
  value,
  placeholder = 'Vyhľadávanie',
  ...etcProps
}: SearchBarProps) => (
  <div className={twMerge('relative w-96', className)}>
    <Input className="w-11/12 text-font" placeholder={placeholder} value={value} {...etcProps} />
    <div className="absolute bottom-4 right-4">
      <SearchIcon />
    </div>
  </div>
)
export default SearchBar

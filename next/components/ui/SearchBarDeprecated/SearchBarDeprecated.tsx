import * as React from 'react'
import { twMerge } from 'tailwind-merge'

import SearchIcon from '@/assets/images/search-icon.svg'
import Input from '@/components/ui/Input/Input'

type SearchBarProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  className?: string
  value?: string
  placeholder?: string
}

const SearchBarDeprecated = ({
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
export default SearchBarDeprecated

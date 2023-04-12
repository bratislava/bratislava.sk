import SearchIcon from '@assets/images/search-icon.svg'
import cx from 'classnames'
import * as React from 'react'

import { Input } from '../Input/Input'

interface IProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  className?: string
  value?: string
  placeholder?: string
}

export const SearchBar = ({
  className,
  value,
  placeholder = 'Vyhľadávanie',
  ...etcProps
}: IProps) => (
  <div className={cx(className, 'relative w-96')}>
    <Input className="w-11/12 text-font" placeholder={placeholder} value={value} {...etcProps} />
    <div className="absolute bottom-4 right-4">
      <SearchIcon />
    </div>
  </div>
)
export default SearchBar

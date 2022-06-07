import * as React from 'react'
import cx from 'classnames'
import { Input } from '../Input/Input'
import { ReactComponent as SearchIcon } from '../../../assets/images/search-icon.svg'

interface IProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  className?: string
  value?: string
  placeholder?: string
}

export const SearchBar = ({ className, value, placeholder = 'Vyhľadávanie', ...etcProps }: IProps) => (
  <div className={cx(className, 'relative w-96')}>
    <Input className="text-font w-11/12" placeholder={placeholder} value={value} {...etcProps} />
    <div className="absolute right-4 bottom-4">
      <SearchIcon />
    </div>
  </div>
)
export default SearchBar

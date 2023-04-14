/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import SearchIcon from '@assets/images/search-icon.svg'
import cx from 'classnames'
import { Dispatch, SetStateAction } from 'react'

import { Button } from '../Button/Button'

export interface BasicSearchProps {
  className?: string
  placeholder?: string
  title?: string
  buttonText?: string
  input: string
  setInput: Dispatch<SetStateAction<string>>
  setSearchQuery: (query: string) => void
}

export const BasicSearch = ({
  className,
  placeholder,
  title,
  buttonText,
  input,
  setInput,
  setSearchQuery,
}: BasicSearchProps) => {
  const handleSearch = () => {
    setSearchQuery(input)
  }

  // TODO fix typing
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className={cx('flex w-full flex-col', className)}>
      <div className="text-h4 scroll-mt-24 pb-3 font-medium lg:scroll-mt-48">{title}</div>
      <div className="flex pb-6">
        <input
          id="name"
          type="text"
          className="text-default h-14 w-full rounded-l-lg border-2 border-r-0 pl-6 text-font outline-none lg:w-[574px]"
          placeholder={placeholder}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button
          icon={<SearchIcon />}
          hoverIcon={<SearchIcon />}
          className="hidden h-14 rounded-l-none px-6 font-medium shadow-none hover:bg-category-600 hover:text-white lg:flex"
          variant="secondary-dark-text"
          onClick={handleSearch}
        >
          {buttonText}
        </Button>
        <Button
          icon={<SearchIcon />}
          hoverIcon={<SearchIcon />}
          className="h-14 rounded-l-none pr-6 font-medium shadow-none hover:bg-category-600 hover:text-white lg:hidden"
          variant="secondary-dark-text"
          onClick={handleSearch}
        />
      </div>
    </div>
  )
}

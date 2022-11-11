/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import cx from 'classnames'
import { Dispatch, SetStateAction } from 'react'

import SearchIcon from '../../../assets/images/search-icon.svg'
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
    <div className={cx('flex flex-col w-full', className)}>
      <div className="text-h4 scroll-mt-24 pb-3 font-medium lg:scroll-mt-48">{title}</div>
      <div className="pb-6 flex">
        <input
          id="name"
          type="text"
          className="text-base h-14 w-full lg:w-[574px] rounded-l-lg border-2 border-r-0 pl-6 text-font outline-none"
          placeholder={placeholder}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button
          icon={<SearchIcon />}
          hoverIcon={<SearchIcon />}
          className="lg:flex h-14 hidden rounded-l-none px-6 shadow-none font-medium hover:bg-primary hover:text-white"
          variant="secondary-dark-text"
          onClick={handleSearch}
        >
          {buttonText}
        </Button>
        <Button
          icon={<SearchIcon />}
          hoverIcon={<SearchIcon />}
          className="lg:hidden h-14 rounded-l-none pr-6 shadow-none font-medium hover:bg-primary hover:text-white"
          variant="secondary-dark-text"
          onClick={handleSearch}
        />
      </div>
    </div>
  )
}

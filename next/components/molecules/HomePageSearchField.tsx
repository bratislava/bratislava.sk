import SearchIcon from '@assets/images/search-icon.svg'
import Button from '@components/forms/simple-components/Button'
import React, {
  DetailedHTMLProps,
  Dispatch,
  InputHTMLAttributes,
  KeyboardEvent,
  SetStateAction,
} from 'react'

type HomePageSearchFieldProps = {
  value: string
  setValue: Dispatch<SetStateAction<string>>
  placeholder?: string
  inputClassName?: string
  onSearchPressed?: () => void
  className?: string
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const HomePageSearchField = ({
  value,
  setValue,
  onSearchPressed = () => {},
  className,
  inputClassName,
  ...rest
}: HomePageSearchFieldProps) => {
  const handleOnKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearchPressed()
    }
    if (event.key === 'ArrowDown') {
      document.querySelector<HTMLAnchorElement>('#homepage-first-search-result')?.focus()
      event.preventDefault()
    }
  }

  return (
    // TODO use BasicSearch instead of duplicating, some functionality needs to be added to BasicSearch
    <div className="flex">
      <input
        id="homepage-search-field"
        type="text"
        className="h-12 w-full rounded-l-lg border-2 border-r-0 px-4 text-font outline-none focus:border-gray-700 lg:h-14"
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleOnKeyDown}
        value={value}
        autoComplete="off"
        {...rest}
      />
      {/* TODO: fix rounded corners even no class is added (discovered on iPhones) */}
      {/* quickfixed with negative left margin on button */}
      <Button
        className="-ml-1 h-12 rounded-l-none pl-4 pr-5 lg:h-14"
        variant="category"
        onPress={onSearchPressed}
      >
        <SearchIcon />
      </Button>
    </div>
  )
}

export default HomePageSearchField

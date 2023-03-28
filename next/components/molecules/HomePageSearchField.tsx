import SearchIcon from '@assets/images/search-icon.svg'
import { Button } from '@bratislava/ui-bratislava'
import React, {
  DetailedHTMLProps,
  Dispatch,
  InputHTMLAttributes,
  MouseEventHandler,
  SetStateAction,
} from 'react'

type HomePageSearchFieldProps = {
  value: string
  setValue: Dispatch<SetStateAction<string>>
  placeholder?: string
  inputClassName?: string
  onSearchPressed?: MouseEventHandler<HTMLButtonElement>
  className?: string
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const HomePageSearchField = ({
  value,
  setValue,
  onSearchPressed,
  className,
  inputClassName,
  ...rest
}: HomePageSearchFieldProps) => {
  return (
    // TODO use BasicSearch instead of duplicating, some functionality needs to be added to BasicSearch
    <div className="flex">
      <input
        id="name"
        type="text"
        className="h-12 w-full rounded-l-lg border-2 border-r-0 px-4 text-font outline-none focus:border-gray-700 lg:h-14"
        onChange={(e) => setValue(e.target.value)}
        value={value}
        autoComplete="off"
        {...rest}
      />
      {/* TODO: fix rounded corners even no class is added (discovered on iPhones) */}
      {/* quickfixed with negative left margin on button */}
      <Button
        className="-ml-1 h-12 rounded-l-none pl-4 pr-5 hover:bg-main-700 lg:h-14"
        variant="primary"
        onClick={onSearchPressed}
      >
        <SearchIcon />
      </Button>
    </div>
  )
}

export default HomePageSearchField

import { useTranslation } from 'next-i18next'
import {
  DetailedHTMLProps,
  Dispatch,
  InputHTMLAttributes,
  KeyboardEvent,
  SetStateAction,
} from 'react'

import SearchIcon from '@/src/assets/images/search-icon.svg'
import Button from '@/src/components/common/Button/Button'

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
  const { t } = useTranslation()

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
        className="h-12 w-full rounded-l-lg border-2 border-r-0 px-4 text-font outline-hidden focus:border-grey-700 lg:h-14"
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleOnKeyDown}
        value={value}
        autoComplete="off"
        aria-label={t('SearchPage.enterKeyword')}
        {...rest}
        data-cy="homepage-search-field"
      />
      {/* TODO: fix rounded corners even no class is added (discovered on iPhones) */}
      {/* quickfixed with negative left margin on button */}
      <Button
        className="-ml-1 h-12 rounded-l-none pr-5 pl-4 lg:h-14"
        variant="solid"
        aria-label={t('SearchBar.search')}
        onPress={onSearchPressed}
        data-cy="homepage-search-button"
      >
        <SearchIcon />
      </Button>
    </div>
  )
}

export default HomePageSearchField

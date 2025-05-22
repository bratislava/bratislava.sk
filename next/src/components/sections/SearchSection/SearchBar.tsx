import { Typography } from '@bratislava/component-library'
import { Dispatch, forwardRef, SetStateAction } from 'react'
import { Input, Label, SearchField } from 'react-aria-components'

import { RemoveIcon, SearchIcon } from '@/src/assets/ui-icons'
import Button from '@/src/components/common/Button/Button'
import Spinner from '@/src/components/common/Spinner/Spinner'
import { useTranslation } from '@/src/utils/useTranslation'

type SearchBarProps = {
  placeholder?: string
  input: string
  setInput: Dispatch<SetStateAction<string>>
  setSearchQuery: Dispatch<SetStateAction<string>>
  isLoading?: boolean
}

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ placeholder, input, setInput, setSearchQuery, isLoading }, forwardedRef) => {
    const { t } = useTranslation()

    const handleSearch = () => {
      setSearchQuery(input)
    }

    return (
      <SearchField
        ref={forwardedRef}
        // TODO PageHeader size dynamically
        // 10rem scroll margin works fine for all screen sizes
        className="flex scroll-mt-40 flex-col gap-y-1"
        aria-label={t('SearchBar.search')}
        defaultValue={placeholder}
        value={input}
        onChange={setInput}
        onSubmit={handleSearch}
      >
        <Label>
          <Typography variant="p-small" className="font-semibold">
            {t('SearchPage.whatAreYouLookingFor')}
          </Typography>
        </Label>
        <div className="relative">
          {/* 3.75rem = 60px, 0.75rem = 12px */}
          <Input
            className="relative w-full rounded-lg border-2 px-15 py-5 pr-23 outline-hidden hover:border-grey-400 focus:border-grey-800 focus-visible:ring-3 focus-visible:ring-offset-2"
            data-cy="search-field"
          />
          <SearchIcon
            aria-hidden
            className="pointer-events-none absolute top-[calc(50%-0.75rem)] left-6"
          />
          {isLoading ? (
            <Spinner size="sm" className="absolute top-[calc(50%-0.75rem)] right-15" />
          ) : null}
          {input ? (
            <Button
              // We don't want responsive sizing, to keep the button well aligned with the input
              size="large"
              icon={<RemoveIcon />}
              variant="icon-wrapped-negative-margin"
              // Keyboard users use Escape to erase the input, they can't focus this button, so empty aria-label is okay
              aria-label=""
              className="absolute top-[calc(50%-0.75rem)] right-6"
            />
          ) : null}
        </div>
      </SearchField>
    )
  },
)

export default SearchBar

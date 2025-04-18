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
          <Typography type="p" fontWeight="semibold">
            {t('SearchPage.whatAreYouLookingFor')}
          </Typography>
        </Label>
        <div className="relative">
          {/* 3.75rem = 60px, 0.75rem = 12px */}
          <Input
            className="relative w-full rounded-lg border-2 px-[3.75rem] py-5 pr-[5.75rem] outline-none hover:border-grey-400 focus:border-grey-800 focus-visible:ring focus-visible:ring-offset-2"
            data-cy="search-field"
          />
          <SearchIcon
            aria-hidden
            className="pointer-events-none absolute left-6 top-[calc(50%_-_0.75rem)]"
          />
          {isLoading ? (
            <Spinner size="sm" className="absolute right-[3.75rem] top-[calc(50%_-_0.75rem)]" />
          ) : null}
          {input ? (
            <Button
              // We don't want responsive sizing, to keep the button well aligned with the input
              size="large"
              icon={<RemoveIcon />}
              variant="icon-wrapped-negative-margin"
              // Keyboard users use Escape to erase the input, they can't focus this button, so empty aria-label is okay
              aria-label=""
              className="absolute right-6 top-[calc(50%_-_0.75rem)]"
            />
          ) : null}
        </div>
      </SearchField>
    )
  },
)

export default SearchBar

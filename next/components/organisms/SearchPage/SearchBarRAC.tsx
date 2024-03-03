import { RemoveIcon, SearchIcon } from '@assets/ui-icons'
import { Typography } from '@bratislava/component-library'
import Button from '@components/forms/simple-components/Button'
import { useTranslations } from 'next-intl'
import { Dispatch, forwardRef, SetStateAction } from 'react'
import { Input, Label, SearchField } from 'react-aria-components'

type SearchBarRACProps = {
  placeholder?: string
  input: string
  setInput: Dispatch<SetStateAction<string>>
  setSearchQuery: Dispatch<SetStateAction<string>>
}

const SearchBarRAC = forwardRef<HTMLInputElement, SearchBarRACProps>(
  ({ placeholder, input, setInput, setSearchQuery }, forwardedRef) => {
    const t = useTranslations()

    const handleSearch = () => {
      setSearchQuery(input)
    }

    return (
      <SearchField
        ref={forwardedRef}
        // TODO PageHeader size dynamically
        // 10rem scroll margin works fine for all screen sizes
        className="flex scroll-mt-[10rem] flex-col gap-y-1"
        aria-label={t('search')}
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
          <Input className="relative w-full rounded-lg border-2 px-[3.75rem] py-5 outline-none hover:border-gray-400 focus:border-gray-800 focus-visible:ring focus-visible:ring-offset-2" />
          <SearchIcon
            aria-hidden
            className="pointer-events-none absolute left-6 top-[calc(50%_-_0.75rem)]"
          />
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

export default SearchBarRAC

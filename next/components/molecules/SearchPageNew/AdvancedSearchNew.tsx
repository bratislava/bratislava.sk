import { CrossInCircleIcon, SearchIcon } from '@assets/ui-icons'
import { Typography } from '@bratislava/component-library'
import Button from '@components/forms/simple-components/Button'
import { useTranslations } from 'next-intl'
import { Dispatch, SetStateAction } from 'react'
import { Input, Label, SearchField } from 'react-aria-components'

type AdvancedSearchProps = {
  placeholder?: string
  input: string
  setInput: Dispatch<SetStateAction<string>>
  setSearchQuery: Dispatch<SetStateAction<string>>
}

const AdvancedSearchNew = ({
  placeholder,
  input,
  setInput,
  setSearchQuery,
}: AdvancedSearchProps) => {
  const t = useTranslations()

  const handleSearch = () => {
    setSearchQuery(input)
  }

  return (
    <SearchField
      className="flex flex-col gap-y-1"
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
        <Input className="relative w-full rounded-lg border-2 px-[60px] py-5" />
        <SearchIcon
          aria-hidden
          className="pointer-events-none absolute left-6 top-[calc(50%_-_12px)]"
        />
        <Button
          icon={<CrossInCircleIcon />}
          variant="icon-wrapped-negative-margin"
          // Keyboard users use Escape to erase the input, they can't focus this button, so empty aria-label is okay
          aria-label=""
          className="absolute right-6 top-[calc(50%_-_12px)]"
        />
      </div>
    </SearchField>
  )
}

export default AdvancedSearchNew

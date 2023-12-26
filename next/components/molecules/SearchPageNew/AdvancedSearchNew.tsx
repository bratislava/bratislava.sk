import { SearchIcon } from '@assets/ui-icons'
import { Typography } from '@bratislava/component-library'
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
        <Input className="relative w-full rounded-lg border-2 py-5 pl-[60px] pr-6" />
        <SearchIcon
          aria-hidden
          className="pointer-events-none absolute left-6 top-[calc(50%_-_12px)]"
        />
      </div>
    </SearchField>
  )
}

export default AdvancedSearchNew

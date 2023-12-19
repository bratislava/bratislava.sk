import cx from 'classnames'
import { useTranslations } from 'next-intl'
import { Dispatch, SetStateAction } from 'react'
import { Input, SearchField, Text } from 'react-aria-components'
import { twMerge } from 'tailwind-merge'

export interface AdvancedSearchProps {
  className?: string
  placeholder?: string
  title?: string
  input: string
  setInput: Dispatch<SetStateAction<string>>
  setSearchQuery: (query: string) => void
}

export interface SearchOptionProps {
  key: number
  value: string
}

// TODO use BasicSearch instead of duplicating
const AdvancedSearchNew = ({
  className,
  placeholder,
  title,
  input,
  setInput,
  setSearchQuery,
}: AdvancedSearchProps) => {
  const t = useTranslations()

  const handleSearch = () => {
    setSearchQuery(input)
  }

  const newSearch = (
    <div className="flex flex-col items-start gap-8 self-stretch">
      <h1 className="text-h1 font-semibold text-gray-800 lg:w-[800px]">{title}</h1>
      <div className="flex w-full flex-col gap-y-2">
        <SearchField
          className="flex w-full flex-col"
          aria-label={t('search')}
          defaultValue={placeholder}
          value={input}
          onChange={setInput}
          onSubmit={handleSearch}
        >
          <Text slot="description" className="mb-1 font-semibold">
            {t('SearchPage.whatAreYouLookingFor')}
          </Text>
          <Input type="search" className="w-full rounded-lg border-2 px-6 py-5 text-gray-700" />
        </SearchField>
      </div>
    </div>
  )

  return <div className={twMerge('flex w-full flex-col', className)}>{newSearch}</div>
}

export default AdvancedSearchNew

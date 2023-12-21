import { Typography } from '@bratislava/component-library'
import Button from '@components/forms/simple-components/Button'
import { useTranslations } from 'next-intl'
import { Dispatch, SetStateAction } from 'react'
import { Input, SearchField, Text } from 'react-aria-components'
import { twMerge } from 'tailwind-merge'

import SearchIcon from '../../../assets/images/search-icon.svg'

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
      <Typography type="h1" className="text-gray-800 lg:w-[800px]">
        {title}
      </Typography>
      <div className="flex w-full flex-col gap-y-2">
        <div className="flex flex-col gap-y-1">
          <Typography type="p" className="font-semibold text-gray-800">
            {t('SearchPage.whatAreYouLookingFor')}
          </Typography>
          <SearchField
            className="flex w-full flex-col [&>*>input>button]:hidden"
            aria-label={t('search')}
            defaultValue={placeholder}
            value={input}
            name="Searchinput"
            onChange={(val) => {
              return setInput(val)
            }}
            onSubmit={handleSearch}
          >
            <div className="relative">
              <Input
                type="search"
                className="w-full rounded-lg border-2 py-5 pl-[60px] pr-6 text-gray-700"
              />
              <Button className="absolute left-6 h-full" isDisabled startIcon={<SearchIcon />} />
            </div>
          </SearchField>
        </div>
      </div>
    </div>
  )

  return <div className={twMerge('flex w-full flex-col', className)}>{newSearch}</div>
}

export default AdvancedSearchNew

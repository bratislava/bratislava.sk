import Checkbox from '@assets/images/checkbox.svg'
import SearchIcon from '@assets/images/search-icon.svg'
import Chip from '@components/forms/simple-components/Chip'
import { Button } from '@components/ui/Button/Button'
import cx from 'classnames'
import { useTranslations } from 'next-intl'
import { Dispatch, KeyboardEventHandler, SetStateAction, useEffect, useState } from 'react'
import {
  Button as ButtonAria,
  FieldError,
  Input,
  Label,
  SearchField,
  SelectContext,
  Selection,
  TagGroup,
  TagList,
  Text,
} from 'react-aria-components'

export interface AdvancedSearchProps {
  className?: string
  placeholder?: string
  title?: string
  options: SearchOptionProps[]
  selectedOption: string
  defaultOption: string
  setselectedOption: (selectedOptions: string) => void
  input: string
  setInput: Dispatch<SetStateAction<string>>
  setSearchQuery: (query: string) => void
}

export interface SearchOptionProps {
  key: string
  value: string
}

// TODO use BasicSearch instead of duplicating
export const AdvancedSearchNew = ({
  className,
  placeholder,
  title,
  options,
  selectedOption,
  defaultOption,
  setselectedOption,
  input,
  setInput,
  setSearchQuery,
}: AdvancedSearchProps) => {
  const t = useTranslations()

  const handleSearch = () => {
    setSearchQuery(input)
  }

  useEffect (()=>{
    if (Array.from(selectedOption).length === 0) {
      setSelectedOption(defaultOption)
    }
  },[selectedOption])

  // FIXME: asi tam ozaj treba dat Selection, lebo to echt nefunguje a state treba nastavovat cez .currentkey

  const handleSelect = (selected) => {
    setselectedOption(selected.currentKey)
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
            Čo hľadáte?
          </Text>
          <Input type="search" className="w-full rounded-lg border-2 px-6 py-5 text-gray-700" />
        </SearchField>
        <TagGroup
          selectionMode="single"
          selectedKey={selectedOption}
          defaultSelectedKeys={defaultOption}
          onSelectionChange={handleSelect}
        >
          <TagList className="lg:justify-left flex flex-wrap gap-2">
            {options.map((option) => {
              return (
                <Chip
                  className="selected:border-gray-700 selected:bg-gray-700 selected:text-gray-0 hover:selected:bg-gray-700"
                  variant="small"
                  key={option.key}
                  id={option.key}
                >
                  {option.value}
                </Chip>
              )
            })}
          </TagList>
        </TagGroup>
      </div>
      {/* DEBUG */}
      {true && (
        <div>
          <p className="ml-[-10px] font-semibold">from AdvancedSearchNew</p>
          <p>selectedOption: {JSON.stringify(selectedOption)}</p>
          <p>defaultOption: {JSON.stringify(defaultOption)}</p>
        </div>
      )}
    </div>
  )

  return <div className={cx('flex w-full flex-col', className)}>{newSearch}</div>
}

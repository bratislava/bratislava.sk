import Checkbox from '@assets/images/checkbox.svg'
import SearchIcon from '@assets/images/search-icon.svg'
import Button from '@components/forms/simple-components/Button'
import cx from 'classnames'
import { useTranslations } from 'next-intl'
import { Dispatch, KeyboardEventHandler, SetStateAction } from 'react'

export type AdvancedSearchProps = {
  className?: string
  placeholder?: string
  title?: string
  buttonText?: string
  checkedOptions: SearchOptionProps[]
  handleSelect: (checkedOptions: SearchOptionProps[]) => void
  input: string
  setInput: Dispatch<SetStateAction<string>>
  setSearchQuery: (query: string) => void
}

export type SearchOptionProps = {
  key: string
  value: string
}

// TODO use BasicSearch instead of duplicating
const AdvancedSearch = ({
  className,
  placeholder,
  title,
  buttonText,
  checkedOptions,
  handleSelect,
  input,
  setInput,
  setSearchQuery,
}: AdvancedSearchProps) => {
  const t = useTranslations()

  const options = [
    { key: 'articles', value: t('articles') },
    { key: 'pages', value: t('pages') },
    { key: 'users', value: t('organisationalStructure') },
  ]

  // TODO simplify
  const handleAction = (option: SearchOptionProps) => {
    if (checkedOptions.some(({ key }) => key === option.key)) {
      const optionsInner = checkedOptions.filter((o) => o.key !== option.key)
      handleSelect(optionsInner)
    } else {
      const optionsInner = [...checkedOptions, option]
      handleSelect(optionsInner)
    }
  }

  const handleSearch = () => {
    setSearchQuery(input)
  }

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className={cx('flex w-full flex-col', className)}>
      {/* FIXME Typography. Convert to use Typography. Issue: Different font weight */}
      <h1 className="text-h3 scroll-mt-24 pb-3 font-medium lg:scroll-mt-48">{title}</h1>
      <div className="hidden pb-6 lg:flex">
        <input
          id="name"
          type="text"
          className="text-default h-14 w-[574px] rounded-l-lg border-2 border-r-0 pl-6 text-font outline-none"
          placeholder={placeholder}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
        <Button
          endIcon={<SearchIcon />}
          className="h-14 rounded-l-none"
          variant="category-solid"
          onPress={handleSearch}
        >
          {buttonText}
        </Button>
      </div>
      <div className="flex pb-6 lg:hidden">
        <input
          id="name"
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          className="text-default h-14 w-full max-w-[574px] rounded-l-lg border-2 border-r-0 pl-6 font-medium text-font outline-none"
          placeholder={t('search')}
          onKeyDown={handleKeyDown}
        />
        <Button
          endIcon={<SearchIcon />}
          className="h-14 rounded-l-none"
          variant="category-solid"
          onPress={handleSearch}
        />
      </div>
      <div className="flex flex-col gap-x-14 gap-y-6 lg:flex-row">
        {options.map((option, index) => (
          <div key={index} className="flex items-center gap-x-4">
            {/* TODO refactor to use label properly and to make it accessible by keyboard */}
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
            <div
              onClick={() => {
                handleAction(option)
              }}
              className="flex gap-4"
            >
              {checkedOptions?.some(({ key }) => key === option.key) ? (
                <Checkbox />
              ) : (
                <div className="mr-px h-6 w-6 rounded border-2 border-solid" />
              )}

              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label>{option.value}</label>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdvancedSearch

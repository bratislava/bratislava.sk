// @ts-strict-ignore
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-shadow */
import { minKeywordLength } from '@utils/constants'
import cx from 'classnames'
import { useTranslation } from 'next-i18next'
import { Dispatch, SetStateAction } from 'react'

import Checkbox from '../../../assets/images/checkbox.svg'
import SearchIcon from '../../../assets/images/search-icon.svg'
import { Button } from '../Button/Button'

export interface AdvancedSearchProps {
  className?: string
  placeholder?: string
  title?: string
  buttonText?: string
  checkedOptions: SearchOptionProps[]
  handleSelect?: (checkedOptions: SearchOptionProps[]) => void
  input?: string
  setInput?: Dispatch<SetStateAction<string>>
  setSearchQuery?: (query: string) => void
}

export interface SearchOptionProps {
  key: string
  value: string
}

// TODO use BasicSearch instead of duplicating
export const AdvancedSearch = ({
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
  const { t } = useTranslation('common')

  const options = [
    { key: 'articles', value: t('articles') },
    { key: 'pages', value: t('pages') },
    { key: 'users', value: t('organisationalStructure') },
  ]

  const handleAction = (option: SearchOptionProps) => {
    if (checkedOptions.some(({ key }) => key === option.key)) {
      const options = checkedOptions.filter((o) => o.key !== option.key)
      handleSelect(options)
    } else {
      const options = [...checkedOptions, option]
      handleSelect(options)
    }
  }

  const handleSearch = () => {
    setSearchQuery(input)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && input.length > minKeywordLength) {
      handleSearch()
    }
  }

  return (
    <div className={cx('flex flex-col w-full', className)}>
      <div className="text-h4 scroll-mt-24 pb-3 font-medium lg:scroll-mt-48">{title}</div>
      <div className="hidden pb-6 lg:flex">
        <input
          id="name"
          type="text"
          className="text-base h-14 w-[576px] rounded-l-lg border-2 border-r-0 pl-6 text-font outline-none"
          placeholder={placeholder}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button
          icon={<SearchIcon />}
          hoverIcon={<SearchIcon />}
          className={cx(
            'h-14 rounded-l-none text-default px-6 shadow-none font-medium hover:bg-primary hover:text-white hover:color-white'
          )}
          variant="secondary-dark-text"
          onClick={handleSearch}
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
          className="max-w-[576px] text-sm h-14 w-full rounded-l-lg border-2 border-r-0 pl-6 font-medium text-font outline-none"
          placeholder={t('search')}
          onKeyDown={handleKeyDown}
        />
        <Button
          icon={<SearchIcon />}
          hoverIcon={<SearchIcon />}
          className="hover:color-white text-default h-14 rounded-l-none pr-6 font-medium shadow-none hover:bg-primary hover:text-white"
          variant="secondary-dark-text"
          onClick={handleSearch}
        />
      </div>
      <div className="flex flex-col gap-x-14 gap-y-6 lg:flex-row">
        {options.map((option, index) => (
          <div key={index} className="flex items-center gap-x-4">
            <div
              onClick={() => {
                handleAction(option)
              }}
              className="flex gap-4"
            >
              {checkedOptions?.some(({ key }) => key === option.key) ? (
                <Checkbox />
              ) : (
                <div className="mr-px h-6 w-6 rounded border-2 border-solid border-slate-300" />
              )}

              <label>{option.value}</label>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

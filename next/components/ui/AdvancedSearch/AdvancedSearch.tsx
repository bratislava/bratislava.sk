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
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import { useDebounce } from 'usehooks-ts'

import Checkbox from '../../../assets/images/checkbox.svg'
import SearchIcon from '../../../assets/images/search-icon.svg'
import { Button } from '../Button/Button'

export interface AdvancedSearchProps {
  className?: string
  placeholder?: string
  title?: string
  buttonText?: string
  handleSelect?: (checkedOptions: SearchOptionProps[]) => void
  keyword?: string
}

export interface SearchOptionProps {
  key: string
  value: string
}

export const AdvancedSearch = ({
  className,
  placeholder,
  title,
  buttonText,
  handleSelect,
  keyword,
}: AdvancedSearchProps) => {
  const { t } = useTranslation('common')
  const router = useRouter()

  const options = [
    { key: 'articles', value: t('articles') },
    { key: 'pages', value: t('pages') },
    { key: 'users', value: t('organisationalStructure') },
  ]
  const [checked, setChecked] = useState(options)

  const handleAction = (option: SearchOptionProps) => {
    if (checked.some(({ key }) => key === option.key)) {
      const options = checked.filter((o) => o.key !== option.key)
      setChecked(options)
      handleSelect(options)
    } else {
      const options = [...checked, option]
      setChecked(options)
      handleSelect(options)
    }
  }

  const [input, setInput] = useState('')
  const debouncedSearchInputValue = useDebounce<string>(input, 300)

  const replaceSearchQuery = async (newKeyword: string) => {
    router.replace(
      {
        pathname: router.pathname,
        query: { ...router.query, keyword: newKeyword },
      },
      undefined,
      { scroll: false }
    )
  }

  useEffect(() => {
    keyword && setInput(keyword)
  }, [keyword])

  const handleChange = (event) => {
    setInput(event.target.value)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && input.length > minKeywordLength) {
      replaceSearchQuery(input)
    }
  }

  const handleClick = () => {
    if (input.length > minKeywordLength) {
      replaceSearchQuery(input)
    }
  }

  useEffect(() => {
    if (debouncedSearchInputValue.length > minKeywordLength) {
      replaceSearchQuery(input)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchInputValue])

  return (
    <div className={cx('flex flex-col w-full', className)}>
      <div className="text-h4 scroll-mt-24 pb-3 font-medium lg:scroll-mt-48">{title}</div>
      <div className="hidden pb-6 lg:flex">
        <input
          id="name"
          type="text"
          className="text-font h-14 w-[574px] rounded-l-lg border-2 border-r-0 pl-6 text-base outline-none"
          placeholder={placeholder}
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <Button
          icon={<SearchIcon />}
          hoverIcon={<SearchIcon />}
          className={cx(
            'h-14 rounded-l-none text-default px-6 shadow-none font-medium',
            {
              'hover:bg-primary hover:text-white hover:color-white': input.length > minKeywordLength,
            },
            { 'cursor-default': input.length <= minKeywordLength }
          )}
          variant="secondary-dark-text"
          onClick={handleClick}
        >
          {buttonText}
        </Button>
      </div>
      <div className="flex pb-6 lg:hidden">
        <input
          id="name"
          type="text"
          value={input}
          onChange={handleChange}
          className="text-font h-14 w-full max-w-[574px] rounded-l-lg border-2 border-r-0 pl-6 text-sm font-medium outline-none"
          placeholder={t('search')}
          onKeyDown={handleKeyDown}
        />
        <Button
          icon={<SearchIcon />}
          hoverIcon={<SearchIcon />}
          className="hover:color-white text-default hover:bg-primary h-14 rounded-l-none pr-6 font-medium shadow-none hover:text-white"
          variant="secondary-dark-text"
          onClick={handleClick}
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
              {checked.some(({ key }) => key === option.key) ? (
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

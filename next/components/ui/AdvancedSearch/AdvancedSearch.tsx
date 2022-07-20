import { minKeywordLength } from '@utils/constants'
import cx from 'classnames'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import Checkbox from '../../../assets/images/checkbox.svg'
import SearchIcon from '../../../assets/images/search-icon.svg'
import Button from '../Button/Button'

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
    {
      key: 'articles',
      value: t('articles'),
    },
    { key: 'pages', value: t('pages') },
  ]
  const [checked, setChecked] = useState(options)

  const handleAction = (option: SearchOptionProps) => {
    if (checked.some(({ key }) => key == option.key)) {
      const options = checked.filter((o) => o.key != option.key)
      setChecked(options)
      handleSelect(options)
    } else {
      const options = [...checked, option]
      setChecked(options)
      handleSelect(options)
    }
  }

  const [input, setInput] = useState('')
  useEffect(() => {
    keyword && setInput(keyword)
  }, [keyword])
  const handleChange = (event) => {
    setInput(event.target.value)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && input.length > minKeywordLength) {
      router.push(`${t('searchLink')}?keyword=${input}`)
    }
  }

  const handleClick = (event) => {
    if (input.length > minKeywordLength) {
      router.push(`${t('searchLink')}?keyword=${input}`)
    }
  }

  return (
    <div className={cx('flex flex-col w-full', className)}>
      <div className="scroll-mt-24 pb-3 text-sm font-medium lg:scroll-mt-48 lg:text-md">{title}</div>
      <div className="hidden pb-6 lg:flex">
        <input
          id="name"
          type="text"
          className="h-14 w-[574px] rounded-l-lg border-2 border-r-0 pl-6 text-base text-font outline-none"
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
          className="h-14 w-full max-w-[574px] rounded-l-lg border-2 border-r-0 pl-6 text-sm font-medium text-font outline-none"
          placeholder={t('search')}
        />
        <Button
          icon={<SearchIcon />}
          hoverIcon={<SearchIcon />}
          className="hover:color-white h-14 rounded-l-none pr-6 text-default font-medium shadow-none hover:bg-primary hover:text-white"
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
            >
              {checked.some(({ key }) => key == option.key) ? (
                <Checkbox />
              ) : (
                <div className="mr-px h-6 w-6 rounded border-2 border-solid border-slate-300" />
              )}
            </div>
            <label>{option.value}</label>
          </div>
        ))}
      </div>
    </div>
  )
}

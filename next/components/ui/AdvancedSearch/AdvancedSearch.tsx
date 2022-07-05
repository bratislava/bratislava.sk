import Button from '../Button/Button'
import SearchIcon from '../../../assets/images/search-icon.svg'
import Checkbox from '../../../assets/images/checkbox.svg'
import { useEffect, useState } from 'react'
import cx from 'classnames'
import { useTranslation } from 'next-i18next'

export interface AdvancedSearchProps {
  className?: string
  placeholder?: string
  title?: string
  buttonText?: string
  handleClick?: (checkedOptions: SearchOptionProps[], keyword: string) => void
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
  handleClick,
  handleSelect,
  keyword,
}: AdvancedSearchProps) => {
  const { t } = useTranslation('common')

  const options = [
    {
      key: 'articles',
      value: t('articles'),
    },
    { key: 'pages', value: t('pages') },
    {
      key: 'documents',
      value: t('documents'),
    },
  ]
  const minKeywordLength = 2
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

  return (
    <div className={cx('flex flex-col w-full', className)}>
      <div className="text-sm lg:text-md font-medium pb-3 scroll-mt-24 lg:scroll-mt-48">{title}</div>
      <div className="hidden lg:flex pb-6">
        <input
          id="name"
          type="text"
          className="h-14 pl-6 w-[574px] outline-none border-2 border-r-0 rounded-l-lg text-base text-font"
          placeholder={placeholder}
          value={input}
          onChange={handleChange}
        />
        <Button
          icon={<SearchIcon />}
          hoverIcon={<SearchIcon />}
          className="h-14 rounded-l-none text-default px-6 shadow-none hover:bg-primary hover:text-white hover:color-white font-medium"
          variant="secondaryDarkText"
          onClick={() => {
            input.length > minKeywordLength && handleClick(checked, input)
          }}
        >
          {buttonText}
        </Button>
      </div>
      <div className="flex lg:hidden pb-6">
        <input
          id="name"
          type="text"
          className="h-14 pl-6 w-full max-w-[574px] outline-none border-2 border-r-0 rounded-l-lg text-sm text-font font-medium"
          placeholder="Zadajte kľúčové slovo"
        />
        <Button
          icon={<SearchIcon />}
          hoverIcon={<SearchIcon />}
          className="h-14 rounded-l-none text-default pr-6 shadow-none hover:bg-primary hover:text-white hover:color-white font-medium"
          variant="secondaryDarkText"
          onClick={() => {
            input.length > minKeywordLength && handleClick(checked, input)
          }}
        />
      </div>
      <div className="flex flex-col lg:flex-row gap-x-14 gap-y-6">
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
                <div className="h-6 w-6 rounded border-2 border-solid border-slate-300 mr-px"></div>
              )}
            </div>
            <label>{option.value}</label>
          </div>
        ))}
      </div>
    </div>
  )
}

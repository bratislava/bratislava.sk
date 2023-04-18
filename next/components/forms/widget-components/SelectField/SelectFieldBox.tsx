import React, { ForwardedRef, forwardRef, ForwardRefRenderFunction } from 'react'

import Tag from '../../simple-components/Tag'
import { SelectOption } from './SelectField'

interface SelectFieldBoxProps {
  value?: SelectOption[]
  multiple?: boolean
  placeholder?: string
  filter: string
  filterRef?: React.RefObject<HTMLInputElement>
  onRemove: (optionId: number) => void
  onRemoveAll: () => void
  onFilterChange: (value: string) => void
  onDeleteLastValue: () => void
}

const SelectFieldBoxComponent: ForwardRefRenderFunction<HTMLDivElement, SelectFieldBoxProps> = (
  props: SelectFieldBoxProps,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  // PROPS
  const {
    value,
    multiple,
    placeholder,
    filter,
    filterRef,
    onRemove,
    onRemoveAll,
    onFilterChange,
    onDeleteLastValue,
  } = props

  // Forms translations
  // const multipleOptionsTagText = value
  //   ? `${value.length} ${t(value.length < 5 ? 'options_few' : 'options_many').toLowerCase()}`
  //   : t('options_zero')
  const multipleOptionsTagText = ''
  // HELPER FUNCTIONS
  const getInputSize = () => {
    return !value || value.length === 0
      ? 13
      : filter.length <= 1
      ? 1
      : filter.length >= 9
      ? 13
      : filter.length
  }

  const getPlaceholder = () => {
    return value && value.length > 0 ? '' : placeholder
  }

  // EVENT HANDLERS
  const handleOnKeyDown = ({ key }: React.KeyboardEvent) => {
    if (['Backspace', 'Delete'].includes(key) && !filter) {
      onDeleteLastValue()
    }
  }

  // RENDER
  return (
    <section
      ref={ref}
      className="flex w-full flex-row flex-wrap items-center gap-2 py-2 pl-3 sm:py-2.5 sm:pl-4"
      data-value={value}
    >
      {
        /* TAGS */
        value && value.length > 0 ? (
          value.length < 3 ? (
            (multiple ? value : value.slice(0, 1)).map((option: SelectOption, key: number) => (
              <Tag
                key={key}
                text={option.title ?? String(option.const)}
                size="small"
                onRemove={() => onRemove(key)}
                removable
                shorthand
              />
            ))
          ) : (
            <Tag text={multipleOptionsTagText} size="small" onRemove={onRemoveAll} removable />
          )
        ) : null
      }
      <input
        ref={filterRef}
        className="text-default max-w-[80px] border-0 outline-none xs:max-w-none"
        type="text"
        size={getInputSize()}
        value={filter}
        placeholder={getPlaceholder()}
        onKeyDown={handleOnKeyDown}
        onChange={(event) => onFilterChange(event.target.value)}
      />
    </section>
  )
}

const SelectFieldBox = forwardRef<HTMLDivElement, SelectFieldBoxProps>(SelectFieldBoxComponent)
export default SelectFieldBox

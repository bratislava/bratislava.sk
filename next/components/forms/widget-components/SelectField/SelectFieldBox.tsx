import { EnumOptionsType } from '@rjsf/utils'
import React, { ForwardedRef, forwardRef, ForwardRefRenderFunction } from 'react'

import Tag from '../../simple-components/Tag'

interface SelectFieldBoxProps {
  value?: EnumOptionsType[]
  multiple?: boolean
  placeholder?: string
  filter: string
  filterRef?: React.RefObject<HTMLInputElement>
  hashCode: string
  onRemove: (optionId: number) => void
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
    hashCode,
    onRemove,
    onFilterChange,
    onDeleteLastValue,
  } = props

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
      className={`${hashCode} flex w-full flex-row flex-wrap gap-2 py-2.5 pl-4`}
      data-value={value}
    >
      {
        /* TAGS */
        value && value.length > 0
          ? (multiple ? value : value.slice(0, 1)).map((option, key) => (
              <Tag
                key={key}
                selectHashCode={hashCode}
                text={option.value}
                size="large"
                onRemove={() => onRemove(key)}
                removable
              />
            ))
          : null
      }
      <input
        ref={filterRef}
        name={hashCode}
        className={`${hashCode} text-20 max-w-[80px] xs:max-w-none border-0 outline-none`}
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

import React, { ForwardedRef, forwardRef, ForwardRefRenderFunction } from 'react'

import Tag from '../Tag'
import SelectOption from './SelectOption'

interface SelectFieldBoxProps {
  value?: SelectOption[]
  multiple?: boolean

  filter: string
  filterRef?: React.RefObject<HTMLInputElement>
  onRemove: (optionId: number) => void
  onFilterChange: (value: string) => void
  onFilterFocusChange: (isFocused: boolean) => void
  onDeleteLastValue: () => void
}

const SelectFieldBoxComponent: ForwardRefRenderFunction<HTMLDivElement, SelectFieldBoxProps>
  = (props: SelectFieldBoxProps, ref:ForwardedRef<HTMLDivElement>) => {
  // PROPS
  const { value, multiple, filter, filterRef, onRemove, onFilterChange, onFilterFocusChange, onDeleteLastValue } = props

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

  // EVENT HANDLERS
  const handleOnInputFocus = (event: React.FormEvent) => {
    if (!(event.target instanceof HTMLParagraphElement || event.target instanceof SVGElement || event.target instanceof HTMLDivElement)) {
      filterRef?.current?.focus()
    }
  }

  const handleOnKeyDown = ({ key }: React.KeyboardEvent) => {
    if (["Backspace", "Delete"].includes(key)) {
      onDeleteLastValue()
    }
  }

  // RENDER
  return (
    <section ref={ref} className="flex w-full flex-row flex-wrap gap-2 py-2.5 pl-4" data-value={value}
         onClick={handleOnInputFocus} onFocus={handleOnInputFocus}>
      { /* TAGS */
        value && value.length > 0
          ? (multiple ? value : value.slice(0,1)).map((option, key) =>
              <Tag key={key} text={option.label} size="large" onRemove={() => onRemove(key)} removable/>
            )
          : null
      }
      <input ref={filterRef} className="border-0 text-p-md outline-none" type="text" size={getInputSize()}
             value={filter} onChange={event => onFilterChange(event.target.value)} onKeyDown={handleOnKeyDown}
             onFocus={() => onFilterFocusChange(true)}/>
    </section>
  )
}

const SelectFieldBox = forwardRef<HTMLDivElement, SelectFieldBoxProps>(SelectFieldBoxComponent)
export default SelectFieldBox

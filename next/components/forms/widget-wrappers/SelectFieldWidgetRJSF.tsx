import { EnumOptionsType, StrictRJSFSchema, WidgetProps } from '@rjsf/utils'
import { WidgetOptions } from 'components/forms/types/WidgetOptions'
import WidgetWrapper from 'components/forms/widget-wrappers/WidgetWrapper'
import { useEffectOnce } from 'usehooks-ts'
import React from 'react'

import SelectField, { SelectOption } from '../widget-components/SelectField/SelectField'

type SelectRJSFOptions = {
  enumOptions?: EnumOptionsType[]
  dropdownDivider?: boolean
  selectAllOption?: boolean
  // selectType?: 'one' | 'multiple' | 'arrow' | 'radio'
} & WidgetOptions

interface SelectFieldWidgetRJSFProps extends WidgetProps {
  label: string
  options: SelectRJSFOptions
  value: any | any[] | null
  required?: boolean
  disabled?: boolean
  placeholder?: string
  schema: StrictRJSFSchema
  onChange: (value?: any | any[]) => void
  rawErrors?: string[]
}

const SelectFieldWidgetRJSF = (props: SelectFieldWidgetRJSFProps) => {
  const { label, options, value, required, disabled, placeholder, schema, onChange, rawErrors } =
    props
  const {
    enumOptions,
    selectAllOption,
    helptext,
    tooltip,
    accordion,
    dropdownDivider,
    className,
    explicitOptional,
    spaceBottom = 'default',
    spaceTop = 'none',
  } = options

  const type = schema.type === 'array' ? 'multiple' : 'one'

  const handleOnChangeMultiple = (newValue?: EnumOptionsType[]) => {
    if (newValue) {
      const optionValues: any[] = newValue.map((option: EnumOptionsType) => option.value)
      onChange(optionValues)
    } else {
      onChange()
    }
  }

  const handleOnChangeOne = (newValue?: EnumOptionsType[]) => {
    if (newValue && newValue[0]) {
      onChange(newValue[0].value)
    } else {
      onChange()
    }
  }

  const handleOnChange = (newValue?: SelectOption[]) => {
    const originalNewValue = enumOptions?.filter(({ schema }: EnumOptionsType) => {
      return newValue?.some((value) => {
        return (
          schema?.title === value.title &&
          schema?.description === value.description &&
          schema?.const === value.const
        )
      })
    })

    if (type === 'multiple') {
      handleOnChangeMultiple(originalNewValue)
    } else {
      handleOnChangeOne(originalNewValue)
    }
  }

  const transformedEnumOptions = enumOptions?.map((option) => option.schema as SelectOption) ?? []

  const handleTransformOne = (): SelectOption[] => {
    const transformedValue: SelectOption[] = []
    if (!enumOptions || !value || Array.isArray(value)) return transformedValue

    const chosenOption = transformedEnumOptions.find((option) => value === option.const)
    return chosenOption ? [chosenOption] : []
  }

  const handleTransformMultiple = (): SelectOption[] => {
    const transformedValue: SelectOption[] = []
    if (!enumOptions || !value || !Array.isArray(value)) return transformedValue

    value.forEach((optionValue) => {
      transformedEnumOptions.forEach((option) => {
        if (option.const === optionValue) {
          transformedValue.push(option)
        }
      })
    })

    return transformedValue
  }

  const transformedValue = type === 'multiple' ? handleTransformMultiple() : handleTransformOne()

  return (
    <WidgetWrapper accordion={accordion} spaceBottom={spaceBottom} spaceTop={spaceTop}>
      <SelectField
        type={type}
        label={label}
        enumOptions={transformedEnumOptions}
        value={transformedValue}
        selectAllOption={selectAllOption}
        placeholder={placeholder}
        helptext={helptext}
        tooltip={tooltip}
        dropdownDivider={dropdownDivider}
        errorMessage={rawErrors}
        required={required}
        disabled={disabled}
        className={className}
        onChange={handleOnChange}
        explicitOptional={explicitOptional}
      />
    </WidgetWrapper>
  )
}

export default SelectFieldWidgetRJSF

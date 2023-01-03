import { EnumOptionsType, StrictRJSFSchema, WidgetProps } from '@rjsf/utils'
import { WidgetOptions } from 'components/forms/types/WidgetOptions'
import WidgetWrapper from 'components/forms/widget-wrappers/WidgetWrapper'
import { useEffectOnce } from 'usehooks-ts'

import SelectField from '../widget-components/SelectField/SelectField'

type SelectRJSFOptions = {
  enumOptions?: EnumOptionsType[]
  dropdownDivider?: boolean
  selectAllOption?: boolean
  // selectType?: 'one' | 'multiple' | 'arrow' | 'radio'
} & WidgetOptions

interface SelectFieldWidgetRJSFProps extends WidgetProps {
  label: string
  options: SelectRJSFOptions
  value: any | any[]
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
    description,
    tooltip,
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

  const handleOnChange = (newValue?: EnumOptionsType[]) => {
    if (type === 'multiple') {
      handleOnChangeMultiple(newValue)
    } else {
      handleOnChangeOne(newValue)
    }
  }

  const handleTransformOne = (): EnumOptionsType[] => {
    const transformedValue: EnumOptionsType[] = []
    if (!enumOptions || Array.isArray(value)) return transformedValue

    for (const option of enumOptions) {
      if (option.value === value) {
        transformedValue.push(option)
        break
      }
    }
    return transformedValue
  }

  const handleTransformMultiple = (): EnumOptionsType[] => {
    const transformedValue: EnumOptionsType[] = []
    if (!enumOptions || !Array.isArray(value)) return transformedValue

    value.forEach((optionValue) => {
      enumOptions.forEach((option) => {
        if (option.value === optionValue) {
          transformedValue.push(option)
        }
      })
    })

    return transformedValue
  }

  const transformValue = (): EnumOptionsType[] => {
    return type === 'multiple' ? handleTransformMultiple() : handleTransformOne()
  }

  // useEffectOnce(() => {
  //   setTimeout(() => handleOnChange(value), Math.floor(Math.random() * 300))
  // })

  return (
    <WidgetWrapper spaceBottom={spaceBottom} spaceTop={spaceTop}>
      <SelectField
        type={type}
        label={label}
        enumOptions={enumOptions}
        value={transformValue()}
        selectAllOption={selectAllOption}
        placeholder={placeholder}
        description={description}
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

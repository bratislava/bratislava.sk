import SelectField from './SelectField'
import SelectRJSFOptions from './SelectRJSFOptions'
import { EnumOptionsType } from '@rjsf/utils'

interface SelectFieldRJSFProps {
  label: string
  options: SelectRJSFOptions
  value: SelectRJSFOptions
  errorMessage?: string
  required?: boolean
  disabled?: boolean
  placeholder?: string
  onChange: (values: SelectRJSFOptions) => void;
}

const SelectFieldRJSF = (props: SelectFieldRJSFProps) => {
  const {
    label,
    options,
    value,
    errorMessage,
    required,
    disabled,
    placeholder,
    onChange
  } = props
  const {
    enumOptions,
    type = 'one',
    selectAllOption,
    description,
    tooltip,
    dropdownDivider
  } = options

  const handleOnChange = (valueEnumOptions: EnumOptionsType[]) => {
    const newValue: SelectRJSFOptions = {
      ...options,
      enumOptions: valueEnumOptions
    }
    onChange(newValue)
  }

  return <SelectField type={type} label={label} enumOptions={enumOptions} value={value?.enumOptions}
                      selectAllOption={selectAllOption} placeholder={placeholder} description={description}
                      tooltip={tooltip} dropdownDivider={dropdownDivider} errorMessage={errorMessage}
                      required={required} disabled={disabled} onChange={handleOnChange} />
}

export default SelectFieldRJSF

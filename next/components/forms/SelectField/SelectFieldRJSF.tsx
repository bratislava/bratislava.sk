import SelectField from './SelectField'
import SelectRJSFOptions from './SelectRJSFOptions'
import { EnumOptionsType } from '@rjsf/utils'

interface SelectFieldRJSFProps {
  label: string
  options: SelectRJSFOptions
  value: EnumOptionsType[]
  errorMessage?: string
  required?: boolean
  disabled?: boolean
  placeholder?: string
  onChange: (values: EnumOptionsType[]) => void;
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
    dropdownDivider,
    className
  } = options

  return <SelectField type={type} label={label} enumOptions={enumOptions} value={value}
                      selectAllOption={selectAllOption} placeholder={placeholder} description={description}
                      tooltip={tooltip} dropdownDivider={dropdownDivider} errorMessage={errorMessage}
                      required={required} disabled={disabled} className={className} onChange={onChange} />
}

export default SelectFieldRJSF

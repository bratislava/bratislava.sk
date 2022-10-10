import cx from 'classnames'
import React, { FC } from 'react'
import Select, {
  ControlProps,
  CSSObjectWithLabel, DropdownIndicatorProps, MultiValue,
  OptionProps,
  StylesConfig,
  components, MultiValueRemoveProps,
} from 'react-select'
import CloseIcon from '@assets/images/close.svg'
import FieldErrorMessage from './FieldErrorMessage'
import FieldHeader from './FieldHeader'

interface SelectFieldProps {
  label: string
  name: string
  options: MultiValue<unknown>
  value?: MultiValue<unknown>
  placeholder?: string
  errorMessage?: string
  description?: string
  required?: boolean
  disabled?: boolean
  tooltip?: string
  onChange?: (values: MultiValue<unknown>) => void;
}

const SelectField: FC<SelectFieldProps> = (
  {
    label,
    name,
    options,
    value,
    placeholder,
    errorMessage,
    description,
    required,
    disabled,
    tooltip,
    onChange
  }
) => {
  // EVENT HANDLERS
  const handleOnChangeSelect = (selectedOptions: unknown) => {
    if (onChange) {
      onChange(selectedOptions as MultiValue<unknown>)
    }
  }

  // STYLES
  const tailwindSelectStyle = cx(
    'w-full text-default rounded-lg focus:outline-none bg-white border-2 ',
    {
      // disabled
      'opacity-50': disabled,
    }
  )

  const selectStyle: StylesConfig = {
    control: (provided: CSSObjectWithLabel, state: ControlProps) => ({
      ...provided,
      borderRadius: 6,
      boxShadow: 'none',
      borderWidth: '2px',
      borderColor: errorMessage ? 'red' : state.isFocused ? 'black' : 'lightgray',
      '&:hover': {
        borderColor: errorMessage ? 'red' : 'black',
      },
      padding: '5px 0',
      fontSize: '20px',
      lineHeight: '32px'
    }),
    option: (provided: CSSObjectWithLabel, state: OptionProps) => ({
      ...provided,
      backgroundColor: state.isFocused ? 'lightgray' : undefined,
      cursor: 'pointer',
      fontSize: '20px',
      lineHeight: '32px'
    }),
    multiValue: (provided: CSSObjectWithLabel) => ({
      ...provided,
      borderRadius: 8,
      fontSize: '20px',
      lineHeight: '32px'
    }),
    placeholder: (provided: CSSObjectWithLabel) => ({
      ...provided,
      color: placeholder ? provided.color : "transparent",
      fontSize: '20px',
      lineHeight: '32px'
    }),
    dropdownIndicator: (provided: CSSObjectWithLabel, state:DropdownIndicatorProps) => ({
      ...provided,
      transition: 'all .2s linear',
      transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : undefined,
      cursor: 'pointer',
      color: '#333333'
    }),
    multiValueRemove: (provided: CSSObjectWithLabel) => ({
      ...provided,
      '&:hover': {
        backgroundColor: 'inherit',
        color: '#333333'
      },
    }),
    clearIndicator: (provided: CSSObjectWithLabel) => ({
      ...provided,
      display: 'none'
    }),
    indicatorSeparator: () => ({
      display: 'none'
    })
  }

  const customMultiValueRemove = (props: MultiValueRemoveProps) => {
    return (
      <components.MultiValueRemove {...props}>
        <CloseIcon/>
      </components.MultiValueRemove>
    )
  }

  // RENDER
  return (
    <section className="flex w-max flex-col">
      {/* FIELD HEADER WITH DESCRIPTION AND LABEL */}
      <FieldHeader label={label} htmlFor={name}
                   description={description} tooltip={tooltip}
                   required={required}  />

      {/* SELECT PART */}
      <div className="w-80">
        <Select className={tailwindSelectStyle} styles={selectStyle}
                options={options} noOptionsMessage={() => "No Options"}
                placeholder={placeholder} value={value}
                isDisabled={disabled} isMulti
                onChange={handleOnChangeSelect}
                components={{MultiValueRemove: customMultiValueRemove}}/>
      </div>
      {/* ERROR MESSAGE */ }
      <FieldErrorMessage errorMessage={errorMessage}/>
    </section>
  )
}



export default SelectField;

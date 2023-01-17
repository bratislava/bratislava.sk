import { StrictRJSFSchema, WidgetProps } from '@rjsf/utils'
import { WidgetOptions } from 'components/forms/types/WidgetOptions'
import InputField from 'components/forms/widget-components/InputField/InputField'
import WidgetWrapper from 'components/forms/widget-wrappers/WidgetWrapper'
import React from 'react'

import Accordion, { AccordionSizeType } from '../simple-components/Accordion'

type InputFieldRJSFOptions = {
  type?: 'text' | 'password'
  resetIcon?: boolean
  leftIcon?: 'person' | 'mail' | 'call' | 'lock'
  size?: 'large' | 'default' | 'small'
} & WidgetOptions

interface InputFieldWidgetRJSFProps extends WidgetProps {
  label: string
  options: InputFieldRJSFOptions
  value: string
  required?: boolean
  disabled?: boolean
  placeholder?: string
  schema: StrictRJSFSchema
  onChange: (value?: string) => void
  rawErrors?: string[]
}

const InputFieldWidgetRJSF = ({
  label,
  options,
  placeholder = '',
  required,
  value,
  disabled,
  onChange,
  rawErrors,
}: InputFieldWidgetRJSFProps) => {
  const {
    description,
    tooltip,
    className,
    resetIcon,
    leftIcon,
    markdown,
    explicitOptional,
    type,
    size = 'default',
    spaceBottom = 'default',
    spaceTop = 'none',
  } = options

  const handleOnChange = (newValue?: string) => (newValue ? onChange(newValue) : onChange())

  return (
    <WidgetWrapper className="gap-4 flex flex-col" spaceBottom={spaceBottom} spaceTop={spaceTop}>
      <InputField
        label={label}
        type={type}
        placeholder={placeholder}
        value={value}
        errorMessage={rawErrors}
        required={required}
        disabled={disabled}
        description={description}
        tooltip={tooltip}
        className={className}
        resetIcon={resetIcon}
        leftIcon={leftIcon}
        onChange={handleOnChange}
        explicitOptional={explicitOptional}
        size={size}
      />
      {markdown && markdown.title && markdown.content && (
        <Accordion
          size={markdown.size as AccordionSizeType}
          title={markdown.title}
          shadow
          markdownContent={markdown.content}
        />
      )}
    </WidgetWrapper>
  )
}
export default InputFieldWidgetRJSF

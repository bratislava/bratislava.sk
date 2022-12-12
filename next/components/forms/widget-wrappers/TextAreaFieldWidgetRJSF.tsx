import { WidgetProps } from '@rjsf/utils'
import cx from 'classnames'

import TextAreaField from '../widget-components/TextAreaField/TextAreaField'

type TextAreaRJSFOptions = {
  description?: string
  className?: string
  tooltip?: string
  explicitOptional?: boolean
}

interface TextAreaFieldWidgetRJSFProps extends WidgetProps {
  value: string
  label: string
  placeholder?: string
  rawErrors?: string[]
  required?: boolean
  disabled?: boolean
  options: TextAreaRJSFOptions
  onChange: (value?: string) => void
}

const TextAreaFieldWidgetRJSF = (props: TextAreaFieldWidgetRJSFProps) => {
  const {
    value,
    label,
    placeholder,
    rawErrors,
    required,
    disabled,
    options,
    onChange,
  }: TextAreaFieldWidgetRJSFProps = props

  const { description, tooltip, explicitOptional, className }: TextAreaRJSFOptions = options

  const handleOnChange = (newValue?: string) => {
    if (!newValue || newValue === '') {
      onChange()
    } else {
      onChange(newValue)
    }
  }

  return (
    <div className="my-2 max-w-[320px]">
      <TextAreaField
        value={value}
        label={label}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        description={description}
        tooltip={tooltip}
        className={cx('h-[196px]', className)}
        explicitOptional={explicitOptional}
        onChange={handleOnChange}
        errorMessage={rawErrors}
      />
    </div>
  )
}

export default TextAreaFieldWidgetRJSF

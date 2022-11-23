import TextAreaField from '../TextAreaField'
import { WidgetProps } from '@rjsf/utils'

type TextAreaRJSFOptions = {
  description?: string
  className?: string
  tooltip?: string
}

interface TextAreaFieldWidgetRJSFProps extends WidgetProps{
  value: string
  label: string
  placeholder?: string
  errorMessage?: string
  required?: boolean
  disabled?: boolean
  options: TextAreaRJSFOptions
  onChange: (value: string) => void
}

const TextAreaFieldWidgetRJSF = (props: TextAreaFieldWidgetRJSFProps) => {
  const {
    value,
    label,
    placeholder,
    required,
    disabled,
    options,
    onChange
  } = props

  const {
    description,
    tooltip,
    className
  } = options

  return <TextAreaField value={value} label={label} placeholder={placeholder} required={required} disabled={disabled}
                        description={description} tooltip={tooltip} className={className} onChange={onChange}/>
}

export default TextAreaFieldWidgetRJSF

import { WidgetProps } from '@rjsf/utils'
import cx from 'classnames'
import { WidgetOptions } from 'components/forms/types/WidgetOptions'
import WidgetWrapper from 'components/forms/widget-wrappers/WidgetWrapper'
import React from 'react'

import Accordion, { AccordionSizeType } from '../simple-components/Accordion'
import TextAreaField from '../widget-components/TextAreaField/TextAreaField'

type TextAreaRJSFOptions = WidgetOptions

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

  const {
    description,
    tooltip,
    markdown,
    explicitOptional,
    className,
    spaceBottom = 'default',
    spaceTop = 'none',
  }: TextAreaRJSFOptions = options

  const handleOnChange = (newValue?: string) => {
    if (!newValue || newValue === '') {
      onChange()
    } else {
      onChange(newValue)
    }
  }

  return (
    <WidgetWrapper className="max-w-[320px]" spaceBottom={spaceBottom} spaceTop={spaceTop}>
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

export default TextAreaFieldWidgetRJSF

import { createCalendar } from '@internationalized/date'
import cx from 'classnames'
import React, { ReactNode } from 'react'
import { useDateField, useDateSegment, useLocale } from 'react-aria'
import { DateFieldState, DateSegment, useDateFieldState } from 'react-stately'

import FieldErrorMessage from '../FieldErrorMessage'
import FieldHeader from '../FieldHeader'

type DateSegmentBase = {
  segment: DateSegment
  state: DateFieldState
}

const DateSegmentComponent = ({ segment, state }: DateSegmentBase) => {
  const ref = React.useRef<HTMLDivElement>(null)
  const { segmentProps } = useDateSegment(segment, state, ref)
  return (
    <div
      {...segmentProps}
      ref={ref}
      className="text-20 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
    >
      <span
        className={cx('w-full text-center uppercase group-focus:text-white', {
          'text-gray-500': segment?.isPlaceholder,
        })}
        style={{
          opacity: segment?.isPlaceholder ? '1' : '0',
        }}
      >
        {segment?.isPlaceholder ? segment?.placeholder : ''}
      </span>
      {segment?.isPlaceholder ? '' : segment?.text}
    </div>
  )
}
type DateFieldBase = {
  label?: string
  description?: string
  tooltip?: string
  required?: boolean
  explicitOptional?: boolean
  children?: ReactNode
  disabled?: boolean
  errorMessage?: string
}

const DateField = ({
  errorMessage,
  disabled,
  children,
  label,
  tooltip,
  description,
  required,
  explicitOptional,
  ...rest
}: DateFieldBase) => {
  const ref = React.useRef<HTMLDivElement>(null)
  const { locale } = useLocale()
  const state = useDateFieldState({
    label,
    description,
    errorMessage,
    isDisabled: disabled,
    isRequired: required,
    locale,
    createCalendar,
    ...rest,
  })

  const { fieldProps, labelProps, errorMessageProps, descriptionProps } = useDateField(
    { errorMessage, isDisabled: disabled, label, ...rest },
    state,
    ref,
  )
  const dateFieldStyle = cx(
    'w-80 mt-1 flex rounded-lg bg-white px-4 py-3 border-2 border-gray-200 focus:border-gray-700',
    {
      'hover:border-gray-400': !disabled,
      'border-error focus:border-error focus-visible:outline-none hover:border-error': errorMessage,
      'pointer-events-none border-gray-300 bg-gray-100 text-gray-500': disabled,
    },
  )
  return (
    <>
      <FieldHeader
        label={label || ''}
        htmlFor={fieldProps?.id || ''}
        labelProps={labelProps}
        tooltip={tooltip}
        description={description}
        descriptionProps={descriptionProps}
        required={required}
        explicitOptional={explicitOptional}
      />
      <div {...fieldProps} ref={ref} className={dateFieldStyle}>
        {state?.segments?.map((segment, i) => (
          <DateSegmentComponent key={i} segment={segment} state={state} />
        ))}
        <div className="ml-auto flex items-center">{children}</div>
      </div>
      {!disabled && (
        <FieldErrorMessage errorMessage={errorMessage} errorMessageProps={errorMessageProps} />
      )}
    </>
  )
}

export default DateField

import { createCalendar } from '@internationalized/date'
import cx from 'classnames'
import React, { ReactNode, RefObject } from 'react'
import { useDateField, useDateSegment, useLocale } from 'react-aria'
import { DateFieldState, DateSegment, useDateFieldState } from 'react-stately'

import FieldErrorMessage from '../FieldErrorMessage'
import FieldHeader from '../FieldHeader'

type DateSegmentBase = {
  segment?: DateSegment
  state?: DateFieldState
}

const DateSegmentComponent = ({ segment, state }: DateSegmentBase) => {
  const ref = React.useRef()
  const { segmentProps } = useDateSegment(segment, state, ref as RefObject<HTMLDivElement>)
  return (
    <div {...segmentProps} ref={ref} className="text-default hover:bg-[#f1f1f1] focus:bg-[#f1f1f1] focus:outline-none">
      <span
        className={cx('w-full text-center uppercase group-focus:text-white', {
          'text-[#858585]': segment?.isPlaceholder,
        })}
        style={{
          opacity: segment.isPlaceholder ? '1' : '0',
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
  ...rest
}: DateFieldBase) => {
  const ref = React.useRef()
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
    ref as RefObject<HTMLDivElement>
  )
  const dateFieldStyle = cx(
    'w-80 mt-1 flex rounded-lg bg-white px-4 py-3 border-2 border-[#D6D6D6] focus:border-[#333]',
    {
      'hover:border-[#ADADAD]': !disabled,
      'border-error focus:border-error hover:border-error': errorMessage,
      'opacity-50 pointer-events-none border-[#ADADAD]': disabled,
    }
  )
  return (
    <>
      <FieldHeader
        label={label}
        htmlFor={fieldProps.id}
        labelProps={labelProps}
        tooltip={tooltip}
        description={description}
        descriptionProps={descriptionProps}
        required={required}
      />
      <div {...fieldProps} ref={ref} className={dateFieldStyle}>
        {state.segments.map((segment, i) => (
          <DateSegmentComponent key={i} segment={segment} state={state} />
        ))}
        <div className="ml-auto flex items-center">{children}</div>
      </div>
      <FieldErrorMessage errorMessage={errorMessage} errorMessageProps={errorMessageProps} />
    </>
  )
}

export default DateField

import cx from 'classnames'
import React from 'react'
import { useRadioGroup } from 'react-aria'
import { RadioGroupState, useRadioGroupState } from 'react-stately'

import FieldErrorMessage from '../../info-components/FieldErrorMessage'

const radioGroupState = {}
export const RadioContext = React.createContext(radioGroupState as RadioGroupState)

type RadioGroupBase = {
  children: React.ReactNode
  value?: string
  label: string
  defaultValue?: string
  isDisabled?: boolean
  isReadOnly?: boolean
  onChange: (value: string) => void
  className?: string
  errorMessage?: string[]
  orientations?: 'column' | 'row'
}

const RadioGroup = (props: RadioGroupBase) => {
  const { children, className, orientations = 'column' } = props
  const state = useRadioGroupState(props)
  const { radioGroupProps, labelProps, errorMessageProps } = useRadioGroup(props, state)

  return (
    <div {...radioGroupProps}>
      <span {...labelProps} className="text-20-semibold leading-7 flex items-center mb-4">
        {props.label}
      </span>
      <RadioContext.Provider value={state}>
        <div
          className={cx(className, {
            'flex flex-col gap-3': orientations === 'column',
            'flex flex-row gap-6': orientations === 'row',
          })}
        >
          {children}
        </div>
      </RadioContext.Provider>
      {!props.isDisabled && (
        <FieldErrorMessage
          errorMessage={props.errorMessage}
          errorMessageProps={errorMessageProps}
        />
      )}
    </div>
  )
}

export default RadioGroup

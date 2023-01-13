import * as React from 'react'
import { useCheckboxGroup } from 'react-aria'
import { CheckboxGroupState, useCheckboxGroupState } from 'react-stately'

import FieldErrorMessage from '../../info-components/FieldErrorMessage'

export const CheckboxGroupContext = React.createContext({} as CheckboxGroupState)

type CheckBoxGroupBase = {
  children: React.ReactNode
  value?: string[]
  label: string
  className?: string
  onChange: (value: any[]) => void
  rawErrors?: string[]
  disabled?: boolean
}

const CheckboxGroup = (props: CheckBoxGroupBase) => {
  const { children, className, rawErrors, disabled, label } = props
  const state: CheckboxGroupState = useCheckboxGroupState(props)
  const { groupProps, labelProps, errorMessageProps } = useCheckboxGroup(props, state)
  return (
    <>
      <div {...groupProps} className={className}>
        <span {...labelProps} className="text-20-semibold">
          {label}
        </span>
        <CheckboxGroupContext.Provider value={state}>{children}</CheckboxGroupContext.Provider>
      </div>
      {!disabled && (
        <FieldErrorMessage errorMessage={rawErrors} errorMessageProps={errorMessageProps} />
      )}
    </>
  )
}

export default CheckboxGroup

import FieldHeader from 'components/forms/info-components/FieldHeader'
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
  required?: boolean
}

const CheckboxGroup = (props: CheckBoxGroupBase) => {
  const { children, className, rawErrors, disabled, label, required } = props
  const state: CheckboxGroupState = useCheckboxGroupState(props)
  const { groupProps, labelProps, errorMessageProps } = useCheckboxGroup(props, state)
  return (
    <>
      <div {...groupProps}>
        <FieldHeader
          label={label}
          labelProps={labelProps}
          htmlFor={groupProps.id}
          required={required}
        />
        {/* <span {...labelProps} className="text-20-semibold flex items-center mb-4">
          {label}
        </span> */}
        <div className={className}>
          <CheckboxGroupContext.Provider value={state}>{children}</CheckboxGroupContext.Provider>
        </div>
      </div>
      {!disabled && (
        <FieldErrorMessage errorMessage={rawErrors} errorMessageProps={errorMessageProps} />
      )}
    </>
  )
}

export default CheckboxGroup

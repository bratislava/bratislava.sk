import * as React from 'react'
import { useCheckboxGroup } from 'react-aria'
import { CheckboxGroupState, useCheckboxGroupState } from 'react-stately'

export const CheckboxGroupContext = React.createContext({} as CheckboxGroupState)

type CheckBoxGroupBase = {
  children: React.ReactNode
  label?: string
}

const CheckboxGroup = (props: CheckBoxGroupBase) => {
  const { children, label } = props
  const state: CheckboxGroupState = useCheckboxGroupState(props)
  const { groupProps, labelProps } = useCheckboxGroup(props, state)

  return (
    <div {...groupProps} className="">
      <span {...labelProps}>{label}</span>
      <CheckboxGroupContext.Provider value={state}>{children}</CheckboxGroupContext.Provider>
    </div>
  )
}

export default CheckboxGroup

import React from 'react'
import { useRadioGroup } from 'react-aria'
import { RadioGroupState, useRadioGroupState } from 'react-stately'

const radioGroupState = {}
export const RadioContext = React.createContext(radioGroupState as RadioGroupState)

type RadioGroupBase = {
  children: React.ReactNode
  value?: string
  label: string
  defaultValue?: string
  isDisabled?: boolean
  isReadOnly?: boolean
}

const RadioGroup = (props: RadioGroupBase) => {
  const { children, label } = props
  const state = useRadioGroupState(props)
  const { radioGroupProps, labelProps } = useRadioGroup(props, state)

  return (
    <div {...radioGroupProps}>
      {/* <span {...labelProps}>{label}</span> */}
      <RadioContext.Provider value={state}>{children}</RadioContext.Provider>
    </div>
  )
}

export default RadioGroup

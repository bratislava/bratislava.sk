import React from 'react'
import { useRadioGroup } from 'react-aria'
import { RadioGroupState, useRadioGroupState } from 'react-stately'
import { v4 as uuidv4 } from 'uuid'

const radioGroupState = {}
export const RadioContext = React.createContext(radioGroupState as RadioGroupState)

type RadioGroupBase = {
  children: React.ReactNode
  value?: string
  defaultValue?: string
  isDisabled?: boolean
  isReadOnly?: boolean
  onChange: (value: string) => void
  className?: string
}

const RadioGroup = (props: RadioGroupBase) => {
  const { children, className } = props
  const state = useRadioGroupState(props)
  const { radioGroupProps } = useRadioGroup({ ...props, label: uuidv4() }, state)

  return (
    <div {...radioGroupProps} className={className}>
      <RadioContext.Provider value={state}>{children}</RadioContext.Provider>
    </div>
  )
}

export default RadioGroup

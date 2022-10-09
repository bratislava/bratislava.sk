import React from 'react'
import { useRadioGroup } from 'react-aria'
import { useRadioGroupState } from '@react-stately/radio'

export let RadioContext = React.createContext(null)

type RadioGroupBase = {
  children: React.ReactNode
  value?: string
  label: string
  defaultValue?: string
  isDisabled?: boolean
  isReadOnly?: boolean
}

const RadioGroup = (props: RadioGroupBase) => {
  let { children, label } = props
  let state = useRadioGroupState(props)
  let { radioGroupProps, labelProps } = useRadioGroup(props, state)

  return (
    <div {...radioGroupProps}>
      <span {...labelProps}>{label}</span>
      <RadioContext.Provider value={state}>{children}</RadioContext.Provider>
    </div>
  )
}

export default RadioGroup
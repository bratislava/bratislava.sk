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
  onChange: (value: string) => void
  className?: string
}

const RadioGroup = (props: RadioGroupBase) => {
  const { children, className } = props
  const state = useRadioGroupState(props)
  const { radioGroupProps, labelProps } = useRadioGroup(props, state)

  return (
    <div {...radioGroupProps}>
      <span {...labelProps} className="text-20-semibold">
        {props.label}
      </span>
      <RadioContext.Provider value={state}>
        <div className={className}>{children}</div>
      </RadioContext.Provider>
    </div>
  )
}

export default RadioGroup

import * as React from 'react'
import { useCheckboxGroupState } from '@react-stately/checkbox'
import { useCheckboxGroup } from 'react-aria'

export let CheckboxGroupContext = React.createContext(null)

const CheckboxGroup = (props: any) => {
  let { children, label } = props
  let state = useCheckboxGroupState(props)
  let { groupProps, labelProps } = useCheckboxGroup(props, state)

  return (
    <div {...groupProps} style={{ display: 'inline-block' }}>
      <span {...labelProps}>{label}</span>
      <CheckboxGroupContext.Provider value={state}>{children}</CheckboxGroupContext.Provider>
    </div>
  )
}

export default CheckboxGroup
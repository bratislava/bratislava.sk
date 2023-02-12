import type { AriaMenuProps } from '@react-types/menu'
import MenuItem from 'components/forms/widget-components/Menu/MenuItem'
import React from 'react'
import { useMenu } from 'react-aria'
import { useTreeState } from 'react-stately'

interface MenuContainerProps<T extends object> extends AriaMenuProps<T> {
  onClose: () => void
  className?: string
  containerHeaderEl?: React.ReactNode
}

const MenuContainer = <T extends object>(props: MenuContainerProps<T>) => {
  // Create menu state based on the incoming props
  const state = useTreeState(props)

  // Get props for the menu element
  const ref = React.useRef(null)
  const { menuProps } = useMenu(props, state, ref)

  return (
    <ul {...menuProps} ref={ref} className="focus:outline-none">
      {props.containerHeaderEl}
      <div className={`py-2 ${props.className}`}>
        {[...state.collection].map((item) => (
          <MenuItem
            key={item.key}
            item={item}
            state={state}
            onAction={props.onAction}
            onClose={props.onClose}
          />
        ))}
      </div>
    </ul>
  )
}

export default MenuContainer

import ChevronDownSmall from '@assets/images/chevron-down-small.svg'
import type { AriaMenuProps, MenuTriggerProps } from '@react-types/menu'
import Button from 'components/forms/widget-components/Menu/Button'
import Menu from 'components/forms/widget-components/Menu/Menu'
import Popover from 'components/forms/widget-components/Menu/Popover'
import React from 'react'
import { useMenuTrigger } from 'react-aria'
import { useMenuTriggerState } from 'react-stately'

interface MenuButtonProps<T extends object> extends AriaMenuProps<T>, MenuTriggerProps {
  label: string
  el?: React.ReactNode
}

const MenuButton = <T extends object>(props: MenuButtonProps<T>) => {
  // Create state based on the incoming props
  const state = useMenuTriggerState(props)

  // Get props for the menu trigger and menu elements
  const ref = React.useRef()
  const { menuTriggerProps, menuProps } = useMenuTrigger<T>({}, state, ref)

  return (
    <div style={{ position: 'relative', display: 'inline-block' }} className="focus:outline-none">
      <Button {...menuTriggerProps} isPressed={state.isOpen} ref={ref}>
        {props.el}
        <div className="ml-3 font-light lg:font-semibold">{props.label}</div>
        <ChevronDownSmall
          className={`ml-3 hidden mix-blend-normal lg:flex ${state.isOpen && 'mb-1 -rotate-180'}`}
        />
      </Button>
      {state.isOpen && (
        <Popover state={state} triggerRef={ref} placement="bottom start">
          <Menu
            {...menuProps}
            {...props}
            autoFocus={state.focusStrategy || true}
            onClose={() => state.close()}
          />
        </Popover>
      )}
    </div>
  )
}

export default MenuButton

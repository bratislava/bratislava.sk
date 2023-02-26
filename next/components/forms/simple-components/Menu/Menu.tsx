import ChevronDownSmall from '@assets/images/chevron-down-small.svg'
import type { AriaMenuProps, MenuTriggerProps } from '@react-types/menu'
import MenuButton from 'components/forms/simple-components/Menu/MenuButton'
import MenuContainer from 'components/forms/simple-components/Menu/MenuContainer'
import MenuPopover from 'components/forms/simple-components/Menu/MenuPopover'
import React from 'react'
import { OverlayProvider, useMenuTrigger } from 'react-aria'
import { useMenuTriggerState } from 'react-stately'

interface MenuProps<T extends object> extends AriaMenuProps<T>, MenuTriggerProps {
  label: string
  buttonLeftEl?: React.ReactNode
  containerHeaderEl?: React.ReactNode
  className?: string
}

const Menu = <T extends object>(props: MenuProps<T>) => {
  const state = useMenuTriggerState(props)
  const { buttonLeftEl, label } = props

  const ref = React.useRef(null)
  const { menuTriggerProps, menuProps } = useMenuTrigger<T>({}, state, ref)

  return (
    <div className="focus:outline-none relative inline-block">
      <MenuButton {...menuTriggerProps} isPressed={state.isOpen} ref={ref}>
        {buttonLeftEl}
        <div className="ml-3 font-light lg:font-semibold">{label}</div>
        <ChevronDownSmall
          className={`ml-3 hidden mix-blend-normal lg:flex ${state.isOpen && 'mb-1 -rotate-180'}`}
        />
      </MenuButton>
      {state.isOpen && (
        <OverlayProvider>
          <MenuPopover state={state} triggerRef={ref} placement="bottom start">
            <MenuContainer
              {...menuProps}
              {...props}
              autoFocus={state.focusStrategy || true}
              onClose={() => state.close()}
            />
          </MenuPopover>
        </OverlayProvider>
      )}
    </div>
  )
}

export default Menu

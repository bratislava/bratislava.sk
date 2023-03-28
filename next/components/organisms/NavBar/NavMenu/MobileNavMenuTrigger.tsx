import { ChevronRightLarge } from '@assets/images'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import React, { forwardRef } from 'react'

import { Icon } from '../../../atoms/icon/Icon'
import { MenuItem } from './navMenuTypes'

type NavMenuTriggerProps = {
  menuItem: MenuItem
}

const NavMenuTrigger = forwardRef<HTMLButtonElement, NavMenuTriggerProps>(
  ({ menuItem }, forwardedRef) => {
    return (
      <NavigationMenu.Trigger
        ref={forwardedRef}
        // To disable "onHover" behaviour, needs to be set also in NavMenuContent
        // https://github.com/radix-ui/primitives/issues/1630#issuecomment-1237106380
        onPointerMove={(event) => event.preventDefault()}
        onPointerLeave={(event) => event.preventDefault()}
        className="flex w-full"
      >
        <div className="text-p2-medium flex h-full w-full items-center gap-2 hover:font-semibold">
          <div className="flex grow items-center gap-2">
            <Icon iconName={menuItem.icon} aria-hidden />
            <div>{menuItem.label}</div>
          </div>
          <ChevronRightLarge aria-hidden className="shrink-0" />
        </div>
      </NavigationMenu.Trigger>
    )
  },
)

export default NavMenuTrigger

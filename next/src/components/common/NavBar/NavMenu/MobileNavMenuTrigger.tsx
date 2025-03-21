import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import React, { forwardRef } from 'react'

import { ChevronRightIcon } from '@/src/assets/ui-icons'
import Pictogram from '@/src/components/common/Pictogram/Pictogram'

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
        <div className="text-default flex h-full w-full items-center gap-2 font-medium">
          <div className="flex grow items-center gap-2">
            <Pictogram iconName={menuItem.icon} aria-hidden />
            <div>{menuItem.label}</div>
          </div>
          <ChevronRightIcon aria-hidden className="shrink-0" />
        </div>
      </NavigationMenu.Trigger>
    )
  },
)

export default NavMenuTrigger

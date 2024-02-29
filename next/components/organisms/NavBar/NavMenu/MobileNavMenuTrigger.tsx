import { ChevronRightIcon } from '@assets/ui-icons'
import { Icon } from '@components/atoms/icon/Icon'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import React, { ButtonHTMLAttributes, forwardRef } from 'react'
import { usePress } from 'react-aria'

import { MenuItem } from './navMenuTypes'

const PressButton = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ onClick, ...rest }, ref) => {
    const { pressProps } = usePress({
      onPress: () => onClick?.({} as React.MouseEvent<HTMLButtonElement, MouseEvent>),
    })

    return <button {...rest} {...pressProps} ref={ref} />
  },
)

type NavMenuTriggerProps = {
  menuItem: MenuItem
}

const NavMenuTrigger = forwardRef<HTMLButtonElement, NavMenuTriggerProps>(
  ({ menuItem }, forwardedRef) => {
    return (
      <NavigationMenu.Trigger asChild>
        <PressButton
          ref={forwardedRef}
          // // To disable "onHover" behaviour, needs to be set also in NavMenuContent
          // // https://github.com/radix-ui/primitives/issues/1630#issuecomment-1237106380
          onPointerMove={(event) => event.preventDefault()}
          onPointerLeave={(event) => event.preventDefault()}
          className="flex w-full"
        >
          <div className="text-default flex h-full w-full items-center gap-2 font-medium">
            <div className="flex grow items-center gap-2">
              <Icon iconName={menuItem.icon} aria-hidden />
              <div>{menuItem.label}</div>
            </div>
            <ChevronRightIcon aria-hidden className="shrink-0" />
          </div>
        </PressButton>
      </NavigationMenu.Trigger>
    )
  },
)

export default NavMenuTrigger

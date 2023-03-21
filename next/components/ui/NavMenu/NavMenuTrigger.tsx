import StickyMenuTopper from '@assets/images/sticky-menu-topper.svg'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import React, { forwardRef } from 'react'

type NavMenuTriggerProps = {
  label: string
  color: string
}

const NavMenuTrigger = forwardRef<HTMLButtonElement, NavMenuTriggerProps>(
  ({ label, color }, forwardedRef) => {
    return (
      <NavigationMenu.Trigger
        ref={forwardedRef}
        // To disable "onHover" behaviour, needs to be set also in NavMenuContent
        // https://github.com/radix-ui/primitives/issues/1630#issuecomment-1237106380
        onPointerMove={(event) => event.preventDefault()}
        onPointerLeave={(event) => event.preventDefault()}
        className="text-base group flex flex-col items-center py-4 whitespace-pre-wrap h-full w-full hover:font-semibold data-[state=open]:font-semibold"
      >
        {label}
        <StickyMenuTopper
          style={{ color }}
          className="group:data-[state=open]:opacity-100 absolute bottom-[-7px] transition opacity-100 group-hover:opacity-100"
        />
      </NavigationMenu.Trigger>
    )
  },
)

export default NavMenuTrigger

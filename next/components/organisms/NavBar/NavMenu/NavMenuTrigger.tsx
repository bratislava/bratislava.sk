import StickyMenuTopper from '@assets/images/sticky-menu-topper.svg'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import React, { CSSProperties, forwardRef } from 'react'

type NavMenuTriggerProps = {
  label: string
  colorStyle: CSSProperties
}

const NavMenuTrigger = forwardRef<HTMLButtonElement, NavMenuTriggerProps>(
  ({ label, colorStyle }, forwardedRef) => {
    return (
      <NavigationMenu.Trigger
        ref={forwardedRef}
        // To disable "onHover" behaviour, needs to be set also in NavMenuContent
        // https://github.com/radix-ui/primitives/issues/1630#issuecomment-1237106380
        onPointerMove={(event) => event.preventDefault()}
        onPointerLeave={(event) => event.preventDefault()}
        style={colorStyle}
        className="text-base group flex h-full w-full flex-col items-center whitespace-pre-wrap py-4 hover:font-semibold data-[state=open]:font-semibold"
      >
        {label}
        <StickyMenuTopper className="group:data-[state=open]:opacity-100 absolute bottom-[-7px] text-category-600 opacity-100 transition group-hover:opacity-100" />
      </NavigationMenu.Trigger>
    )
  },
)

export default NavMenuTrigger

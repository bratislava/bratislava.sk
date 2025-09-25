import { Typography } from '@bratislava/component-library'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import React, { CSSProperties, forwardRef } from 'react'

import { ChevronDownIcon } from '@/src/assets/icons'

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
        className="group size-full items-center ring-inset hover:font-semibold data-[state=open]:font-semibold"
      >
        <div className="-m-2 flex items-center gap-1 p-2">
          <Typography variant="p-small">{label}</Typography>
          <ChevronDownIcon
            // Icon size slightly altered so that menu doesn't overflow on standard screens, margin-t added to align with menu label
            className="mt-0.5 size-4.75 group-data-[state=open]:rotate-180"
          />
        </div>
      </NavigationMenu.Trigger>
    )
  },
)

export default NavMenuTrigger

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
        className="base-focus-ring group size-full items-center rounded-xs hover:font-semibold data-[state=open]:font-semibold"
      >
        <div className="-m-2 flex items-center gap-1 p-2">
          <div className="relative">
            {/* Invisible semibold label added to prevent layout shifting when text weight changes */}
            <Typography variant="p-small" className="invisible font-semibold" aria-hidden>
              {label}
            </Typography>
            <Typography variant="p-small" className="absolute inset-0">
              {label}
            </Typography>
          </div>
          <ChevronDownIcon
            // Icon size and margin-top slightly altered so that visually it looks as in figma
            className="mt-0.5 size-4.75 group-data-[state=open]:rotate-180"
          />
        </div>
      </NavigationMenu.Trigger>
    )
  },
)

export default NavMenuTrigger

import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import React from 'react'

import Button from '../../forms/simple-components/Button'
import MLink from '../../forms/simple-components/MLink'
import { MenuLink } from './NavMenu'

// https://www.radix-ui.com/docs/primitives/components/navigation-menu#with-client-side-routing

type NavMenuLinkProps = MenuLink & {
  variant?: 'simple' | 'showMoreLink'
}

const NavMenuLink = ({ label, url, variant = 'simple' }: NavMenuLinkProps) => {
  // eslint-disable-next-line default-case
  switch (variant) {
    case 'simple':
      return (
        <NavigationMenu.Link asChild>
          <MLink href={url} variant="underlineOnHover" className="py-1">
            {label}
          </MLink>
        </NavigationMenu.Link>
      )

    case 'showMoreLink':
      return (
        <NavigationMenu.Link asChild>
          <Button variant="link-black" href={url} label={label} className="font-semibold mt-2" />
        </NavigationMenu.Link>
      )
  }
}

export default NavMenuLink

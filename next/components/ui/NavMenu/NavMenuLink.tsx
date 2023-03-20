import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import React from 'react'

import MLink from '../../forms/simple-components/MLink'
import { MenuLink } from './NavMenu'

// https://www.radix-ui.com/docs/primitives/components/navigation-menu#with-client-side-routing

const NavMenuLink = ({ label, url }: MenuLink) => {
  return (
    <NavigationMenu.Link asChild>
      <MLink href={url} className="py-2">
        {label}
      </MLink>
    </NavigationMenu.Link>
  )
}

export default NavMenuLink

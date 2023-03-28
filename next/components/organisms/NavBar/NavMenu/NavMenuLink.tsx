import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import React from 'react'

import Button from '../../../forms/simple-components/Button'
import MLink from '../../../forms/simple-components/MLink'
import { useNavMenuContext } from './navMenuContext'
import { MenuLink } from './navMenuTypes'

// https://www.radix-ui.com/docs/primitives/components/navigation-menu#with-client-side-routing

type NavMenuLinkProps = {
  variant?: 'simple' | 'showMoreLink'
} & MenuLink

const NavMenuLink = ({ label, url, variant = 'simple' }: NavMenuLinkProps) => {
  const { setMobileMenuOpen } = useNavMenuContext()

  switch (variant) {
    case 'simple':
      return (
        <li className="flex">
          <NavigationMenu.Link asChild onClick={() => setMobileMenuOpen(false)}>
            <MLink href={url} variant="underlineOnHover" className="py-1 w-full">
              {label}
            </MLink>
          </NavigationMenu.Link>
        </li>
      )

    case 'showMoreLink':
      return (
        <li className="flex">
          <NavigationMenu.Link asChild>
            <Button variant="link-black" href={url} label={label} className="font-medium mt-2" />
          </NavigationMenu.Link>
        </li>
      )

    default:
      return null
  }
}

export default NavMenuLink

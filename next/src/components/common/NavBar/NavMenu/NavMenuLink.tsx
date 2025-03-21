import { Typography } from '@bratislava/component-library'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import React from 'react'

import Button from '@/src/components/common/Button/Button'
import MLink from '@/src/components/common/MLink/MLink'

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
            <MLink href={url} variant="underlineOnHover" className="w-full py-1">
              <Typography type="p">{label}</Typography>
            </MLink>
          </NavigationMenu.Link>
        </li>
      )

    case 'showMoreLink':
      return (
        <li className="flex">
          <NavigationMenu.Link asChild onClick={() => setMobileMenuOpen(false)}>
            <Button variant="black-link" href={url} className="mt-2">
              {label}
            </Button>
          </NavigationMenu.Link>
        </li>
      )

    default:
      return null
  }
}

export default NavMenuLink

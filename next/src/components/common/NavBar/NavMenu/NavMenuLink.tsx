import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import React from 'react'

import Button from '@/src/components/common/Button/Button'

import { useNavMenuContext } from './navMenuContext'
import { MenuLink } from './navMenuTypes'

// https://www.radix-ui.com/docs/primitives/components/navigation-menu#with-client-side-routing

type NavMenuLinkProps = {
  variant?: 'simple' | 'showMoreLink'
} & MenuLink

const NavMenuLink = ({ variant = 'simple', ...rest }: NavMenuLinkProps) => {
  const { setMobileMenuOpen } = useNavMenuContext()

  switch (variant) {
    case 'simple':
      return (
        <li className="flex">
          <NavigationMenu.Link asChild onClick={() => setMobileMenuOpen(false)}>
            {/* Using Button with custom styles to be able to show link icon easily, not ideal, but it works */}
            <Button
              variant="link"
              className="w-full justify-start py-1 font-normal no-underline hover:underline"
              size="small"
              {...rest}
              hasLinkIcon={rest.target === '_blank'}
            />
          </NavigationMenu.Link>
        </li>
      )

    case 'showMoreLink':
      return (
        <li className="flex">
          <NavigationMenu.Link asChild onClick={() => setMobileMenuOpen(false)}>
            <Button variant="link" className="mt-2" {...rest} />
          </NavigationMenu.Link>
        </li>
      )

    default:
      return null
  }
}

export default NavMenuLink

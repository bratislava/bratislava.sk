import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import React from 'react'

import Button from '@/src/components/common/Button/Button'

import { useNavMenuContext } from './navMenuContext'
import { MenuLink } from './navMenuTypes'

// https://www.radix-ui.com/docs/primitives/components/navigation-menu#with-client-side-routing

type NavMenuLinkProps = {
  variant: 'menuSectionLink' | 'goToCategoryLink'
  ariaLabel?: string
} & MenuLink

const NavMenuLink = ({ variant, ariaLabel, ...rest }: NavMenuLinkProps) => {
  const { setMobileMenuOpen } = useNavMenuContext()

  switch (variant) {
    case 'menuSectionLink':
      return (
        <NavigationMenu.Link asChild onClick={() => setMobileMenuOpen(false)}>
          {/* Using Button with custom styles to be able to show link icon easily, not ideal, but it works */}
          <Button
            variant="link"
            className="w-full justify-between py-1 font-normal no-underline hover:underline"
            size="small"
            aria-label={ariaLabel}
            {...rest}
            stretched
          />
        </NavigationMenu.Link>
      )

    case 'goToCategoryLink':
      return (
        <li className="flex">
          <NavigationMenu.Link
            asChild
            aria-label={ariaLabel}
            onClick={() => setMobileMenuOpen(false)}
          >
            {/* flex-row-reverse used to have the icon on the left side */}
            <Button variant="link" className="flex-row-reverse" {...rest} />
          </NavigationMenu.Link>
        </li>
      )

    default:
      return null
  }
}

export default NavMenuLink

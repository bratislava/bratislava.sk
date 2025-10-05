import { Typography } from '@bratislava/component-library'
import React from 'react'

import NavMenuLink from '@/src/components/common/NavBar/NavMenu/NavMenuLink'
import { MenuSection } from '@/src/components/common/NavBar/NavMenu/navMenuTypes'
import Pictogram from '@/src/components/common/Pictogram/Pictogram'

type NavigationSectionProps = {
  section: MenuSection
}

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=19079-20827&m=dev
 */

const NavMenuSection = ({ section }: NavigationSectionProps) => {
  const { icon, label, subtext, showMoreLink } = section

  const { href, ...restLinkProps } = showMoreLink ?? {}

  return (
    <li className="px-4 py-3 lg:px-8 lg:py-4">
      <div className="wrapper-focus-ring relative flex gap-3 focus-within:rounded-sm lg:gap-4">
        {icon && (
          <div aria-hidden>
            <Pictogram iconName={icon} className="size-8 text-category-700 lg:size-10" />
          </div>
        )}
        <div className="flex w-full flex-col gap-2">
          <div className="flex items-center">
            <NavMenuLink variant="menuSectionLink" href={href ?? '#'} {...restLinkProps}>
              <Typography variant="h5" as="h3">
                {label} 
              </Typography>
            </NavMenuLink>
          </div>

          {subtext ? <Typography variant="p-small">{subtext}</Typography> : null}
        </div>
      </div>
    </li>
  )
}

export default NavMenuSection

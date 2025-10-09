import { Typography } from '@bratislava/component-library'
import React from 'react'

import Pictogram from '@/src/components/common/Pictogram/Pictogram'
import cn from '@/src/utils/cn'

import NavMenuLink from './NavMenuLink'
import { MenuSection } from './navMenuTypes'

type NavigationSectionProps = {
  section: MenuSection
  classNames?: string
}

const NavMenuSection = ({ section, classNames }: NavigationSectionProps) => {
  return (
    <li className={cn('flex gap-2', classNames)}>
      {section.icon && (
        <div aria-hidden>
          <Pictogram iconName={section.icon} className="size-10" />
        </div>
      )}
      <div className="w-full">
        {section.label && (
          <Typography variant="h5" as="h3" className="mt-1.5">
            {section.label}
          </Typography>
        )}

        <ul className="mt-1.5 flex flex-col">
          {section.items?.map((menuLink, index) => {
            // eslint-disable-next-line react/no-array-index-key
            return <NavMenuLink key={index} {...menuLink} />
          })}
          {section.showMoreLink ? (
            <NavMenuLink variant="showMoreLink" {...section.showMoreLink} />
          ) : null}
        </ul>
      </div>
    </li>
  )
}

export default NavMenuSection

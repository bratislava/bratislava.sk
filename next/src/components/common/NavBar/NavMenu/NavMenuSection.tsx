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
          <Pictogram iconName={section.icon} className="h-10 w-10" />
        </div>
      )}
      <div className="w-full">
        {section.label && (
          <Typography type="h3" size="h5" className="mt-1.5">
            {section.label}
          </Typography>
        )}

        <ul className="mt-1.5 flex flex-col">
          {/* eslint-disable react/no-array-index-key */}
          {section.items?.map((menuLink, index) => {
            return <NavMenuLink key={index} label={menuLink.label} url={menuLink.url} />
          })}
          {section.showMoreLink && (
            <NavMenuLink
              label={section.showMoreLink.label}
              url={section.showMoreLink.url}
              variant="showMoreLink"
            />
          )}
          {/* eslint-enable react/no-array-index-key */}
        </ul>
      </div>
    </li>
  )
}

export default NavMenuSection

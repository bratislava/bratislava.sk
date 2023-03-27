import React from 'react'
import { twMerge } from 'tailwind-merge'

import { Icon } from '../../../atoms/icon/Icon'
import NavMenuLink from './NavMenuLink'
import { MenuSection } from './navMenuTypes'

interface NavigationSectionProps {
  section: MenuSection
  classNames?: string
}

const NavMenuSection = ({ section, classNames }: NavigationSectionProps) => {
  return (
    <div className={twMerge('flex gap-2', classNames)}>
      <div>
        <Icon iconName={section.icon} />
      </div>
      <div>
        {section.label && <div className="text-h5 mt-1.5">{section.label}</div>}

        {/* TODO replace by <ul> and <li> */}
        <div className="mt-1.5 flex flex-col">
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
        </div>
      </div>
    </div>
  )
}

export default NavMenuSection

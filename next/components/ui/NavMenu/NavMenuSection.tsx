import cx from 'classnames'
import React from 'react'

import { MenuSection } from './NavMenu'
import NavMenuLink from './NavMenuLink'

interface NavigationSectionProps {
  section: MenuSection
  classNames?: string
}

const NavMenuSection = ({ section, classNames }: NavigationSectionProps) => {
  // TODO cols sizing needs revisit
  const isLengthy = section?.items ? section.items.length >= 8 : false

  console.log(section)

  return (
    <div className={classNames}>
      {section.label && <div className="text-lg text-foreground-dark pb-2">{section.label}</div>}

      {/* TODO replace by <ul> and <li> */}
      <div
        className={cx('grid', {
          // TODO cols sizing needs revisit
          'grid-flow-col grid-rows-8 gap-x-10': isLengthy,
        })}
      >
        {/* eslint-disable react/no-array-index-key */}
        {section.items?.map((menuLink, index) => {
          return <NavMenuLink key={index} label={menuLink.label} url={menuLink.url} />
        })}
        {/* eslint-enable react/no-array-index-key */}
      </div>
    </div>
  )
}

export default NavMenuSection

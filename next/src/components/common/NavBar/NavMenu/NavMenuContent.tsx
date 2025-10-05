import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { CSSProperties, useMemo } from 'react'

import HorizontalDivider from '@/src/components/common/Divider/HorizontalDivider'
import NavMenuLink from '@/src/components/common/NavBar/NavMenu/NavMenuLink'
import cn from '@/src/utils/cn'
import { CommonLinkProps } from '@/src/utils/getLinkProps'

import NavMenuContentCell from './NavMenuContentCell'
import NavMenuSection from './NavMenuSection'
import { MenuSection } from './navMenuTypes'

type NavMenuContentProps = {
  colCount: number
  sections: MenuSection[]
  colorStyle: CSSProperties
  seeAllLinkProps: CommonLinkProps
}

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=19079-20827&m=dev
 */

const NavMenuContent = ({
  colCount,
  sections,
  colorStyle,
  seeAllLinkProps,
}: NavMenuContentProps) => {
  // Parse sections into grid cells:
  // - group sections with colSpan=0 to column
  // - sections with colSpan=0 should be followed by section with colSpan=1 - this needs to be set up in Strapi
  const menuCells = useMemo(() => {
    const cells: (MenuSection | MenuSection[])[] = []
    let groupedSections: MenuSection[] = []

    sections.forEach((section) => {
      if (section.colSpan && groupedSections.length > 0) {
        cells.push(groupedSections)
        groupedSections = []
      }
      if (section.colSpan) {
        cells.push(section)
      }
      if (section.colSpan === 0) {
        groupedSections.push(section)
      }
    })
    if (groupedSections.length > 0) {
      cells.push(groupedSections)
    }

    return cells
  }, [sections])

  return (
    <NavigationMenu.Content
      // To disable "onHover" behaviour, needs to be set also in NavMenuTrigger
      // https://github.com/radix-ui/primitives/issues/1630#issuecomment-1237106380
      onPointerMove={(event) => event.preventDefault()}
      onPointerLeave={(event) => event.preventDefault()}
      style={colorStyle}
    >
      <div className="relative z-29 bg-background-passive-base">
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
        <ul
          className={cn('grid px-4 py-3 lg:px-0 lg:py-4', {
            // Keeping for consistency with mestskakniznica.sk
            'grid-cols-3': colCount === 3,
            'grid-cols-4': colCount === 4,
          })}
          // Together with onCLick in Viewport, it closes the menu on click outside of container area
          onClick={(event) => event.stopPropagation()}
        >
          {/* eslint-disable react/no-array-index-key */}
          {menuCells.map((cell, index) => {
            // Keeping for consistency with mestskakniznica.sk
            if (Array.isArray(cell)) {
              return (
                // Group sections in one grid cell
                <NavMenuContentCell key={index} colSpan={1}>
                  {cell.map((section, sectionIndex) => (
                    <NavMenuSection key={sectionIndex} section={section} />
                  ))}
                </NavMenuContentCell>
              )
            }

            return (
              <NavMenuContentCell key={index} colSpan={cell.colSpan}>
                <NavMenuSection key={index} section={cell} />
              </NavMenuContentCell>
            )
          })}
          {/* eslint-enable react/no-array-index-key */}
        </ul>
        <HorizontalDivider />
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <div
          className="flex border-b p-8"
          // Together with onCLick in Viewport, it closes the menu on click outside of container area
          onClick={(event) => event.stopPropagation()}
        >
          <NavMenuLink variant="goToCategoryLink" {...seeAllLinkProps} />
        </div>
      </div>
    </NavigationMenu.Content>
  )
}

export default NavMenuContent

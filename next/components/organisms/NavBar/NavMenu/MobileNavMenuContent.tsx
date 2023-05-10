import { ChevronLeftIcon } from '@assets/ui-icons'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { useTranslations } from 'next-intl'
import React, { CSSProperties } from 'react'

import NavBarHorizontalDivider from './NavBarHorizontalDivider'
import { useNavMenuContext } from './navMenuContext'
import NavMenuSection from './NavMenuSection'
import { MenuItem } from './navMenuTypes'

type NavMenuContentProps = {
  menuItem: MenuItem
  colorStyle: CSSProperties
}

const MobileNavMenuContent = ({ menuItem, colorStyle }: NavMenuContentProps) => {
  const t = useTranslations('NavMenu')
  const { setMenuValue } = useNavMenuContext()
  const { items: sections, label: parentLabel } = menuItem

  return (
    <NavigationMenu.Content
      // To disable "onHover" behaviour, needs to be set also in NavMenuTrigger
      // https://github.com/radix-ui/primitives/issues/1630#issuecomment-1237106380
      onPointerMove={(event) => event.preventDefault()}
      onPointerLeave={(event) => event.preventDefault()}
      className="bg-category-200"
      style={colorStyle}
    >
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <ul className="flex w-full flex-col gap-2 px-4 py-8">
        <li className="w-full">
          <button
            type="button"
            onClick={() => setMenuValue('')}
            className="-my-2 flex w-full items-center gap-2 py-2"
            aria-label={t('aria.backTo', { backTo: parentLabel })}
          >
            <ChevronLeftIcon aria-hidden /> {parentLabel}
          </button>
        </li>

        <NavBarHorizontalDivider categoryColor />

        {/* eslint-disable react/no-array-index-key */}
        {sections.map((section, index) => {
          return (
            <NavMenuSection key={index} section={section} classNames={index === 0 ? '' : 'pt-8'} />
          )
        })}
        {/* eslint-enable react/no-array-index-key */}
      </ul>
    </NavigationMenu.Content>
  )
}

export default MobileNavMenuContent

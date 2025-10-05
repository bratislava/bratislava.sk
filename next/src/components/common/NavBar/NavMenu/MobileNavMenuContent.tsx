import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import React, { CSSProperties } from 'react'
import { ChevronLeftIcon } from 'src/assets/icons'

import HorizontalDivider from '@/src/components/common/Divider/HorizontalDivider'
import NavMenuLink from '@/src/components/common/NavBar/NavMenu/NavMenuLink'
import { useTranslation } from '@/src/utils/useTranslation'

import { useNavMenuContext } from './navMenuContext'
import NavMenuSection from './NavMenuSection'
import { MenuItem } from './navMenuTypes'

type NavMenuContentProps = {
  menuItem: MenuItem
  colorStyle: CSSProperties
}

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=19079-20827&m=dev
 */

const MobileNavMenuContent = ({ menuItem, colorStyle }: NavMenuContentProps) => {
  const { t } = useTranslation()
  const { setMenuValue } = useNavMenuContext()
  const { items: sections, label, linkHref } = menuItem

  return (
    <NavigationMenu.Content
      // To disable "onHover" behaviour, needs to be set also in NavMenuTrigger
      // https://github.com/radix-ui/primitives/issues/1630#issuecomment-1237106380
      onPointerMove={(event) => event.preventDefault()}
      onPointerLeave={(event) => event.preventDefault()}
      className="bg-background-passive-base"
      style={colorStyle}
    >
      <ul className="flex flex-col">
        <li className="p-4">
          {/* Our Button (implemented by react-aria-components) is not compatible with radix and causes press events problem on mobile */}
          <button
            type="button"
            onClick={() => setMenuValue('')}
            className="-my-2 -ml-4 flex w-full gap-2 px-4 py-2 font-medium underline underline-offset-2"
          >
            <ChevronLeftIcon aria-hidden />
            {t('MobileNavMenuContent.goBackToMainCategories')}
          </button>
        </li>

        <HorizontalDivider asListItem className="mb-3" />

        {sections.map((section, index) => {
          // eslint-disable-next-line react/no-array-index-key
          return <NavMenuSection key={index} section={section} />
        })}

        <HorizontalDivider asListItem className="mt-3" />

        <li className="p-4">
          <NavMenuLink
            variant="goToCategoryLink"
            href={linkHref}
            ariaLabel={t('NavMenuContent.aria.goToCategory', {
              category: label,
            })}
          >
            {t('NavMenuContent.goToCategory')}
          </NavMenuLink>
        </li>
      </ul>
    </NavigationMenu.Content>
  )
}

export default MobileNavMenuContent

import { Typography } from '@bratislava/component-library'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import React from 'react'

import Button from '@/src/components/common/Button/Button'
import { useTranslation } from '@/src/utils/useTranslation'

import { useNavMenuContext } from './navMenuContext'
import { MenuLink } from './navMenuTypes'

// https://www.radix-ui.com/docs/primitives/components/navigation-menu#with-client-side-routing

type NavMenuLinkProps = {
  variant: 'menuSectionLink' | 'goToCategoryLink'
  subtext?: string | null | undefined
  ariaLabel?: string
} & MenuLink

const NavMenuLink = ({ variant, subtext, ariaLabel, ...restLinkProps }: NavMenuLinkProps) => {
  const { t } = useTranslation()
  const { setMobileMenuOpen } = useNavMenuContext()

  switch (variant) {
    case 'menuSectionLink':
      return (
        <div className="wrapper-focus-ring flex w-full flex-col gap-2 focus-within:rounded-sm">
          <div className="flex items-center">
            <NavigationMenu.Link
              asChild
              onClick={() => {
                setMobileMenuOpen(false)
              }}
            >
              <Button
                variant="link"
                className="w-full justify-between py-1 text-size-h5 font-semibold no-underline hover:underline"
                size="small"
                {...restLinkProps}
                stretched
              />
            </NavigationMenu.Link>
          </div>

          {subtext ? <Typography variant="p-small">{subtext}</Typography> : null}
        </div>
      )

    case 'goToCategoryLink':
      return (
        <NavigationMenu.Link
          asChild
          aria-label={ariaLabel}
          onClick={() => {
            setMobileMenuOpen(false)
          }}
        >
          <Button
            variant="link"
            // flex-row-reverse used to have the icon on the left side
            className="flex-row-reverse"
            aria-label={t('NavMenuLink.aria.goToCategory', {
              category: restLinkProps.children,
            })}
            {...restLinkProps}
          >
            {t('NavMenuLink.goToCategory')}
          </Button>
        </NavigationMenu.Link>
      )

    default:
      return null
  }
}

export default NavMenuLink

import { GeneralQuery } from '@/src/services/graphql'
import { getLinkProps } from '@/src/utils/getLinkProps'
import { isDefined } from '@/src/utils/isDefined'

import { MenuItem } from './navMenuTypes'

export const getParsedMenus = (menu: GeneralQuery['menu'], moreLabel: string): MenuItem[] => {
  return (
    menu?.menus
      ?.map((menuItem) => {
        if (!menuItem?.page?.slug) return null

        const { label, icon } = menuItem
        // eslint-disable-next-line unicorn/consistent-destructuring
        const linkHref = `/${menuItem.page.slug}`
        const items =
          // eslint-disable-next-line unicorn/consistent-destructuring
          menuItem.sections
            ?.map((section) => {
              if (!section) return null

              const sectionLabel = section.label

              const showMoreLink = section.page
                ? getLinkProps({ label: moreLabel, page: section.page })
                : undefined

              const sectionIcon = section.icon

              return {
                label: sectionLabel,
                subtext: section.subtext,
                showMoreLink,
                icon: sectionIcon,
                colSpan: 1,
              }
            })
            .filter(isDefined) ?? []

        return { label, items, colCount: 3, linkHref, icon }
      })
      .filter(isDefined) ?? []
  )
}

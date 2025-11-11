import { GeneralQuery } from '@/src/services/graphql'
import { getLinkProps } from '@/src/utils/getLinkProps'
import { isDefined } from '@/src/utils/isDefined'

import { MenuItem } from './navMenuTypes'

export const getParsedMenus = (menu: GeneralQuery['menu'], moreLabel: string): MenuItem[] => {
  return (
    menu?.menus
      ?.map((menuItem) => {
        if (!menuItem?.page?.slug) return null

        const { label, page, icon } = menuItem

        const seeAllLinkProps = page ? getLinkProps({ label, page }) : undefined

        const items =
          // eslint-disable-next-line unicorn/consistent-destructuring
          menuItem.sections
            ?.map((section) => {
              if (!section) return null

              const sectionLabel = section.label

              const sectionItems =
                section.links
                  ?.map((menuLink) => {
                    return getLinkProps(menuLink)
                  })
                  .filter(isDefined) ?? []

              const showMoreLink = section.page
                ? getLinkProps({ label: moreLabel, page: section.page })
                : undefined

              const sectionIcon = section.icon

              return {
                label: sectionLabel,
                items: sectionItems,
                subtext: section.subtext,
                showMoreLink,
                icon: sectionIcon,
                colSpan: 1,
              }
            })
            .filter(isDefined) ?? []

        return { label, items, colCount: 3, seeAllLinkProps, icon }
      })
      .filter(isDefined) ?? []
  )
}

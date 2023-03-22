import { MenuQuery } from '@bratislava/strapi-sdk-homepage'
import { MenuItem, MenuLink } from '@bratislava/ui-bratislava/NavMenu/navMenuTypes'
import { isDefined } from '@utils/isDefined'

export const getParsedMenus = (menu: MenuQuery['menu']): MenuItem[] => {
  return (
    menu?.data?.attributes?.menus
      ?.map((menuItem) => {
        if (!menuItem?.page?.data?.attributes?.slug) return null

        const { label, icon } = menuItem
        const linkHref = menuItem.page.data.attributes.slug
        const items =
          // eslint-disable-next-line unicorn/consistent-destructuring
          menuItem.sections
            ?.map((section) => {
              if (!section) return null

              const sectionLabel = section.label

              const sectionItems =
                section.links
                  ?.map((menuLink) => {
                    const menuLinkSlug = menuLink?.page?.data?.attributes?.slug

                    if (menuLinkSlug) {
                      return {
                        label: menuLink.label,
                        url: menuLinkSlug,
                      }
                    }

                    if (menuLink?.url) {
                      return {
                        label: menuLink.label,
                        url: menuLink.url,
                      }
                    }

                    return null
                  })
                  .filter(isDefined) ?? []

              const showMoreLink = section.page?.data?.attributes
                ? ({
                    // TODO use label: t('navMenuMore'),
                    label: 'Ďalšie',
                    url: section.page.data.attributes.slug,
                  } as MenuLink)
                : undefined

              const sectionIcon = section.icon

              return {
                label: sectionLabel,
                items: sectionItems,
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

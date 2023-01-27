// @ts-strict-ignore
import HomePageCategoryButton from '@bratislava/ui-bratislava/HomepageMenu/HomePageCategoryButton'
import { HomepageMenuPanel } from '@bratislava/ui-bratislava/HomepageMenu/HomepageMenuPanel'
import { MenuDesktopLayout } from '@bratislava/ui-bratislava/HomepageMenu/MenuDesktopLayout'
import { MenuMobileLayout } from '@bratislava/ui-bratislava/HomepageMenu/MenuMobileLayout'
import { useHomepageMenu } from '@bratislava/ui-bratislava/HomepageMenu/useHomepageMenu'

import { MenuIcon } from '../../atoms/icon/IconService'

interface MenuSubSubItem {
  title: string
  url: string
}

interface MenuSubItem {
  icon?: MenuIcon
  title: string
  moreLinkTitle?: string
  url: string
  subItems: MenuSubSubItem[]
}

export interface MenuMainItem {
  id: string
  icon: MenuIcon
  coloredIcon: MenuIcon
  title: string
  color: string
  colorDark?: string
  subItems?: MenuSubItem[]
}

interface IProps {
  items?: MenuMainItem[]
  isVisible: boolean
}

// TODO: Named Group for Link Dalsie (change icon)
const HomepageMenu = ({ items, isVisible }: IProps) => {
  const { activeButtonId, handleMenuButtonClick, handleClosePanel } = useHomepageMenu(isVisible)

  return (
    <>
      <MenuMobileLayout items={items} />
      <MenuDesktopLayout>
        {items?.map((item, index) => (
          <div data-hover-id={index} key={index} className="group">
            <HomePageCategoryButton
              item={item}
              isActive={activeButtonId === index}
              onClick={() => handleMenuButtonClick(index)}
            />
            {isVisible && activeButtonId === index && (
              <HomepageMenuPanel
                index={index}
                item={item}
                isActive={activeButtonId === index}
                onClosePanel={handleClosePanel}
              />
            )}
          </div>
        ))}
      </MenuDesktopLayout>
    </>
  )
}

export default HomepageMenu

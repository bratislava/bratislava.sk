import LoadingSpinner from '@bratislava/ui-bratislava/LoadingSpinner/LoadingSpinner'
import Button from '@components/forms/simple-components/Button'
import { MenuItemBase } from '@components/forms/simple-components/MenuDropdown/MenuDropdown'
import MLink from '@components/forms/simple-components/MLink'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { useGeneralContext } from '@utils/generalContext'
import { getCommonLinkProps } from '@utils/getCommonLinkProps'
import useCityAccount from '@utils/useCityAccount'
import { useProfileMenuItems } from '@utils/useProfileMenuItems'

import NavBarHorizontalDivider from '../NavMenu/NavBarHorizontalDivider'

interface INavBarAuthHeaderMobileProps {
  onCloseMenu: () => void
}

const handleOnKeyPress = (event: React.KeyboardEvent, callback?: () => void, key = 'Enter') => {
  if (event.key === key) {
    callback?.()
  }
}

interface IItemProps extends MenuItemBase {
  onCloseMenu: () => void
  onPress?: () => void
}

const Item = ({ icon, title, url, onPress, onCloseMenu }: IItemProps) => {
  const onClick = () => {
    onPress?.()
    onCloseMenu()
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(event) => handleOnKeyPress(event, onClick)}
      className="relative flex items-center gap-2"
    >
      <div className="flex h-12 w-12 items-center justify-center">{icon}</div>

      <NavigationMenu.Link asChild onClick={onCloseMenu}>
        <MLink href={url ?? '#'} target={url ? '_blank' : undefined} variant="underlined" stretched>
          {title}
        </MLink>
      </NavigationMenu.Link>
    </div>
  )
}

const NavBarAuthHeaderMobile = ({ onCloseMenu }: INavBarAuthHeaderMobileProps) => {
  const { general } = useGeneralContext()
  const { header } = general?.data?.attributes ?? {}
  const { accountLink } = header ?? {}

  const { data, loading } = useCityAccount()
  const menuItems = useProfileMenuItems('large')

  return loading ? (
    <LoadingSpinner size="small" />
  ) : data || accountLink ? (
    <>
      <NavBarHorizontalDivider />

      {data ? (
        menuItems.map((sectionItem) => (
          <Item key={sectionItem.id} {...sectionItem} onCloseMenu={onCloseMenu} />
        ))
      ) : (
        <li className="my-1 flex justify-center md:justify-start">
          <NavigationMenu.Link asChild onClick={onCloseMenu}>
            <Button
              size="sm"
              variant="category"
              fullWidthMobile
              {...getCommonLinkProps(accountLink)}
            />
          </NavigationMenu.Link>
        </li>
      )}
    </>
  ) : null
}

export default NavBarAuthHeaderMobile

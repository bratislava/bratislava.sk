// @ts-strict-ignore
import cx from 'classnames'
import { MenuItem } from 'components/forms/segments/AccountNavBar/AccountNavBar'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

interface IProps {
  sectionsList?: MenuItem[]
  accountMenuList: MenuItem[]
  className?: string
  closeMenu: () => void
  onRouteChange: (selectedItem: MenuItem) => void
}

const Divider = () => {
  return <div className="border-b-solid border-b-2 my-4" />
}

const Item = ({
  sectionItem,
  isSelected,
  onClick,
}: {
  sectionItem: MenuItem
  isSelected?: boolean
  onClick: () => void
}) => {
  const { t } = useTranslation()

  return (
    <div
      onClick={onClick}
      className={cx(
        'text-p2-semibold rounded-lg p-4 flex cursor-pointer border-b-2 border-transparent hover:text-main-700 hover:bg-main-100 transition-all',
        {
          'text-main-700 bg-main-100': isSelected,
        },
      )}
    >
      {sectionItem.icon}
      <span className="ml-3">{t(sectionItem?.title)}</span>
    </div>
  )
}

export const HamburgerMenu = ({
  sectionsList,
  accountMenuList,
  onRouteChange,
  className,
  closeMenu,
}: IProps) => {
  const router = useRouter()

  return (
    <div
      className={cx(
        'fixed top-16 mt-1 left-0 bg-white w-screen overflow-y-scroll lg:hidden flex flex-col',
      )}
      style={{ height: 'calc(100vh - 60px)' }}
    >
      <div className={cx('flex flex-col p-4', className)}>
        {sectionsList && (
          <>
            {sectionsList.map((sectionItem) => (
              <Item
                key={sectionItem.id}
                sectionItem={sectionItem}
                isSelected={router.route.includes(sectionItem?.link)}
                onClick={() => {
                  onRouteChange(sectionItem)
                  closeMenu()
                }}
              />
            ))}
            <Divider />
          </>
        )}
        {accountMenuList.map((sectionItem) => (
          <>
            {sectionItem.link === '/logout' && <Divider />}
            <Item
              key={sectionItem.id}
              sectionItem={sectionItem}
              onClick={() => {
                onRouteChange(sectionItem)
                closeMenu()
              }}
            />
          </>
        ))}
      </div>
    </div>
  )
}

export default HamburgerMenu

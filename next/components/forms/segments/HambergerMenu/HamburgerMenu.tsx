// @ts-strict-ignore
import cx from 'classnames'
import { MenuItem } from 'components/forms/segments/AccountNavBar/AccountNavBar'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

interface IProps {
  sectionsList?: MenuItem[]
  className?: string
  lang?: 'en' | 'sk'
  closeMenu: () => void
  onRouteChange: (selectedItem: MenuItem) => void
}

const Divider = () => {
  return <div className="border-b-solid border-b-2 py-4" />
}

export const HamburgerMenu = ({
  sectionsList,
  onRouteChange,
  className,
  lang,
  closeMenu,
}: IProps) => {
  const { t } = useTranslation()
  console.log(lang)
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
            {' '}
            {sectionsList.map((sectionItem) => (
              <div
                onClick={() => onRouteChange(sectionItem)}
                key={sectionItem.id}
                className={cx(
                  'text-p2-semibold rounded-lg p-4 flex cursor-pointer border-b-2 border-transparent hover:text-main-700 hover:bg-main-100 transition-all',
                  {
                    'text-main-700 bg-main-100': router.route.includes(sectionItem?.link),
                  },
                )}
              >
                {sectionItem.icon}
                <span className="ml-3">{t(sectionItem?.title)}</span>
              </div>
            ))}
            <Divider />
          </>
        )}
      </div>
    </div>
  )
}

export default HamburgerMenu

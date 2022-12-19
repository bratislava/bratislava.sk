import { Enum_Pagecategory_Icon } from '@bratislava/strapi-sdk-homepage'
import { MenuMainItem } from '@bratislava/ui-bratislava'
import HomepageMenuIcon from '@bratislava/ui-bratislava/HomepageMenu/HomepageMenuIcon'
import cx from 'classnames'
import { useRef } from 'react'
import { useHover } from 'usehooks-ts'

type HomePageCategoryButtonProps = {
  item: MenuMainItem
  isActive: boolean
  onClick(): void
}

const HomePageCategoryButton = ({ item, onClick, isActive }: HomePageCategoryButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const isHover = useHover(buttonRef)

  return (
    <button
      type="button"
      ref={buttonRef}
      className={cx(
        'text-20 w-full h-full',
        'flex items-center gap-x-6 text-left md:px-2 md:py-1 lg:pb-2 lg:flex-col lg:gap-y-4 lg:text-center',
        { 'shadow rounded-lg rounded-b-none': isActive },
      )}
      style={{
        backgroundColor: isActive ? item.color : 'transparent',
      }}
      onClick={onClick}
    >
      <div>
        <HomepageMenuIcon
          isColored={isHover || isActive}
          color={item.colorDark ?? ''}
          icon={item.icon as Enum_Pagecategory_Icon}
        />
      </div>
      <p className="text-p2-medium text-font/75 whitespace-pre overflow-hidden">{item.title}</p>
    </button>
  )
}

export default HomePageCategoryButton

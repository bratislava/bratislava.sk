import { Enum_Pagecategory_Icon } from '@bratislava/strapi-sdk-homepage'
import { MenuMainItem } from '@bratislava/ui-bratislava'
import HomepageMenuIcon from '@bratislava/ui-bratislava/HomepageMenu/HomepageMenuIcon'
import cx from 'classnames'
import { Dispatch, SetStateAction, useRef } from 'react'
import { useHover } from 'usehooks-ts'

type HomePageCategoryButtonProps = {
  item: MenuMainItem
  activeId: string | null
  setActiveId: Dispatch<SetStateAction<string | null>>
}

const HomePageCategoryButton = ({ item, setActiveId, activeId }: HomePageCategoryButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const isHover = useHover(buttonRef)

  const isActive = activeId === item.id

  const handleClick = () => {
    if (item.id === activeId) {
      setActiveId(null)
      return
    }
    setActiveId(item.id)
  }

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
      onClick={handleClick}
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

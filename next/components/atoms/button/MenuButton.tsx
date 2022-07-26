import cx from 'classnames'
import { FC, ReactNode } from 'react'

import { Icon } from '../icon/Icon'
import { MenuIcon } from '../icon/IconService'

interface ButtonItemProps {
  title?: string
  icon: MenuIcon
  customHoverColor?: string
}

interface Props {
  isActive: boolean
  iconItems?: ButtonItemProps[]
  title: ReactNode
}

export const MenuButton: FC<Props> = ({ isActive = false, iconItems, title }) => {
  const [firstBtn, secondBtn, __rest] = iconItems
  return (
    <>
      <div className={cx('group-hover:hidden', { hidden: isActive })} key={firstBtn.icon}>
        <Icon iconName={firstBtn.icon} />
      </div>
      <div
        className={cx({
          block: isActive,
          'group-hover:block hidden': !isActive,
        })}
        key={secondBtn.icon}
      >
        <Icon iconName={secondBtn.icon} />
      </div>
      <p className="typography-tag-label whitespace-pre text-gray-dark">{title}</p>
      {isActive && (
        <div
          style={{ backgroundColor: secondBtn.customHoverColor }}
          className="absolute bottom-0 h-8 w-full translate-y-1/2"
        />
      )}
    </>
  )
}

// @ts-strict-ignore
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
      <p className="text-p2 whitespace-pre font-medium text-gray-700/75">{title}</p>
    </>
  )
}

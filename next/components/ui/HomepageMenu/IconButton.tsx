import { MenuMainItem } from '@bratislava/ui-bratislava'
import cx from 'classnames'
import React, { FC } from 'react'

import { getIcon } from './IconButtonService'

interface Props {
  item: MenuMainItem
  isVisible: boolean
}

export const IconButton: FC<Props> = ({ item, isVisible }) => {
  const IconComponent = getIcon(item.icon)
  const ColoredIconComponent = getIcon(item.coloredIcon)
  return (
    <>
      <div>
        {IconComponent && (
          <IconComponent
            className={cx('group-hover:hidden block w-10 h-10 lg:ml-0 lg:w-12 lg:h-12 text-gray-dark', {
              hidden: isVisible,
            })}
          />
        )}
        {ColoredIconComponent && (
          <ColoredIconComponent
            className={cx('w-10 h-10 lg:ml-0 lg:w-12 lg:h-12', {
              block: isVisible,
              'group-hover:block hidden': !isVisible,
            })}
          />
        )}
      </div>
      <p
        className={cx('font-medium text-base mt-5 transition group-hover:font-bold text-center whitespace-pre', {
          'font-bold': isVisible,
        })}
      >
        {item.title}
      </p>
    </>
  )
}

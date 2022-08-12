import { ChevronDownSmall } from '@assets/images'
import StickyMenuTopper from '@assets/images/sticky-menu-topper.svg'
import { MenuMainItem } from '@bratislava/ui-bratislava'
import cx from 'classnames'
import React, { FC } from 'react'

interface Props {
  item: MenuMainItem
  isVisible: boolean
}

export const SimpleNavButton: FC<Props> = ({ item, isVisible }) => (
  <>
    <StickyMenuTopper
      style={{ color: item.colorDark }}
      className={cx('absolute top-0 w-30', {
        'opacity-100': isVisible,
        'opacity-0': !isVisible,
      })}
    />
    <p
      className={cx('font-medium text-base mt-5 transition group-hover:font-bold text-center whitespace-pre', {
        'font-bold': isVisible,
      })}
    >
      {item.title}
    </p>
    {!isVisible && <ChevronDownSmall className={cx('mt-3')} />}
    {isVisible && <ChevronDownSmall style={{ color: item.colorDark }} className={cx('mt-3')} />}
  </>
)

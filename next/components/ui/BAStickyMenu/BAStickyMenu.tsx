import { useStickyMenu } from '@bratislava/ui-bratislava/BAStickyMenu/useStickyMenu'
import cx from 'classnames'
import React, { Fragment } from 'react'

import { MenuMainItem } from '../index'
import { MenuCell } from './MenuCell'
import { MenuPanel } from './MenuPanel'

interface IProps {
  className?: string
  menuItems: MenuMainItem[]
  isVisible?: boolean
  initialActiveMenuId?: number
}

export const BAStickyMenu = ({
  className,
  menuItems,
  isVisible = true,
  initialActiveMenuId,
}: IProps) => {
  const { activeButtonId, activePanelId, handleMenuButtonClick, handleClosePanel } = useStickyMenu(
    isVisible,
    initialActiveMenuId,
  )

  return (
    <nav className={cx('flex max-w-screen-lg m-auto w-full justify-between', className)}>
      {menuItems.map((item, i) => (
        <Fragment key={i}>
          <button
            type="button"
            className="group flex-1"
            value={i}
            onClick={() => handleMenuButtonClick(i)}
          >
            <MenuCell item={item} isActive={activeButtonId === i} />
          </button>
          {isVisible && activePanelId === i && (
            <MenuPanel item={item} onClosePanel={handleClosePanel} />
          )}
        </Fragment>
      ))}
    </nav>
  )
}

export default BAStickyMenu

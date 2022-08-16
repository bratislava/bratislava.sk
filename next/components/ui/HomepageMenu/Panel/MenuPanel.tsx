import { MenuMainItem, Panel, Waves } from '@bratislava/ui-bratislava'
import cx from 'classnames'
import React, { FC } from 'react'

import { MenuPanelItems } from './MenuPanelItems'

interface MenuPanelProps {
  item: MenuMainItem
  className?: string
  isStickyMenu?: boolean
}

export const MenuPanel: FC<MenuPanelProps> = ({ item, className, isStickyMenu = false }) => {
  return (
    <div className={cx('absolute w-full inset-x-0 mx-auto z-[999]', className)}>
      <div className="grid cursor-default bg-transparent pb-20">
        <Panel style={{ backgroundColor: item.color }} className={cx({ 'rounded-t-lg': isStickyMenu }, 'px-6 py-10')}>
          <div className="m-auto flex w-full flex-col md:grid md:max-w-screen-1.5lg md:grid-cols-3 md:gap-10">
            <MenuPanelItems subItems={item.subItems} />
          </div>
        </Panel>
        <Waves
          className="md:absolute md:bottom-0 md:z-30 md:w-full md:overflow-hidden md:bg-transparent"
          wavePosition="bottom"
          backgroundColor="transparent"
          waveColor={item.color}
          isRich
        />
      </div>
    </div>
  )
}

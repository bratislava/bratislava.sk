import { MenuMainItem, Panel, Waves } from '@bratislava/ui-bratislava'
import cx from 'classnames'
import React, { FC } from 'react'

import { MenuPanelItems } from './MenuPanelItems'

interface MenuPanelProps {
  item: MenuMainItem
  className?: string
}

export const MenuPanel: FC<MenuPanelProps> = ({ item, className }) => {
  return (
    <div className={cx('absolute w-full inset-x-0 z-[999] mx-auto md:mt-[130px] md:w-[80%]', className)}>
      <div className="z-30 grid cursor-default bg-transparent pb-20">
        <Panel style={{ backgroundColor: item.color }} className="rounded-t-lg px-6 py-10">
          <div className="m-auto flex w-full flex-col md:grid md:max-w-screen-1.5lg md:grid-cols-3 md:gap-10">
            <MenuPanelItems subItems={item.subItems} />
          </div>
        </Panel>
        <Waves
          className="hidden md:absolute md:bottom-0 md:z-30 md:w-full md:overflow-hidden md:bg-transparent"
          wavePosition="bottom"
          backgroundColor="transparent"
          waveColor={item.color}
          isRich
        />
      </div>
    </div>
  )
}

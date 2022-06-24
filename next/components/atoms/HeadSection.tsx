import * as React from 'react'
import cx from 'classnames'

import HomeIcon from '../../assets/images/home-icon.svg'
import { Button } from '@bratislava/ui-bratislava'
import { ArrowRight } from '@assets/images'

export type TSubSectionItems = {
  url: string
  title: string
}

export interface HeaderSectionProps {
  className?: string
  title: string
  icon: React.ReactNode
  items: TSubSectionItems[]
  dispayedItems?: { number: number; additionalUrl?: string }
}

const HeaderSection = ({ className, title, icon, items, dispayedItems }: HeaderSectionProps) => (
  <div className={cx(className, 'flex flex-col')}>
    <div className="flex items-center gap-x-4">
      {icon && icon}
      <div className="font-semibold text-xl">{title}</div>
    </div>
    <div className="flex flex-col mt-8 gap-y-3">
      {items?.slice(0, dispayedItems ? dispayedItems.number : items.length)?.map((item) => (
        <div key={item.title}>{item.title}</div>
      ))}
      {dispayedItems && (
        <Button icon={<HomeIcon />} hoverIcon={<ArrowRight />} shape="none">
          <a href={dispayedItems.additionalUrl}> Ďalšie</a>
        </Button>
      )}
    </div>
  </div>
)

export default HeaderSection

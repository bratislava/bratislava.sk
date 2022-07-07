import { TabBarTab, Venue, VenueProps } from '@bratislava/ui-bratislava'
import cx from 'classnames'
import React from 'react'

export type TVenuesTab = { key: string; title: string; venues?: VenueProps[] }

export interface IProps {
  className?: string
  title?: string
  tabs?: TVenuesTab[]
}

const VenueList = ({ className, title, tabs }: IProps) => {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const activeTab = tabs?.[activeIndex]

  return (
    <div className={cx(className, 'flex items-center flex-col py-56')}>
      <span className="w-96 px-5 text-center text-4xl font-semibold">{title}</span>

      <div className="my-20 flex space-x-5">
        {tabs?.map((tab, index) => (
          <TabBarTab
            className="w-20 "
            key={index}
            tab={tab}
            onClick={() => setActiveIndex(index)}
            isActive={activeIndex === index}
          />
        ))}
      </div>

      <div className="flex flex-col space-y-40">
        {activeTab?.venues?.map((venue, index) => (
          <Venue imageCardPosition={index % 2 === 0 ? 'left' : 'right'} key={index} {...venue} />
        ))}
      </div>
    </div>
  )
}

export default VenueList

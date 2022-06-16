import cx from 'classnames'
import React from 'react'
import { TabBarTab } from '../../TabBarTab/TabBarTab'
import { Venue, VenueProps } from '../../Venue/Venue'
import VenueImg from '../../../../assets/images/news.svg'

export type TVenuesTab = { key: string; title: string; venues?: VenueProps[] }

export interface VenueListProps {
  className?: string
  title?: string
  tabs?: TVenuesTab[]
}

export const VenueList = ({
  className,
  title = 'Zoznam priestorov',
  tabs = [
    {
      key: 'interior',
      title: 'Interiér',
      venues: [
        {
          title: 'Zrkadlová sieň',
          description: 'Reprezentatívny historický priestor určený pre významné kultúrno spoločenské udalosti. ',
          buttonTitle: 'Detail',
          // TODO fix types
          imageSrc: VenueImg as any,
          linkTitle: 'Rezervovať',
        },
        {
          title: 'Zrkadlová sieň',
          description: 'Reprezentatívny historický priestor určený pre významné kultúrno spoločenské udalosti. ',
          buttonTitle: 'Detail',
          // TODO fix types
          imageSrc: VenueImg as any,
          linkTitle: 'Rezervovať',
        },
      ],
    },
    {
      key: 'exterior',
      title: 'Exteriér',
      venues: [
        {
          title: 'Zrkadlová sieň',
          description: 'Reprezentatívny historický priestor určený pre významné kultúrno spoločenské udalosti. ',
          buttonTitle: 'Detail',
          // TODO fix types
          imageSrc: VenueImg as any,
          linkTitle: 'Rezervovať',
        },
      ],
    },
  ],
}: VenueListProps) => {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const venues = tabs[activeIndex]?.venues ?? tabs[0]?.venues ?? []

  return (
    <div className={cx(className, 'flex items-center flex-col py-56')}>
      <span className="font-semibold text-4xl w-96 px-5 text-center">{title}</span>

      <div className="flex space-x-5 my-20">
        {tabs?.map((tab, index) => (
          <TabBarTab
            className="w-20"
            key={index}
            tab={tab}
            onClick={() => setActiveIndex(index)}
            isActive={index === activeIndex}
          />
        ))}
      </div>

      <div className="flex flex-col space-y-40">
        {venues.map((venue, index) => (
          <Venue
            imageCardPosition={index % 2 === 0 ? 'left' : 'right'}
            key={index}
            title={venue.title}
            description={venue.description}
            buttonTitle={venue.buttonTitle}
            {...venue}
          />
        ))}
      </div>
    </div>
  )
}

export default VenueList

import cx from 'classnames'
import { useState } from 'react'

import RentImage from '../../../../assets/images/rent.svg'
import { HorizontalScrollWrapper } from '../../HorizontalScrollWrapper/HorizontalScrollWrapper'
import { Rent, RentProps } from '../../Rent/Rent'

export interface RentBenefitsProps {
  className?: string
  title?: string
  linkLabel?: string
  hasBackground?: boolean
  list?: Array<RentProps>
}

const LIST = [
  {
    icon: {
      url: RentImage,
    },
    title: 'Lorem ipsum',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit massa morbi tristique sit mi, faucibus.',
  },
  {
    icon: {
      url: RentImage,
    },
    title: 'Lorem ipsum',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit massa morbi tristique sit mi, faucibus.',
  },
  {
    icon: {
      url: RentImage,
    },
    title: 'Lorem ipsum',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit massa morbi tristique sit mi, faucibus.',
  },
]

// TODO fix types
export const RentBenefits = ({ className, title, linkLabel, hasBackground = false, list = LIST as any }: RentBenefitsProps) => {
  const[iconBg,setIconBg] = useState(hasBackground === true)
  return (
<div 
className='mt-4 md:flex md:flex-col md:items-center'>
    <h1 className="flex text-center text-2xl font-semibold md:text-4xl">{title}</h1>
    <HorizontalScrollWrapper
    className={cx( 'justify-between lg:w-full flex flex-row md:items-baseline px-7.5 -mx-7.5 lg:mx-0 lg:px-0',
      {
        'mb-0': iconBg,
      },
      {
        'mt-14' : title
      }
    )}>
      {list.map((item, index) => (
        <Rent key={index} {...item} linkLabel={linkLabel} className={cx(
          {
            'iconBackground': iconBg,
          },
        )}/>
      ))}
    </HorizontalScrollWrapper>
  </div>
  )
  
      }

export default RentBenefits

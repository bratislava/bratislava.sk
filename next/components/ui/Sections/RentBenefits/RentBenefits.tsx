import cx from 'classnames'
import { useState } from 'react'

import RentImage from '@assets/images/rent.svg'
import { HorizontalScrollWrapper } from '../../HorizontalScrollWrapper/HorizontalScrollWrapper'
import { Rent, RentProps } from '../../Rent/Rent'

export interface RentBenefitsProps {
  className?: string
  title?: string | null
  linkLabel?: string | null
  hasBackground?: boolean
  list?: Array<RentProps> | null
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
// TODO rename
export const RentBenefits = ({
  className,
  title,
  linkLabel,
  hasBackground = false,
  list = LIST as any,
}: RentBenefitsProps) => {
  const [iconBg, setIconBg] = useState(hasBackground === true)
  return (
    <div className="mt-4 md:flex md:flex-col md:items-center">
      <h1 className="text-h4 flex text-center">{title}</h1>
      <HorizontalScrollWrapper
        className={cx(
          '-mx-8 flex flex-row px-8 md:mx-0 md:w-full md:px-0 lg:flex-wrap ',
          {
            'mb-0': iconBg,
          },
          {
            'mt-14': title,
          },
        )}
      >
        {list?.map((item, index) => (
          <Rent
            key={index}
            {...item}
            linkLabel={linkLabel}
            className={cx(
              {
                iconBackground: iconBg,
              },
              {
                'shrink-0 grow-0 basis-1/4': list.length > 3,
              },
            )}
          />
        ))}
      </HorizontalScrollWrapper>
    </div>
  )
}

export default RentBenefits

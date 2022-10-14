import cx from 'classnames'

import { HorizontalScrollWrapper } from '../../HorizontalScrollWrapper/HorizontalScrollWrapper'
import { Rent, RentProps } from '../../Rent/Rent'

export interface RentBenefitsProps {
  className?: string
  title?: string | null
  linkLabel?: string
  hasBackground?: boolean
  list?: RentProps[] | null
}

export const RentBenefits = ({ title, linkLabel, hasBackground = false, list = [] }: RentBenefitsProps) => {
  const iconBg = hasBackground === true
  return (
    <div className="mt-4 md:flex md:flex-col md:items-center">
      <h1 className="flex text-center text-h4 font-semibold md:text-4xl">{title}</h1>
      <HorizontalScrollWrapper
        className={cx(
          'md:w-full flex lg:flex-wrap flex-row xs:items-center md:items-baseline -mx-7.5 px-7.5 md:px-0 md:mx-0 ',
          {
            'mb-0': iconBg,
          },
          {
            'mt-14': title,
          }
        )}
      >
        {list?.map((item, index) => (
          <Rent
            key={index}
            {...item}
            linkLabel={linkLabel}
            className={cx(
              {
                'iconBackground': iconBg,
              },
              {
                'w-[25%] shrink-0 grow-0 basis-1/4': list.length > 3,
              }
            )}
          />
        ))}
      </HorizontalScrollWrapper>
    </div>
  )
}

export default RentBenefits

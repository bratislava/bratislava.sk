import cx from 'classnames'
import RentImage from '../../../../assets/images/rent.svg'
import { HorizontalScrollWrapper } from '../../HorizontalScrollWrapper/HorizontalScrollWrapper'
import { Rent, RentProps } from '../../Rent/Rent'

export interface RentBenefitsProps {
  className?: string
  title?: string
  linkLabel?: string
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
export const RentBenefits = ({ className, title, linkLabel, list = LIST as any }: RentBenefitsProps) => (
  <div className="md:flex md:items-center md:flex-col mt-20">
    <h1 className="flex text-center text-2xl md:text-4xl font-semibold">{title}</h1>
    <HorizontalScrollWrapper className="flex md:items-baseline xs:items-center xs:gap-5 flex-row md:gap-x-12 lg:gap-x-24 my-14">
      {list.map((item, index) => (
        <Rent key={index} {...item} linkLabel={linkLabel} />
      ))}
    </HorizontalScrollWrapper>
  </div>
)

export default RentBenefits

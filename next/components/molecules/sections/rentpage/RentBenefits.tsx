import PrenajomImage from '@assets/images/PrenajomImage.png'
import { HorizontalScrollWrapper } from '@bratislava/ui-bratislava/HorizontalScrollWrapper/HorizontalScrollWrapper'
import { Rent, RentProps } from '@bratislava/ui-bratislava/Rent/Rent'
import { useTranslations } from 'next-intl'

export interface IProps {
  className?: string
  rents?: Array<RentProps>
}

const RENTS = [
  {
    image: PrenajomImage,
    title: 'Lorem ipsum',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit massa morbi tristique sit mi, faucibus.',
  },
  {
    image: PrenajomImage,
    title: 'Lorem ipsum',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit massa morbi tristique sit mi, faucibus.',
  },
  {
    image: PrenajomImage,
    title: 'Lorem ipsum',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit massa morbi tristique sit mi, faucibus.',
  },
]

const RentBenefits = ({ rents = RENTS }: IProps) => {
  const t = useTranslations()
  return (
    <div className="mt-20 md:flex md:flex-col md:items-center">
      <h1 className="text-h1 md:text-5xl ml-14  md:ml-0">{t('rentBenefits')}</h1>
      <HorizontalScrollWrapper className="my-14 md:grid-cols-3 md:gap-x-28 lg:gap-x-28 xl:gap-x-44">
        {rents.map((rent, index) => (
          <Rent key={index} {...rent} />
        ))}
      </HorizontalScrollWrapper>
    </div>
  )
}

export default RentBenefits

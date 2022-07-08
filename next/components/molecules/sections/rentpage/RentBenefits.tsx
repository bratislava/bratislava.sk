import { HorizontalScrollWrapper, Rent, RentProps } from '@bratislava/ui-bratislava'
import { useTranslation } from 'next-i18next'

import PrenajomImage from '../../../../assets/images/PrenajomImage.png'

export interface IProps {
  className?: string
  rents?: Array<RentProps>
}

const RENTS = [
  {
    image: PrenajomImage,
    title: 'Lorem ipsum',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit massa morbi tristique sit mi, faucibus.',
  },
  {
    image: PrenajomImage,
    title: 'Lorem ipsum',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit massa morbi tristique sit mi, faucibus.',
  },
  {
    image: PrenajomImage,
    title: 'Lorem ipsum',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit massa morbi tristique sit mi, faucibus.',
  },
]

const RentBenefits = ({ rents = RENTS }: IProps) => {
  const { t } = useTranslation()
  return (
    <div className="mt-20 md:flex md:flex-col md:items-center">
      <h1 className="ml-14 text-2xl font-semibold md:ml-0 md:text-5xl">{t('rentBenefits')}</h1>
      <HorizontalScrollWrapper className="my-14 md:grid-cols-3 md:gap-x-28 lg:gap-x-28 xl:gap-x-44">
        {rents.map((rent, index) => (
          <Rent key={index} {...rent} />
        ))}
      </HorizontalScrollWrapper>
    </div>
  )
}

export default RentBenefits

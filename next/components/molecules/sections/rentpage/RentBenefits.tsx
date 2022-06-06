import cx from 'classnames';
import PrenajomImage from '../../../assets/images/PrenajomImage.png';
import {
  HorizontalScrollWrapper,
  Rent,
  RentProps,
} from '@bratislava/ui-bratislava';

export interface IProps {
  className?: string;
  rents?: Array<RentProps>;
}

const RENTS = [
  {
    image: PrenajomImage.src,
    title: 'Lorem ipsum',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit massa morbi tristique sit mi, faucibus.',
  },
  {
    image: PrenajomImage.src,
    title: 'Lorem ipsum',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit massa morbi tristique sit mi, faucibus.',
  },
  {
    image: PrenajomImage.src,
    title: 'Lorem ipsum',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit massa morbi tristique sit mi, faucibus.',
  },
];

const RentBenefits = ({ className, rents = RENTS }: IProps) => (
  <div className="md:flex md:items-center md:flex-col mt-20">
    <h1 className="ml-14 text-2xl md:ml-0 md:text-5xl font-semibold">
      Výhoda prenájmu
    </h1>
    <HorizontalScrollWrapper className="md:grid-cols-3 md:gap-x-28 lg:gap-x-28 xl:gap-x-44 my-14">
      {rents.map((rent, index) => (
        <Rent key={index} {...rent} />
      ))}
    </HorizontalScrollWrapper>
  </div>
);

export default RentBenefits;

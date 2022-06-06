import { InBaCard, InBaCardProps } from '../../InBaCard/InBaCard';
import cx from 'classnames';
import Image1 from '../../../assets/images/inBa1.svg';
import Image2 from '../../../assets/images/inBa2.svg';

export interface InBaProps {
  className?: string;
  inBaCards?: InBaCardProps[];
}

const INBACARDS = [
  {
    images: [Image1, Image2],
    title: 'in.ba',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    buttonContent: 'Lorem ipsum dolor',
  },
  {
    images: [Image1, Image2],
    title: 'in.ba',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    buttonContent: 'Lorem ipsum dolor',
  },
];

export const InBa = ({ className, inBaCards = INBACARDS }: InBaProps) => (
  <div
    className={cx(className, 'max-w-screen-1.5xl md:px-12 xl:px-41 md:mx-auto')}
  >
    <div className={(cx(className), 'flex flex-col items-center gap-y-20')}>
      {inBaCards?.map((inBaCard, index) => (
        <InBaCard key={index} {...inBaCard} />
      ))}
    </div>
  </div>
);

export default InBa;

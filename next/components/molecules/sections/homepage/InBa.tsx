import { InBaCard, InBaCardProps } from '@bratislava/ui-bratislava';
import cx from 'classnames';
import React from 'react';
import Container from '../../../atoms/Container';
import Image1 from '../../../assets/images/inBa1.svg';
import Image2 from '../../../assets/images/inBa2.svg';

export interface PostsProps {
  className?: string;
  inBaCards?: InBaCardProps[];
}

const InBa = ({
  className,
  inBaCards = [
    {
      images: [Image1, Image2],
      title: 'in.ba',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      images: [Image1, Image2],
      title: 'in.ba',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
  ],
}: PostsProps) => (
  <Container>
    <div className={(cx(className), 'flex flex-col items-center gap-y-20')}>
      {inBaCards.map((inBaCard, index) => (
        <InBaCard key={index} {...inBaCard} />
      ))}
    </div>
  </Container>
);

export default InBa;

import cx from 'classnames';
import { HorizontalScrollWrapper } from '../HorizontalScrollWrapper/HorizontalScrollWrapper';
import { TopNineItem, TopNineItemProps } from '../TopNineItem/TopNineItem';

interface IProps {
  className?: string;
  items?: TopNineItemProps[];
}

export const TopNine = ({ className, items }: IProps) => (
  <HorizontalScrollWrapper
    className={cx(
      'lg:grid lg:grid-cols-3 gap-x-14 lg:gap-x-44 lg:gap-y-16 xs:gap-x-56 xs:grid xs:grid-cols-9 xs:overflow',
      className
    )}
  >
    {items?.map((item, index) => (
      <TopNineItem key={index} {...item} />
    ))}
  </HorizontalScrollWrapper>
);

export default TopNine;

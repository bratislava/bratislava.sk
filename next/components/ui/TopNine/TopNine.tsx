import cx from 'classnames'

import { HorizontalScrollWrapper } from '../HorizontalScrollWrapper/HorizontalScrollWrapper'
import { TopNineItem, TopNineItemProps } from '../TopNineItem/TopNineItem'

interface IProps {
  className?: string
  items?: TopNineItemProps[]
}

export const TopNine = ({ className, items }: IProps) => (
  <HorizontalScrollWrapper
    className={cx(
      'xs:overflow -mx-8 flex gap-x-14 px-8 xs:mb-8 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-x-44 lg:gap-y-16 lg:px-8',
      className,
    )}
  >
    {items?.map((item, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <TopNineItem key={index} {...item} />
    ))}
  </HorizontalScrollWrapper>
)

export default TopNine

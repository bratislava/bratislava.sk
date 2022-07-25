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
      'flex lg:grid lg:grid-cols-3 gap-x-14 lg:gap-x-44 lg:gap-y-16 xs:overflow xs:mb-8 -mx-7.5 px-7.5 lg:px-7.5 lg:mx-0',
      className
    )}
  >
    {items?.map((item, index) => (
      <TopNineItem key={index} {...item} />
    ))}
  </HorizontalScrollWrapper>
)

export default TopNine

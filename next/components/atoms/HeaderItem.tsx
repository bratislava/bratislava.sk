import { Button } from '@bratislava/ui-bratislava'
import cx from 'classnames'
import * as React from 'react'

import ChevronRight from '../../assets/images/chevron-right.svg'
import HeaderSections from '../molecules/HeadSections'

interface IProps {
  className?: string
  icon: React.ReactNode
  title?: React.ReactNode
  index?: number
}

const HeaderItem = ({
  className,
  icon = <ChevronRight />,
  title = (
    <div>
      Mesto <br />
      Bratislava
    </div>
  ),
  // index,
}: IProps) => (
  <div className="group">
    <Button
      className={cx(className, 'hover:bg-secondary w-full border-primary border-2 hover:text-font')}
      icon={icon}
      iconPosition="left"
      shape="none"
    >
      <p className="text-p2-medium">{title}</p>
    </Button>
    <HeaderSections className={cx('absolute left-0 right-0 hidden group-hover:block z-10')} />
  </div>
)

export default HeaderItem

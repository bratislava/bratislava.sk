import cx from 'classnames'
import * as React from 'react'

import HomeIcon from '../../assets/images/home-icon.svg'
import HeaderItem from '../atoms/HeaderItem'

interface IProps {
  className?: string
  headerItems: { icon: React.ReactNode; title: React.ReactNode }[]
}

const HeaderItems = ({
  className,
  headerItems = [
    {
      icon: <HomeIcon />,
      title: (
        <div>
          Mesto <br />
          Bratislava
        </div>
      ),
    },
    {
      icon: <HomeIcon />,
      title: (
        <div>
          Mesto <br />
          Bratislava
        </div>
      ),
    },
    {
      icon: <HomeIcon />,
      title: (
        <div>
          Mesto <br />
          Bratislava
        </div>
      ),
    },
    {
      icon: <HomeIcon />,
      title: (
        <div>
          Mesto <br />
          Bratislava
        </div>
      ),
    },
    {
      icon: <HomeIcon />,
      title: (
        <div>
          Mesto <br />
          Bratislava
        </div>
      ),
    },
    {
      icon: <HomeIcon />,
      title: (
        <div>
          Mesto <br />
          Bratislava
        </div>
      ),
    },
  ],
}: IProps) => (
  <div className={cx(className, 'mx-40 relative')}>
    <div className="grid grid-cols-3">
      {headerItems.map((headerItem, index) => (
        <HeaderItem index={index} icon={headerItem.icon} title={headerItem.title} />
      ))}
    </div>
  </div>
)

export default HeaderItems

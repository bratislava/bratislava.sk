import { FC, ReactNode } from 'react'

import { Icon } from '../icon/Icon'
import { ButtonItemProps } from './types'

interface Props {
  isActive: boolean
  iconItems?: ButtonItemProps[]
  children: ReactNode
}

export const MenuButton: FC<Props> = ({ isActive = false, iconItems = [], children }) => {
  const [firstBtn, secondBtn, __rest] = iconItems

  return (
    <>
      {!isActive && (
        <div key={firstBtn.iconName}>
          <Icon iconName={firstBtn.iconName} />
        </div>
      )}
      {isActive && (
        <div key={secondBtn.iconName}>
          <Icon iconName={secondBtn.iconName} />
        </div>
      )}
      <div>
        <p className="typography-tag-label text-p2 whitespace-pre text-left text-gray-dark lg:text-center">
          {children}
        </p>
      </div>
    </>
  )
}

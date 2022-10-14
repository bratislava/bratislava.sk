import { FC, ReactNode } from 'react'

import { Icon } from '../icon/Icon'
import { ButtonItemProps } from './types'

interface Props {
  isActive: boolean
  iconItems?: ButtonItemProps[]
  children: ReactNode
}

export const MenuButton: FC<Props> = ({ isActive = false, iconItems, children }) => {
  if (!iconItems) {
    return null
  }

  const [firstBtn, secondBtn, __rest] = iconItems

  return (
    <div className="flex flex-row items-center justify-between gap-x-2 lg:flex-col">
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
        <p className="typography-tag-label whitespace-pre text-p2 text-gray-dark lg:mt-3 lg:text-center">
          {children}
        </p>
      </div>
    </div>
  )
}

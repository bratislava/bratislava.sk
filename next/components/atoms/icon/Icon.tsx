import { FC, useMemo } from 'react'

import { getIcon, MenuIcon } from './IconService'

interface Props {
  iconName: MenuIcon | undefined
  className?: string
}

export const Icon: FC<Props> = ({ iconName, className }) => {
  const iconCollection = useMemo(() => getIcon(iconName), [iconName])

  if (!iconCollection?.size_48) {
    return null
  }

  return <iconCollection.size_48 className={className} />
}

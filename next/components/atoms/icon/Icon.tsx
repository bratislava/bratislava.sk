import { FC, useMemo } from 'react'

import { getIcon, MenuIcon } from './IconService'

interface Props {
  iconName: MenuIcon | undefined
}

export const Icon: FC<Props> = ({ iconName }) => {
  const iconCollection = useMemo(() => getIcon(iconName), [iconName])

  if (!iconCollection) {
    return null
  }

  return (
    // TODO revisit icon sizing
    <div className="scale-[83.33%]">
      <iconCollection.size_48 width={48} height={48} />
    </div>
  )
}

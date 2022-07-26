import Image from 'next/image'
import { FC, useMemo } from 'react'

import { getIcon, MenuIcon } from './IconService'

interface Props {
  iconName: MenuIcon
}

export const Icon: FC<Props> = ({ iconName }) => {
  const iconCollection = useMemo(() => getIcon(iconName), [iconName])

  if (!iconCollection) {
    return null
  }

  return (
    <>
      <div className="hidden lg:block">
        <Image src={iconCollection.size_64} width={64} height={64} />
      </div>
      <div className="block lg:hidden">
        <Image src={iconCollection.size_48} width={48} height={48} />
      </div>
    </>
  )
}

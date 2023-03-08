import Image from "next/legacy/image";
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
    <>
      <div className="hidden md:block">
        <Image src={iconCollection.size_64} width={64} height={64} />
      </div>
      <div className="block md:hidden">
        <Image src={iconCollection.size_48} width={48} height={48} />
      </div>
    </>
  )
}

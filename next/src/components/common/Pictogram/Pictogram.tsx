import { FC, useMemo } from 'react'

import { getPictogram, MenuIcon } from '@/src/components/common/Pictogram/getPictogram'

type Props = {
  iconName: MenuIcon | undefined
  className?: string
}

/**
 * TODO use naming `pictogram` instead of `icon`
 *
 * @param iconName
 * @param className
 * @constructor
 */
const Pictogram: FC<Props> = ({ iconName, className }) => {
  const iconCollection = useMemo(() => getPictogram(iconName), [iconName])

  if (!iconCollection?.size_48) {
    return null
  }

  return <iconCollection.size_48 className={className} />
}

export default Pictogram

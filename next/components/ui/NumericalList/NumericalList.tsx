// @ts-strict-ignore
import { NumericalListItemObject } from '@bratislava/ui-bratislava'

import { NumericalListItem } from '../NumericalListItem/NumericalListItem'

export interface NumericalListProps {
  items: NumericalListItemObject[]
  hasBackground: boolean
  variant?: 'basic' | 'combined' | 'roadmap'
}

export const NumericalList = ({ items, hasBackground, variant }: NumericalListProps) => {
  return (
    <>
      {items.map((item, index) => (
        <NumericalListItem
          key={index}
          index={index}
          item={item}
          variant={variant}
          hasBackground={hasBackground}
        />
      ))}
    </>
  )
}

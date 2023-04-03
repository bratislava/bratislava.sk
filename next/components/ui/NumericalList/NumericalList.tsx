// @ts-strict-ignore
import { NumericalListItemObject } from '@bratislava/ui-bratislava'

import { NumericalListItem } from '../NumericalListItem/NumericalListItem'

export interface NumericalListProps {
  items: NumericalListItemObject[] | null | undefined
  hasBackground: boolean | null | undefined
  variant?: 'basic' | 'combined' | 'roadmap'
}

export const NumericalList = ({ items, hasBackground, variant }: NumericalListProps) => {
  return (
    <>
      {items?.map((item, index) => (
        <NumericalListItem
          // eslint-disable-next-line react/no-array-index-key
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

import NumericalListItem from '@/components/ui/NumericalListItem/NumericalListItem'
import { NumericalListItemObject } from '@/components/ui/NumericalListSectionUI/NumericalListSectionUI'

export type NumericalListProps = {
  items: NumericalListItemObject[] | null | undefined
  hasBackground: boolean | null | undefined
  variant?: 'basic' | 'combined' | 'roadmap'
}

const NumericalList = ({ items, hasBackground, variant = 'basic' }: NumericalListProps) => {
  return (
    <>
      {items?.map((item, index) => (
        <NumericalListItem
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          index={index}
          item={item}
          variant={variant}
          hasBackground={hasBackground ?? undefined}
        />
      ))}
    </>
  )
}

export default NumericalList

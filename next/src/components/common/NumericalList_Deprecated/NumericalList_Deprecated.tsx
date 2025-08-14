import NumericalListItem from '@/src/components/common/NumericalList_Deprecated/NumericalListItem_Deprecated'
import SectionHeader from '@/src/components/layouts/SectionHeader'

export type NumericalListProps = {
  title: string | null | undefined
  text: string | null | undefined
  items: string[] | null | undefined
  variant?: 'basic' | 'roadmap'
}

const NumericalList = ({ title, text, items, variant = 'basic' }: NumericalListProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 lg:gap-12">
      <SectionHeader title={title} text={text} isCentered />

      <div className="flex max-w-(--breakpoint-md) flex-col">
        {items?.map((item, index) => (
          <NumericalListItem
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            index={index}
            text={item}
            variant={variant}
          />
        ))}
      </div>
    </div>
  )
}

export default NumericalList

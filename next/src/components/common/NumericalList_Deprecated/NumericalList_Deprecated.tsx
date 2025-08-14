import Button from '@/src/components/common/Button/Button'
import NumericalListItem from '@/src/components/common/NumericalList_Deprecated/NumericalListItem_Deprecated'
import SectionHeader from '@/src/components/layouts/SectionHeader'

export type NumericalListItemObject = {
  text?: string | null
}

export type NumericalListProps = {
  title: string | null | undefined
  items: NumericalListItemObject[] | null | undefined
  buttonText?: string | null | undefined
  buttonLink?: string | null | undefined
  variant?: 'basic' | 'roadmap'
}

const NumericalList = ({
  title,
  items,
  buttonText,
  buttonLink,
  variant = 'basic',
}: NumericalListProps) => {
  const href = buttonLink?.length ? buttonLink : '#'

  return (
    <div className="flex flex-col items-center justify-center gap-8 lg:gap-12">
      <SectionHeader title={title} isCentered />

      <div className="flex max-w-(--breakpoint-md) flex-col">
        {items?.map((item, index) => (
          <NumericalListItem
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            index={index}
            item={item}
            variant={variant}
          />
        ))}
      </div>
      {variant !== 'roadmap' && buttonLink && buttonText ? (
        <Button href={href} variant="outline">
          {buttonText}
        </Button>
      ) : null}
    </div>
  )
}

export default NumericalList

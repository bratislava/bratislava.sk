import Markdown from '@/src/components/formatting/Markdown/Markdown'
import DashedLine from '@/src/components/sections/NumericalListSection_Deprecated/DashedLine_Deprecated'
import cn from '@/src/utils/cn'

export type NumericalListItemProps = {
  index: number
  text: string
  variant: 'basic' | 'roadmap'
}

const NumericalListItem = ({ index, text, variant }: NumericalListItemProps) => {
  return (
    <div>
      {variant === 'roadmap' && index > 0 ? (
        <DashedLine
          className="relative top-0 left-0 -mt-8 -mb-10 -ml-2"
          position={index % 2 === 0 ? 'left' : 'right'}
          color="var(--color-category-600)"
          aria-hidden
        />
      ) : null}

      <div
        className={cn('flex items-center', {
          'h-16 gap-8 lg:gap-12': variant === 'roadmap',
          'gap-6 lg:gap-8': variant !== 'roadmap',
          'mt-6': variant !== 'roadmap' && index !== 0,
        })}
      >
        <div
          className={cn(
            'z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-category-600 text-size-h5 font-semibold text-white',
          )}
        >
          {index + 1}
        </div>

        <Markdown content={text} />
      </div>
    </div>
  )
}

export default NumericalListItem

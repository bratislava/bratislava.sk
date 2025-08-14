import CompleteDashedLineSvg from '@/src/components/common/NumericalList_Deprecated/CompleteDashedLineSvg_Deprecated'
import cn from '@/src/utils/cn'

export type DashedLineProps = {
  position?: string
  color: string
  className?: string
}

const DashedLine = ({ position, className, color }: DashedLineProps) => {
  return (
    <div className={cn('h-24 overflow-hidden', className)}>
      {position === 'right' ? (
        <CompleteDashedLineSvg color={color} />
      ) : (
        <CompleteDashedLineSvg className="bottom-0" color={color} />
      )}
    </div>
  )
}

export default DashedLine

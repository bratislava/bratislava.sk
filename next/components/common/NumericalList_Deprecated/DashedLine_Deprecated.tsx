import { twMerge } from 'tailwind-merge'

import CompleteDashedLineSvg from '@/components/common/NumericalList_Deprecated/CompleteDashedLineSvg_Deprecated'

export type DashedLineProps = {
  position: string
  className: string
  color: string
}

const DashedLine = ({ position, className, color }: DashedLineProps) => {
  return (
    <div className={twMerge('relative h-[170px] overflow-hidden md:h-24', className)}>
      {position === 'right' ? (
        <CompleteDashedLineSvg color={color} />
      ) : (
        <CompleteDashedLineSvg className="bottom-0" color={color} />
      )}
    </div>
  )
}

export default DashedLine

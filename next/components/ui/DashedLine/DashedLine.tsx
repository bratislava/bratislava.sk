import { twMerge } from 'tailwind-merge'

import CompleteDashedLine from '@/components/ui/DashedLine/dashedLines/CompleteDashedLine'

export type DashedLineProps = {
  position: string
  className: string
  color: string
}

const DashedLine = ({ position, className, color }: DashedLineProps) => {
  return (
    <div className={twMerge('relative h-[170px] overflow-hidden md:h-24', className)}>
      {position === 'right' ? (
        <CompleteDashedLine color={color} />
      ) : (
        <CompleteDashedLine className="bottom-0" color={color} />
      )}
    </div>
  )
}

export default DashedLine

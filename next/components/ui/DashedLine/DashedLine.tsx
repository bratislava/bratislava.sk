import cx from 'classnames'

import { CompleteDashedLine } from './dashedLines/CompleteDashedLine'

export interface DashedLineProps {
  position: string
  className: string
  color: string
}

export const DashedLine = ({ position, className, color }: DashedLineProps) => {
  return (
    <div className={cx('h-[170px] md:h-24 overflow-hidden relative', className)}>
      {position === 'right' ? (
        <CompleteDashedLine color={color} />
      ) : (
        <CompleteDashedLine className="bottom-0" color={color} />
      )}
    </div>
  )
}

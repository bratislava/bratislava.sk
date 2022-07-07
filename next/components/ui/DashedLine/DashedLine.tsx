import { CompleteDashedLine } from './dashedLines/CompleteDashedLine'
import cx from 'classnames'

export interface DashedLineProps {
  position: string
  className: string
  color: string
}

export const DashedLine = ({ position, className, color }: DashedLineProps) => {
  return (
    <div className={cx('h-[170px] md:h-[100px] overflow-hidden relative', className)}>
      {position === 'right' ? (
        <CompleteDashedLine color={color} />
      ) : (
        <CompleteDashedLine className={'bottom-0'} color={color} />
      )}
    </div>
  )
}

import LeftArrowIcon from '@assets/images/forms/tooltip_left_arrow_icon.svg'
import TopArrowIcon from '@assets/images/forms/tooltip_top_arrow_icon.svg'
import cx from 'classnames'
import { FC } from 'react'

interface TooltipProps {
  text: string
  visible: boolean
  arrow?: 'top' | 'right' | 'bottom' | 'left'
  alignArrow?: 'left' | 'center' | 'right'
  absolute?: boolean
  top?: number
  bottom?: number
  left?: number
  right?: number
  className?: string
}

const Tooltip: FC<TooltipProps> = (props: TooltipProps) => {
  const { text, visible, arrow, alignArrow, absolute, top, bottom, left, right, className } = props

  const positionStyle = {
    top: top !== undefined ? `${top}px` : 'auto',
    bottom: bottom !== undefined ? `${bottom}px` : 'auto',
    left: left !== undefined ? `${left}px` : 'auto',
    right: right !== undefined ? `${right}px` : 'auto'
  }

  const tooltipClassNames = cx(
    "flex",
    {
      "hidden": !visible,
      "flex-col": arrow === 'top',
      "flex-col-reverse": arrow === 'bottom',
      "flex-row": arrow === 'left',
      "flex-row-reverse": arrow === 'right',
      "absolute": absolute,
    },
    className
  )

  const arrowClassNames = cx(
    "flex",
    {
      "hidden": !arrow,
      "flex-row": arrow && ['top', 'bottom'].includes(arrow),
      "flex-col": arrow && ['left', 'right'].includes(arrow),
      "[&>svg]:rotate-180": arrow && ['bottom', 'right'].includes(arrow),
      "justify-start pl-4": arrow && ['top', 'bottom'].includes(arrow) && alignArrow === 'left',
      "justify-center": arrow && (['left', 'right'].includes(arrow) || !alignArrow || alignArrow === 'center'),
      "justify-end pr-4": arrow && ['top', 'bottom'].includes(arrow) && alignArrow === 'right',
    }
  )

  return (
    <div className={tooltipClassNames} style={positionStyle}>
      <div className={arrowClassNames}>
        {
          arrow && ['top', 'bottom'].includes(arrow) && <TopArrowIcon />
        }
        {
          arrow && ['left', 'right'].includes(arrow) && <LeftArrowIcon />
        }
      </div>
      <div className="min-w-min max-w-xs rounded bg-universal-gray-700 py-3 px-14 text-white">
        {text}
      </div>
    </div>
  )
}

export default Tooltip

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
  top?: boolean
  bottom?: boolean
  left?: boolean
  right?: boolean
  className?: string
}

const Tooltip: FC<TooltipProps> = (props: TooltipProps) => {
  const { text, visible, arrow, alignArrow, absolute, top, bottom, left, right, className } = props

  const tooltipClassNames = cx(
    "flex",
    {
      "hidden": !visible,
      "flex-col": arrow === 'top',
      "flex-col-reverse": arrow === 'bottom',
      "flex-row": arrow === 'left',
      "flex-row-reverse": arrow === 'right',
      "absolute": absolute,
      "top-0": top,
      "bottom-0": bottom,
      "left-0": left,
      "right-0": right
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
    <div className={tooltipClassNames}>
      <div className={arrowClassNames}>
        {
          arrow && ['top', 'bottom'].includes(arrow) && <TopArrowIcon />
        }
        {
          arrow && ['left', 'right'].includes(arrow) && <LeftArrowIcon />
        }
      </div>
      <div className="min-w-min max-w-xs break-all rounded bg-universal-gray-700 py-3 px-14 text-white">
        {text}
      </div>
    </div>
  )
}

export default Tooltip

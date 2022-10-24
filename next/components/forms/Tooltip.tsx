import LeftArrowIcon from '@assets/images/forms/tooltip_left_arrow_icon.svg'
import TopArrowIcon from '@assets/images/forms/tooltip_top_arrow_icon.svg'
import cx from 'classnames'
import { FC } from 'react'

interface TooltipProps {
  text: string
  visible: boolean
  arrow?: 'top' | 'right' | 'bottom' | 'left'
  alignArrow?: 'left' | 'center' | 'right'
}

const Tooltip: FC<TooltipProps> = ({ text, visible, arrow, alignArrow }: TooltipProps) => {
  const tooltipClassNames = cx(
    "flex",
    {
      "hidden": !visible,
      "flex-col": arrow === 'top',
      "flex-col-reverse": arrow === 'bottom',
      "flex-row": arrow === 'left',
      "flex-row-reverse": arrow === 'right'
    }
  )

  const arrowClassNames = cx(
    "flex",
    {
      "hidden": !arrow,
      "flex-row": arrow && ['top', 'bottom'].includes(arrow),
      "flex-col": arrow && ['left', 'right'].includes(arrow),
      "[&>svg]:rotate-180": arrow && ['bottom', 'right'].includes(arrow),
      "justify-start": arrow && ['top', 'bottom'].includes(arrow) && alignArrow === 'left',
      "justify-center": arrow && (['left', 'right'].includes(arrow) || !alignArrow || alignArrow === 'center'),
      "justify-end": arrow && ['top', 'bottom'].includes(arrow) && alignArrow === 'right',
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

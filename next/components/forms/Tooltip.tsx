import ArrowIcon from '@assets/images/forms/tooltip_arrow_icon.svg'
import cx from 'classnames'
import { FC } from 'react'

interface TooltipProps {
  text: string
  visible: boolean
  arrow?: 'top' | 'right' | 'bottom' | 'left'
}

const Tooltip: FC<TooltipProps> = ({ text, visible }: TooltipProps) => {
  const tooltipClassNames = cx(

    {
      "hidden": !visible
    }
  )

  return (
    <div className={tooltipClassNames}>
      <div className="flex flex-row justify-center">
        <ArrowIcon />
      </div>
      <div className="min-w-min max-w-xs break-all rounded bg-universal-gray-700 py-3 px-14 text-white">
        {text}
      </div>
    </div>
  )
}

export default Tooltip

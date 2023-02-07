import HelpIcon from '@assets/images/forms/icon-help.svg'
import React, { useState } from 'react'

import Tooltip from '../info-components/Tooltip'

interface TooltipProps {
  tooltip?: string
}

const TooltipComponent = ({ tooltip }: TooltipProps) => {
  const [isTooltipOpened, setIsTooltipOpened] = useState<boolean>(false)
  const [isTooltipClicked, setIsTooltipClicked] = useState<boolean>(false)

  return (
    <div className="w-max">
      {
        /* TOOLTIP */
        tooltip && (
          <div className="relative">
            <Tooltip
              text={tooltip}
              visible={isTooltipOpened}
              arrow="bottom"
              alignArrow="right"
              bottom={0}
              right={-13}
              absolute
            />
          </div>
        )
      }
      <div>
        {
          /* TOOLTIP ICON */
          tooltip && (
            <div className="w-6 h-6 cursor-pointer">
              <HelpIcon
                onClick={() => setIsTooltipClicked((prev) => !prev)}
                onMouseOver={() => setIsTooltipOpened(true)}
                onMouseLeave={() => !isTooltipClicked && setIsTooltipOpened(false)}
              />
            </div>
          )
        }
      </div>
    </div>
  )
}

export default TooltipComponent

import Tooltip from 'components/forms/info-components/Tooltip/Tooltip'

interface TooltipProps {
  tooltip?: string
}

const TooltipComponent = ({ tooltip }: TooltipProps) => {
  return tooltip ? (
    <Tooltip text={tooltip} arrow="bottom" alignArrow="right" bottom={30} right={-12} />
  ) : null
}

export default TooltipComponent

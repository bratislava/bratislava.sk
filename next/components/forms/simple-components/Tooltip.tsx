import Tooltip from 'components/forms/info-components/Tooltip/Tooltip'

interface TooltipProps {
  tooltip?: string
}

const TooltipComponent = ({ tooltip }: TooltipProps) => {
  return tooltip ? <Tooltip position="top-right" text={tooltip} /> : null
}

export default TooltipComponent

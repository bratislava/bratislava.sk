import { FC } from 'react'

interface TooltipProps {
  text: string
}

const Tooltip: FC<TooltipProps> = ({text}: TooltipProps) => {
  return (
    <div>
      <div className="min-w-min max-w-xs break-all rounded bg-universal-gray-700 py-3 px-14 text-white">
        {text}
      </div>
    </div>
  )
}

export default Tooltip

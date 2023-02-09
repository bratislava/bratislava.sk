import HelpIcon from '@assets/images/forms/icon-help.svg'
import cx from 'classnames'
import TooltipPopup from 'components/forms/info-components/Tooltip/TooltipPopup'
import { useRef, useState } from 'react'
import { TooltipTriggerProps, useHover } from 'react-aria'
import { useTooltipTriggerState } from 'react-stately'

type TooltipPopupBase = {
  text?: string
  arrow?: 'top' | 'right' | 'bottom' | 'left'
  alignArrow?: 'left' | 'center' | 'right'
  absolute?: boolean
  top?: number
  bottom?: number
  left?: number
  right?: number
  className?: string
} & TooltipTriggerProps

const Tooltip = (props: TooltipPopupBase) => {
  const { text, arrow, alignArrow, absolute = true, top, bottom, left, right, className } = props

  const ref = useRef<HTMLButtonElement>(null)
  const state = useTooltipTriggerState(props)

  const [isClicked, setIsClicked] = useState<boolean>(false)

  const { hoverProps } = useHover({
    onHoverStart() {
      state.open(true)
    },
    onHoverEnd() {
      if (!isClicked) state.close(true)
    },
  })
  return (
    <span className="relative w-5 h-5 sm:w-6 sm:h-6">
      <button
        type="button"
        ref={ref}
        onClick={() => setIsClicked((prev) => !prev)}
        {...hoverProps}
        className={cx('w-full outline-none cursor-pointer', {
          'bg-gray-800 rounded-full text-white': isClicked,
        })}
      >
        <HelpIcon />
      </button>
      {(state.isOpen || isClicked) && (
        <TooltipPopup
          text={text}
          arrow={arrow}
          alignArrow={alignArrow}
          top={top}
          bottom={bottom}
          left={left}
          right={right}
          className={className}
          absolute={absolute}
        />
      )}
    </span>
  )
}

export default Tooltip

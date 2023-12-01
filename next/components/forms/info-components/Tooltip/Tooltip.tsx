import HelpIcon from '@assets/images/forms/icon-help.svg'
import Button from '@components/forms/simple-components/Button'
import TooltipPopup from 'components/forms/info-components/Tooltip/TooltipPopup'
import { useTranslations } from 'next-intl'
import { useRef, useState } from 'react'
import { TooltipTriggerProps, useHover } from 'react-aria'
import { useTooltipTriggerState } from 'react-stately'
import { useOnClickOutside } from 'usehooks-ts'

type TooltipPopupBase = {
  text?: string
  arrow?: boolean
  position?:
    | 'top-right'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-left'
    | 'right-top'
    | 'right-bottom'
    | 'left-top'
    | 'left-bottom'
  className?: string
} & TooltipTriggerProps

const Tooltip = (props: TooltipPopupBase) => {
  const { text, arrow, className, position } = props

  const t = useTranslations()

  const ref = useRef<HTMLButtonElement>(null)
  const state = useTooltipTriggerState(props)

  const [isClicked, setIsClicked] = useState<boolean>(false)

  useOnClickOutside(ref, () => setIsClicked(false))
  const { onPointerEnter, onPointerLeave } = useHover({
    onHoverStart() {
      state.open(true)
    },
    onHoverEnd() {
      state.close(true)
    },
  }).hoverProps

  return (
    <span className="relative h-5 w-5 sm:h-6 sm:w-6">
      <Button
        ref={ref}
        variant="unstyled"
        className="w-full cursor-pointer outline-none"
        aria-label={t('openTooltip')}
        onPress={() => setIsClicked((prev) => !prev)}
        icon={<HelpIcon />}
        onPointerEnter={onPointerEnter}
        onPointerLeaver={onPointerLeave}
      />
      {(state.isOpen || isClicked) && (
        <TooltipPopup text={text} arrow={arrow} className={className} position={position} />
      )}
    </span>
  )
}

export default Tooltip

import TooltipPopup from 'components/forms/info-components/Tooltip/TooltipPopup'
import { useTranslations } from 'next-intl'
import { useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'

import HelpIcon from '@/assets/images/forms/icon-help.svg'
import Button from '@/components/forms/simple-components/Button'

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
}

const Tooltip = (props: TooltipPopupBase) => {
  const { text, arrow, className, position } = props

  const t = useTranslations()

  const ref = useRef<HTMLButtonElement>(null)

  const [isClicked, setIsClicked] = useState<boolean>(false)

  useOnClickOutside(ref, () => setIsClicked(false))

  return (
    <span className="relative h-5 w-5 sm:h-6 sm:w-6">
      <Button
        ref={ref}
        variant="unstyled"
        className="w-full cursor-pointer outline-none"
        aria-label={t('openTooltip')}
        onPress={() => setIsClicked((prev) => !prev)}
        icon={<HelpIcon />}
      />
      {isClicked && (
        <TooltipPopup text={text} arrow={arrow} className={className} position={position} />
      )}
    </span>
  )
}

export default Tooltip

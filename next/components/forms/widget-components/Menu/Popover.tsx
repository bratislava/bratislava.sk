import type { AriaPopoverProps } from '@react-aria/overlays'
import { DismissButton, Overlay, usePopover } from '@react-aria/overlays'
import * as React from 'react'
import type { OverlayTriggerState } from 'react-stately'

interface PopoverProps extends Omit<AriaPopoverProps, 'popoverRef'> {
  children: React.ReactNode
  state: OverlayTriggerState
}

const Popover = (props: PopoverProps) => {
  const ref = React.useRef<HTMLDivElement>(null)
  const { state, children } = props

  const { popoverProps, underlayProps } = usePopover(
    {
      ...props,
      popoverRef: ref,
    },
    state,
  )

  // <div className="absolute top-12 -left-3 z-20 mt-1 flex h-auto cursor-default flex-col items-center justify-center lg:left-0">
  // <div className="flex h-auto min-h-[60px] w-full flex-col rounded-lg bg-white py-2 shadow-lg"></div>

  return (
    <Overlay>
      <div {...underlayProps} className="fixed inset-0" />
      <div {...popoverProps} ref={ref} className="z-20 shadow-lg bg-white rounded-lg mt-5">
        <DismissButton onDismiss={state.close} />
        {children}
        <DismissButton onDismiss={state.close} />
      </div>
    </Overlay>
  )
}

export default Popover

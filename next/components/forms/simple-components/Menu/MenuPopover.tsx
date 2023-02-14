import type { AriaPopoverProps } from '@react-aria/overlays'
import { DismissButton, Overlay, usePopover } from '@react-aria/overlays'
import * as React from 'react'
import type { OverlayTriggerState } from 'react-stately'

interface PopoverProps extends Omit<AriaPopoverProps, 'popoverRef'> {
  children: React.ReactNode
  state: OverlayTriggerState
}

const MenuPopover = (props: PopoverProps) => {
  const ref = React.useRef<HTMLDivElement>(null)
  const { state, children } = props

  const { popoverProps, underlayProps } = usePopover(
    {
      ...props,
      popoverRef: ref,
    },
    state,
  )

  return (
    <Overlay>
      <div {...underlayProps} className="fixed inset-0" />
      <div {...popoverProps} ref={ref} className="z-20 shadow-lg bg-white rounded-lg mt-1">
        <DismissButton onDismiss={state.close} />
        {children}
        <DismissButton onDismiss={state.close} />
      </div>
    </Overlay>
  )
}

export default MenuPopover

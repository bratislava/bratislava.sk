import type { AriaPopoverProps } from '@react-aria/overlays'
import { DismissButton, usePopover } from '@react-aria/overlays'
import * as React from 'react'
import { OverlayProvider } from 'react-aria'
import type { OverlayTriggerState } from 'react-stately'

interface PopoverProps extends Omit<AriaPopoverProps, 'popoverRef'> {
  children: React.ReactNode
  state: OverlayTriggerState
}

const MenuPopover = (props: PopoverProps) => {
  const ref = React.useRef<HTMLDivElement>(null)
  const { state, children } = props

  const { popoverProps } = usePopover(
    {
      ...props,
      popoverRef: ref,
    },
    state,
  )

  return (
    <OverlayProvider>
      <div
        {...popoverProps}
        // ref={ref}
        className="z-20 shadow-lg bg-white rounded-lg mt-1"
      >
        <DismissButton onDismiss={state.close} />
        {children}
        <DismissButton onDismiss={state.close} />
      </div>
    </OverlayProvider>
  )
}

export default MenuPopover

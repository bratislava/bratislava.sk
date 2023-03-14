import type { AriaPopoverProps } from '@react-aria/overlays'
import { DismissButton } from '@react-aria/overlays'
import * as React from 'react'
import { RefObject, useRef } from 'react'
import { FocusScope, useOverlay } from 'react-aria'
import type { OverlayTriggerState } from 'react-stately'

interface PopoverProps extends Omit<AriaPopoverProps, 'popoverRef'> {
  children: React.ReactNode
  state: OverlayTriggerState
  triggerRef: RefObject<HTMLDivElement>
}

const MenuPopover = (props: PopoverProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const { triggerRef = ref, state, children } = props

  const { overlayProps } = useOverlay(
    {
      isOpen: state.isOpen,
      onClose: state.close,
      isDismissable: true,
    },
    triggerRef,
  )

  return (
    <FocusScope contain>
      <div
        {...overlayProps}
        ref={triggerRef}
        className="z-20 shadow-lg bg-white rounded-lg mt-1 absolute"
      >
        {children}
        <DismissButton onDismiss={state.close} />
      </div>
    </FocusScope>
  )
}

export default MenuPopover

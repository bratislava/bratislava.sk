import { ReactNode, RefObject, useRef } from 'react'
import { DismissButton, FocusScope, mergeProps, useDialog, useModal, useOverlay } from 'react-aria'

type PopoverBase = {
  isOpen?: boolean
  onClose?: () => void
  children?: ReactNode
  popoverRef?: RefObject<HTMLDivElement>
  shouldCloseOnBlur?: boolean
}

const Popover = (props: PopoverBase) => {
  const ref = useRef<HTMLDivElement>(null)
  const { popoverRef = ref, isOpen, onClose, children, shouldCloseOnBlur = true, ...rest } = props

  const { overlayProps } = useOverlay(
    {
      isOpen,
      onClose,
      shouldCloseOnBlur,
      isDismissable: true,
    },
    popoverRef,
  )

  const { modalProps } = useModal()
  const { dialogProps } = useDialog(rest, popoverRef)
  return (
    <FocusScope contain restoreFocus>
      <div
        {...mergeProps(overlayProps, modalProps, dialogProps)}
        ref={popoverRef}
        className="absolute z-50 mt-2 w-full focus:outline-none"
      >
        {children}
        <DismissButton onDismiss={onClose} />
      </div>
    </FocusScope>
  )
}

export default Popover

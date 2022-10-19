import { ReactNode, RefObject, useRef } from 'react'
import { DismissButton, FocusScope, mergeProps, useDialog, useModal, useOverlay } from 'react-aria'

type PopoverBase = {
  isOpen?: boolean
  onClose?: () => void
  children?: ReactNode
  popoverRef?: RefObject<HTMLDivElement>
}

const Popover = (props: PopoverBase) => {
  const ref = useRef<HTMLDivElement>(null)
  const { popoverRef = ref, isOpen, onClose, children, ...otherProps } = props

  const { overlayProps } = useOverlay(
    {
      isOpen,
      onClose,
      shouldCloseOnBlur: true,
      isDismissable: true,
    },
    popoverRef
  )

  const { modalProps } = useModal()
  const { dialogProps } = useDialog(otherProps, popoverRef)

  return (
    <FocusScope contain restoreFocus>
      <div
        {...mergeProps(overlayProps, modalProps, dialogProps)}
        ref={popoverRef}
        className="focus: absolute z-50 mt-2 outline-none"
      >
        {children}
        <DismissButton onDismiss={onClose} />
      </div>
    </FocusScope>
  )
}

export default Popover

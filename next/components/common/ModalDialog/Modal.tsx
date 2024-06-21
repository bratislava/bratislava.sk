import React, { forwardRef, ReactNode } from 'react'
import { Modal as RACModal, ModalOverlay, ModalOverlayProps } from 'react-aria-components'
import { twMerge } from 'tailwind-merge'
import cn from 'utils/cn'

type PropsBase = {
  width?: 'fixed' | 'auto'
  overlayClassname?: string
  modalClassname?: string
  children: ReactNode
} & Omit<ModalOverlayProps, 'children' | 'className' | 'style'>

type Props = PropsBase

/**
 * From docs: A modal is an overlay element which blocks interaction with elements outside it.
 * Note: Modal only provides the overlay itself. It should be combined with Dialog to create fully accessible modal dialogs. Other overlays such as menus may also be placed in a modal overlay.
 *
 */
const Modal = forwardRef<HTMLDivElement, Props>(
  (
    { children, width = 'fixed', overlayClassname, modalClassname, isDismissable = true, ...rest },
    ref,
  ) => {
    return (
      /**
       * Docs: https://react-spectrum.adobe.com/react-aria/Modal.html#modaloverlay
       * The `--visual-viewport-height` CSS custom property will be set on the ModalOverlay, which you can use to set the height to account for the virtual keyboard on mobile.
       */
      <ModalOverlay
        ref={ref}
        className={twMerge(
          'fixed left-0 top-0 z-50 flex h-[--visual-viewport-height] w-screen items-center justify-center bg-grey-800/[.48]',
          overlayClassname,
        )}
        isDismissable={isDismissable}
        {...rest}
      >
        <RACModal
          className={cn(
            'relative m-4 h-[80%] max-h-[--visual-viewport-height] rounded-xl bg-white',
            {
              'w-full md:w-[592px]': width === 'fixed',
              'w-full': width === 'auto',
            },
            modalClassname,
          )}
        >
          {children}
        </RACModal>
      </ModalOverlay>
    )
  },
)

export default Modal

import { forwardRef, ReactNode } from 'react'
import { Modal as RACModal, ModalOverlay, ModalOverlayProps } from 'react-aria-components'

import cn from '@/src/utils/cn'

type Props = {
  width?: 'fixed' | 'auto'
  overlayClassname?: string
  modalClassname?: string
  children: ReactNode
} & Omit<ModalOverlayProps, 'children' | 'className' | 'style'>

/**
 * A modal is an overlay element which blocks interaction with elements outside it.
 *
 * Docs: https://react-spectrum.adobe.com/react-aria/Modal.html
 *
 * This component only provides the overlay. It must be combined with a `Dialog` to create a fully
 * accessible modal dialog. Overlay props such as `isDismissable`, `isOpen` and `onOpenChange`
 * belong on the `ModalOverlay`, never on the inner `Modal`.
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
        className={cn(
          'fixed top-0 left-0 z-50 flex h-(--visual-viewport-height) w-screen items-center justify-center bg-background-passive-inverted-base/48',
          overlayClassname,
        )}
        isDismissable={isDismissable}
        {...rest}
      >
        <RACModal
          className={cn(
            'relative m-4 h-[80%] max-h-(--visual-viewport-height) rounded-xl bg-background-passive-base',
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

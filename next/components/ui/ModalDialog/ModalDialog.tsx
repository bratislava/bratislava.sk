import { CrossIcon } from '@assets/ui-icons'
import Button from '@components/forms/simple-components/Button'
import cx from 'classnames'
import React, { ReactNode } from 'react'
import { Dialog, DialogProps, Modal, ModalOverlay, ModalOverlayProps } from 'react-aria-components'
import { twMerge } from 'tailwind-merge'

type PropsBase = {
  width?: 'fixed' | 'auto'
  overlayClassname?: string
  modalClassname?: string
  children: ReactNode
} & Omit<ModalOverlayProps, 'children' | 'className' | 'style'> &
  Omit<DialogProps, 'children'>

type TitleAriaProps =
  | { title: string; 'aria-label'?: string }
  | { title?: never; 'aria-label': string }

type Props = PropsBase & TitleAriaProps

/**
 * From docs: A modal is an overlay element which blocks interaction with elements outside it.
 * Note: Modal only provides the overlay itself. It should be combined with Dialog to create fully accessible modal dialogs. Other overlays such as menus may also be placed in a modal overlay.
 *
 */
const ModalDialog = ({
  children,
  width = 'fixed',
  overlayClassname,
  modalClassname,
  isDismissable,
  isKeyboardDismissDisabled,
  isOpen,
  defaultOpen,
  onOpenChange,
  onClose,
  title,
  ...dialogProps
}: Props) => {
  return (
    /**
     * Docs: https://react-spectrum.adobe.com/react-aria/Modal.html#modaloverlay
     * The `--visual-viewport-height` CSS custom property will be set on the ModalOverlay, which you can use to set the height to account for the virtual keyboard on mobile.
     */
    <ModalOverlay
      className={twMerge(
        'fixed left-0 top-0 z-50 flex h-[var(--visual-viewport-height)] w-screen items-center justify-center bg-[#1F1F1F]/[.48]',
        overlayClassname,
      )}
      isDismissable={isDismissable}
      isKeyboardDismissDisabled={isKeyboardDismissDisabled}
      isOpen={isOpen}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      <Modal
        className={twMerge(
          cx('relative m-4 rounded-xl bg-white', {
            'w-full md:w-[592px]': width === 'fixed',
            'w-full': width === 'auto',
          }),
          modalClassname,
        )}
      >
        <Dialog {...dialogProps}>
          {({ close }) => (
            <>
              {title ? (
                <div className="flex items-start justify-between gap-4 border-b-2 px-6 py-4">
                  <h2 className="text-h5">{title}</h2>
                  <Button
                    icon={<CrossIcon />}
                    variant="black-plain"
                    className="-m-2"
                    onPress={onClose || close}
                  />
                </div>
              ) : (
                <Button
                  icon={<CrossIcon />}
                  className="absolute right-6 top-6 -m-2"
                  variant="black-plain"
                  onPress={onClose || close}
                />
              )}
              <div className="p-6">{children}</div>
            </>
          )}
        </Dialog>
      </Modal>
    </ModalOverlay>
  )
}

export default ModalDialog

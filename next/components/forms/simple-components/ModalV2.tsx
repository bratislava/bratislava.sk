import { CrossIcon } from '@assets/ui-icons'
import { useTranslations } from 'next-intl'
import React, { PropsWithChildren } from 'react'
import { mergeProps } from 'react-aria'
import {
  Button as AriaButton,
  Dialog,
  Modal,
  ModalOverlay,
  ModalOverlayProps,
} from 'react-aria-components'
import { twMerge } from 'tailwind-merge'

export type ModalV2Props = Omit<ModalOverlayProps, 'className'> & {
  modalClassname?: string
  mobileFullScreen?: boolean
  noCloseButton?: boolean
} & PropsWithChildren

const ModalV2 = ({
  children,
  modalClassname,
  mobileFullScreen,
  noCloseButton,
  ...rest
}: ModalV2Props) => {
  const t = useTranslations()

  // Makes `{ isDismissable: true }` default.
  const modalProps = mergeProps({ isDismissable: true }, rest)

  return (
    <ModalOverlay
      className="fixed left-0 top-0 z-50 flex h-[var(--visual-viewport-height)] w-screen items-center justify-center bg-gray-800/40"
      {...modalProps}
    >
      <Modal
        {...modalProps}
        className={twMerge(
          'relative overflow-auto bg-gray-0 px-4 outline-0 md:mx-4 md:h-min md:max-h-full md:max-w-[592px] md:rounded-2xl md:p-6',
          mobileFullScreen
            ? 'mx-0 h-full w-full max-w-none rounded-none p-4 pt-12'
            : 'mx-4 h-min max-h-full w-full rounded-xl pb-4 pt-6',
          modalClassname,
        )}
      >
        <Dialog className="outline-0">
          {({ close }) => (
            <>
              {noCloseButton ? null : (
                <AriaButton
                  className="absolute right-3 top-3 cursor-pointer md:right-4 md:top-4"
                  onPress={close}
                >
                  <CrossIcon className="h-6 w-6" aria-hidden />
                  <span className="sr-only">{t('modal_close_aria')}</span>
                </AriaButton>
              )}
              {children}
            </>
          )}
        </Dialog>
      </Modal>
    </ModalOverlay>
  )
}

export default ModalV2

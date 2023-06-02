import { CrossIcon } from '@assets/ui-icons'
import Button from '@components/forms/simple-components/Button'
import cx from 'classnames'
import FocusTrap from 'focus-trap-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { ReactNode, useEffect, useRef } from 'react'
import { AriaOverlayProps, OverlayContainer, useModal, useOverlay } from 'react-aria'
import { twMerge } from 'tailwind-merge'
import { useIsClient, useLockedBody } from 'usehooks-ts'

export type ModalProps = {
  children: ReactNode
  showCloseButton?: boolean
  underlayClassName?: string
  overlayClassName?: string
  centerVertically?: boolean
  noAnimation?: boolean
} & AriaOverlayProps

// copied from https://github.com/bratislava/mestskakniznica.sk/blob/master/next/modules/common/Modal.tsx

const GalleryModal = (props: ModalProps) => {
  const {
    isOpen,
    onClose,
    children,
    isDismissable,
    underlayClassName,
    overlayClassName,
    showCloseButton = false,
    centerVertically = true,
    noAnimation = false,
  } = props
  const t = useTranslations('Gallery')
  const ref = useRef<HTMLDivElement | null>(null)
  const { overlayProps, underlayProps } = useOverlay(
    { ...props, isDismissable: isDismissable === undefined ? true : isDismissable },
    ref,
  )
  const [, setLockedBody] = useLockedBody(isOpen)

  useEffect(() => {
    setLockedBody(isOpen ?? false)
  }, [isOpen, setLockedBody])

  const { modalProps } = useModal()

  const isClient = useIsClient()

  return isClient ? (
    <OverlayContainer>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="relative z-50"
            transition={{ duration: noAnimation ? 0 : 0.2 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div
              {...underlayProps}
              className={twMerge(
                'fixed inset-0 z-50 overflow-y-auto overflow-x-hidden',
                underlayClassName,
              )}
              style={{
                background: 'rgba(var(--color-gray-800), .4)', // bg-gray-800/40 is not working for some reason
              }}
            >
              <div className={cx({ 'flex min-h-full items-center': centerVertically })}>
                <FocusTrap>
                  <div
                    className={twMerge('mx-auto flex w-fit items-center', overlayClassName)}
                    {...overlayProps}
                    {...modalProps}
                    ref={ref}
                  >
                    {showCloseButton && (
                      <Button
                        variant="category"
                        className="pointer-events-auto fixed right-6 top-6 z-30 rounded-full"
                        aria-label={t('aria.closeGallery')}
                        onPress={onClose}
                        icon={<CrossIcon />}
                      />
                    )}
                    {children}
                  </div>
                </FocusTrap>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </OverlayContainer>
  ) : null
}

export default GalleryModal

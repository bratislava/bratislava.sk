import FocusTrap from 'focus-trap-react'
import { AnimatePresence, motion } from 'framer-motion'
import { ReactNode, useEffect, useRef } from 'react'
import { AriaOverlayProps, OverlayContainer, useModal, useOverlay } from 'react-aria'
import { CrossIcon } from 'src/assets/icons'
import { useIsClient, useScrollLock } from 'usehooks-ts'

import Button from '@/src/components/common/Button/Button'
import cn from '@/src/utils/cn'
import { useTranslation } from '@/src/utils/useTranslation'

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
  const { t } = useTranslation()
  const ref = useRef<HTMLDivElement | null>(null)
  const { overlayProps, underlayProps } = useOverlay(
    { ...props, isDismissable: isDismissable === undefined ? true : isDismissable },
    ref,
  )

  const { unlock } = useScrollLock({ autoLock: isOpen })

  useEffect(() => {
    if (!isOpen) {
      unlock()
    }
  }, [isOpen, unlock])

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
              className={cn(
                'fixed inset-0 z-50 overflow-x-hidden overflow-y-auto bg-grey-800/60',
                underlayClassName,
              )}
            >
              <div className={cn({ 'flex min-h-full items-center': centerVertically })}>
                <FocusTrap>
                  <div
                    className={cn('mx-auto flex w-fit items-center', overlayClassName)}
                    {...overlayProps}
                    {...modalProps}
                    ref={ref}
                  >
                    {showCloseButton && (
                      <Button
                        variant="solid"
                        className="pointer-events-auto fixed top-6 right-6 z-30 rounded-full"
                        aria-label={t('Gallery.aria.closeGallery')}
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

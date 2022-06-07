import cx from 'classnames'
import React from 'react'
import Close from '../../../assets/images/close.svg'
import ChevronRight from '../../../assets/images/chevron-right.svg'
import ArrowRight from '../../../assets/images/arrow-right.svg'
import { Button } from '../Button/Button'

export interface ModalProps {
  className?: string
  isOpen: boolean
  children?: React.ReactNode
  onClose?: () => void
  actionButtonTitle?: string
  closeButtonColor?: string
  onActionButtonClick?: () => void
}

export const Modal = ({
  className,
  children,
  isOpen,
  onClose,
  actionButtonTitle,
  onActionButtonClick,
  closeButtonColor,
}: ModalProps) => {
  return (
    <div
      className={cx(className, 'absolute w-full z-40', {
        flex: isOpen === true,
        hidden: isOpen === false,
      })}
    >
      <div className="flex justify-center items-center fixed inset-0 bg-[#02020280] mt-25">
        <div className="relative bg-white rounded-2xl">
          {onClose && (
            <Button
              style={{ backgroundColor: closeButtonColor }}
              className="z-10 absolute -bottom-16 modal-close-mobile-right md:inset-y-0 md:-right-9 transofrm -translate-y-1/2 w-16 h-16"
              shape="circle"
              iconPosition="center"
              icon={<Close />}
              onClick={onClose}
            />
          )}

          {children}
          {actionButtonTitle && onActionButtonClick && (
            <div className="flex justify-center absolute inset-x-0 mx-auto bottom-0 transofrm translate-y-1/2">
              <Button icon={<ChevronRight />} hoverIcon={<ArrowRight />} onClick={onActionButtonClick}>
                {actionButtonTitle}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Modal

import cx from 'classnames'
import React from 'react'

import ArrowRight from '../../../assets/images/arrow-right.svg'
import ChevronRight from '../../../assets/images/chevron-right.svg'
import Close from '../../../assets/images/close.svg'
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
      className={cx(className, 'absolute w-full z-[55]', {
        flex: isOpen === true,
        hidden: isOpen === false,
      })}
    >
      <div className="fixed inset-0 flex items-center justify-center bg-[#02020280]">
        <div className="relative m-6 rounded-2xl bg-white md:m-0">
          <div className="absolute inset-0" onClick={onClose} />
          <div className="relative rounded-2xl bg-white">
            {onClose && (
              <Button
                style={{ backgroundColor: closeButtonColor }}
                className="modal-close-mobile-right transofrm closebutton absolute -bottom-9 z-10 h-16 w-16 lg:-top-8 left-[50%] md:left-auto -translate-x-1/2 md:translate-x-0 md:inset-y-0 md:-right-8"
                shape="circle"
                iconPosition="center"
                icon={<Close className='h-10 w-10'/>} 
                onClick={onClose}
              />
            )}

            {children}
            {actionButtonTitle && onActionButtonClick && (
              <div className="transofrm absolute inset-x-0 bottom-0 mx-auto flex translate-y-1/2 justify-center">
                <Button icon={<ChevronRight />} hoverIcon={<ArrowRight />} onClick={onActionButtonClick}>
                  {actionButtonTitle}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal

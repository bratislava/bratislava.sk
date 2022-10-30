import ArrowLeft from '@assets/images/forms/arrow-left.svg'
import cx from 'classnames'

import Button from './Button'
import CloseIcon from './icon-components/CloseIcon'

type ModalHeaderFooterBase = {
  flow?: boolean
  divider?: boolean
  className?: string
}

export const ModalHeader = ({ flow, divider }: ModalHeaderFooterBase) => {
  const headerStyle = cx('flex w-592 h-15 py-4 px-6 gap-6 bg-white rounded-t-lg', {
    'border-b-solid border-b-2 border-b-form-input-default': divider,
  })
  const headlineStyle = cx('font-semibold h-7 text-default leading-7 not-italic', {
    'w-496': !flow,
    'w-112 text-center ml-1': flow,
  })
  const closeIconStyleContainer = cx('ml-1 grid place-content-center',{})

  return (
    <div className={headerStyle}>
      {
        flow ?
          <div className='ml-1 grid cursor-pointer place-content-center'>
            <ArrowLeft />
          </div>
          : null
      }
      <div className={headlineStyle}>
        Headline
      </div>
      <div className={closeIconStyleContainer}>
        <CloseIcon type='info' />
      </div>
    </div>
  )
}

export const ModalFooter = ({divider}: ModalHeaderFooterBase) => {
  const footerStyle = cx('flex w-592 h-18 bg-white items-center justify-between py-3 px-6 gap-6 rounded-b-lg', {
    'border-t-solid border-t-2 border-t-form-input-default': divider,
  })
  return(
    <div className={footerStyle}>
      <div className='text-base flex cursor-pointer items-center font-semibold not-italic leading-6'>
        Zrušiť
      </div>
      <Button variant="black" text="Potvrdiť" size="sm"/>
    </div>
  )
}

export const ModalBody = () => {
  return (
    <div className='flex w-592 flex-col items-start bg-white p-6'>
      <div className='flex h-316 w-full flex-col items-start rounded-lg border-2 border-dashed border-form-input-default px-16 py-32' />
    </div>
  )
}

// only for testing, it will be change later
const Modal = () => {
  return (
    <>
    <div>
      <ModalHeader divider/>
      <ModalBody />
      <ModalFooter divider/>
    </div>
    <div>
      <ModalHeader flow divider/>
      <ModalBody />
      <ModalFooter divider/>
    </div>
    </>
  )
}

export default Modal
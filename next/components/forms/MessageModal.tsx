import cx from 'classnames'

import Button from './Button'
import CloseIcon from './icon-components/CloseIcon'
import ErrorIcon from './icon-components/ErrorIcon'
import InfoIcon from './icon-components/InfoIcon'
import WarningIcon from './icon-components/WarningIcon'

type MessageModalBase = {
  type: 'warning' | 'info' | 'error'
  message: string
  submitHandler: () => void
  cancelHandler?: () => void
  buttonText: string
  className?: string
}

const icons = {
  error: <ErrorIcon />,
  info: <InfoIcon />,
  warning: <WarningIcon />,
}

const MessageModal = ({type, message, submitHandler, cancelHandler, buttonText}: MessageModalBase) => {
  return (
    <div className='w-148 relative isolate flex flex-col items-end rounded-lg bg-white p-3'>
      <div className='absolute z-50 flex h-6 w-6 items-center justify-center'>
        <CloseIcon onClick={cancelHandler} type='info'/>
      </div>
      <div className='p-3'>
        <div className='flex flex-row items-start gap-6 p-0'>
          <div className={cx('relative flex h-14 w-14 flex-row items-start gap-2 rounded-full p-4',{
            'bg-form-alert-info-default-bg': type === 'info',
            // also this, it is probably should be one styling for warning/error(unresolved colors), but if it is ok, I'll add this colors to tailwind config
            'bg-[#FCF2E6]': type === 'warning',
            'bg-[#FAE5E5]': type === 'error'
          })}>
            <div className='absolute flex h-6 w-6 animate-none items-center justify-center'>
              <span className=''>{icons[type]}</span>
            </div>
          </div>
          <div className='h-50 w-116 flex flex-col items-end gap-6 p-0'>
            <div className='w-116 flex flex-col items-start p-0'>
              <div className='w-116 flex h-14 items-center text-h-base font-semibold not-italic'>
                Info message
              </div>
              {/* some issue if you want to set width not in [] brackets for ex. 464px equals to 116 in tailwind, but it goes bigger than I want to have */}
              <div className='text-base w-[464px] font-normal not-italic leading-6'>
                {message}
              </div>
            </div>
            <div className='order-1 flex h-12 flex-row items-center gap-6 p-0'>
              <div className='text-base w-15 flex h-8 cursor-pointer flex-row items-center justify-center gap-2 py-1 px-2 font-semibold not-italic leading-6' onClick={cancelHandler}>
                Zrušiť
              </div>
              <Button onPress={submitHandler} variant={type === 'error' ? 'negative' : 'black'} text={buttonText} size="sm"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageModal
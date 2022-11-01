import ArrowLeft from '@assets/images/forms/arrow-left.svg'
import cx from 'classnames'
import { Dispatch, SetStateAction, useState } from 'react'

import Button from './Button'
import CloseIcon from './icon-components/CloseIcon'

type ModalBase = {
  show: boolean
  divider?: boolean
  onClose: () => void
  onSubmit: () => void
  content: (() => JSX.Element)[]
}

type ModalHeaderBase = Omit<ModalBase, "content" | "onSubmit" | "show" | "startedIndex"> & {
  currentScreenIndex: number
  setCurrentScreenIndex: Dispatch<SetStateAction<number>>
}

export const ModalHeader = ({ divider = false, onClose, currentScreenIndex, setCurrentScreenIndex }: ModalHeaderBase) => {
  const headerStyle = cx('flex w-592 h-15 py-4 px-6 gap-6 bg-white rounded-t-lg', {
    'border-b-solid border-b-2 border-b-form-input-default': divider,
  })
  const headlineStyle = cx('font-semibold h-7 text-default leading-7 not-italic', {
    'w-496': currentScreenIndex === 0,
    'w-112 text-center ml-1': currentScreenIndex > 0,
  })

  return (
    <div className={headerStyle}>
      {
        currentScreenIndex > 0 ?
          <div className='ml-1 grid cursor-pointer place-content-center' onClick={()=>{
              setCurrentScreenIndex(currentScreenIndex-1)
          }}>
            <ArrowLeft />
          </div>
          : null
      }
      <div className={headlineStyle}>
        Headline
      </div>
      <div className='ml-1 grid place-content-center'>
        <CloseIcon className='cursor-pointer' type='info' onClick={onClose} />
      </div>
    </div>
  )
}

type ModalFooterBase = Omit<ModalBase, "content" | "show" | "startedIndex"> & {
  currentScreenIndex: number
  setCurrentScreenIndex: Dispatch<SetStateAction<number>>
  contentLength: number
}

export const ModalFooter = ({divider, onClose, currentScreenIndex, setCurrentScreenIndex, contentLength, onSubmit}: ModalFooterBase) => {

  const footerStyle = cx('flex w-592 h-18 bg-white items-center justify-between py-3 px-6 gap-6 rounded-b-lg', {
    'border-t-solid border-t-2 border-t-form-input-default': divider,
  })
  return(
    <div className={footerStyle}>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div className='text-base flex cursor-pointer items-center font-semibold not-italic leading-6' onClick={onClose}>
        Zrušiť
      </div>
      <Button onPress={
        ()=>{
          if (currentScreenIndex < contentLength - 1){
            setCurrentScreenIndex(currentScreenIndex+1)
          }else{
            setCurrentScreenIndex(0)
            onSubmit()
          }
        }
      } variant="black" text={currentScreenIndex >= contentLength - 1 ? "Potvrdiť" : "Next"} size="sm"/>
    </div>
  )
}

export const ModalBody = ({content, currentScreenIndex}: {content: (() => JSX.Element)[], currentScreenIndex: number}) => {
  return (
    <div className='flex w-592 flex-col items-start bg-white p-6'>
      <div className='flex h-316 w-full flex-col items-start rounded-lg border-2 border-dashed border-form-input-default p-2'>
        {content.length - 1 >= currentScreenIndex && content[currentScreenIndex]()}
      </div>
    </div>
  )
}

const Modal = ({ show, onClose, content, onSubmit, divider = false, }: ModalBase) => {
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0)
  if (!show){
    return null
  }
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div className='fixed inset-1 z-10 flex items-center justify-center' onClick={onClose}>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div onClick={e => e.stopPropagation()} className='rounded-full shadow-lg'>
        <ModalHeader currentScreenIndex={currentScreenIndex} setCurrentScreenIndex={setCurrentScreenIndex} divider={divider} onClose={onClose}/>
        <ModalBody content={content} currentScreenIndex={currentScreenIndex}/>
        <ModalFooter onSubmit={onSubmit} currentScreenIndex={currentScreenIndex} contentLength={content.length} setCurrentScreenIndex={setCurrentScreenIndex} divider onClose={onClose} />
      </div>
    </div>
  )
}

export default Modal
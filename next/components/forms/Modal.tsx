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
  header: string
  confirmLabel: string
  className?: string
}

type ModalHeaderBase = Omit<
  ModalBase,
  'content' | 'confirmLabel' | 'onSubmit' | 'show' | 'startedIndex'
> & {
  currentScreenIndex: number
  setCurrentScreenIndex: Dispatch<SetStateAction<number>>
  header: string
}

const ModalHeader = ({
  divider = false,
  onClose,
  currentScreenIndex,
  setCurrentScreenIndex,
  header,
}: ModalHeaderBase) => {
  const headerStyle = cx('flex py-4 px-6 gap-6 bg-white rounded-t-lg justify-between', {
    'border-b-solid border-b-2 border-b-form-input-default': divider,
  })
  const headlineStyle = cx('font-semibold h-7 text-default leading-7 not-italic', {
    'text-center ml-1': currentScreenIndex > 0,
  })

  return (
    <div className={headerStyle}>
      {currentScreenIndex > 0 ? (
        <div
          className="ml-1 flex flex-row cursor-pointer items-center"
          onClick={() => {
            setCurrentScreenIndex(currentScreenIndex - 1)
          }}
        >
          <ArrowLeft />
        </div>
      ) : null}
      <div className={headlineStyle}>{header}</div>
      <div className="ml-1 flex flex-row justify-end items-center">
        <CloseIcon className="cursor-pointer" type="info" onClick={onClose} />
      </div>
    </div>
  )
}

type ModalFooterBase = Omit<ModalBase, 'content' | 'header' | 'show' | 'startedIndex'> & {
  currentScreenIndex: number
  setCurrentScreenIndex: Dispatch<SetStateAction<number>>
  contentLength: number
}

const ModalFooter = ({
  divider,
  onClose,
  currentScreenIndex,
  setCurrentScreenIndex,
  contentLength,
  confirmLabel,
  onSubmit,
}: ModalFooterBase) => {
  const footerStyle = cx(
    'flex w-592 h-18 bg-white items-center justify-between py-3 px-6 gap-6 rounded-b-lg',
    {
      'border-t-solid border-t-2 border-t-form-input-default': divider,
    },
  )
  return (
    <div className={footerStyle}>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div
        className="text-base flex cursor-pointer items-center font-semibold not-italic leading-6"
        onClick={onClose}
      >
        Zrušiť
      </div>
      <Button
        onPress={() => {
          if (currentScreenIndex < contentLength - 1) {
            setCurrentScreenIndex(currentScreenIndex + 1)
          } else {
            setCurrentScreenIndex(0)
            onSubmit()
          }
        }}
        variant="black"
        text={currentScreenIndex >= contentLength - 1 ? confirmLabel : 'Next'}
        size="sm"
      />
    </div>
  )
}

const ModalBody = ({
  content,
  currentScreenIndex,
}: {
  content: (() => JSX.Element)[]
  currentScreenIndex: number
}) => {
  return (
    <div className="flex flex-col items-start bg-white p-6">
      <div className="border-form-input-default flex w-full flex-col items-start rounded-lg border-2 border-dashed p-2">
        {content.length - 1 >= currentScreenIndex && content[currentScreenIndex]()}
      </div>
    </div>
  )
}

const Modal = ({
  show,
  onClose,
  content,
  onSubmit,
  divider = false,
  header,
  confirmLabel,
  className,
}: ModalBase) => {
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0)
  if (!show) {
    return null
  }

  return (
    <div
      className="fixed inset-1 z-10 flex items-center justify-center"
      onClick={() => {
        setCurrentScreenIndex(0)
        onClose()
      }}
    >
      <div onClick={(e) => e.stopPropagation()} className={cx('rounded-full shadow-lg', className)}>
        <ModalHeader
          header={header}
          currentScreenIndex={currentScreenIndex}
          setCurrentScreenIndex={setCurrentScreenIndex}
          divider={divider}
          onClose={() => {
            setCurrentScreenIndex(0)
            onClose()
          }}
        />
        <ModalBody content={content} currentScreenIndex={currentScreenIndex} />
        <ModalFooter
          onSubmit={onSubmit}
          confirmLabel={confirmLabel}
          currentScreenIndex={currentScreenIndex}
          contentLength={content.length}
          setCurrentScreenIndex={setCurrentScreenIndex}
          divider
          onClose={() => {
            setCurrentScreenIndex(0)
            onClose()
          }}
        />
      </div>
    </div>
  )
}

export default Modal

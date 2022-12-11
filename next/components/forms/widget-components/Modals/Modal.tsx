import ArrowLeft from '@assets/images/forms/arrow-left.svg'
import cx from 'classnames'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import CloseIcon from '../../icon-components/CloseIcon'
import Button from '../../simple-components/Button'

type ModalBase = {
  show: boolean
  divider?: boolean
  onClose: () => void
  onSubmit: () => void
  content: (({}: any) => JSX.Element)[] | (({}: any) => JSX.Element)
  header: string
  confirmLabel: string
  cancelLabel: string
  isStepper?: boolean
  className?: string
}

type ModalHeaderBase = Omit<
  ModalBase,
  'content' | 'confirmLabel' | 'cancelLabel' | 'onSubmit' | 'show' | 'startedIndex'
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
  isStepper,
}: ModalHeaderBase) => {
  const headerStyle = cx('flex py-4 px-6 gap-6 bg-white rounded-t-lg justify-between', {
    'border-b-solid border-b-form-input-default border-b-2': divider,
  })
  const headlineStyle = cx('text-default font-semibold h-7 leading-7 not-italic', {
    'text-center ml-1': currentScreenIndex > 0,
  })

  if (!isStepper) return null

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
  isStepper,
  confirmLabel,
  cancelLabel,
  onSubmit,
}: ModalFooterBase) => {
  const footerStyle = cx(
    'w-592 flex h-18 bg-white items-center justify-between py-3 px-6 gap-6 rounded-b-lg',
    {
      'border-t-solid border-t-form-input-default border-t-2': divider,
    },
  )

  if (!isStepper) return null

  return (
    <div className={footerStyle}>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div
        className="text-base flex cursor-pointer items-center font-semibold not-italic leading-6"
        onClick={onClose}
      >
        {cancelLabel}
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
  isStepper,
  onSubmit,
}: {
  content: ((props?: any) => JSX.Element)[] | ((props?: any) => JSX.Element)
  currentScreenIndex: number
  isStepper: boolean
  onSubmit: () => void
}) => {
  return (
    <div
      className={cx('flex flex-col bg-white p-6 overflow-hidden', {
        'rounded-10': !isStepper,
      })}
    >
      {!isStepper ? (
        <div className="ml-1 flex flex-row justify-end items-center">
          <CloseIcon className="cursor-pointer" type="info" onClick={() => {}} />
        </div>
      ) : null}
      <div className="overflow-auto flex w-full flex-col items-start rounded-lg p-2">
        {Array.isArray(content)
          ? content.length - 1 >= currentScreenIndex && content[currentScreenIndex]()
          : content({ onSubmit })}
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
  cancelLabel,
  className,
}: ModalBase) => {
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0)

  useEffect(() => {
    document.body.style.overflow = show ? 'hidden' : ''
  }, [show])

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
          isStepper={Array.isArray(content)}
          onClose={() => {
            setCurrentScreenIndex(0)
            onClose()
          }}
        />
        <ModalBody
          content={content}
          isStepper={Array.isArray(content)}
          currentScreenIndex={currentScreenIndex}
          onSubmit={onSubmit}
        />
        <ModalFooter
          onSubmit={onSubmit}
          confirmLabel={confirmLabel}
          currentScreenIndex={currentScreenIndex}
          contentLength={content.length}
          setCurrentScreenIndex={setCurrentScreenIndex}
          isStepper={Array.isArray(content)}
          cancelLabel={cancelLabel}
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

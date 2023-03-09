import cx from 'classnames'
import React, { createContext, ReactNode, useContext, useState } from 'react'

import Alert, { AlertType } from '../components/forms/info-components/Alert'

export interface SnackbarContextProps {
  showSnackbar: (
    message: string,
    position: SnackbarPosition,
    type: AlertType,
    isClose?: boolean,
    duration?: number,
  ) => void
  handleClose: () => void
}

export const SnackbarContext = createContext<SnackbarContextProps>({} as SnackbarContextProps)
export const defaultDuration = 4000
export const defaultPosition = 'bottom-center'
export const defaultType = 'info'
export type SnackbarPosition =
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'
  | 'top-left'
  | 'top-center'
  | 'top-right'

type SnackbarProviderProp = {
  children: ReactNode
}
export const SnackbarProvider = ({ children }: SnackbarProviderProp) => {
  const [message, setMessage] = useState<string>('')
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [position, setPosition] = useState<SnackbarPosition>(defaultPosition)
  const [type, setType] = useState<AlertType>(defaultType)
  const [isClose, setIsClose] = useState<boolean>(false)
  const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout>>()

  const triggerSnackbar = (
    messageTrigger: string,
    positionTrigger: SnackbarPosition,
    typeTrigger: AlertType,
    isCloseTrigger: boolean,
  ) => {
    setMessage(messageTrigger)
    setType(typeTrigger)
    setIsClose(isCloseTrigger)
    setPosition(positionTrigger)
    setIsVisible(true)
  }

  const showSnackbar = (
    messageData: string,
    positionData: SnackbarPosition,
    typeData: AlertType,
    isCloseData = false,
    durationData = defaultDuration,
  ) => {
    if (isVisible) {
      triggerSnackbar(messageData, positionData, typeData, isCloseData)
      clearTimeout(timeoutId)
      const timeId = setTimeout(() => setIsVisible(false), durationData)
      setTimeoutId(timeId)
    } else {
      triggerSnackbar(messageData, positionData, typeData, isCloseData)
      const timeId = setTimeout(() => setIsVisible(false), durationData)
      setTimeoutId(timeId)
    }
  }
  const handleClose = () => {
    clearTimeout(timeoutId)
    setIsVisible(false)
  }
  return (
    <SnackbarContext.Provider value={{ showSnackbar, handleClose }}>
      {children}

      <div
        className={cx(`fixed z-50`, {
          visible: isVisible,
          invisible: !isVisible,

          // position
          'top-4 left-4': position === 'top-left',
          'top-4 left-1/2 transform -translate-x-1/2 flex justify-center':
            position === 'top-center',
          'top-4 right-4 flex justify-end': position === 'top-right',
          'bottom-4 left-4': position === 'bottom-left',
          'bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center':
            position === 'bottom-center',
          'bottom-4 right-4 flex justify-end': position === 'bottom-right',
        })}
      >
        {isClose ? (
          <Alert message={message} close={handleClose} type={type} solid className="w-max" />
        ) : (
          <Alert message={message} type={type} solid className="w-max" />
        )}
      </div>
    </SnackbarContext.Provider>
  )
}

export const useSnackbar = () => {
  const { showSnackbar, handleClose } = useContext(SnackbarContext)

  return { showSnackbar, handleClose }
}

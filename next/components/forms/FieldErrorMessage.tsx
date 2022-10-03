import cx from 'classnames'
import React, { DOMAttributes, FC } from 'react'

interface FieldErrorMessageProps {
  errorMessage?: string
  errorMessageProps?: DOMAttributes<never>
}

const FieldErrorMessage: FC<FieldErrorMessageProps> = ({errorMessage, errorMessageProps}) => {
  const errorStyle = cx(
    'mt-1 text-sm text-error'
  )

  return errorMessage ? (
    <div className={errorStyle} {...errorMessageProps}>
      {errorMessage}
    </div>
  ): null;
}

export default FieldErrorMessage;

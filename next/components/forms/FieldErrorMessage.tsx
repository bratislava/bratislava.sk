import cx from 'classnames'
import React, { DOMAttributes, FC } from 'react'

interface FieldErrorMessageProps {
  errorMessage?: string
  errorMessageProps?: DOMAttributes<never>
}

const FieldErrorMessage: FC<FieldErrorMessageProps> = ({errorMessage, errorMessageProps}) => {
  return errorMessage ? (
    <div className="mt-1 text-sm text-error" {...errorMessageProps}>
      {errorMessage}
    </div>
  ): null;
}

export default FieldErrorMessage;

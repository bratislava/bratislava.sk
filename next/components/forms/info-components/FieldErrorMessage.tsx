import React, { DOMAttributes, FC } from 'react'

interface FieldErrorMessageProps {
  errorMessage?: string
  errorMessageProps?: DOMAttributes<never>
}

const FieldErrorMessage: FC<FieldErrorMessageProps> = ({errorMessage, errorMessageProps}) => {
  return errorMessage ? (
    <div className="text-p2 mt-1 text-error" {...errorMessageProps}>
      {errorMessage}
    </div>
  ): null;
}

export default FieldErrorMessage;

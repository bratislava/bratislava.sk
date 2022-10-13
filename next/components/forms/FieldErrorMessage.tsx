import React, { DOMAttributes, FC } from 'react'

interface FieldErrorMessageProps {
  errorMessage?: string
  errorMessageProps?: DOMAttributes<never>
  disabled?: boolean
}

const FieldErrorMessage: FC<FieldErrorMessageProps> = ({ errorMessage, errorMessageProps, disabled }) => {
  return errorMessage && !disabled ? (
    <div className="mt-1 text-sm text-error" {...errorMessageProps}>
      {errorMessage}
    </div>
  ) : null
}

export default FieldErrorMessage

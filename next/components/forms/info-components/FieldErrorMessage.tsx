import React, { DOMAttributes, FC } from 'react'

interface FieldErrorMessageProps {
  errorMessage?: string
  errorMessageProps?: DOMAttributes<never>
  value?: string
  required?: boolean
}

const FieldErrorMessage: FC<FieldErrorMessageProps> = ({
  errorMessage,
  errorMessageProps,
  value,
  required,
}) => {
  return (
    <div className="text-p2 mt-1 text-error" {...errorMessageProps}>
      {errorMessage}
    </div>
  )
}

export default FieldErrorMessage

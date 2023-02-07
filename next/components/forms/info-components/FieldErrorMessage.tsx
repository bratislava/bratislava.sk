import React, { DOMAttributes, FC } from 'react'

interface FieldErrorMessageProps {
  errorMessage?: string[]
  errorMessageProps?: DOMAttributes<never>
}

const FieldErrorMessage: FC<FieldErrorMessageProps> = ({
  errorMessage = [],
  errorMessageProps,
}) => {
  return errorMessage.length > 0 ? (
    <div className="text-p3 sm:text-16 mt-1 text-error" {...errorMessageProps}>
      {errorMessage?.map((error, i) => (
        <div key={i}>{`${error.slice(0, 1).toUpperCase()}${error.slice(1).toLowerCase()}.`}</div>
      ))}
    </div>
  ) : null
}

export default FieldErrorMessage

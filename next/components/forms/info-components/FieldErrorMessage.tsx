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
    <div
      className="text-p3 sm:text-16 leading-5 sm:leading-6 mt-1 text-error"
      {...errorMessageProps}
    >
      {errorMessage?.map((error, i) => (
        <div key={i}>{`${error.slice(0, 1).toUpperCase()}${error.slice(1).toLowerCase()}${
          error.trim().slice(-1) === '.' ? '' : '.'
        }`}</div>
      ))}
    </div>
  ) : null
}

export default FieldErrorMessage

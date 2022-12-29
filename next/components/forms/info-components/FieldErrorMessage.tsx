import React, { DOMAttributes, FC } from 'react'

interface FieldErrorMessageProps {
  errorMessage?: string[]
  errorMessageProps?: DOMAttributes<never>
}

const FieldErrorMessage: FC<FieldErrorMessageProps> = ({
  errorMessage = [],
  errorMessageProps,
}) => {
  return (
    <div className="text-p2 mt-1 text-error" {...errorMessageProps}>
      {errorMessage?.map((error, i) => (
        <div key={i}>{`${error.slice(0, 1).toUpperCase()}${error.slice(1).toLowerCase()}.`}</div>
      ))}
    </div>
  )
}

export default FieldErrorMessage

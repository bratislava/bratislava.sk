import cx from 'classnames'
import React from 'react'

interface UploadFieldHeaderProps {
  label: string
  htmlFor?: string
  required?: boolean
}

const UploadFieldHeader = (props: UploadFieldHeaderProps) => {
  const { label, htmlFor, required } = props

  // STYLES
  const labelStyle = cx('text-h5 relative mb-1 text-gray-800', {
    'after:text-h5 after:content-["*"] after:ml-0.5 after:absolute after:-top-0.5 after:text-main-700':
      required,
  })

  return (
    <div className="flex flex-row gap-2 mb-2">
      <label htmlFor={htmlFor} className={labelStyle}>
        {label}
      </label>
      {!required && <span className="text-p1">(optional)</span>}
    </div>
  )
}

export default UploadFieldHeader

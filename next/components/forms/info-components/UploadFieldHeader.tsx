import cx from 'classnames'
import React from 'react'

interface UploadFieldHeaderProps {
  label: string
  htmlFor?: string
  required?: boolean
  description?: string
}

const UploadFieldHeader = (props: UploadFieldHeaderProps) => {
  const { label, htmlFor, required, description = '' } = props

  // STYLES
  const labelStyle = cx('text-20-semibold relative text-gray-800', {
    'after:text-20-semibold after:content-["*"] after:ml-2 after:absolute after:-top-0.5 after:text-main-700':
      required,
  })

  const descriptionFormat = () => {
    if (!description.includes('.')) return description
    return description
      .trim()
      .split('.')
      .filter(Boolean)
      .map((sentence, i) => <span key={i}>{sentence}.</span>)
  }

  return (
    <div className="flex flex-col gap-1 mb-3">
      <div className="flex">
        <label htmlFor={htmlFor} className={labelStyle}>
          {label}
        </label>
        {!required && <span className="text-20 ml-2">(optional)</span>}
      </div>
      {description && (
        <div className="text-16 text-gray-700 flex flex-col">{descriptionFormat()}</div>
      )}
    </div>
  )
}

export default UploadFieldHeader

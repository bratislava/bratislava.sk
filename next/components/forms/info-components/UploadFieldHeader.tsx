import cx from 'classnames'
import React from 'react'

interface UploadFieldHeaderProps {
  label: string
  htmlFor?: string
  required?: boolean
  helptext?: string
}

const UploadFieldHeader = (props: UploadFieldHeaderProps) => {
  const { label, htmlFor, required, helptext = '' } = props

  // STYLES
  const labelStyle = cx('text-p3-semibold sm:text-16-semibold relative text-gray-800', {
    'after:text-16-semibold after:content-["*"] after:ml-0.5 after:absolute after:bottom-0.5 after:text-main-700':
      required,
  })

  const helptextHandler = () =>
    helptext
      .trim()
      .split('\n')
      .map((sentence, i) => <span key={i}>{sentence}</span>)

  return (
    <div className="flex flex-col gap-1 mb-2">
      <div className="flex">
        <label htmlFor={htmlFor} className={labelStyle}>
          {label}
        </label>
        {!required && (
          <span className="text-p3 sm:text-16 leading-5 sm:leading-6 ml-2 flex items-center">
            (optional)
          </span>
        )}
      </div>
      {helptext && (
        <div className="text-p3 sm:text-16 text-gray-700 flex flex-col">{helptextHandler()}</div>
      )}
    </div>
  )
}

export default UploadFieldHeader

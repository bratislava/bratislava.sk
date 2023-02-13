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
  const labelStyle = cx('text-20-semibold leading-7 relative text-gray-800', {
    'after:text-20-semibold after:content-["*"] after:ml-2 after:absolute after:-top-0.5 after:text-main-700':
      required,
  })

  const helptextHandler = () =>
    helptext
      .trim()
      .split('\n')
      .map((sentence, i) => <span key={i}>{sentence}</span>)

  return (
    <div className="flex flex-col gap-1 mb-3">
      <div className="flex">
        <label htmlFor={htmlFor} className={labelStyle}>
          {label}
        </label>
        {!required && <span className="text-20 leading-7 ml-2">(optional)</span>}
      </div>
      {helptext && <div className="text-16 text-gray-700 flex flex-col">{helptextHandler()}</div>}
    </div>
  )
}

export default UploadFieldHeader

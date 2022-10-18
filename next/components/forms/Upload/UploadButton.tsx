import UploadIcon from '@assets/images/forms/upload-icon.svg'
import cx from 'classnames'
import React, { FC } from 'react'

interface UploadButtonProps {
  disabled?: boolean
  sizeLimit?: number
  supportedFormats?: string[]
  onClick?: () => void
}

const UploadButton: FC<UploadButtonProps> = ({ disabled, sizeLimit, supportedFormats, onClick }: UploadButtonProps) => {
  // STYLES
  const buttonClassNames = cx(
    "flex-col align-items-center flex h-14 w-36 rounded-lg border-2 border-gray-300 py-3 px-6 bg-white",
    {
      "hover:border-gray-400 focus:border-gray-700 active:border-gray-700 cursor-pointer ": !disabled,
      "opacity-50 cursor-not-allowed bg-gray-200": disabled
    }
  )

  const buttonInfoClassNames = cx(
    "flex flex-col justify-evenly text-xs",
    {
      "min-w-40": supportedFormats || sizeLimit
    }
  )

  // EVENT HANDLERS
  const handleOnClick = () => {
    if (onClick) {
      onClick()
    }
  }

  // RENDER
  return (
    <div className="flex flex-row gap-4">
      <div className={buttonClassNames}
           onClick={handleOnClick}>
        <div className="flex flex-row">
          <UploadIcon className="mr-2 h-6 w-6 self-center text-default"/>
          <p className="text-default">Upload</p>
        </div>
      </div>
      <div className={buttonInfoClassNames}>
        <p>{sizeLimit} {sizeLimit && "MB"}</p>
        <p>{supportedFormats?.join(' ')}</p>
      </div>
    </div>
  )
}

export default UploadButton

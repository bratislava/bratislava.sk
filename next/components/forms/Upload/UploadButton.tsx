import UploadIcon from '@assets/images/forms/upload-icon.svg'
import cx from 'classnames'
import React, { ForwardedRef, forwardRef, ForwardRefRenderFunction } from 'react'
import { UploadMinioFile } from '../../../backend/dtos/minio/upload-minio-file.dto'

interface UploadButtonProps {
  value?: UploadMinioFile[]
  disabled?: boolean
  sizeLimit?: number
  supportedFormats?: string[]
  fileBrokenMessage?: string[]
  onClick?: () => void
}

const UploadButtonComponent: ForwardRefRenderFunction<HTMLDivElement, UploadButtonProps> = (props: UploadButtonProps, ref: ForwardedRef<HTMLDivElement>) => {
  // STATE
  const { value, disabled, sizeLimit, supportedFormats, fileBrokenMessage, onClick }: UploadButtonProps = props

  // STYLES
  const buttonClassNames = cx(
    "flex-col align-items-center flex h-14 w-36 rounded-lg border-2 border-gray-300 py-3 px-6 bg-white",
    {
      "cursor-pointer": !disabled,
      "hover:border-gray-400 focus:border-gray-700 active:border-gray-700": !disabled && (!fileBrokenMessage || fileBrokenMessage.length === 0),
      "border-red-500 hover:border-red-300": !disabled && (fileBrokenMessage && fileBrokenMessage.length > 0),
      "opacity-50 cursor-not-allowed bg-gray-200": disabled
    }
  )

  const buttonInfoClassNames = cx(
    "flex flex-col justify-evenly text-p3",
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
           onClick={handleOnClick}
           ref={ref}
           data-value={value}>
        <div className="flex flex-row">
          <UploadIcon className="mr-2 h-6 w-6 self-center text-button-1"/>
          <p className="text-button-1">Upload</p>
        </div>
      </div>
      <div className={buttonInfoClassNames}>
        <p>{sizeLimit} {sizeLimit && "MB"}</p>
        <p>{supportedFormats?.join(' ')}</p>
      </div>
    </div>
  )
}

const UploadButton = forwardRef<HTMLDivElement, UploadButtonProps>(UploadButtonComponent)
export default UploadButton

import UploadIcon from '@assets/images/forms/upload-icon.svg'
import cx from 'classnames'
import { FC, useState } from 'react'

interface UploadProps {
  type: 'button' | 'dragAndDrop'
  disabled?: boolean
  sizeLimit?: number
  supportedFormats?: string[]
}

const Upload: FC<UploadProps> = ({ type, disabled, sizeLimit, supportedFormats }: UploadProps) => {
  // STATES

  // STYLES
  const buttonClassNames = cx(
    "flex-col align-items-center flex h-14 w-36 rounded-lg border-2 border-gray-300 py-3 px-6 bg-white",
    {
      "hover:border-gray-400 focus:border-gray-700 active:border-gray-700 cursor-pointer ": !disabled,
      "opacity-50 cursor-not-allowed": disabled
    }
  )

  const buttonInfoClassNames = cx(
    "flex flex-col justify-evenly text-xs",
    {
      "min-w-40": supportedFormats || sizeLimit
    }
  )

  // CONTENTS
  const getButtonContent = () => {
    return (
      <div className="flex flex-row gap-4">
        <div className={buttonClassNames}>
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

  const getDragAndDropContent = () => {
    return (
      <div/>
    )
  }

  // RENDER
  return (
    <section className="select-none" style={{transition: "0.2 all linear"}}>
      { /* CONTENT */
        type === 'button'
          ? getButtonContent()
          : type === 'dragAndDrop'
            ? getDragAndDropContent()
            : <div/>
      }
    </section>
  )
}

export default Upload

import UploadIcon from '@assets/images/forms/upload-icon.svg'
import cx from 'classnames'
import { FC, useState } from 'react'

interface UploadProps {
  type: 'button' | 'dragAndDrop'
  disabled?: boolean
}

const Upload: FC<UploadProps> = ({ type }: UploadProps) => {
  // STATES

  // STYLES

  // CONTENTS
  const getButtonContent = () => {
    return (
      <div className="flex-column align-items-center flex h-14 w-36 rounded-lg border-2 border-gray-300 bg-white py-3 px-6 hover:border-gray-400 focus:border-gray-600 active:border-gray-600">
        <div className="flex flex-row">
          <UploadIcon className="mr-2 h-6 w-6 self-center text-default"/>
          <p className="text-default">Upload</p>
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
    <section className="cursor-pointer select-none" style={{transition: "0.2 all linear"}}>
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

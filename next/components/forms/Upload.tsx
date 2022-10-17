import UploadIcon from '@assets/images/forms/upload-icon.svg'
import BallDelimiterIcon from '@assets/images/forms/ball_delimiter_icon.svg'
import cx from 'classnames'
import React, { FC, SyntheticEvent, useMemo, useState } from 'react'

interface UploadProps {
  type: 'button' | 'dragAndDrop'
  disabled?: boolean
  sizeLimit?: number
  supportedFormats?: string[]
}

const Upload: FC<UploadProps> = ({ type, disabled, sizeLimit, supportedFormats }: UploadProps) => {
  // STATES
  const [filePath, setFilePath] = useState<string>('')
  const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false)

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

  const dragAndDropClassNames = cx(
    "flex flex-col justify-evenly h-full w-full p-6 bg-white border-2 border-dashed border-gray-300 rounded-lg text-center",
    {
      "hover:border-gray-400 drag:border-gray-400 focus:border-gray-700 active:border-gray-700 cursor-pointer ": !disabled,
      "opacity-50 cursor-not-allowed bg-gray-200": disabled,
      "border-gray-400": !disabled && isDraggedOver
    }
  )

  // EVENT HANDLERS
  const handleUpload = () => {
    if (disabled) return

    const uploadInput = document.createElement('input')
    uploadInput.type = 'file'
    uploadInput.accept = supportedFormats?.toString() || ""

    uploadInput.addEventListener('change', () => {
      setFilePath(uploadInput.value)
    })

    uploadInput.click()
  }


  const handleDrop = (event: React.DragEvent) => {
    console.log("DROP")
    event.preventDefault()
    if (disabled) return
    const files = event.dataTransfer.items
    console.log(files)
    setIsDraggedOver(false)
  }

  // CONTENTS
  const getButtonContent = () => {
    return (
      <div className="flex flex-row gap-4">
        <div className={buttonClassNames}
             onClick={handleUpload}>
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
      <div className="relative h-40 w-480">
        <div className="absolute inset-0 z-50 rounded-lg bg-transparent"
             onClick={handleUpload}
             onDragEnter={() => setIsDraggedOver(true)}
             onDragOver={event => event.preventDefault()}
             onDragLeave={() => setIsDraggedOver(false)}
             onDrop={handleDrop}/>
        <div className={dragAndDropClassNames}>
          <div className="flex flex-row justify-center" >
            <div className="flex h-12 w-12 flex-row justify-center rounded-full bg-gray-200">
              <UploadIcon className="m-auto text-default"/>
            </div>
          </div>
          <h5 className="text-default font-semibold">Drag & drop upload</h5>
          <div className="flex flex-row justify-center gap-1 text-xs">
            <p>{sizeLimit} {sizeLimit && "MB"}</p>
            {
              sizeLimit && supportedFormats && supportedFormats.length > 0 && (
                <div className="grid grid-cols-1 content-center">
                  <BallDelimiterIcon/>
                </div>
              )
            }
            <p>{supportedFormats?.join(' ')}</p>
          </div>
        </div>
      </div>
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

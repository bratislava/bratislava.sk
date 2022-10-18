import BallDelimiterIcon from '@assets/images/forms/ball_delimiter_icon.svg'
import UploadIcon from '@assets/images/forms/upload-icon.svg'
import cx from 'classnames'
import React, { useState } from 'react'

interface UploadDropAreaProps {
  disabled?: boolean
  sizeLimit?: number
  supportedFormats?: string[]
  onClick?: () => void
  onDrop?: (newFiles: File[]) => void
}

const UploadDropArea = ({ disabled, sizeLimit, supportedFormats, onClick, onDrop }: UploadDropAreaProps) => {
  // STATE
  const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false)

  // STYLES
  const dragAndDropClassNames = cx(
    "flex flex-col justify-evenly h-full w-full p-6 bg-white rounded-lg text-center",
    {
      "opacity-50 bg-gray-200": disabled,
    }
  )

  const dragAndDropOverlayClassNames = cx(
    "absolute inset-0 z-50 rounded-lg bg-transparent border-2 border-dashed border-gray-300",
    {
      "hover:border-gray-400 drag:border-gray-400 focus:border-gray-700 active:border-gray-700 cursor-pointer ": !disabled,
      "cursor-not-allowed": disabled,
      "border-gray-400": !disabled && isDraggedOver
    }
  )

  // EVENT HANDLERS
  const reduceItemsToFiles = (filtered: File[], item: DataTransferItem): File[] => {
    if (item.kind !== 'file') return filtered
    const file = item.getAsFile()
    if (!file) return filtered
    filtered.push(file)
    return filtered
  }

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault()
    if (disabled) return

    const droppedItems: DataTransferItem[] = [...event.dataTransfer.items]
    const newFiles = droppedItems.reduce(reduceItemsToFiles, [])

    setIsDraggedOver(false)
    if (onDrop) {
      onDrop(newFiles)
    }
  }

  const handleOnClick = () => {
    if (onClick) {
      onClick()
    }
  }

  // RENDER
  return (
    <div className="relative h-40 w-480">
      <div className={dragAndDropOverlayClassNames}
           onClick={handleOnClick}
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

export default UploadDropArea

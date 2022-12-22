import PinFileErrorIcon from '@assets/images/forms/pin_file_error_icon.svg'
import PinFileHoverIcon from '@assets/images/forms/pin_file_hover_icon.svg'
import PinFileIcon from '@assets/images/forms/pin_file_icon.svg'
import TrashBinErrorIcon from '@assets/images/forms/trash_bin_error_icon.svg'
import TrashBinIcon from '@assets/images/forms/trash_bin_icon.svg'
import cx from 'classnames'
import { useState } from 'react'

import Spinner from '../../simple-components/Spinner'

interface UploadedFileProps {
  fileName: string
  errorMessage?: string
  isUploading?: boolean
  onRemove?: () => void
}

const UploadedFile = ({ fileName, errorMessage, isUploading, onRemove }: UploadedFileProps) => {
  const [isHovered, setIsHovered] = useState<boolean>(false)

  const classNames = cx(
    'cursor:pointer group linear text-20 flex w-full flex-row gap-2 rounded-lg py-1 px-2 transition-all',
    {
      'text-error': errorMessage,
      'hover:bg-gray-100 hover:text-gray-500': !errorMessage && !isUploading,
    },
  )

  const handleOnRemove = () => {
    if (onRemove) {
      onRemove()
    }
  }

  return (
    <div
      className={classNames}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="mr-2 flex w-full flex-row gap-2">
        <div className="flex flex-col justify-center">
          {isUploading ? (
            <Spinner size="sm" className="self-center" />
          ) : errorMessage ? (
            <PinFileErrorIcon />
          ) : isHovered ? (
            <PinFileHoverIcon />
          ) : (
            <PinFileIcon />
          )}
        </div>
        <p>{fileName}</p>
      </div>
      <div className="align-center flex w-5 flex-col justify-center gap-2">
        {errorMessage ? (
          <TrashBinErrorIcon className="cursor-pointer" onClick={handleOnRemove} />
        ) : (
          <TrashBinIcon
            className="hidden cursor-pointer self-center group-hover:block"
            onClick={handleOnRemove}
          />
        )}
      </div>
    </div>
  )
}

export default UploadedFile

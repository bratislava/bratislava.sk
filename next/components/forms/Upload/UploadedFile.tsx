import PinFileErrorIcon from '@assets/images/forms/pin_file_error_icon.svg'
import PinFileHoverIcon from '@assets/images/forms/pin_file_hover_icon.svg'
import PinFileIcon from '@assets/images/forms/pin_file_icon.svg'
import TrashBinErrorIcon from '@assets/images/forms/trash_bin_error_icon.svg'
import TrashBinIcon from '@assets/images/forms/trash_bin_icon.svg'
import cx from 'classnames'
import { useState } from 'react'

interface UploadedFileProps {
  fileName: string
  errorMessage?: string
  onRemove?: () => void
}

const UploadedFile = ({fileName, errorMessage, onRemove}: UploadedFileProps) => {
  const [isHovered, setIsHovered] = useState<boolean>(false)

  const classNames = cx(
    "cursor:pointer flex w-full flex-row gap-2 rounded-lg py-1 px-2 group transition-all linear",
    {
      "text-form-negative-default": errorMessage,
      "hover:bg-gray-100 hover:text-gray-500": !errorMessage
    }
  )

  const handleOnRemove = () => {
    if (onRemove) {
      onRemove()
    }
  }

  return (
    <div className={classNames}
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}>
      <div className="mr-2 flex w-full flex-row gap-2">
        {
          errorMessage
            ? <PinFileErrorIcon />
            : isHovered
              ? <PinFileHoverIcon/>
              : <PinFileIcon />
        }
        <p>{fileName}</p>
      </div>
      <div className="align-center flex w-5 flex-row gap-2">
        {
          errorMessage
            ? <TrashBinErrorIcon className="cursor-pointer"
                                 onClick={handleOnRemove}/>
            : <TrashBinIcon className="hidden cursor-pointer self-center group-hover:block"
                            onClick={handleOnRemove}/>
        }
      </div>
    </div>
  )
}

export default UploadedFile

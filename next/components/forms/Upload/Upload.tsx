import UploadIcon from '@assets/images/forms/upload-icon.svg'
import BallDelimiterIcon from '@assets/images/forms/ball_delimiter_icon.svg'
import cx from 'classnames'
import React, { FC, SyntheticEvent, useMemo, useState } from 'react'
import UploadButton from './UploadButton'
import UploadDropArea from './UploadDropArea'

interface UploadProps {
  type: 'button' | 'dragAndDrop'
  disabled?: boolean
  sizeLimit?: number
  supportedFormats?: string[]
}

const Upload: FC<UploadProps> = ({ type, disabled, sizeLimit, supportedFormats }: UploadProps) => {
  // STATES
  const [files, setFiles] = useState<File[]>([])
  console.log("FILES:", files)

  // EVENT HANDLERS
  const handleOnClickUpload = () => {
    if (disabled) return

    const uploadInput = document.createElement('input')
    uploadInput.type = 'file'
    uploadInput.multiple = true
    uploadInput.accept = supportedFormats?.toString() || ""

    uploadInput.addEventListener('change', () => {
      if (!uploadInput.files) return
      const newFiles = Array.from(uploadInput.files)
      setFiles([...files, ...newFiles])
    })

    uploadInput.click()
  }

  const handleOnDrop = (newFiles: File[]) => {
    setFiles([...files, ...newFiles])
  }


  // RENDER
  return (
    <section className="select-none" style={{transition: "0.2 all linear"}}>
      { /* CONTENT */
        type === 'button'
          ? <UploadButton sizeLimit={sizeLimit}
                          supportedFormats={supportedFormats}
                          disabled={disabled}
                          onClick={handleOnClickUpload} />
          : type === 'dragAndDrop'
            ? <UploadDropArea sizeLimit={sizeLimit}
                              supportedFormats={supportedFormats}
                              disabled={disabled}
                              onClick={handleOnClickUpload}
                              onDrop={handleOnDrop}/>
            : <div/>
      }
    </section>
  )
}

export default Upload

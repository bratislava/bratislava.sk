import React, { FC, useState } from 'react'

import UploadButton from './UploadButton'
import UploadDropArea from './UploadDropArea'
import UploadedFile from './UploadedFile'

interface UploadProps {
  type: 'button' | 'dragAndDrop'
  disabled?: boolean
  sizeLimit?: number
  supportedFormats?: string[]
}

const Upload: FC<UploadProps> = ({ type, disabled, sizeLimit, supportedFormats }: UploadProps) => {
  // STATES
  const [componentFiles, setComponentFiles] = useState<File[]>([])
  console.log("FILES:", componentFiles)

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
      setComponentFiles([...componentFiles, ...newFiles])
    })

    uploadInput.click()
  }

  const handleOnDrop = (newFiles: File[]) => {
    setComponentFiles([...componentFiles, ...newFiles])
  }


  // RENDER
  return (
    <section className="select-none" style={{transition: "0.2 all linear"}}>
      { /* UPLOAD AREA */
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
            : null
      }
      <div className="mt-2">
        { /* FILES AREA */
          componentFiles.map(file => <UploadedFile fileName={file.name}/>)
        }
      </div>
    </section>
  )
}

export default Upload

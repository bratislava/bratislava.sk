import React, { FC, useState } from 'react'

import UploadButton from './UploadButton'
import UploadDropArea from './UploadDropArea'
import UploadedFile from './UploadedFile'

interface UploadProps {
  type: 'button' | 'dragAndDrop'
  value?: File[]
  disabled?: boolean
  sizeLimit?: number
  supportedFormats?: string[]
  onChange?: (value: File[]) => void
}

const Upload: FC<UploadProps> = ({ type, value, disabled, sizeLimit, supportedFormats, onChange }: UploadProps) => {
  // STATES
  const [isFileBroken, setIsFileBroken] = useState<boolean>(false)

  // HELPER FUNCTIONS
  const emitOnChange = (newFiles: File[], oldFiles?: File[]) => {
    if (onChange) {
      const changedValue = oldFiles ? [...oldFiles, ...newFiles] : newFiles
      onChange(changedValue)
    }
  }

  const isFileInSizeLimit = (file: File) => {
    const mbSize = file.size / (1024 * 1024)
    return !(sizeLimit && mbSize > sizeLimit);
  }

  const isFileInSupportedFormats = (file: File) => {
    if (!supportedFormats) return true

    const lastIndex = file.name.lastIndexOf(".")
    if (!lastIndex) return false

    const fileExtension = file.name.slice(lastIndex)
    return supportedFormats.includes(fileExtension);
  }

  const addNewFiles = (newFiles: File[]) => {
    for (const file of newFiles) {
      if (!isFileInSizeLimit(file) || !isFileInSupportedFormats(file)) {
        setIsFileBroken(true)
        return
      }
    }

    emitOnChange(newFiles, value)
    setIsFileBroken(false)
  }

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
      addNewFiles(newFiles)
    })

    uploadInput.click()
  }

  const handleOnDrop = (newFiles: File[]) => {
    addNewFiles(newFiles)
  }

  const handleOnRemoveFile = (id: number) => {
    const updatedFiles: File[] = value ? [...value] : []
    updatedFiles.splice(id,1)
    emitOnChange(updatedFiles)
  }


  // RENDER
  return (
    <section className="select-none" style={{transition: "0.2 all linear"}}>
      { /* UPLOAD AREA */
        type === 'button'
          ? <UploadButton sizeLimit={sizeLimit}
                          supportedFormats={supportedFormats}
                          disabled={disabled}
                          isFileBroken={isFileBroken}
                          onClick={handleOnClickUpload} />
          : type === 'dragAndDrop'
            ? <UploadDropArea sizeLimit={sizeLimit}
                              supportedFormats={supportedFormats}
                              disabled={disabled}
                              isFileBroken={isFileBroken}
                              onClick={handleOnClickUpload}
                              onDrop={handleOnDrop}/>
            : null
      }
      <div className="mt-2">
        { /* FILES AREA */
          value?.map((file: File, key: number) => {
            return <UploadedFile key={key} fileName={file.name} onRemove={() => handleOnRemoveFile(key)}/>
          })
        }
      </div>
    </section>
  )
}

export default Upload

import React, { ForwardedRef, forwardRef, ForwardRefRenderFunction, useState } from 'react'

import UploadButton from './UploadButton'
import UploadDropArea from './UploadDropArea'
import UploadedFile from './UploadedFile'
import { uploadFiles } from '../../../backend/services/minio'
import { NextApiResponse } from 'next'
import { UploadMinioFile } from '../../../backend/dtos/minio/upload-minio-file.dto'


interface UploadProps {
  type: 'button' | 'dragAndDrop'
  value?: UploadMinioFile[]
  disabled?: boolean
  sizeLimit?: number
  supportedFormats?: string[]
  onChange?: (value: UploadMinioFile[]) => void
}

const UploadComponent: ForwardRefRenderFunction<HTMLDivElement, UploadProps> = (props:UploadProps, ref: ForwardedRef<HTMLDivElement>) => {
  const { type, value, disabled, sizeLimit, supportedFormats, onChange }: UploadProps = props

  // STATES
  const [fileBrokenMessage, setFileBrokenMessage] = useState<string|null>()


  // HELPER FUNCTIONS
  const emitOnChange = (newFiles: UploadMinioFile[], oldFiles?: UploadMinioFile[]) => {
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

  const areFilesValid = (files: UploadMinioFile[]) => {
    for (const { file } of files) {
      if (!isFileInSizeLimit(file)) {
        setFileBrokenMessage(`File ${file.name} is too large.`)
        return false
      }
      if (!isFileInSupportedFormats(file)) {
        setFileBrokenMessage(`File ${file.name} has wrong extension.`)
        return false
      }
    }
    return true
  }

  const addNewFiles = async (newFiles: UploadMinioFile[]) => {
    if (areFilesValid(newFiles)) {
      await uploadFiles(newFiles)
        .then((res: NextApiResponse) => {
          console.log(res)
          emitOnChange(newFiles, value)
          setFileBrokenMessage(null)
        })
    }
  }

  // EVENT HANDLERS
  const handleOnClickUpload = () => {
    if (disabled) return

    const uploadInput = document.createElement('input')
    uploadInput.type = 'file'
    uploadInput.multiple = true
    uploadInput.accept = supportedFormats?.toString() || ""

    uploadInput.addEventListener('change', async () => {
      if (!uploadInput.files) return
      const newFiles = Array.from(uploadInput.files, file => { return { file }})
      await addNewFiles(newFiles)
    })

    uploadInput.click()
  }

  const handleOnDrop = async (newFiles: UploadMinioFile[]) => {
    await addNewFiles(newFiles)
  }

  const handleOnRemoveFile = (id: number) => {
    const updatedFiles: UploadMinioFile[] = value ? [...value] : []
    updatedFiles.splice(id,1)
    emitOnChange(updatedFiles)
  }


  // RENDER
  return (
    <section className="select-none" style={{transition: "0.2 all linear"}}>
      { /* UPLOAD AREA */
        type === 'button'
          ? <UploadButton ref={ref}
                          value={value}
                          sizeLimit={sizeLimit}
                          supportedFormats={supportedFormats}
                          disabled={disabled}
                          fileBrokenMessage={fileBrokenMessage}
                          onClick={handleOnClickUpload} />
          : type === 'dragAndDrop'
            ? <UploadDropArea ref={ref}
                              value={value}
                              sizeLimit={sizeLimit}
                              supportedFormats={supportedFormats}
                              disabled={disabled}
                              fileBrokenMessage={fileBrokenMessage}
                              onClick={handleOnClickUpload}
                              onDrop={handleOnDrop} />
            : null
      }
      {
        fileBrokenMessage && <p className="w-full p-1 text-red-500">{fileBrokenMessage}</p>
      }
      <div className="mt-2">
        { /* FILES AREA */
          value?.map(({ file, errorMessage}: UploadMinioFile, key: number) => {
            return <UploadedFile key={key} fileName={file.name} errorMessage={errorMessage}
                                 onRemove={() => handleOnRemoveFile(key)}/>
          })
        }
      </div>
    </section>
  )
}

const Upload = forwardRef<HTMLDivElement, UploadProps>(UploadComponent)

export default Upload

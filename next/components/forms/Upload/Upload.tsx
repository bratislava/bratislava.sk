import React, { ForwardedRef, forwardRef, ForwardRefRenderFunction, useState } from 'react'
import { v4 as createUuid } from 'uuid'

import { UploadMinioFile } from '../../../backend/dtos/minio/upload-minio-file.dto'
import { deleteFile, uploadFile } from '../../../backend/services/minio'
import UploadButton from './UploadButton'
import UploadDropArea from './UploadDropArea'
import UploadedFile from './UploadedFile'

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
  const [fileBrokenMessages, setFileBrokenMessages] = useState<string[]>([])


  // HELPER FUNCTIONS
  const emitOnChange = (newFiles: UploadMinioFile[], oldFiles?: UploadMinioFile[]) => {
    if (onChange) {
      const changedValue = oldFiles ? [...oldFiles, ...newFiles] : newFiles
      onChange(changedValue)
    }
  }

  const isFileInSizeLimit = (file : File) => {
    const mbSize = file.size / (1024 * 1024)
    return !(sizeLimit && mbSize > sizeLimit);
  }

  const isFileInSupportedFormats = (file : File) => {
    if (!supportedFormats) return true

    const lastIndex = file.name.lastIndexOf(".")
    if (!lastIndex) return false

    const fileExtension = file.name.slice(lastIndex)
    return supportedFormats.includes(fileExtension);
  }

  const addTimeStampToFileName = (file: File) => {
    const newName = `${Date.now()}_${createUuid()}_${file.name}`
    return new File([file], newName, {
      type: file.type,
      lastModified: file.lastModified
    })
  }

  const sanitizeClientFiles = (minioFiles: UploadMinioFile[]) => {
    const messages: string[] = []
    const chosenFiles: UploadMinioFile[] = []

    for (const minioFile of minioFiles) {
      if (!isFileInSupportedFormats(minioFile.file)) {
        messages.push(`${minioFile.file.name} has wrong extension.`)
      } else if (!isFileInSizeLimit(minioFile.file)) {
        messages.push(`${minioFile.file.name} is too large.`)
      } else {
        minioFile.file = addTimeStampToFileName(minioFile.file)
        minioFile.isUploading = true
        chosenFiles.push(minioFile)
      }
    }

    setFileBrokenMessages(messages)
    return chosenFiles
  }

  const addNewFiles = (newFiles: UploadMinioFile[]) => {
    const sanitizedFiles = sanitizeClientFiles(newFiles)
    emitOnChange(sanitizedFiles, value)

    sanitizedFiles.forEach((minioFile, id) => {
      uploadFile(minioFile.file)
        .then((res) => {
          if (res.status !== 200) throw new Error(`Api response status: ${res.status}`)
          if (!value) throw new Error("Value not defined in component")
          return res
        })
        .finally(() => {
          sanitizedFiles[id].isUploading = false
          emitOnChange(sanitizedFiles, value)
        })
        .catch(error => {
          console.log(error)
          sanitizedFiles[id].errorMessage = "File not uploaded"
        })
    })
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
      const newFiles = Array.from(uploadInput.files, file => { return { file, originalName: file.name }})
      addNewFiles(newFiles)
    })

    uploadInput.click()
  }

  const handleOnDrop = (newFiles: UploadMinioFile[]) => {
    addNewFiles(newFiles)
  }

  const removeFileOnClient = (fileName: string) => {
    const updatedFiles = value
      ? value.filter(minioFile => minioFile.file.name !== fileName)
      : []
    emitOnChange(updatedFiles)
  }

  const handleOnRemoveFile = (id: number) => {
    if (!value) return
    const fileName = value[id].file.name

    removeFileOnClient(fileName)
    deleteFile(fileName)
      .then((res) => {
        if (res.status !== 200) throw new Error(`Api response status: ${res.status}`)
        if (!value) throw new Error("Value not defined in component")
        return res
      })
      .catch(error => console.log(error))
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
                          fileBrokenMessage={fileBrokenMessages}
                          onClick={handleOnClickUpload} />
          : type === 'dragAndDrop'
            ? <UploadDropArea ref={ref}
                              value={value}
                              sizeLimit={sizeLimit}
                              supportedFormats={supportedFormats}
                              disabled={disabled}
                              fileBrokenMessage={fileBrokenMessages}
                              onClick={handleOnClickUpload}
                              onDrop={handleOnDrop} />
            : null
      }
      { /* messages when file is is broken/invalid before sending to bucket */
        fileBrokenMessages.map((message, key )=>  <p key={key} className="w-full p-1 text-red-500">{message}</p>)
      }
      <div className="mt-2">
        { /* FILES AREA */
          value?.map((minioFile: UploadMinioFile, key: number) => {
            return <UploadedFile key={key} fileName={minioFile.originalName}
                                 errorMessage={minioFile.errorMessage} isUploading={minioFile.isUploading}
                                 onRemove={() => handleOnRemoveFile(key)}/>
          })
        }
      </div>
    </section>
  )
}

const Upload = forwardRef<HTMLDivElement, UploadProps>(UploadComponent)

export default Upload

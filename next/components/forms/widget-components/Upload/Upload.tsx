import { UploadMinioFile } from '@backend/dtos/minio/upload-minio-file.dto'
import { deleteFile, uploadFile } from '@backend/services/minio'
import cx from 'classnames'
import FieldErrorMessage from 'components/forms/info-components/FieldErrorMessage'
import React, { ForwardedRef, forwardRef, ForwardRefRenderFunction, useState } from 'react'
import { v4 as createUuid } from 'uuid'

import UploadBrokenMessages from '../../info-components/UploadBrokenMessages'
import UploadFieldHeader from '../../info-components/UploadFieldHeader'
import UploadButton from './UploadButton'
import UploadDropArea from './UploadDropArea'
import UploadedFilesList from './UploadedFilesList'

interface UploadProps {
  type: 'button' | 'dragAndDrop'
  label?: string
  required?: boolean
  multiple?: boolean
  value?: UploadMinioFile[]
  description?: string
  disabled?: boolean
  sizeLimit?: number
  supportedFormats?: string[]
  className?: string
  onChange?: (value: UploadMinioFile[]) => void
  errorMessage?: string[]
}

const UploadComponent: ForwardRefRenderFunction<HTMLDivElement, UploadProps> = (
  props: UploadProps,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  const {
    type,
    label,
    required,
    multiple,
    value,
    description,
    disabled,
    sizeLimit,
    supportedFormats,
    className,
    onChange,
    errorMessage,
  }: UploadProps = props

  // STATES
  const [fileBrokenMessages, setFileBrokenMessages] = useState<string[]>([])

  // HELPER FUNCTIONS
  const emitOnChange = (newFiles: UploadMinioFile[], oldFiles?: UploadMinioFile[]) => {
    if (onChange) {
      const changedValue = multiple && oldFiles ? [...oldFiles, ...newFiles] : [...newFiles]
      onChange(changedValue)
    }
  }

  const removeFirstFile = () => {
    if (!value) return
    const fileName = value[0].file.name

    deleteFile(fileName)
      .then((res) => {
        if (res.status !== 200) throw new Error(`Api response status: ${res.status}`)
        return res
      })
      .catch((error) => console.log(error))
  }

  const isFileInSizeLimit = (file: File) => {
    const mbSize = file.size / (1024 * 1024)
    return !(sizeLimit && mbSize > sizeLimit)
  }

  const isFileInSupportedFormats = (file: File) => {
    if (!supportedFormats) return true

    const lastIndex = file.name.lastIndexOf('.')
    if (!lastIndex) return false

    const fileExtension = file.name.slice(lastIndex)
    return supportedFormats.includes(fileExtension)
  }

  const addTimeStampToFileName = (file: File) => {
    const newName = `${Date.now()}_${createUuid()}_${file.name}`
    return new File([file], newName, {
      type: file.type,
      lastModified: file.lastModified,
    })
  }

  const sanitizeClientFiles = (minioFiles: UploadMinioFile[]) => {
    const messages: string[] = []
    const chosenFiles: UploadMinioFile[] = []

    minioFiles.forEach((minioFile) => {
      if (!isFileInSupportedFormats(minioFile.file)) {
        messages.push(`${minioFile.file.name} has wrong extension.`)
      } else if (!isFileInSizeLimit(minioFile.file)) {
        messages.push(`${minioFile.file.name} is too large.`)
      } else {
        const sanitizedFile: UploadMinioFile = {
          file: addTimeStampToFileName(minioFile.file),
          isUploading: true,
          originalName: minioFile.originalName,
        }
        chosenFiles.push(sanitizedFile)
      }
    })

    setFileBrokenMessages(messages)
    return chosenFiles
  }

  const addNewFiles = (newFiles: UploadMinioFile[]) => {
    const sanitizedFiles = sanitizeClientFiles(newFiles)
    if (multiple && value && value[0]) {
      removeFirstFile()
    }
    emitOnChange(sanitizedFiles, value)

    sanitizedFiles.forEach((minioFile, id) => {
      uploadFile(minioFile.file)
        .then((res) => {
          console.log('RES UPLOAD:', res)
          return res
        })
        .catch((error) => {
          console.log(error)
          sanitizedFiles[id].errorMessage = 'File not uploaded'
        })
        .finally(() => {
          sanitizedFiles[id].isUploading = false
          emitOnChange(sanitizedFiles, value)
        })
    })
  }

  const handleOnClickUpload = () => {
    if (disabled) return

    const uploadInput = document.createElement('input')
    uploadInput.type = 'file'
    uploadInput.multiple = multiple === undefined ? false : multiple
    uploadInput.accept = supportedFormats?.toString() || ''

    uploadInput.addEventListener('change', () => {
      if (!uploadInput.files) return
      const newFiles = Array.from(uploadInput.files, (file) => {
        return { file, originalName: file.name }
      })
      addNewFiles(newFiles)
    })

    uploadInput.click()
  }

  const handleOnDrop = (newFiles: UploadMinioFile[]) => {
    addNewFiles(newFiles)
  }

  const removeFileOnClient = (fileName: string) => {
    const updatedFiles = value ? value.filter((minioFile) => minioFile.file.name !== fileName) : []
    emitOnChange(updatedFiles)
  }

  const handleOnRemoveFile = (id: number) => {
    if (!value) return
    const fileName = value[id].file.name

    removeFileOnClient(fileName)
    deleteFile(fileName)
      .then((res) => {
        if (res.status !== 200) throw new Error(`Api response status: ${res.status}`)
        if (!value) throw new Error('Value not defined in component')
        return res
      })
      .catch((error) => console.log(error))
  }

  // RENDER
  return (
    <section
      className={cx('select-none w-fit h-fit', className)}
      style={{ transition: '0.2 all linear' }}
    >
      <UploadFieldHeader label={label ?? ''} required={required} description={description} />
      {
        /* UPLOAD AREA */
        type === 'button' ? (
          <UploadButton
            ref={ref}
            value={value}
            sizeLimit={sizeLimit}
            supportedFormats={supportedFormats}
            disabled={disabled}
            fileBrokenMessage={fileBrokenMessages}
            onClick={handleOnClickUpload}
          />
        ) : type === 'dragAndDrop' ? (
          <UploadDropArea
            ref={ref}
            multiple={multiple}
            value={value}
            sizeLimit={sizeLimit}
            supportedFormats={supportedFormats}
            disabled={disabled}
            fileBrokenMessage={fileBrokenMessages}
            onClick={handleOnClickUpload}
            onDrop={handleOnDrop}
          />
        ) : null
      }
      <UploadBrokenMessages fileBrokenMessages={fileBrokenMessages} />
      <UploadedFilesList allFiles={value} handleOnRemoveFile={handleOnRemoveFile} />
      {!disabled && <FieldErrorMessage errorMessage={errorMessage} />}
    </section>
  )
}

const Upload = forwardRef<HTMLDivElement, UploadProps>(UploadComponent)

export default Upload

import React, { ForwardedRef, forwardRef, ForwardRefRenderFunction, useState } from 'react'

import { UploadMinioFile } from '../../../backend/dtos/minio/upload-minio-file.dto'
import { uploadFile } from '../../../backend/services/minio'
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

  const isFileInSizeLimit = ({ file }: UploadMinioFile) => {
    const mbSize = file.size / (1024 * 1024)
    return !(sizeLimit && mbSize > sizeLimit);
  }

  const isFileInSupportedFormats = ({ file }: UploadMinioFile) => {
    if (!supportedFormats) return true

    const lastIndex = file.name.lastIndexOf(".")
    if (!lastIndex) return false

    const fileExtension = file.name.slice(lastIndex)
    return supportedFormats.includes(fileExtension);
  }

  const validClientFiles = (uploadFiles: UploadMinioFile[]) => {
    const messages: string[] = []
    const chosenFiles: UploadMinioFile[] = []

    for (const file of uploadFiles) {
      if (!isFileInSupportedFormats(file)) {
        messages.push(`${file.file.name} has wrong extension.`)
      } else if (!isFileInSizeLimit(file)) {
        messages.push(`${file.file.name} is too large.`)
      } else {
        file.isUploading = true
        chosenFiles.push(file)
      }
    }

    setFileBrokenMessages(messages)
    return chosenFiles
  }

  const addNewFiles = (newFiles: UploadMinioFile[]) => {
    const validatedFiles = validClientFiles(newFiles)
    emitOnChange(validatedFiles, value)

    validatedFiles.forEach((file, id) => {
      uploadFile(file)
        .then((res) => {
          if (!value) return
          validatedFiles[id].isUploading = false
          emitOnChange(validatedFiles, value)
        })
        .catch(error => console.log(error))
    })

    // if (areFilesValid(newFiles)) {
    //   await uploadFiles(newFiles)
    //     .then((res: NextApiResponse) => {
    //       console.log(res)
    //       emitOnChange(newFiles, value)
    //       setFileBrokenMessages(null)
    //     })
    // }
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
      const newFiles = Array.from(uploadInput.files, file => { return { file }})
      addNewFiles(newFiles)
    })

    uploadInput.click()
  }

  const handleOnDrop = (newFiles: UploadMinioFile[]) => {
    addNewFiles(newFiles)
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
          value?.map(({ file, errorMessage, isUploading }: UploadMinioFile, key: number) => {
            return <UploadedFile key={key} fileName={file.name}
                                 errorMessage={errorMessage} isUploading={isUploading}
                                 onRemove={() => handleOnRemoveFile(key)}/>
          })
        }
      </div>
    </section>
  )
}

const Upload = forwardRef<HTMLDivElement, UploadProps>(UploadComponent)

export default Upload

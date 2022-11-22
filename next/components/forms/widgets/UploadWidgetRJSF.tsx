import { UploadMinioFile } from '@backend/dtos/minio/upload-minio-file.dto'
import { StrictRJSFSchema, WidgetProps } from '@rjsf/utils'
import { useState } from 'react'

import Upload from '../Upload/Upload'
import UploadRJSFOptions from '../Upload/UploadRJSFOptions'

interface UploadWidgetRJSFProps extends WidgetProps{
  options: UploadRJSFOptions
  schema: StrictRJSFSchema
  disabled?: boolean
  multiple?: boolean
  onChange: (value: string|string[]) => void;
}

const UploadWidgetRJSF = (props: UploadWidgetRJSFProps) => {
  const {
    options,
    schema,
    disabled,
    onChange
  } = props

  const {
    size,
    accept,
    type = "button",
    className
  } = options

  const supportedFormats = accept?.split(",")
  const multiple = schema.type === "array"

  const [value, setValue] = useState<UploadMinioFile[]>([])

  const handleOneFile = (files: UploadMinioFile[]) => {
    const fileName = files[0]?.file.name
    onChange(fileName)
  }

  const handleMultipleFiles = (files: UploadMinioFile[]) => {
    const chosenFileNames: string[] = []
    files.forEach(minioFile => {
      if (!minioFile.isUploading && !minioFile.errorMessage) {
        chosenFileNames.push(minioFile.file.name)
      }
    })
    onChange(chosenFileNames)
  }

  const handleOnChange = (files: UploadMinioFile[]) => {
    setValue(files)
    if (multiple) {
      handleMultipleFiles(files)
    } else {
      handleOneFile(files)
    }
  }

  return <Upload type={type} value={value} className={className} sizeLimit={size} supportedFormats={supportedFormats}
                 disabled={disabled} onChange={handleOnChange}/>
}

export default UploadWidgetRJSF

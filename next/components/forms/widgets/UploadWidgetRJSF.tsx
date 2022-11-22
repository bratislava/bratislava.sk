import { UploadMinioFile } from '@backend/dtos/minio/upload-minio-file.dto'
import { StrictRJSFSchema, WidgetProps } from '@rjsf/utils'
import cx from 'classnames'
import { useEffect, useState } from 'react'

import Upload from '../Upload/Upload'
import UploadRJSFOptions from '../Upload/UploadRJSFOptions'

interface UploadWidgetRJSFProps extends WidgetProps{
  options: UploadRJSFOptions
  schema: StrictRJSFSchema
  value: string|string[]
  disabled?: boolean
  multiple?: boolean
  onChange: (value: string|string[]) => void;
}

const UploadWidgetRJSF = (props: UploadWidgetRJSFProps) => {
  const {
    options,
    schema,
    value,
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
  const widgetClassName = cx("px-2 py-4", className)

  const fileNameToMinioFile = (fileName: string): UploadMinioFile => {
    const fileNameArray = fileName.split("_")
    fileNameArray.splice(0,2)
    const originalName = fileNameArray.join("_")
    console.log(originalName)
    return {
      file: new File([], fileName),
      isUploading: false,
      originalName
    }
  }

  const transformInitialValue = () => {
    const files: UploadMinioFile[] = []

    if (!value || value.length === 0) {
      return files
    } else if (schema.type === "string" && typeof value === 'string') {
      const minioFile = fileNameToMinioFile(value)
      files.push(minioFile)
    } else if (schema.type === "array" && typeof value !== 'string') {
      value.forEach(file => {
        const minioFile = fileNameToMinioFile(file)
        files.push(minioFile)
      })
    }

    return files
  }

  const [innerValue, setInnerValue] = useState<UploadMinioFile[]>([])

  useEffect(() => {
    // I need save multiple info about file, which are not available in possible value of rjsf, but needed DURING upload
    // I am saving these info only in innerValue of widget
    // but when I go to previous step of stepper, component are rebuild and I still need (now just) fileName, so I read fileNames and transform it
    setInnerValue(transformInitialValue)
  }, [])

  const handleOneFile = (files: UploadMinioFile[]) => {
    if (!files[0].isUploading && !files[0].errorMessage) {
      onChange(files[0]?.file.name)
    }
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
    setInnerValue(files)
    if (multiple) {
      handleMultipleFiles(files)
    } else {
      handleOneFile(files)
    }
  }

  return <Upload type={type} multiple={multiple} value={innerValue} className={widgetClassName} sizeLimit={size} supportedFormats={supportedFormats}
                 disabled={disabled} onChange={handleOnChange}/>
}

export default UploadWidgetRJSF

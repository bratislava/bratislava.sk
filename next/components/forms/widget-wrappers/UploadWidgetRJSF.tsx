import { UploadMinioFile } from '@backend/dtos/minio/upload-minio-file.dto'
import { StrictRJSFSchema, WidgetProps } from '@rjsf/utils'
import cx from 'classnames'
import { useEffect, useState } from 'react'
import { useEffectOnce } from 'usehooks-ts'

import Upload from '../widget-components/Upload/Upload'
import UploadRJSFOptions from '../widget-components/Upload/UploadRJSFOptions'

interface UploadWidgetRJSFProps extends WidgetProps {
  options: UploadRJSFOptions
  schema: StrictRJSFSchema
  value: string | string[]
  disabled?: boolean
  multiple?: boolean
  onChange: (value: string | string[]) => void
}

const UploadWidgetRJSF = (props: UploadWidgetRJSFProps) => {
  const { options, schema, value, disabled, onChange } = props

  const { size, accept, type = 'button', className } = options

  const [innerValue, setInnerValue] = useState<UploadMinioFile[]>([])

  const supportedFormats = accept?.split(',')
  const multiple = schema.type === 'array'
  const widgetClassName = cx('px-2 py-4', className)

  const fileNameToMinioFile = (fileName: string): UploadMinioFile => {
    const fileNameArray = fileName.split('_')
    fileNameArray.splice(0, 2)
    const originalName = fileNameArray.join('_')
    return {
      file: new File([], fileName),
      isUploading: false,
      originalName,
    }
  }

  useEffectOnce(() => {
    // I need to save multiple pieces of info about the file - this isn't stored in rjsf, but needed DURING upload
    // I am saving this info only in innerValue of widget
    // but when I go to previous step of the stepper, component is rebuilt and I still need at least the fileName, so I read fileNames from rjsf state and transform them
    const valueArray: string[] =
      schema.type === 'array' && Array.isArray(value)
        ? [...value]
        : value && !Array.isArray(value)
        ? [value]
        : []
    const initialInnerValue: UploadMinioFile[] = valueArray.map(fileNameToMinioFile)
    setInnerValue(initialInnerValue)
  })

  const handleOneFile = (files: UploadMinioFile[]) => {
    if (!files[0]?.isUploading && !files[0]?.errorMessage) {
      onChange(files[0]?.file.name)
    } else {
      onChange('')
    }
  }

  const handleMultipleFiles = (files: UploadMinioFile[]) => {
    const chosenFileNames: string[] = []
    files.forEach((minioFile) => {
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

  return (
    <Upload
      type={type}
      multiple={multiple}
      value={innerValue}
      className={widgetClassName}
      sizeLimit={size}
      supportedFormats={supportedFormats}
      disabled={disabled}
      onChange={handleOnChange}
    />
  )
}

export default UploadWidgetRJSF

import { UploadMinioFile } from '@backend/dtos/minio/upload-minio-file.dto'
import { StrictRJSFSchema, WidgetProps } from '@rjsf/utils'
import WidgetWrapper from 'components/forms/widget-wrappers/WidgetWrapper'
import { useState } from 'react'
import { useEffectOnce } from 'usehooks-ts'

import Upload from '../widget-components/Upload/Upload'
import UploadRJSFOptions from '../widget-components/Upload/UploadRJSFOptions'

interface UploadWidgetRJSFProps extends WidgetProps {
  options: UploadRJSFOptions
  schema: StrictRJSFSchema
  label: string
  required?: boolean
  value: string | string[] | null
  disabled?: boolean
  multiple?: boolean
  onChange: (value?: string | string[]) => void
  rawErrors?: string[]
}

const UploadWidgetRJSF = (props: UploadWidgetRJSFProps) => {
  const { options, schema, label, required, value, disabled, onChange, rawErrors } = props

  const {
    size,
    accept,
    type = 'button',
    className,
    spaceBottom = 'small',
    spaceTop = 'none',
  } = options

  const [innerValue, setInnerValue] = useState<UploadMinioFile[]>([])

  const supportedFormats = accept?.split(',')
  const multiple = schema.type === 'array'

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
      schema.type === 'array' && value && Array.isArray(value)
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
      onChange()
    }
  }

  const handleMultipleFiles = (files: UploadMinioFile[]) => {
    const chosenFileNames: string[] = []
    files.forEach((minioFile) => {
      if (!minioFile.isUploading && !minioFile.errorMessage) {
        chosenFileNames.push(minioFile.file.name)
      }
    })
    if (chosenFileNames.length > 0) {
      onChange(chosenFileNames)
    } else {
      onChange()
    }
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
    <WidgetWrapper spaceBottom={spaceBottom} spaceTop={spaceTop}>
      <Upload
        errorMessage={rawErrors}
        type={type}
        label={label}
        required={required}
        multiple={multiple}
        value={innerValue}
        className={className}
        sizeLimit={size}
        supportedFormats={supportedFormats}
        disabled={disabled}
        onChange={handleOnChange}
      />
    </WidgetWrapper>
  )
}

export default UploadWidgetRJSF

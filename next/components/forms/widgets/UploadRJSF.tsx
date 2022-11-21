import { UploadMinioFile } from '@backend/dtos/minio/upload-minio-file.dto'
import { WidgetProps } from '@rjsf/utils'

import Upload from '../Upload/Upload'
import UploadRJSFOptions from '../Upload/UploadRJSFOptions'
import { useState } from 'react'

interface RJSFUploadProps extends WidgetProps {
  options: UploadRJSFOptions
  disabled?: boolean
  multiple?: boolean
  onChange: (value: string|string[]) => void;
}

const UploadRJSF = (props: RJSFUploadProps) => {
  const {
    disabled,
    options,
    onChange
  } = props

  const {
    size,
    accept,
    type = "button",
    className
  } = options

  const supportedFormats = accept?.split(",")

  const [value, setValue] = useState<UploadMinioFile[]>([])

  const handleOnChange = (files: UploadMinioFile[]) => {
    setValue(files)
    onChange(files[0]?.file.name)
  }

  return <Upload type={type} value={value} className={className} sizeLimit={size} supportedFormats={supportedFormats}
                 disabled={disabled} onChange={handleOnChange}/>
}

export default UploadRJSF

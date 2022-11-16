import { UploadMinioFile } from '@backend/dtos/minio/upload-minio-file.dto'
import { WidgetProps } from '@rjsf/utils'

import Upload from '../Upload/Upload'
import UploadRJSFOptions from '../Upload/UploadRJSFOptions'

interface RJSFUploadProps extends WidgetProps {
  value: UploadMinioFile[]
  options: UploadRJSFOptions
  disabled?: boolean
  onChange: (values: UploadMinioFile[]) => void;
}

const UploadRJSF = (props: RJSFUploadProps) => {
  const {
    value,
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

  return <Upload type={type} value={value} className={className} sizeLimit={size} supportedFormats={supportedFormats}
                 disabled={disabled} onChange={onChange}/>
}

export default UploadRJSF

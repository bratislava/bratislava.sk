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
    sizeLimit,
    supportedFormats,
    type = "button"
  } = options

  return <Upload type={type} value={value} onChange={onChange} sizeLimit={sizeLimit}
                 supportedFormats={supportedFormats} disabled={disabled}/>
}

export default UploadRJSF

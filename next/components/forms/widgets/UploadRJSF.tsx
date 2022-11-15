import { UploadMinioFile } from '@backend/dtos/minio/upload-minio-file.dto'

import Upload from '../Upload/Upload'
import UploadRJSFOptions from '../Upload/UploadRJSFOptions'

interface RJSFUploadProps {
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

  // const {
  //   sizeLimit,
  //   supportedFormats,
  //   type = "button"
  // } = options

  return <Upload type={"button"} value={value} onChange={onChange}
                  disabled={disabled}/>
}

export default UploadRJSF

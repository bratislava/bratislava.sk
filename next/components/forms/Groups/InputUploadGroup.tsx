import { UploadMinioFile } from '@backend/dtos/minio/upload-minio-file.dto'
import cx from 'classnames'
import { useState } from 'react'

import InputField from '../InputField'
import Upload from '../Upload/Upload'

type InputUploadBase = {
  UploadLabel: string
  InputLabel: string
}

export const InputUploadGroup = ({ UploadLabel, InputLabel }: InputUploadBase) => {
  const [files6, setFiles6] = useState<UploadMinioFile[]>([])
  return (
    <div className={cx('gap-6 w-full flex flex-col items-start p-6')}>
      <InputField label={InputLabel} placeholder="" className="w-full" />
      <div>alebo</div>
      <div>
        <div className="text-p-md font-semibold leading-8 not-italic">{UploadLabel}</div>
        <Upload
          type="button"
          sizeLimit={5}
          supportedFormats={['.jpg', '.png', '.pdf']}
          value={files6}
          onChange={(newValue) => setFiles6(newValue)}
        />
      </div>
    </div>
  )
}

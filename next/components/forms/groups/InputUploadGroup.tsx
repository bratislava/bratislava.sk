import { UploadMinioFile } from '@backend/dtos/minio/upload-minio-file.dto'
import cx from 'classnames'
import { useState } from 'react'

import InputField from '../widget-components/InputField/InputField'
import Upload from '../widget-components/Upload/Upload'

type InputUploadBase = {
  UploadLabel: string
  InputLabel: string
  middleText: string
  sizeLimit: number
  supportedFormats: Array<string>
  className?: string
}

export const InputUploadGroup = ({
  UploadLabel,
  InputLabel,
  middleText,
  sizeLimit,
  supportedFormats,
  className,
}: InputUploadBase) => {
  const [files6, setFiles6] = useState<UploadMinioFile[]>([])
  return (
    <div className={cx('gap-6 w-full flex flex-col items-start p-6', className)}>
      <InputField label={InputLabel} placeholder="" className="w-full" />
      <div>{middleText}</div>
      <div>
        <div className="text-p-md font-semibold leading-8 not-italic">{UploadLabel}</div>
        <Upload
          type="button"
          sizeLimit={sizeLimit}
          supportedFormats={supportedFormats}
          value={files6}
          onChange={(newValue) => setFiles6(newValue)}
        />
      </div>
    </div>
  )
}

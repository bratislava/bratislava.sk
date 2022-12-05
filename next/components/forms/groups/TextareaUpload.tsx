import { UploadMinioFile } from '@backend/dtos/minio/upload-minio-file.dto'
import cx from 'classnames'
import { useState } from 'react'

import TextAreaField from '../TextAreaField'
import Upload from '../Upload/Upload'

type TextareaUploadBase = {
  UploadLabel: string
  TextareaLabel: string
  middleText: string
  sizeLimit: number
  supportedFormats: Array<string>
  className?: string
}

export const TextareaUploadGroup = ({
  UploadLabel,
  TextareaLabel,
  middleText,
  sizeLimit,
  supportedFormats,
  className,
}: TextareaUploadBase) => {
  const [files6, setFiles6] = useState<UploadMinioFile[]>([])
  return (
    <div className={cx('gap-6 w-full flex flex-col items-start p-6', className)}>
      <TextAreaField label={TextareaLabel} placeholder="" className="h-[150px]" />
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

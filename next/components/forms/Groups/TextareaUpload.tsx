import { UploadMinioFile } from '@backend/dtos/minio/upload-minio-file.dto'
import cx from 'classnames'
import { useState } from 'react'

import TextAreaField from '../TextAreaField'
import Upload from '../Upload/Upload'

type TextareaUploadBase = {
  UploadLabel: string
  TextareaLabel: string
}

export const TextareaUploadGroup = ({ UploadLabel, TextareaLabel }: TextareaUploadBase) => {
  const [files6, setFiles6] = useState<UploadMinioFile[]>([])
  return (
    <div className={cx('gap-6 w-full flex flex-col items-start p-6')}>
      <TextAreaField label={TextareaLabel} placeholder="" className="h-[150px]" />
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

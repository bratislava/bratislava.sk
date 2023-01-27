import { UploadMinioFile } from '@backend/dtos/minio/upload-minio-file.dto'
import React from 'react'

import UploadedFile from './UploadedFile'

interface UploadedFilesListProps {
  allFiles?: UploadMinioFile[]
  handleOnRemoveFile: (key: number) => void
}

const UploadedFilesList = ({ allFiles, handleOnRemoveFile }: UploadedFilesListProps) => {
  return (
    <div className="mt-2">
      {
        /* FILES AREA */
        allFiles?.map((minioFile: UploadMinioFile, key: number) => {
          return (
            <UploadedFile
              key={key}
              fileName={minioFile.originalName}
              errorMessage={minioFile.errorMessage}
              isUploading={minioFile.isUploading}
              onRemove={() => handleOnRemoveFile(key)}
            />
          )
        })
      }
    </div>
  )
}

export default UploadedFilesList

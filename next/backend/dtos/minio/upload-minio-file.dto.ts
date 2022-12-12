export interface UploadMinioFile {
  file: File
  originalName: string
  errorMessage?: string[]
  isUploading?: boolean
}

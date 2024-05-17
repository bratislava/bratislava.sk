import { base64Encode } from '@/utils/base64'

export const generateUrlForOfficialBoardFile = (fileId: string, fileName: string) => {
  // IMPORTANT: File id must be base64 encoded, because it can contain special characters (e.g. #)
  const encodedFileId = base64Encode(fileId)

  // We pass also the file name as the LAST param, so it is automatically encoded and used as filename
  return `/api/ginis/official-board-file/${encodedFileId}/${fileName}`
}

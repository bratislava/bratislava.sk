export const getUrlForGinisOfficialBoardLoadFile = (fileId: string, fileName: string) => {
  // IMPORTANT: File id must be base64 encoded, because it can contain special characters (e.g. #)
  const encodedFileId = Buffer.from(fileId).toString('base64')

  // We pass also the file name as the LAST param, so it is automatically encoded and used as filename
  return `/api/ginis/official-board-load-file-json/${encodedFileId}/${fileName}`
}

export const getUrlForGinisOfficialBoardLoadFile = (fileId: string) => {
  // IMPORTANT: File id must be base64 encoded, because it can contain special characters (e.g. #)
  const encodedFileId = Buffer.from(fileId).toString('base64')

  console.log('client function: fileId', fileId, encodedFileId)
  return `/api/ginis/official-board-load-file-json?fileId=${encodedFileId}`
}

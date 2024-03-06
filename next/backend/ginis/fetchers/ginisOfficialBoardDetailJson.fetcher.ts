import axios from 'axios'

export const getGinisOfficialBoardDetailQueryKeyJson = (documentId: string) => [
  'ginisOfficialBoardDetailJson',
  documentId,
]

export const ginisOfficialBoardDetailFetcherJson = async (documentId: string) => {
  // IMPORTANT: Document id must be base64 encoded, because it can contain special characters (e.g. #)
  const encodedDocumentId = Buffer.from(documentId).toString('base64')

  return axios.get(`/api/ginis/official-board-item-json?documentId=${encodedDocumentId}`)
}

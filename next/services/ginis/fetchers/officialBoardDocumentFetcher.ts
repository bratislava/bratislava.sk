import axios from 'axios'

import { base64Encode } from '@/utils/base64'

export const getOfficialBoardDocumentQueryKey = (documentId: string) => [
  'OfficialBoardDocument',
  documentId,
]

export const officialBoardDocumentFetcher = async (documentId: string) => {
  // IMPORTANT: Document id must be base64 encoded, because it can contain special characters (e.g. #)
  const encodedDocumentId = base64Encode(documentId)

  return axios.get(`/api/ginis/official-board-detail/${encodedDocumentId}`)
}

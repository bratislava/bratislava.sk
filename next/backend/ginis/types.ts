export type ParsedOfficialBoardDocument = {
  id: string
  title: string
  createdAt: string
  content: string
  numberOfFiles?: number
}

export type ParsedOfficialBoardDocumentDetail = Omit<
  ParsedOfficialBoardDocument,
  'numberOfFiles'
> & {
  files: {
    id: string
    title: string
    generatedUrl: string
    size: string
    format?: string
    uploadDate?: string
  }[]
}

export type OfficialBoardListResponse = {
  items: ParsedOfficialBoardDocument[]
  totalItems: number
}

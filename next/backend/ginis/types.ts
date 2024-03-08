export type ParsedOfficialBoardDocument = {
  id: string
  title: string
  createdAt: string
  content: string
  numberOfFiles?: number
}

export type OfficialBoardListResponse = {
  items: ParsedOfficialBoardDocument[]
  totalItems: number
}

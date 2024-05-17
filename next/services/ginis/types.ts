import { SeznamDokumentuRequestBody } from '@/ginis-sdk/api/json/ude/seznam-dokumentu'

export type ParsedOfficialBoardDocument = {
  id: string
  title: string
  publishedFrom: string
  publishedTo?: string
  description: string
  numberOfFiles: number
  categoryName: string
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

export type ParsedOfficialBoardCategory = {
  readonly id: string
  readonly title: string
  readonly numberOfPostedDocuments: number
  readonly numberOfArchivedDocuments: number
}

export type OfficialBoardCategoryListResponse = ParsedOfficialBoardCategory[]

// NonNullable removes `undefined` from the type
export type OfficialBoardPublicationState = NonNullable<SeznamDokumentuRequestBody['Stav']>

/* eslint-disable sonarjs/no-duplicate-string */

// Because the GINIS backend is accessible only from internal Bratislava network,
// if you need placeholder data, you can use the following mocks:

import {
  ParsedOfficialBoardDocument,
  ParsedOfficialBoardDocumentDetail,
} from '@backend/ginis/types'

export const mockedParsedDocuments: ParsedOfficialBoardDocument[] = [
  {
    id: 'mock-1',
    title: 'Mocked document title 1',
    createdAt: '2022-01-01',
    content: 'hello world',
    numberOfFiles: 1,
    categoryName: 'Mocked category name 1',
  },
  {
    id: 'mock-2',
    title: 'Mocked document title 1',
    createdAt: '2022-01-01',
    content: 'hello world',
    numberOfFiles: 2,
    categoryName: 'Mocked category name 2',
  },
  {
    id: 'mock-3',
    title: 'Mocked document title 1',
    createdAt: '2022-01-01',
    content: 'hello world',
    numberOfFiles: 1,
    categoryName: 'Mocked category name 3',
  },
]

export const getALotOfMockedDocs = async () => {
  return [
    ...mockedParsedDocuments,
    ...mockedParsedDocuments,
    ...mockedParsedDocuments,
    ...mockedParsedDocuments,
    ...mockedParsedDocuments,
    ...mockedParsedDocuments,
    ...mockedParsedDocuments,
    ...mockedParsedDocuments,
    ...mockedParsedDocuments,
    ...mockedParsedDocuments,
    ...mockedParsedDocuments,
    ...mockedParsedDocuments,
    ...mockedParsedDocuments,
    ...mockedParsedDocuments,
    ...mockedParsedDocuments,
    ...mockedParsedDocuments,
  ]
}

export const mockedParsedDocumentDetail: ParsedOfficialBoardDocumentDetail = {
  id: '1',
  title: 'Mocked document title 1',
  createdAt: '2022-01-01',
  content: 'hello world',
  categoryName: 'Mocked category name 1',
  files: [
    {
      id: '1',
      title: 'Mocked file 1',
      generatedUrl: '#',
      size: '1 kB',
    },
    {
      id: '2',
      title: 'Mocked file 2',
      generatedUrl: '#',
      size: '2 MB',
    },
  ],
}

/* eslint-disable sonarjs/no-duplicate-string */

// Because the GINIS backend is accessible only from internal Bratislava network,
// if you need placeholder data, you can use the following mocks:

import {
  ParsedOfficialBoardCategory,
  ParsedOfficialBoardDocument,
  ParsedOfficialBoardDocumentDetail,
} from '@/src/services/ginis/types'

export const mockedParsedDocuments: ParsedOfficialBoardDocument[] = [
  {
    id: 'mock-1',
    title: 'Mocked document title 1',
    publishedFrom: '2022-01-01',
    description: 'hello world',
    numberOfFiles: 1,
    categoryName: 'Mocked category name 1',
  },
  {
    id: 'mock-2',
    title: 'Mocked document title 1',
    publishedFrom: '2022-01-01',
    description: 'hello world',
    numberOfFiles: 2,
    categoryName: 'Mocked category name 2',
  },
  {
    id: 'mock-3',
    title: 'Mocked document title 1',
    publishedFrom: '2022-01-01',
    description: 'hello world',
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
  id: 'mocked-document-1',
  title: 'Mocked document title 1',
  publishedFrom: '2022-01-01',
  description: 'hello world',
  categoryName: 'Mocked category name 1',
  files: [
    {
      id: 'mocked-file-1',
      title: 'Mocked file 1',
      generatedUrl: '#',
      size: '1 kB',
    },
    {
      id: 'mocked-file-2',
      title: 'Mocked file 2',
      generatedUrl: '#',
      size: '2 MB',
    },
  ],
}

export const mockedParsedCategories: ParsedOfficialBoardCategory[] = [
  {
    id: 'Bytová náhrada - zákon č. 260 z r. 2011',
    title: 'Bytová náhrada',
    numberOfPostedDocuments: 0,
    numberOfArchivedDocuments: 0,
  },
  {
    id: 'Iné úradné oznamy',
    title: 'Iné úradné oznamy',
    numberOfPostedDocuments: 5,
    numberOfArchivedDocuments: 275,
  },
  {
    id: 'Komunálne voľby',
    title: 'Komunálne voľby',
    numberOfPostedDocuments: 1,
    numberOfArchivedDocuments: 41,
  },
  {
    id: 'Mestská rada a zastupiteľstvo',
    title: 'Mestská rada a zastupiteľstvo',
    numberOfPostedDocuments: 0,
    numberOfArchivedDocuments: 169,
  },
  {
    id: 'Návrhy VzN a dodatkov k Štatútu na pripomienkovani',
    title: 'Návrhy VzN, dodatkov k Štatútu na pripomienkovanie',
    numberOfPostedDocuments: 0,
    numberOfArchivedDocuments: 58,
  },
  {
    id: 'Oznámenia o dražbe',
    title: 'Dražba',
    numberOfPostedDocuments: 8,
    numberOfArchivedDocuments: 479,
  },
  {
    id: 'Posudzovanie vplyvov na životné prostredie',
    title: 'Posudzovanie vplyvov na životné prostredie',
    numberOfPostedDocuments: 8,
    numberOfArchivedDocuments: 875,
  },
  {
    id: 'Rozpočet hl.m. SR Bratislavy',
    title: 'Rozpočet',
    numberOfPostedDocuments: 0,
    numberOfArchivedDocuments: 12,
  },
  {
    id: 'Smogový varovný signál',
    title: 'Smogový varovný signál',
    numberOfPostedDocuments: 0,
    numberOfArchivedDocuments: 6,
  },
  {
    id: 'Sociálne služby',
    title: 'Sociálne služby',
    numberOfPostedDocuments: 3,
    numberOfArchivedDocuments: 10,
  },
  {
    id: 'Stavebné povolenia',
    title: 'Stavebné povolenia',
    numberOfPostedDocuments: 0,
    numberOfArchivedDocuments: 202,
  },
  {
    id: 'Udržba komunikácií',
    title: 'Údržba komunikácií',
    numberOfPostedDocuments: 122,
    numberOfArchivedDocuments: 2410,
  },
  {
    id: 'Verejné obstarávanie',
    title: 'Verejné obstarávanie',
    numberOfPostedDocuments: 26,
    numberOfArchivedDocuments: 39,
  },
  {
    id: 'Verejné vyhlášky',
    title: 'Verejné vyhlášky',
    numberOfPostedDocuments: 8,
    numberOfArchivedDocuments: 1621,
  },
  {
    id: 'Verejný návrh',
    title: 'Verejný návrh',
    numberOfPostedDocuments: 0,
    numberOfArchivedDocuments: 3,
  },
  {
    id: 'Všeobecne záväzné nariadenia',
    title: 'Všeobecne záväzné nariadenia a Štatút hl.m.',
    numberOfPostedDocuments: 1,
    numberOfArchivedDocuments: 139,
  },
  {
    id: 'Výberové konania a zamestnanie',
    title: 'Výberové konania a zamestnanie',
    numberOfPostedDocuments: 15,
    numberOfArchivedDocuments: 1552,
  },
  {
    id: 'Výsledky vybavenia petícií',
    title: 'Petície a sťažnosti',
    numberOfPostedDocuments: 17,
    numberOfArchivedDocuments: 82,
  },
  {
    id: 'Zámery, verejné súťaže a dražby',
    title: 'Zámery, verejné súťaže a dražby',
    numberOfPostedDocuments: 0,
    numberOfArchivedDocuments: 373,
  },
  {
    id: 'Životné prostredie, mestská zeleň',
    title: 'Životné prostredie, mestská zeleň',
    numberOfPostedDocuments: 1,
    numberOfArchivedDocuments: 255,
  },
  {
    id: 'Územné plánovanie, Územný rozvoj mesta',
    title: 'Územné plánovanie a rozvoj',
    numberOfPostedDocuments: 0,
    numberOfArchivedDocuments: 42,
  },
]

/* eslint-disable sonarjs/no-duplicate-string */

// Because the GINIS backend is accessible only from internal Bratislava network,
// if you need placeholder data, you can use the following mocks:

export const mockedParsedDocuments = [
  {
    id: '1',
    title: 'Mocked document title 1',
    createdAt: '2022-01-01',
    content: 'hello world',
  },
  {
    id: '2',
    title: 'Mocked document title 1',
    createdAt: '2022-01-01',
    content: 'hello world',
  },
  {
    id: '3',
    title: 'Mocked document title 1',
    createdAt: '2022-01-01',
    content: 'hello world',
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

export const mockedDetail = {
  'Detail-dokumentu': {
    Nazev: 'string',
    'Vyveseno-dne': '2020-01-01',
  },
  'Soubory-dokumentu': [
    {
      'Id-souboru': 'string',
      Nazev: 'string.pdf',
      Velikost: '168kb',
    },
    {
      'Id-souboru': 'string2',
      Nazev: 'string2.pdf',
      Velikost: '1kb',
    },
  ],
}

export const getMockedDetail = async () => {
  return mockedDetail
}

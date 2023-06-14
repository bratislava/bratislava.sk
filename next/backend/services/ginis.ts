// @ts-strict-ignore
import axios, { AxiosRequestConfig } from 'axios'
import { ResponseGinisDocumentsList } from 'backend/dtos/ginis/api-data.dto'
import { forceString, isRecord } from 'backend/utils/ginis-service'
import identity from 'lodash/identity'
import { parseStringPromise } from 'xml2js'

// ginis accessible only from internal network
// if developing from internal network, change here
export const shouldMockGinis = () => {
  return (
    process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'test' ||
    process.env.CI === 'true'
  )
}

const getUDEDocumentsList = async (search?: string): Promise<Array<ResponseGinisDocumentsList>> => {
  const axiosConfig: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
      SOAPAction: 'http://www.gordic.cz/svc/xrg-ude/v_1.0.0.0/Seznam-dokumentu',
    },
  }
  const xml = `
    <s:Envelope
      xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"
      xmlns:u="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">
      <s:Header>
        <o:Security s:mustUnderstand="1"
          xmlns:o="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd">
          <o:UsernameToken u:Id="uuid-ea5d8d3d-df90-4b69-b034-9026f34a3f21-1">
            <o:Username>${process.env.GINIS_USERNAME}</o:Username>
            <o:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText">${
              process.env.GINIS_PASSWORD
            }</o:Password>
          </o:UsernameToken>
        </o:Security>
      </s:Header>
      <s:Body>
        <Seznam-dokumentu
          xmlns="http://www.gordic.cz/svc/xrg-ude/v_1.0.0.0">
          <requestXml>
            <Xrg
              xmlns="http://www.gordic.cz/xrg/ude/seznam-dokumentu/request/v_1.0.0.0">
              <Seznam-dokumentu>
                ${search ? `<Nazev>${search}</Nazev>` : '<Stav>vyveseno</Stav>'}
              </Seznam-dokumentu>
            </Xrg>
          </requestXml>
        </Seznam-dokumentu>
      </s:Body>
    </s:Envelope>
  `
  const responseAxios = await axios
    .post(process.env.GINIS_URL, xml, axiosConfig)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.error(error)
      return error
    })
  if (!responseAxios || responseAxios.status != 200) {
    throw new Error('bad soap request to Ginis')
  }
  const response = await parseStringPromise(responseAxios.data, { explicitArray: false })
  return response['s:Envelope']['s:Body']['Seznam-dokumentuResponse']['Seznam-dokumentuResult'].Xrg[
    'Seznam-dokumentu'
  ]
}

export type ParsedOfficialBoardDocument = {
  id: string
  title: string
  createdAt: string
  content: string
}

export const getParsedUDEDocumentsList = async (search?: string, limit?: number) => {
  let documents = []
  try {
    documents = await getUDEDocumentsList(search)
  } catch (error) {
    console.log(error)
  }
  const parsedDocuments = documents
    .map((doc: unknown) => {
      return isRecord(doc)
        ? {
            id: forceString(doc['Id-zaznamu']),
            title: forceString(doc?.Nazev),
            createdAt: forceString(doc?.['Vyveseno-dne']),
            content: forceString(doc?.Popis),
          }
        : null
    })
    .filter(identity) as ParsedOfficialBoardDocument[]
  return limit ? parsedDocuments.slice(0, limit) : parsedDocuments
}

// TODO fix btoa linter error
export const getDocumentDetailURL = (documentId) => `/api/ginis/document-detail/${btoa(documentId)}`
export const getDocumentFileURL = (fileId) => `/api/ginis/document-load-file/${btoa(fileId)}`

// ################
// #### MOCKS #####
// ################

// because the GINIS backend is accessible only from internal Bratislava network,
// if you need placeholder data, you can use the following mocks:

export const mockedParsedDocuments = [
  {
    id: '1',
    title: 'Title',
    createdAt: '2022-01-01',
    content: 'hello world',
  },
  {
    id: '2',
    title: 'Title2',
    createdAt: '2022-01-01',
    content: 'hello world',
  },
  {
    id: '3',
    title: 'Title3',
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

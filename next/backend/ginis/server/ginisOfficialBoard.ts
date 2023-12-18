import { ResponseGinisDocumentsList } from '@backend/ginis/server/api-data.dto'
import { ParsedOfficialBoardDocument } from '@backend/ginis/types'
import { forceString, isRecord } from '@backend/ginis/utils'
import { isDefined } from '@utils/isDefined'
import axios, { AxiosRequestConfig } from 'axios'
import { parseStringPromise } from 'xml2js'

const getUDEDocumentsList = async (search?: string): Promise<ResponseGinisDocumentsList[]> => {
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
    // TODO environment
    .post(process.env.GINIS_URL ?? '', xml, axiosConfig)
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
  const documents =
    response['s:Envelope']['s:Body']['Seznam-dokumentuResponse']['Seznam-dokumentuResult'].Xrg[
      'Seznam-dokumentu'
    ]
  if (!documents) return []
  if (!Array.isArray(documents)) return [documents]
  return documents
}

export const getParsedUDEDocumentsList = async (search?: string) => {
  let documents: ResponseGinisDocumentsList[] = []
  try {
    documents = await getUDEDocumentsList(search)
  } catch (error) {
    console.log(error)
  }
  const parsedDocuments: ParsedOfficialBoardDocument[] = documents
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
    .filter(isDefined)

  return parsedDocuments
}

// TODO fix btoa linter error
export const getDocumentDetailURL = (documentId: string) =>
  `/api/ginis/document-detail/${btoa(documentId)}`
export const getDocumentFileURL = (fileId: string) =>
  `/api/ginis/document-load-file/${btoa(fileId)}`

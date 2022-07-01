import { forceString, isRecord } from '@utils/utils'
import axios, { AxiosRequestConfig } from 'axios'
import { ResponseGinisDocumentsList } from 'dtos/ginis/api-data.dto'
import { identity } from 'lodash'
import { parseStringPromise } from 'xml2js'

export const getUDEDocumentsList = async (search?: string): Promise<Array<ResponseGinisDocumentsList>> => {
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
                ${search ? `<Nazev>${search}</Nazev>` : ''}
                <Stav>vyveseno</Stav>
                <Id-uredni-desky>MAG0AWO0A03L</Id-uredni-desky>
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
    .catch((err) => {
      return err
    })
  if (!responseAxios || responseAxios.status != 200) {
    throw new Error('bad soap request to Ginis')
  }
  const response = await parseStringPromise(responseAxios.data, { explicitArray: false })
  return response['s:Envelope']['s:Body']['Seznam-dokumentuResponse']['Seznam-dokumentuResult']['Xrg'][
    'Seznam-dokumentu'
  ]
}

export type ParsedOfficialBoardDocument = {
  id: string
  title: string
  createdAt: string
  content: string
}

export const getParsedUDEDocumentsList = async (limit?: number) => {
  let documents = []
  try {
    documents = await getUDEDocumentsList()
  } catch (e) {
    console.log(e)
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
    .filter(identity)
  return limit ? parsedDocuments.slice(0, limit) : parsedDocuments
}

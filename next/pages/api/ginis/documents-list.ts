import type { NextApiRequest, NextApiResponse } from 'next'
import axios, { AxiosRequestConfig } from 'axios'
import { parseString } from "xml2js"
import { RequestGinisBodyDocumentsList, ResponseGinisDocumentsList } from 'dtos/ginis/api-data.dto'



export default async (req: NextApiRequest, res: NextApiResponse): Promise<void>  => {
  let result: ResponseGinisDocumentsList[] = []
  const body: RequestGinisBodyDocumentsList = req.body
  try {
    const axiosConfig: AxiosRequestConfig = {headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: 'http://www.gordic.cz/svc/xrg-ude/v_1.0.0.0/Seznam-dokumentu',
    }}
    const xml = `
      <s:Envelope
        xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"
        xmlns:u="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">
        <s:Header>
          <o:Security s:mustUnderstand="1"
            xmlns:o="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd">
            <o:UsernameToken u:Id="uuid-ea5d8d3d-df90-4b69-b034-9026f34a3f21-1">
              <o:Username>${process.env.GINIS_USERNAME}</o:Username>
              <o:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText">${process.env.GINIS_PASSWORD}</o:Password>
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
                  <Stav>${body.state}</Stav>
                  <Id-uredni-desky>${body.tableId}</Id-uredni-desky>
                </Seznam-dokumentu>
              </Xrg>
            </requestXml>
          </Seznam-dokumentu>
        </s:Body>
      </s:Envelope>
    `
    let response = {}
    const responseAxios = await axios.post(process.env.GINIS_URL, xml, axiosConfig).then(res=>{
      return res
    }).catch(err=> {return err})
    if(!responseAxios || responseAxios.status != 200) {
      return res.status(400).json({message: 'bad soap request to Ginis'})
    }
    parseString(responseAxios.data, { explicitArray: false }, function (error, r) {
      if (error) {
        return res.status(400).json({message: 'bad xml to json'})
      } else {
        response = r
      }
      
    })
    result = response["s:Envelope"]["s:Body"]["Seznam-dokumentuResponse"]["Seznam-dokumentuResult"]["Xrg"]["Seznam-dokumentu"]
  } catch (e) {
    console.log(e)
  }

  return res.json(result)
}

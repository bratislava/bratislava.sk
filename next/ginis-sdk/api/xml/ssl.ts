// full SSL service docs: https://robot.gordic.cz/xrg/Default.html?c=OpenModuleDetail&moduleName=SSL&language=cs-CZ&version=390
import type { AxiosRequestConfig } from 'axios'

import type { GinisConfig } from '@/ginis-sdk'
import { makeAxiosRequest } from '@/ginis-sdk/utils/api'

/**
 * full docs https://robot.gordic.cz/xrg/Default.html?c=OpenMethodDetail&moduleName=UDE&version=390&methodName=pridat-soubor&type=request
 */
export type pridatSoubor = {
  'Id-dokumentu'?: string
  'Id-souboru'?: string
  'Jmeno-souboru': string
  /**
   * elektronicky-obraz - Soubor je elektronický obrazem - obtiskem skutečného fyzického dokumentu. Fyzický dokument přitom nemusí v dané chvíli existovat. Např. bude vytištěn a nebo po nascanování byl uložen, zničen, odeslána atd.. Elektronický obraz může být k evidovanému dokumentu vždy jediný.
   * elektronicka-priloha - Elektronický soubor je přílohou k evidovanému dokumentu. Evidovaný dokument může obsahovat neomezené množství příloh.
   */
  'Typ-vazby': 'elektronicky-obraz' | 'elektronicka-priloha'
  'Popis-souboru'?: string
  'Podrobny-popis-souboru'?: string
  /**
   * Base64 encoded
   */
  Data: string
  'Kontrola-podpisu'?: string
}

export const pridatSoubor = async (
  config: GinisConfig,
  url: string | undefined,
  bodyObj: pridatSoubor,
) => {
  const axiosConfig: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
      SOAPAction: 'http://www.gordic.cz/svc/xrg-ssl/v_1.0.0.0/Pridat-soubor',
    },
  }
  const body = `
        <s:Envelope
          xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"
          xmlns:u="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">
          <s:Header>
            <o:Security s:mustUnderstand="1"
              xmlns:o="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd">
              <o:UsernameToken u:Id="uuid-ea5d8d3d-df90-4b69-b034-9026f34a3f21-1">
                <o:Username>${config.username}</o:Username>
                <o:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText">${
                  config.password
                }</o:Password>
              </o:UsernameToken>
            </o:Security>
          </s:Header>
          <s:Body>
            <Pridat-soubor xmlns="http://www.gordic.cz/svc/xrg-ssl/v_1.0.0.0">
              <requestXml>
                <Xrg xmlns="http://www.gordic.cz/xrg/ssl/wfl-dokument/pridat-soubor/request/v_1.0.0.0">
                  <Pridat-soubor>
                    ${Object.entries(bodyObj).map(([key, value]) => `<${key}>${value}</${key}>`)}
                  </Pridat-soubor>
                </Xrg>
              </requestXml>
            </Pridat-soubor>
          </s:Body>
        </s:Envelope>
      `
  return makeAxiosRequest(axiosConfig, url, body, config.debug)
}

export default {
  pridatSoubor,
}

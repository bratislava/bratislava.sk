// full UDE service docs: https://robot.gordic.cz/xrg/Default.html?c=OpenModuleDetail&moduleName=SSL&language=cs-CZ&version=390
import type { AxiosRequestConfig } from 'axios'

import type { GinisConfig } from '@/ginis-sdk'
import { makeAxiosRequest } from '@/ginis-sdk/utils/api'

/**
 * Full docs: https://robot.gordic.cz/xrg/Default.html?c=OpenMethodDetail&moduleName=UDE&version=390&methodName=seznam-dokumentu&type=request
 */
export type seznamDokumentu = {
  /**
   * UDE - Vrátit pouze informace evidované v GINIS modulu Úřední deska. Tj. základní informace o vyvěšeném záznamu. Elementy: Id-zaznamu ... Id-dokumentu.
   * UDEWFL - Když byl záznam vyvěšen z GINIS modulu, jsou o něm dotaženy základní informace (další možno získat voláním XRG-SSL). Elementy: Id-zaznamu ... Id-dokumentu + Puvod-dokumentu ... Cj-spisu
   * UDESML - Když byl záznam vyvěšen z GINIS modulu SML, jsou o něm dotaženy informace. Elementy: Id-zaznamu ... Id-dokumentu + Cislo-sml ... Odbor-sml.
   * UDEWFLSML - Informace UDE + WFL + SML. Vrátí vše.
   */
  'Vratit-info'?: 'UDE' | 'UDEWFL' | 'UDESML' | 'UDEWFLSML'
  /**
   * vyveseno - vyvěšeno
   * sejmuto - sejmuto
   */
  Stav?: string
  'Id-uredni-desky'?: string
  'Id-kategorie'?: string
  /**
   * ISO-string date format
   */
  'Vyveseno-od'?: string
  /**
   * ISO-string date format
   */
  'Vyveseno-od-horni-mez'?: string
  /**
   * ISO-string date format
   */
  'Sejmuto-od'?: string
  /**
   * ISO-string date format
   */
  'Sejmuto-od-horni-mez'?: string
  /**
   * Název záznamu. Hledáno přes LIKE "%hodnota%" bez ohledu na diakritiku a velikost písmen (na db stroji Informix s ohledem na diakritiku)
   * Max 254 chars
   */
  Nazev?: string
  /**
   * Popis záznamu.  Hledáno přes LIKE "%hodnota%" bez ohledu na diakritiku a velikost písmen (na db stroji Informix s ohledem na diakritiku)
   * Max 254 chars
   */
  Popis?: string
  Zdroj?: string
  /**
   * rucni-evidence - ruční evidence
   * elektronicke-podani - elektronické podání
   * datova-schranka - datová schránka
   * interface-xrg - interface, xrg
   */
  'Puvod-dokumentu'?: string
  'Odesilatel-dokumentu'?: string
  'Cj-spisu'?: string
  /**
   * ISO-string date-time format
   */
  'Datum-zmeny'?: string
  /**
   * ISO-string date-time format
   */
  'Datum-zmeny-horni-mez'?: string
  'Cislo-sml'?: string
  'Typ-sml'?: string
  'Nazev-sml'?: string
  'Nazev-sub-sml'?: string
  'Prijmeni-sub-sml'?: string
  'Jmeno-sub-sml'?: string
  'Ico-sub-sml'?: string
  'Obec-sub-sml'?: string
  'Ulice-sub-sml'?: string
  'Cor-sub-sml'?: string
  'Cpop-sub-sml'?: string
  'Psc-sub-sml'?: string
  'Typ-sub-sml'?: string
  /**
   * ISO-string date format
   */
  'Datum-uzavreni-sml-od'?: string
  /**
   * ISO-string date format
   */
  'Datum-uzavreni-sml-do'?: string
  'Odbor-sml'?: string
  'Celkova-castka-od-sml'?: string
  'Celkova-castka-do-sml'?: string
  'Mena-sml'?: string
}

export const seznamDokumentu = async (
  config: GinisConfig,
  url: string | undefined,
  bodyObj: seznamDokumentu,
) => {
  const axiosConfig: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
      SOAPAction: 'http://www.gordic.cz/svc/xrg-ude/v_1.0.0.0/Seznam-dokumentu',
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
            <Seznam-dokumentu
              xmlns="http://www.gordic.cz/svc/xrg-ude/v_1.0.0.0">
              <requestXml>
                <Xrg
                  xmlns="http://www.gordic.cz/xrg/ude/seznam-dokumentu/request/v_1.0.0.0">
                  <Seznam-dokumentu>
                    ${Object.entries(bodyObj).map(([key, value]) => `<${key}>${value}</${key}>`)}
                  </Seznam-dokumentu>
                </Xrg>
              </requestXml>
            </Seznam-dokumentu>
          </s:Body>
        </s:Envelope>
      `
  return makeAxiosRequest(axiosConfig, url, body, config.debug)
}

export default {
  seznamDokumentu,
}

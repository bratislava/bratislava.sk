import { Ginis, GinisError } from '@/ginis-sdk'
import { getGRestHeader, GRestHeader, makeAxiosRequest } from '@/ginis-sdk/utils/api'

type NacistSouborRequestBody = {
  'Id-souboru': string
}

type NacistSouborResponseItem = {
  /**
   * Jméno el. souboru.
   * string
   * Max. délka: 254, Min. délka: 1,
   */
  JmenoSouboru: string
  /**
   * Binární data souboru v base64 formátu.
   * base64Binary
   */
  Data: string
}

export type NacistSouborResponseXrg = {
  Atribut_Xrg_ixsExt: string
  /**
   * Nacist-soubor - vyžadován: Ne , max. výskyt: 1
   */
  NacistSoubor?: NacistSouborResponseItem[]
}

type NacistSouborResponse = {
  GRestHeader: GRestHeader
  Xrg: NacistSouborResponseXrg
}

export async function nacistSoubor(
  this: Ginis,
  bodyObj: NacistSouborRequestBody,
): Promise<NacistSouborResponseXrg> {
  const url = this.config.urls.ude
  if (!url) throw new GinisError('GINIS SDK Error: Missing UDE url in GINIS config')

  const response = await makeAxiosRequest<NacistSouborResponse>(
    undefined,
    `${url}/json/nacist-soubor`,
    {
      GRestHeader: getGRestHeader(
        this.config,
        'http://www.gordic.cz/xrg/ude/nacist-soubor/request/v_1.0.0.0',
      ),
      Xrg: { 'Nacist-soubor': bodyObj },
    },
    this.config.debug,
  )
  return response.data.Xrg
}

import { Ginis, GinisError } from '@/ginis-sdk'
import { getGRestHeader, GRestHeader, makeAxiosRequest } from '@/ginis-sdk/utils/api'

type SeznamKategoriiRequestBody = {
  /**
   * Identifikátor úřední desky. Pokud je v GINIS naadministrována jen jedna deska, nemusí být uvedeno.
   */
  'Id-uredni-desky'?: string
}

export type SeznamKategoriiResponseItem = {
  IdKategorie: string
  Nazev?: string
  /**
   * Počet vyvěšených dokumentů/záznamů v této kategorii.
   * int
   */
  PocetVyveseno: string
  /**
   * Počet dokumentů/záznamů v archivu (sejmutých) této kategorie.
   * int
   */
  PocetArchiv: string
}

export type SeznamKategoriiResponseXrg = {
  Atribut_Xrg_ixsExt: string
  /**
   * Seznam-kategorii - vyžadován: Ne , max. výskyt: neomezeně
   */
  SeznamKategorii?: SeznamKategoriiResponseItem | SeznamKategoriiResponseItem[]
}

type SeznamKategoriiResponse = {
  GRestHeader: GRestHeader
  Xrg: SeznamKategoriiResponseXrg
}

export async function seznamKategorii(
  this: Ginis,
  bodyObj: SeznamKategoriiRequestBody,
): Promise<SeznamKategoriiResponseXrg> {
  const url = this.config.urls.ude
  if (!url) throw new GinisError('GINIS SDK Error: Missing UDE url in GINIS config')

  const response = await makeAxiosRequest<SeznamKategoriiResponse>(
    undefined,
    `${url}/json/seznam-kategorii`,
    {
      GRestHeader: getGRestHeader(
        this.config,
        'http://www.gordic.cz/xrg/ude/seznam-kategorii/request/v_1.0.0.0',
      ),
      Xrg: { 'Seznam-kategorii': bodyObj },
    },
    this.config.debug,
  )
  return response.data.Xrg
}

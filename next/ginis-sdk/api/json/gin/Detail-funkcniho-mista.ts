import type { Ginis } from '../../../ginis'
import { makeAxiosRequest, getGRestHeader, GRestHeader } from '../../../utils/api'
import { GinisError } from '../../../utils/errors'

// https://robot.gordic.cz/xrg/Default.html?c=OpenMethodDetail&moduleName=SSL&version=390&methodName=Detail-funkcniho-mista&type=request
export type DetailFunkcnihoMistaRequest = {
  'Id-funkce': string
}

// https://robot.gordic.cz/xrg/Default.html?c=OpenMethodDetail&moduleName=SSL&version=390&methodName=Detail-funkcniho-mista&type=response
export interface DetailFunkcnihoMistaXrg {
  Atribut_Xrg_ixsExt?: string
  DetailFunkcnihoMista: Array<{
    IdFunkce: string
    Aktivita: string
    Nazev?: string
    Zkratka?: string
    OficialniNazev?: string
    Poznamka?: string
    DatumOd: string
    DatumDo: string
    IdSpisovehoUzlu: string
    NazevSpisovehoUzlu?: string
    ZkratkaSpisovehoUzlu?: string
    UrovenFunkce: string
    KodFunkce?: string
    IdNad?: string
    IdReferenta: string
    NazevReferenta?: string
    IdOrj: string
    NazevOrj?: string
    KodMistnosti?: string
    Url?: string
    Mail?: string
    Telefon?: string
    Fax?: string
    DatumZmena: string
  }>
}
export type DetailFunkcnihoMistaResponse = {
  GRestHeader: GRestHeader
  Xrg: DetailFunkcnihoMistaXrg
}

export async function detailFunkcnihoMista(
  this: Ginis,
  bodyObj: DetailFunkcnihoMistaRequest
): Promise<DetailFunkcnihoMistaXrg> {
  const url = this.config.urls.gin
  if (!url) throw new GinisError('GINIS SDK Error: Missing GIN url in GINIS config')
  const response = await makeAxiosRequest<DetailFunkcnihoMistaResponse>(
    undefined,
    `${url}/json/Detail-funkcniho-mista`,
    {
      GRestHeader: getGRestHeader(
        this.config,
        'http://www.gordic.cz/xrg/gin/detail-funkcniho-mista/request/v_1.0.0.0'
      ),
      Xrg: { 'Detail-funkcniho-mista': bodyObj },
    },
    this.config.debug
  )
  return response.data.Xrg
}

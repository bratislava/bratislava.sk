import type { Ginis } from '../../../ginis'
import { makeAxiosRequest, getGRestHeader, GRestHeader } from '../../../utils/api'
import { GinisError } from '../../../utils/errors'

// https://robot.gordic.cz/xrg/Default.html?c=OpenMethodDetail&moduleName=SSL&version=390&methodName=Detail-referenta&type=request
export type DetailReferentaRequest = {
  'Id-osoby': string
}

// https://robot.gordic.cz/xrg/Default.html?c=OpenMethodDetail&moduleName=SSL&version=390&methodName=Detail-referenta&type=response
export type DetailReferentaXrg = {
  Atribut_Xrg_ixsExt?: string
  DetailReferenta: Array<{
    IdOsoby: string
    Aktivita: string
    Nazev?: string
    Zkratka?: string
    Jmeno?: string
    Prijmeni?: string
    Poznamka?: string
    DatumOd: string
    DatumDo: string
    IdSpisovehoUzlu: string
    Login?: string
    AltLogin?: string
    ExtSysLogin?: string
    TitulPred?: string
    TitulZa?: string
    OsobniCislo?: string
    RodneCislo?: string
    RodnePrijmeni?: string
    Mail?: string
    Telefon?: string
    TelefonPrivat?: string
    TelefonMobil?: string
    Fax?: string
    DatumZmena: string
  }>
}

export type DetailReferentaResponse = {
  GRestHeader: GRestHeader
  Xrg: DetailReferentaXrg
}

export async function detailReferenta(
  this: Ginis,
  bodyObj: DetailReferentaRequest
): Promise<DetailReferentaXrg> {
  const url = this.config.urls.gin
  if (!url) throw new GinisError('GINIS SDK Error: Missing GIN url in GINIS config')
  const response = await makeAxiosRequest<DetailReferentaResponse>(
    undefined,
    `${url}/json/Detail-referenta`,
    {
      GRestHeader: getGRestHeader(
        this.config,
        'http://www.gordic.cz/xrg/gin/detail-referenta/request/v_1.0.0.0'
      ),
      Xrg: { 'Detail-referenta': bodyObj },
    },
    this.config.debug
  )
  return response.data.Xrg
}

import type { Ginis } from '@/ginis-sdk'
import { GinisError } from '@/ginis-sdk'
import { getGRestHeader, GRestHeader, makeAxiosRequest } from '@/ginis-sdk/utils/api'

// https://robot.gordic.cz/xrg/Default.html?c=OpenMethodDetail&moduleName=SSL&version=390&methodName=pridat-soubor&type=request
export type PridatSouborRequest = {
  'Id-dokumentu': string
  'Id-souboru'?: string
  'Jmeno-souboru': string
  'Typ-vazby': string
  'Popis-souboru'?: string
  'Podrobny-popis-souboru'?: string
  Data: string
  'Kontrola-podpisu'?: string
  'Priz-platna-verze'?: 0 | 1
  'Priz-archiv-verze'?: 0 | 1
  'Id-kategorie-typu-prilohy'?: string
}

// https://robot.gordic.cz/xrg/Default.html?c=OpenMethodDetail&moduleName=SSL&version=390&methodName=pridat-soubor&type=response
export type PridatSouborXrg = {
  Atribut_Xrg_ixsExt?: string
  PridatSoubor: Array<{
    DatumZmeny: string
    IdSouboru: string
    VerzeSouboru: number
  }>
}

export type PridatSouborResponse = {
  GRestHeader: GRestHeader
  Xrg: PridatSouborXrg
}

export async function pridatSoubor(
  this: Ginis,
  bodyObj: PridatSouborRequest,
): Promise<PridatSouborXrg> {
  const url = this.config.urls.ssl
  if (!url) throw new GinisError('GINIS SDK Error: Missing SSL url in GINIS config')
  const response = await makeAxiosRequest<PridatSouborResponse>(
    undefined,
    `${url}/json/Pridat-soubor`,
    {
      GRestHeader: getGRestHeader(
        this.config,
        'http://www.gordic.cz/xrg/ssl/wfl-dokument/pridat-soubor/request/v_1.0.0.0',
      ),
      Xrg: { 'Pridat-soubor': bodyObj },
    },
    this.config.debug,
  )
  return response.data.Xrg
}

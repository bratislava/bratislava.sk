import type { Ginis } from '@/ginis-sdk'
import { GinisError } from '@/ginis-sdk'
import { getGRestHeader, GRestHeader, makeAxiosRequest } from '@/ginis-sdk/utils/api'

// https://robot.gordic.cz/xrg/Default.html?c=OpenMethodDetail&moduleName=SSL&version=390&methodName=Detail-dokumentu&type=request
export type DetailDokumentuRequest = {
  'Id-dokumentu': string
  'Vyradit-historii'?: string
  'Vyradit-obsah-spisu'?: string
  'Vyradit-prilohy'?: string
  'Vyradit-souvisejici'?: string
  'Id-esu'?: string
  'Vyradit-doruceni'?: string
  'Id-eu'?: string
}

// https://robot.gordic.cz/xrg/Default.html?c=OpenMethodDetail&moduleName=SSL&version=390&methodName=Detail-dokumentu&type=response
export interface DetailDokumentuXrg {
  WflDokument: WflDokument[]
  Doruceni: Doruceni
  EDoruceni: EDoruceni
  HistorieDokumentu: HistorieDokumentu[]
  CjDokumentu: CjDokumentu
  Atribut_Xrg_IxsExt: string
}

export interface CjDokumentu {
  IdInitDokumentu: string
  Atribut_IdInitDokumentu_Externi: string
  IdVyrizDokumentu: string
  Atribut_IdVyrizDokumentu_Externi: string
  Atribut_IdVyrizDokumentu_Nil: string
  DenikCj: string
  RokCj: string
  PoradoveCisloCj: string
  ZnackaCj: string
  StavCj: string
  DatumEvidence: string
  IdZpusobVyrizeni: string
  Atribut_IdZpusobVyrizeni_Externi: string
  Atribut_IdZpusobVyrizeni_Nil: string
  DoplnekCj: string
}

export interface Doruceni {
  IdDokumentu: string
  Atribut_IdDokumentu_Externi: string
  Stat: string
  DatumOdeslani: string
  ZnackaOdesilatele: string
  DatumZeDne: string
  PodaciCislo: string
  ZpusobDoruceni: string
  DruhZasilky: string
  DruhZachazeni: string
  DatumPrijmuPodani: string
  IdOdesilatele: string
  Atribut_IdOdesilatele_Externi: string
  PocetPriloh: string
  IdUzluPodani: string
  Atribut_IdUzluPodani_Externi: string
  PoradoveCisloPodani: string
}

export interface EDoruceni {
  DatumPrijeti: string
  DatumDoruceni: string
  IdDsOdesilatele: string
}

export interface HistorieDokumentu {
  IdDokumentu: string
  Atribut_IdDokumentu_Externi: string
  TextZmeny: string
  Poznamka: string
  DatumZmeny: string
  IdZmenuProvedl: string
  Atribut_IdZmenuProvedl_Externi: string
  IdKtgZmeny: string
}

export interface WflDokument {
  IdDokumentu: string
  Atribut_IdDokumentu_Externi: string
  IdSpisu: string
  Atribut_IdSpisu_Externi: string
  PriznakSpisu: string
  PriznakCj: string
  IdFunkceVlastnika: string
  Atribut_IdFunkceVlastnika_Externi: string
  Vec: string
  Znacka: string
  StavDistribuce: string
  StavDokumentu: string
  IdAgendy: string
  IdTypuDokumentu: string
  PriznakDoruceni: string
  PriznakEvidenceSsl: string
  MistoVzniku: string
  DatumPodani: string
  PriznakFyzExistence: string
  PriznakElObrazu: string
  IdSouboru: string
  Atribut_IdSouboru_Externi: string
  JmenoSouboru: string
  PopisSouboru: string
  DatumZmeny: string
  IdZmenuProvedl: string
  Atribut_IdZmenuProvedl_Externi: string
  VerzeSouboru: string
  DatumZmenySouboru: string
  VelikostSouboru: string
  PriznakSouboruRo: string
}

export type DetailDokumentuResponse = {
  GRestHeader: GRestHeader
  Xrg: DetailDokumentuXrg
}

export async function detailDokumentu(
  this: Ginis,
  bodyObj: DetailDokumentuRequest,
): Promise<DetailDokumentuXrg> {
  const url = this.config.urls.ssl
  if (!url) throw new GinisError('GINIS SDK Error: Missing SSL url in GINIS config')
  const response = await makeAxiosRequest<DetailDokumentuResponse>(
    undefined,
    `${url}/json/Detail-dokumentu`,
    {
      GRestHeader: getGRestHeader(
        this.config,
        'http://www.gordic.cz/xrg/ssl/wfl-dokument/detail-dokumentu/request/v_1.0.0.0',
      ),
      Xrg: { 'Detail-dokumentu': bodyObj },
    },
    this.config.debug,
  )
  return response.data.Xrg
}

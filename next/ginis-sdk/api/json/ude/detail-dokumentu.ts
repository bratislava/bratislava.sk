import { Ginis, GinisError } from '@/ginis-sdk'
import { getGRestHeader, GRestHeader, makeAxiosRequest } from '@/ginis-sdk/utils/api'

/** These types were created manually:
 * - copied from https://robot.gordic.cz/xrg/Default.html?c=OpenMethodDetail&moduleName=UDE&version=524&methodName=detail-dokumentu&type=response
 * - changed dashes to CamelCase (e.g. Id-zaznamu to IdZaznamu)
 * - typed all fields as string
 * - marked all fields as optional
 * - manually checked which fields are required and changed them to required
 * - manually check type and add TSDoc comments for each field
 */

// https://robot.gordic.cz/xrg/Default.html?c=OpenMethodDetail&moduleName=UDE&version=524&methodName=detail-dokumentu&type=request#
type DetailDokumentuRequestBody = {
  'Id-zaznamu': string
}

type DetailDokumentuResponseItem = {
  IdZaznamu: string
  Stav?: string
  Kategorie: string
  Nazev: string
  Popis?: string
  Poznamka?: string
  /**
   * date
   */
  VyvesenoDne: string
  /**
   * date
   */
  SejmutoDne?: string
  Zdroj: string
  IdFunNavrhl: string
  Navrhl: string
  IdFunSchvalil: string
  Schvalil: string
  Cj?: string
  /**
   * Počet vyvěšených souborů.
   * int
   */
  PocetSouboru: string
  IdSokumentu?: string
  /**
   * Datum a čas změny záznamu na úřední desce (změna nastala po tomto okamžiku).
   * dateTime
   */
  DatumZmeny: string
  PuvodDokumentu?: string
  OdesilatelDokumentu?: string
  TypDokumentu?: string
  /**
   * Příznak, zda je elektronický obraz podepsán. Vráceno v případě, že byl záznam vyvěšen zveřejněním el. obrazu nebo příloh z GINIS dokumentu.
   * int
   *
   * 0 - Soubor není elektronicky podepsán.
   * 1 - Soubor je elektronicky podepsán.
   * 2 - Soubor je elektronicky podepsán čas. razítkem.
   * 3 - Dokument je opatřen čas. razítkem.
   */
  ElObrazPodpis?: string
  CjSpisu?: string
  CisloSml?: string
  TypSml?: string
  NazevSml?: string
  SubjektSml?: string
  NazevSubSml?: string
  PrijmeniSubSml?: string
  JmenoSubSml?: string
  IcoSubSml?: string
  ObecSubSml?: string
  UliceSubSml?: string
  CorSubSml?: string
  CpopSubSml?: string
  PscSubSml?: string
  TypSubSml?: string
  DatumUzavreniSml?: string
  OdborSml?: string
  CelkovaCastkaSml?: string
  MenaSml?: string
}

type SouboryDokumentu = {
  IdSouboru: string
  Nazev: string
  /**
   * Velikost souboru včetně jednotky (např. KB).
   * string
   */
  Velikost?: string
  /**
   * Příznak, zda se jedná o el. obraz GINIS dokumentu. Informace je k dispozici u záznamů vyvěšených přes GINIS v. 364 a vyšší.
   * short
   *
   * 0 - Soubor není el. obraz GINIS dokumentu (soubor je příloha, nebo vložen přes modul UDA01).
   * 1 - Soubor je el. obraz GINIS dokumentu.
   */
  PriznakElObr?: string
  /**
   * Poznámka k souboru.
   */
  Poznamka?: string
  /**
   * Příznak, zda je soubor el. podepsán. Vráceno v případě, že byl záznam vyvěšen zveřejněním el. obrazu nebo příloh z GINIS dokumentu.
   * short
   *
   * 0 - Soubor není elektronicky podepsán.
   * 1 - Soubor je elektronicky podepsán.
   * 2 - Soubor je elektronicky podepsán čas. razítkem.
   * 3 - Dokument je opatřen čas. razítkem.
   */
  PriznakPodpis?: string
}

/**
 * Note:
 * - DetailDokumentu usually comes as an array with one item
 * - SouboryDokumentu usually comes as play item it there is only one file, array otherwise
 */
export type DetailDokumentuResponseXrg = {
  Atribut_Xrg_ixsExt: string
  DetailDokumentu?: DetailDokumentuResponseItem | DetailDokumentuResponseItem[]
  SouboryDokumentu?: SouboryDokumentu | SouboryDokumentu[]
  // ProtistranySml?: {...}
}

type DetailDokumentuResponse = {
  GRestHeader: GRestHeader
  Xrg: DetailDokumentuResponseXrg
}

export async function detailDokumentu(
  this: Ginis,
  bodyObj: DetailDokumentuRequestBody,
): Promise<DetailDokumentuResponseXrg> {
  const url = this.config.urls.ude
  if (!url) throw new GinisError('GINIS SDK Error: Missing UDE url in GINIS config')

  const response = await makeAxiosRequest<DetailDokumentuResponse>(
    undefined,
    `${url}/json/detail-dokumentu`,
    {
      GRestHeader: getGRestHeader(
        this.config,
        'http://www.gordic.cz/xrg/ude/detail-dokumentu/request/v_1.0.0.0',
      ),
      Xrg: { 'Detail-dokumentu': bodyObj },
    },
    this.config.debug,
  )
  return response.data.Xrg
}

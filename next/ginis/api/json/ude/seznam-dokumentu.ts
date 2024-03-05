import { Ginis } from '../../../ginis'
import { getGRestHeader, GRestHeader, makeAxiosRequest } from '../../../utils/api'
import { GinisError } from '../../../utils/errors'

/**
 * Full docs: https://robot.gordic.cz/xrg/Default.html?c=OpenMethodDetail&moduleName=UDE&version=390&methodName=seznam-dokumentu&type=request
 */
export type SeznamDokumentuRequestBody = {
  /**
   * UDE - Vrátit pouze informace evidované v GINIS modulu Úřední deska. Tj. základní informace o vyvěšeném záznamu. Elementy: Id-zaznamu ... Id-dokumentu.
   * UDEWFL - Když byl záznam vyvěšen z GINIS modulu, jsou o něm dotaženy základní informace (další možno získat voláním XRG-SSL). Elementy: Id-zaznamu ... Id-dokumentu + Puvod-dokumentu ... Cj-spisu
   * UDESML - Když byl záznam vyvěšen z GINIS modulu SML, jsou o něm dotaženy informace. Elementy: Id-zaznamu ... Id-dokumentu + Cislo-sml ... Odbor-sml.
   * UDEWFLSML - Informace UDE + WFL + SML. Vrátí vše.
   */
  VratitInfo?: 'UDE' | 'UDEWFL' | 'UDESML' | 'UDEWFLSML'
  /**
   * vyveseno - vyvěšeno
   * sejmuto - sejmuto
   */
  Stav?: string
  IdUredniDesky?: string
  IdKategorie?: string
  /**
   * ISO-string date format
   */
  VyvesenoOd?: string
  /**
   * ISO-string date format
   */
  VyvesenoOdHorniMez?: string
  /**
   * ISO-string date format
   */
  SejmutoOd?: string
  /**
   * ISO-string date format
   */
  SejmutoOdHorniMez?: string
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
  PuvodDokumentu?: string
  OdesilatelDokumentu?: string
  CjSpisu?: string
  /**
   * ISO-string date-time format
   */
  DatumZmeny?: string
  /**
   * ISO-string date-time format
   */
  DatumZmenyHorniMez?: string
  CisloSml?: string
  TypSml?: string
  NazevSml?: string
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
  /**
   * ISO-string date format
   */
  DatumUzavreniSmlOd?: string
  /**
   * ISOString date format
   */
  DatumUzavreniSmlDo?: string
  OdborSml?: string
  CelkovaCastkaOdSml?: string
  CelkovaCastkaDoSml?: string
  MenaSml?: string
}

/**
 * Manually typed according to https://robot.gordic.cz/xrg/Default.html?c=OpenMethodDetail&moduleName=UDE&version=390&methodName=seznam-dokumentu&type=response#
 */
export type SeznamDokumentuResponseItem = {
  IdZaznamu: string
  /**
   * pripraveno - Připraveno – schváleno k vyvěšení, ale ještě nenastalo datum vyvěšení. Záznamy s touto hodnotou se na výstupu mohou objevit pouze u desek, které vrací v metodě seznam-desek element Stav-pripraveno = 'true'.
   * vyveseno - Vyvěšeno – schváleno k vyvěšení + nastalo datum vyvěšení (a ještě nenastalo datum sejmutí)
   * sejmuto - Sejmuto – záznam byl na desce, ale už nastalo datum sejmutí a nebo byl ručně sejmut (a do okamžiku ručního sejmutí se posunulo datum sejmutí)
   */
  Stav?: string
  /**
   * Název kategorie.
   */
  Kategorie: string
  Nazev: string
  Popis?: string
  /**
   * ISO-string date
   */
  VyvesenoDne: string
  /**
   * ISO-string date
   */
  SejmutoDne?: string
  Zdroj: string
  /**
   * Identifikace GINIS funkce, která navrhla dokument k vyvěšení.
   */
  IdFunNavrhl: string
  /**
   * Osoba, která navrhla dokument k vyvěšení.
   */
  Navrhl: string
  /**
   * Identifikace GINIS funkce, která dokument schválila resp. vyvěsila.
   */
  IdFunSchvalil: string
  /**
   * Osoba, která dokument schválila resp. vyvěsila.
   */
  Schvalil: string
  /**
   * Číslo jednací resp. značka.
   */
  Cj?: string
  /**
   * Počet vyvěšených souborů.
   * int
   */
  PocetSouboru: string
  /**
   * Identifikace GINIS dokumentu. Vráceno v případě, že byl záznam vyvěšen zveřejněním el. obrazu nebo příloh z GINIS dokumentu.
   */
  IdDokumentu?: string
  /**
   * Celkový počet vyvěšených dokumentů/záznamů.
   * int
   */
  PocetVyveseno: string
  /**
   * Celkový počet dokumentů/záznamů v archivu (sejmutých).
   * int
   */
  PocetArchiv: string
  /**
   * Datum a čas změny záznamu na úřední desce.
   * dateTime
   */
  DatumZmeny: string
  PuvodDokumentu?: string
  OdesilatelDokumentu?: string
  TypDokumentu?: string
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

// https://robot.gordic.cz/xrg/Default.html?c=OpenMethodDetail&moduleName=SSL&version=390&methodName=Detail-dokumentu&type=response
export interface SeznamDokumentuXrg {
  Atribut_Xrg_IxsExt: string
  /**
   * Documentation says it's `Seznam-dokumentu` but it's actually `SeznamDokumentu`
   */
  SeznamDokumentu: SeznamDokumentuResponseItem[]
}

export type SeznamDokumentuResponse = {
  GRestHeader: GRestHeader
  Xrg: SeznamDokumentuXrg
}

export async function seznamDokumentu(
  this: Ginis,
  bodyObj: SeznamDokumentuRequestBody,
): Promise<SeznamDokumentuXrg> {
  const url = this.config.urls.ude
  if (!url) throw new GinisError('GINIS SDK Error: Missing UDE url in GINIS config')

  const response = await makeAxiosRequest<SeznamDokumentuResponse>(
    undefined,
    `${url}/json/seznam-dokumentu`,
    {
      GRestHeader: getGRestHeader(
        this.config,
        'http://www.gordic.cz/xrg/ude/seznam-dokumentu/request/v_1.0.0.0',
      ),
      Xrg: { 'Seznam-dokumentu': bodyObj },
    },
    this.config.debug,
  )
  return response.data.Xrg
}

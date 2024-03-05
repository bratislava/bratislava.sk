import { ginis } from '@backend/ginis/ginis'
import { ParsedOfficialBoardDocument } from '@backend/ginis/types'
import { isDefined } from '@utils/isDefined'

import { SeznamDokumentuResponseItem } from '../../../ginis/api/json/ude/seznam-dokumentu'

export const getParsedUDEDocumentsListJson = async (searchQuery?: string) => {
  let documents: SeznamDokumentuResponseItem[] = []

  const searchQueryTrimmed = searchQuery?.trim().slice(0, 254) ?? ''

  try {
    /**
     * The `bodyObj` uses same keys as the requests in Ginis docs, i.e. https://robot.gordic.cz/xrg/Default.html?c=OpenMethodDetail&moduleName=UDE&version=390&methodName=seznam-dokumentu&type=request
     * It will throw an Axios error if the request fails.
     *
     * IMPORTANT: The order of the keys in the `bodyObj` is important, as it has to match the order in the Ginis docs.
     * Otherwise, it will throw 400 Bad Request error.
     */
    const dataXrg = await ginis.json.ude.seznamDokumentu({
      Stav: 'vyveseno',
      // VyvesenoOd: '2024-03-05',
      // IdKategorie: 'Iné úradné oznamy',
      Nazev: searchQueryTrimmed,
      // Popis: searchQueryTrimmed,
    })
    documents = dataXrg.SeznamDokumentu
  } catch (error) {
    console.log(error)
  }

  const parsedDocuments: ParsedOfficialBoardDocument[] = documents
    .map((document) => {
      return {
        id: document.IdZaznamu,
        title: document.Nazev,
        createdAt: document.VyvesenoDne,
        content: document.Popis ?? '',
        // numberOfFiles: parseInt(document.PocetSouboru, 10),
      }
    })
    .filter(isDefined)

  return parsedDocuments
}

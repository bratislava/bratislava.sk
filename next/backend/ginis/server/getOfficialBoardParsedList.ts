import { ginis } from '@backend/ginis/ginis'
import { ParsedOfficialBoardDocument } from '@backend/ginis/types'
import { SeznamDokumentuResponseItem } from '@ginis-sdk/api/json/ude/seznam-dokumentu'
import { isDefined } from '@utils/isDefined'

export const getOfficialBoardParsedList = async (searchQuery?: string, categoryId?: string) => {
  let documents: SeznamDokumentuResponseItem[] = []

  // Nazev - Max. délka: 254
  const searchQueryTrimmed = searchQuery?.trim().slice(0, 254) ?? ''

  try {
    /**
     * The `bodyObj` uses same keys as the requests in Ginis docs
     * It will throw an Axios error if the request fails.
     * https://robot.gordic.cz/xrg/Default.html?c=OpenMethodDetail&moduleName=UDE&version=390&methodName=seznam-dokumentu&type=request
     *
     * IMPORTANT: The order of the keys in the `bodyObj` is important, as it has to match the order in the Ginis docs.
     * Otherwise, it will throw 400 Bad Request error.
     */
    const dataXrg = await ginis.json.ude.seznamDokumentu({
      Stav: 'vyveseno',
      IdKategorie: categoryId,
      Nazev: searchQueryTrimmed,
    })

    const documentsResponse = dataXrg.SeznamDokumentu

    // Keeping the approach from old XML endpoint to double-check if documents are always an array
    if (Array.isArray(documentsResponse)) {
      documents = documentsResponse
    } else if (typeof documentsResponse === 'object') {
      documents = [documentsResponse]
    } else {
      documents = []
    }
  } catch (error) {
    // TODO handle error
    console.log(error)
  }

  const parsedDocuments: ParsedOfficialBoardDocument[] = documents
    .map((document) => {
      return {
        id: document.IdZaznamu,
        title: document.Nazev,
        createdAt: document.VyvesenoDne,
        content: document.Popis ?? '',
        numberOfFiles: parseInt(document.PocetSouboru ?? 0, 10), // added "?? 0" just in case
      }
    })
    .filter(isDefined)

  return parsedDocuments
}

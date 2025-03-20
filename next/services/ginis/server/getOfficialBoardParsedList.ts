import { UdeSeznamDokumentuSeznamDokumentuItem } from '@bratislava/ginis-sdk'

import { ginis } from '@/services/ginis/ginis'
import { ParsedOfficialBoardDocument } from '@/services/ginis/types'
import { isDefined } from '@/utils/isDefined'

export const getOfficialBoardParsedList = async (options: {
  searchQuery?: string
  publicationState?: string
  categoryId?: string
}) => {
  const { searchQuery, publicationState, categoryId } = options

  let documents: UdeSeznamDokumentuSeznamDokumentuItem[] = []

  // Nazev - Max. délka: 254
  const searchQueryTrimmed = searchQuery?.trim().slice(0, 254) ?? ''

  // Stav?: 'vyveseno' | 'sejmuto'
  const publicationStateSanitized =
    publicationState === 'vyveseno' || publicationState === 'sejmuto' ? publicationState : undefined

  try {
    /**
     * The `bodyObj` uses same keys as the requests in Ginis docs (dash-case, only first capital, Czech language)
     * It will throw an GinisError if the request fails - if the cause is axios error, it's available in error.axiosError
     * https://robot.gordic.cz/xrg/Default.html?c=OpenMethodDetail&moduleName=UDE&version=390&methodName=seznam-dokumentu&type=request
     */
    const response = await ginis.ude.seznamDokumentu({
      Stav: publicationStateSanitized,
      'Id-kategorie': categoryId,
      Nazev: searchQueryTrimmed,
    })
    documents = response['Seznam-dokumentu']
  } catch (error) {
    // TODO handle error
    // eslint-disable-next-line no-console
    console.log(error)
  }

  const parsedDocuments: ParsedOfficialBoardDocument[] = documents
    .map((document) => {
      return {
        id: document['Id-zaznamu'],
        title: document.Nazev,
        publishedFrom: document['Vyveseno-dne'],
        publishedTo: document['Sejmuto-dne'],
        description: document.Popis ?? '',
        numberOfFiles: parseInt(document['Pocet-souboru'] ?? 0, 10), // added "?? 0" just in case
        categoryName: document.Kategorie,
      }
    })
    .filter(isDefined)

  return parsedDocuments
}

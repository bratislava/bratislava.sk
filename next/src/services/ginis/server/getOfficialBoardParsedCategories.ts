import { UdeSeznamKategoriiSeznamKategoriiItem } from '@bratislava/ginis-sdk'

import { ginis } from '@/src/services/ginis/ginis'
import { isDefined } from '@/src/utils/isDefined'

export const getOfficialBoardParsedCategories = async () => {
  let categories: UdeSeznamKategoriiSeznamKategoriiItem[] = []

  try {
    /**
     * The `bodyObj` uses same keys as the requests in Ginis docs (dash-case, only first capital, Czech language)
     * It will throw an GinisError if the request fails - if the cause is axios error, it's available in error.axiosError
     * https://robot.gordic.cz/xrg/Default.html?c=OpenMethodDetail&moduleName=UDE&version=390&methodName=seznam-dokumentu&type=request
     */
    const response = await ginis.ude.seznamKategorii({})
    categories = response['Seznam-kategorii']
  } catch (error) {
    // TODO handle error
    // eslint-disable-next-line no-console
    console.log(error)
  }

  return categories
    .map((category) => {
      return {
        id: category['Id-kategorie'],
        title: category.Nazev || category['Id-kategorie'],
        numberOfPostedDocuments: parseInt(category['Pocet-vyveseno'] ?? 0, 10), // added "?? 0" just in case
        numberOfArchivedDocuments: parseInt(category['Pocet-archiv'] ?? 0, 10), // added "?? 0" just in case
      }
    })
    .filter(isDefined)
}

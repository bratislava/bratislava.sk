import { ginis } from '@backend/ginis/ginis'
import { SeznamKategoriiResponseItem } from '@ginis-sdk/api/json/ude/seznam-kategorii'

import { isDefined } from '@/utils/isDefined'

export const getOfficialBoardParsedCategories = async () => {
  let categories: SeznamKategoriiResponseItem[] = []

  try {
    /**
     * The `bodyObj` uses same keys as the requests in Ginis docs
     * It will throw an Axios error if the request fails.
     * https://robot.gordic.cz/xrg/Default.html?c=OpenMethodDetail&moduleName=UDE&version=390&methodName=seznam-dokumentu&type=request
     *
     * IMPORTANT: The order of the keys in the `bodyObj` is important, as it has to match the order in the Ginis docs.
     * Otherwise, it will throw 400 Bad Request error.
     */
    const dataXrg = await ginis.json.ude.seznamKategorii({})

    const categoriesResponse = dataXrg.SeznamKategorii

    // Keeping the approach from old XML endpoint to double-check if documents are always an array
    if (Array.isArray(categoriesResponse)) {
      categories = categoriesResponse
    } else if (typeof categoriesResponse === 'object') {
      categories = [categoriesResponse]
    } else {
      categories = []
    }
  } catch (error) {
    // TODO handle error
    console.log(error)
  }

  return categories
    .map((category) => {
      return {
        id: category.IdKategorie,
        title: category.Nazev || category.IdKategorie,
        numberOfPostedDocuments: parseInt(category.PocetVyveseno ?? 0, 10), // added "?? 0" just in case
        numberOfArchivedDocuments: parseInt(category.PocetArchiv ?? 0, 10), // added "?? 0" just in case
      }
    })
    .filter(isDefined)
}

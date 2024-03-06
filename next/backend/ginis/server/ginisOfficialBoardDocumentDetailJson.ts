import { ginis } from '@backend/ginis/ginis'

import { DetailDokumentuResponseXrg } from '../../../ginis/api/json/ude/detail-dokumentu'

export const getParsedUDEDocumentDetailJson = async (documentId: string) => {
  let documentDetail: DetailDokumentuResponseXrg['DetailDokumentu']
  let documentFiles: DetailDokumentuResponseXrg['SouboryDokumentu']

  try {
    /**
     * The `bodyObj` uses same keys as the requests in Ginis docs, i.e. https://robot.gordic.cz/xrg/Default.html?c=OpenMethodDetail&moduleName=UDE&version=524&methodName=detail-dokumentu&type=request#
     * It will throw an Axios error if the request fails.
     *
     * IMPORTANT: The order of the keys in the `bodyObj` is important, as it has to match the order in the Ginis docs.
     * Otherwise, it will throw 400 Bad Request error.
     */
    const dataXrg = await ginis.json.ude.detailDokumentu({
      'Id-zaznamu': documentId,
    })
    documentDetail = dataXrg.DetailDokumentu
    documentFiles = dataXrg.SouboryDokumentu

    if (Array.isArray(documentFiles)) {
      // pass TODO
    } else if (typeof documentFiles === 'object') {
      documentFiles = [documentFiles]
    } else {
      documentFiles = []
    }

    // TODO Detail-dokumentu is currently not used, modal gets infor from parent componet, but we keep it here for future, when we will want to have detail page for official board documents
    // TODO return in more readable parsed format
    return { 'Detail-dokumentu': documentDetail, 'Soubory-dokumentu': documentFiles }
  } catch (error) {
    console.log(error)
  }

  // TODO Keeping for reference from old XML endpoint to double check if documents are always an array
}

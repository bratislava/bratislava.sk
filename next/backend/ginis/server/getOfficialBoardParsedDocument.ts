import { ginis } from '@backend/ginis/ginis'
import { ParsedOfficialBoardDocumentDetail } from '@backend/ginis/types'
import { generateUrlForOfficialBoardFile } from '@backend/ginis/utils/generateUrlForOfficialBoardFile'
import { DetailDokumentuResponseXrg } from '@ginis-sdk/api/json/ude/detail-dokumentu'

export const getOfficialBoardParsedDocument = async (documentId: string) => {
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

    // Keeping the approach from old XML endpoint to double-check if documentFiles are always an array
    // Expecting array of one or multiple files
    if (Array.isArray(documentFiles)) {
      // do nothing, needed for TS
    } else if (typeof documentFiles === 'object') {
      documentFiles = [documentFiles]
    } else {
      documentFiles = []
    }

    // Expecting array of one object
    if (Array.isArray(documentDetail)) {
      // do nothing, needed for TS
    } else if (typeof documentDetail === 'object') {
      documentDetail = [documentDetail]
    } else {
      documentDetail = []
    }

    const parsedDocumentDetail: ParsedOfficialBoardDocumentDetail = {
      id: documentDetail[0].IdZaznamu,
      title: documentDetail[0].Nazev,
      createdAt: documentDetail[0].VyvesenoDne,
      content: documentDetail[0].Popis ?? '',
      categoryName: documentDetail[0].Kategorie,
      files: documentFiles.map((file) => ({
        id: file.IdSouboru,
        title: file.Nazev,
        generatedUrl: generateUrlForOfficialBoardFile(file.IdSouboru, file.Nazev),
        size: file.Velikost ?? '',
      })),
    }

    return parsedDocumentDetail
  } catch (error) {
    console.log(error)
  }
}

import { ginis } from '@/services/ginis/ginis'
import { ParsedOfficialBoardDocumentDetail } from '@/services/ginis/types'
import { generateUrlForOfficialBoardFile } from '@/services/ginis/utils/generateUrlForOfficialBoardFile'

export const getOfficialBoardParsedDocument = async (documentId: string) => {
  try {
    /**
     * The `bodyObj` uses same keys as the requests in Ginis docs (dash-case, only first capital, Czech language)
     * It will throw an GinisError if the request fails - if the cause is axios error, it's available in error.axiosError
     * https://robot.gordic.cz/xrg/Default.html?c=OpenMethodDetail&moduleName=UDE&version=524&methodName=detail-dokumentu&type=request#
     */
    const response = await ginis.ude.detailDokumentu({
      'Id-zaznamu': documentId,
    })
    const documentDetail = response['Detail-dokumentu']
    const documentFiles = response['Soubory-dokumentu']

    if (!documentDetail) {
      throw new Error('No document detail available from Ginis')
    }

    const parsedDocumentDetail: ParsedOfficialBoardDocumentDetail = {
      id: documentDetail['Id-zaznamu'],
      title: documentDetail.Nazev,
      publishedFrom: documentDetail['Vyveseno-dne'],
      publishedTo: documentDetail['Sejmuto-dne'],
      description: documentDetail.Popis ?? '',
      categoryName: documentDetail.Kategorie,
      files: documentFiles.map((file) => ({
        id: file['Id-souboru'],
        title: file.Nazev,
        generatedUrl: generateUrlForOfficialBoardFile(file['Id-souboru'], file.Nazev),
        size: file.Velikost ?? '',
      })),
    }

    return parsedDocumentDetail
  } catch (error) {
    console.log(error)
    return null
  }
}

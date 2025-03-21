import { ginis } from '@/src/services/ginis/ginis'

export const getOfficialBoardFileBase64Encoded = async (fileId: string) => {
  try {
    /**
     * The `bodyObj` uses same keys as the requests in Ginis docs (dash-case, only first capital, Czech language)
     * It will throw an GinisError if the request fails - if the cause is axios error, it's available in error.axiosError
     * https://robot.gordic.cz/xrg/Default.html?c=OpenMethodDetail&moduleName=UDE&version=524&methodName=nacist-soubor&type=request#
     */
    const response = await ginis.ude.nacistSoubor({
      'Id-souboru': fileId,
    })
    return response['Nacist-soubor']
  } catch (error) {
    // TODO handle error
    // eslint-disable-next-line no-console
    console.log(error)
    return null
  }
}
